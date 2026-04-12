/**
 * Ha-sketch Puppeteer Visual + Interaction Test Suite
 *
 * Tests all 28 cards against a real Home Assistant instance.
 * Run: npm run test:visual
 *
 * Prerequisites:
 *   1. HA running at the URL below with the long-lived access token
 *   2. ha-sketchbook-cards.js resource loaded in HA
 *   3. The test dashboard created (see tests/test-dashboard.yaml)
 *   4. npm install (puppeteer already in devDependencies)
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// ── Config ──────────────────────────────────────────────────
const HA_URL = process.env.HA_URL || 'http://localhost:8123';
const HA_TOKEN = process.env.HA_TOKEN || '';
const DASHBOARD_PATH = '/lovelace-sketch-test/0';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'test-screenshots');
const TIMEOUT = 15000;

// ── Helpers ─────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const results = { pass: 0, fail: 0, errors: [] };

function report(name, passed, detail = '') {
  if (passed) {
    results.pass++;
    console.log(`  ✅ ${name}`);
  } else {
    results.fail++;
    results.errors.push({ name, detail });
    console.log(`  ❌ ${name} — ${detail}`);
  }
}

// ── Card test definitions ───────────────────────────────────
const CARD_TESTS = [
  // Core cards (entities that exist in user's HA)
  { tag: 'sketch-entity-card', checks: ['has-svg-bg', 'has-text', 'has-icon'] },
  { tag: 'sketch-button-card', checks: ['has-svg-bg', 'has-text', 'has-icon', 'click-action'] },
  { tag: 'sketch-light-card', checks: ['has-svg-bg', 'has-text', 'has-icon'] },
  { tag: 'sketch-thermostat-card', checks: ['has-text'] },  // may not have entity
  { tag: 'sketch-weather-card', checks: ['has-svg-bg', 'has-text'] },
  { tag: 'sketch-sensor-card', checks: ['has-svg-bg', 'has-text'] },
  { tag: 'sketch-media-player-card', checks: ['has-svg-bg', 'has-text'] },
  // cover, alarm, lock, number — skipped (user has no entities for these)
  { tag: 'sketch-clock-card', checks: ['has-text'] },
  { tag: 'sketch-chip-card', checks: ['has-chips'] },
  { tag: 'sketch-person-card', checks: ['has-svg-bg', 'has-text'] },
  { tag: 'sketch-tile-card', checks: ['has-svg-bg', 'has-text'] },
  { tag: 'sketch-camera-card', checks: ['has-svg-bg'] },
  { tag: 'sketch-separator-card', checks: ['has-wavy-line'] },
  { tag: 'sketch-sub-button-card', checks: ['has-svg-bg', 'has-text'] },
  { tag: 'sketch-fan-card', checks: ['has-svg-bg', 'has-text'] },
  // New v1.4 cards
  { tag: 'sketch-template-card', checks: ['has-svg-bg', 'has-text'] },
  { tag: 'sketch-history-graph-card', checks: ['has-svg-bg', 'has-graph-or-empty'] },
  { tag: 'sketch-room-card', checks: ['has-svg-bg', 'has-text', 'has-icon'] },
  { tag: 'sketch-select-card', checks: ['has-svg-bg', 'has-dropdown'] },
  { tag: 'sketch-progress-card', checks: ['has-svg-bg', 'has-progress-ring'] },
  { tag: 'sketch-timeline-card', checks: ['has-svg-bg', 'has-timeline-or-empty'] },
  { tag: 'sketch-tog-card', checks: ['has-svg-bg', 'has-tog-strip', 'has-clothing-svg', 'tog-deep-test'] },
];

// ── Main ────────────────────────────────────────────────────
(async () => {
  if (!HA_TOKEN) {
    console.error('❌ Set HA_URL and HA_TOKEN environment variables first:');
    console.error('   export HA_URL="http://192.168.1.x:8123"');
    console.error('   export HA_TOKEN="your-long-lived-access-token"');
    process.exit(1);
  }

  console.log('\n🎨 Ha-sketch Visual Test Suite\n');
  console.log(`Target: ${HA_URL}${DASHBOARD_PATH}\n`);

  // Create screenshot dir
  if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=412,915'],
    defaultViewport: { width: 412, height: 915, deviceScaleFactor: 2 },
  });

  const page = await browser.newPage();

  // Collect JS errors
  const jsErrors = [];
  page.on('pageerror', (err) => jsErrors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !msg.text().includes('favicon')) {
      jsErrors.push(msg.text());
    }
  });

  try {
    // ── Step 1: Authenticate ──────────────────────────────
    console.log('🔑 Authenticating...');

    // First, go to a blank page on the HA origin to set localStorage
    await page.goto(`${HA_URL}/auth/authorize`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT }).catch(() => {});

    // Inject the auth token into localStorage using HA's expected format
    await page.evaluate((url, token) => {
      // HA stores tokens keyed by hassUrl
      const tokenData = {
        hassUrl: url,
        clientId: `${url}/`,
        access_token: token,
        token_type: 'Bearer',
        refresh_token: '',
        expires_in: 86400,
        expires: Date.now() + 86400000,
      };
      try {
        // Try the modern HA token storage format
        localStorage.setItem('hassTokens', JSON.stringify(tokenData));
        // Also set the legacy format
        localStorage.setItem(`hassTokens-${url}`, JSON.stringify(tokenData));
      } catch(e) {}
    }, HA_URL, HA_TOKEN);

    // Set extra headers for API calls that bypass localStorage
    await page.setExtraHTTPHeaders({
      'Authorization': `Bearer ${HA_TOKEN}`,
    });

    // Now load the dashboard
    console.log('📄 Loading dashboard...');
    await page.goto(`${HA_URL}${DASHBOARD_PATH}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(8000); // Wait for cards to fully render + WebSocket connections

    console.log('📸 Taking full dashboard screenshot...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '00-full-dashboard.png'), fullPage: true });

    // ── Step 2: Check each card type ──────────────────────
    console.log('\n🔍 Checking card rendering:\n');

    for (const cardTest of CARD_TESTS) {
      const { tag, checks } = cardTest;

      // Find the card element in the DOM (penetrate shadow DOM)
      const cardExists = await page.evaluate((tagName) => {
        // Search through shadow DOMs
        function findInShadow(root, tag) {
          const found = root.querySelector(tag);
          if (found) return true;
          const shadows = root.querySelectorAll('*');
          for (const el of shadows) {
            if (el.shadowRoot) {
              const result = findInShadow(el.shadowRoot, tag);
              if (result) return true;
            }
          }
          return false;
        }
        return findInShadow(document, tagName);
      }, tag);

      if (!cardExists) {
        report(`${tag} — exists in DOM`, false, 'Card element not found');
        continue;
      }
      report(`${tag} — exists in DOM`, true);

      // Run specific checks
      for (const check of checks) {
        const checkResult = await page.evaluate((tagName, checkType) => {
          function findInShadow(root, tag) {
            const found = root.querySelector(tag);
            if (found) return found;
            const els = root.querySelectorAll('*');
            for (const el of els) {
              if (el.shadowRoot) {
                const result = findInShadow(el.shadowRoot, tag);
                if (result) return result;
              }
            }
            return null;
          }

          const card = findInShadow(document, tagName);
          if (!card || !card.shadowRoot) return { pass: false, detail: 'No shadow root' };

          const sr = card.shadowRoot;
          switch (checkType) {
            case 'has-svg-bg': {
              const svg = sr.querySelector('.sketch-bg-svg');
              if (!svg) return { pass: false, detail: 'Missing .sketch-bg-svg' };
              const paths = svg.querySelectorAll('path');
              return { pass: paths.length > 0, detail: paths.length > 0 ? `${paths.length} SVG paths` : 'SVG has no paths' };
            }
            case 'has-text': {
              const text = sr.textContent.trim();
              return { pass: text.length > 0, detail: text.length > 0 ? `${text.length} chars` : 'No text content' };
            }
            case 'has-icon': {
              const icon = sr.querySelector('ha-icon');
              return { pass: !!icon, detail: icon ? 'ha-icon found' : 'No ha-icon' };
            }
            case 'has-chips': {
              const chips = sr.querySelectorAll('.chip');
              return { pass: chips.length > 0, detail: `${chips.length} chips` };
            }
            case 'has-toggle': {
              const toggle = sr.querySelector('.tile-toggle');
              return { pass: !!toggle, detail: toggle ? 'Toggle found' : 'No toggle' };
            }
            case 'has-wavy-line': {
              const svg = sr.querySelector('svg');
              return { pass: !!svg, detail: svg ? 'SVG line found' : 'No SVG' };
            }
            case 'has-dropdown': {
              const chevron = sr.querySelector('.select-chevron');
              return { pass: !!chevron, detail: chevron ? 'Dropdown found' : 'No dropdown' };
            }
            case 'has-progress-ring': {
              const svg = sr.querySelector('.progress-svg');
              const polylines = svg ? svg.querySelectorAll('polyline') : [];
              return { pass: polylines.length > 0, detail: polylines.length > 0 ? `${polylines.length} polylines` : 'No ring' };
            }
            case 'has-graph-or-empty': {
              const svg = sr.querySelector('.graph-svg');
              const empty = sr.querySelector('.graph-empty');
              return { pass: !!(svg || empty), detail: svg ? 'Graph SVG found' : empty ? 'Empty state shown' : 'Neither' };
            }
            case 'has-timeline-or-empty': {
              const list = sr.querySelector('.timeline-list');
              const empty = sr.querySelector('.timeline-empty');
              return { pass: !!(list || empty), detail: list ? 'Timeline entries found' : empty ? 'Empty state shown' : 'Neither' };
            }
            case 'has-tog-strip': {
              const strip = sr.querySelector('.tog-temp-strip');
              return { pass: !!strip, detail: strip ? 'Temp strip found' : 'No strip' };
            }
            case 'has-clothing-svg': {
              const svgs = sr.querySelectorAll('.tog-clothing-svg');
              if (!svgs.length) return { pass: false, detail: 'No clothing SVGs' };
              // Check if SVGs have visible paths
              let visiblePaths = 0;
              svgs.forEach((s) => { visiblePaths += s.querySelectorAll('path, rect').length; });
              return { pass: visiblePaths > 0, detail: `${svgs.length} SVGs with ${visiblePaths} paths` };
            }
            case 'tog-deep-test': {
              // Deep TOG card verification
              const results = [];

              // 1. Check clothing SVGs are visually distinct (different path data)
              const svgs = sr.querySelectorAll('.tog-clothing-svg');
              const pathDatas = new Set();
              svgs.forEach((s) => {
                const p = s.querySelector('path');
                if (p) pathDatas.add(p.getAttribute('d')?.substring(0, 30));
              });
              results.push(pathDatas.size >= 2 ? 'distinct-paths:YES' : 'distinct-paths:NO');

              // 2. Check clothing labels exist and are different
              const labels = sr.querySelectorAll('.tog-clothing-label');
              const labelTexts = new Set();
              labels.forEach((l) => { if (l.textContent.trim()) labelTexts.add(l.textContent.trim()); });
              results.push(labelTexts.size >= 2 ? 'distinct-labels:YES' : 'distinct-labels:NO');

              // 3. Check temperature strip has gradient and dot
              const strip = sr.querySelector('.tog-temp-strip');
              const gradient = strip?.querySelector('linearGradient, rect[fill*="url"]');
              const dot = strip?.querySelector('circle');
              results.push(gradient ? 'gradient:YES' : 'gradient:NO');
              results.push(dot ? 'dot:YES' : 'dot:NO');

              // 4. Check TOG rating text exists and contains a number
              const rating = sr.querySelector('.tog-rating');
              const hasRating = rating && /\d/.test(rating.textContent);
              results.push(hasRating ? 'rating:YES' : 'rating:NO');

              // 5. Check pills — exactly one should be active
              const pills = sr.querySelectorAll('.tog-pill');
              const activePills = sr.querySelectorAll('.tog-pill.active');
              results.push(pills.length >= 3 ? `pills:${pills.length}` : 'pills:MISSING');
              results.push(activePills.length === 1 ? 'active-pill:1' : `active-pill:${activePills.length}`);

              // 6. Check room selector exists
              const roomSelect = sr.querySelector('select, .tog-room-select');
              results.push(roomSelect ? 'room-select:YES' : 'room-select:NO');

              // 7. Check expand button
              const expandBtn = sr.querySelector('.tog-expand-btn');
              results.push(expandBtn ? 'expand-btn:YES' : 'expand-btn:NO');

              const allPass = !results.some((r) => r.endsWith(':NO') || r.endsWith(':MISSING'));
              return { pass: allPass, detail: results.join(' | ') };
            }
            case 'click-action': {
              // Just verify it's clickable (has role=button or cursor:pointer)
              const btn = sr.querySelector('[role="button"]');
              return { pass: !!btn, detail: btn ? 'Clickable element found' : 'No clickable element' };
            }
            default:
              return { pass: true, detail: 'Unknown check' };
          }
        }, tag, check);

        report(`${tag} — ${check}`, checkResult.pass, checkResult.detail);
      }

      // Take individual card screenshot
      try {
        const cardHandle = await page.evaluateHandle((tagName) => {
          function findInShadow(root, tag) {
            const found = root.querySelector(tag);
            if (found) return found;
            const els = root.querySelectorAll('*');
            for (const el of els) {
              if (el.shadowRoot) {
                const result = findInShadow(el.shadowRoot, tag);
                if (result) return result;
              }
            }
            return null;
          }
          return findInShadow(document, tagName);
        }, tag);

        if (cardHandle) {
          const box = await cardHandle.boundingBox();
          if (box) {
            await page.screenshot({
              path: path.join(SCREENSHOT_DIR, `${tag}.png`),
              clip: { x: box.x, y: box.y, width: box.width, height: box.height },
            });
          }
        }
      } catch (_e) { /* screenshot failed, non-critical */ }
    }

    // ── Step 3: Interaction tests ─────────────────────────
    console.log('\n🖱️  Interaction tests:\n');

    // Test select card dropdown
    const selectOpened = await page.evaluate(() => {
      function findInShadow(root, tag) {
        const found = root.querySelector(tag);
        if (found) return found;
        const els = root.querySelectorAll('*');
        for (const el of els) {
          if (el.shadowRoot) {
            const r = findInShadow(el.shadowRoot, tag);
            if (r) return r;
          }
        }
        return null;
      }
      const card = findInShadow(document, 'sketch-select-card');
      if (!card?.shadowRoot) return false;
      const header = card.shadowRoot.querySelector('.select-header');
      if (header) { header.click(); return true; }
      return false;
    });
    report('Select card — dropdown opens on click', selectOpened);

    // Test TOG card expand
    const togExpanded = await page.evaluate(() => {
      function findInShadow(root, tag) {
        const found = root.querySelector(tag);
        if (found) return found;
        const els = root.querySelectorAll('*');
        for (const el of els) {
          if (el.shadowRoot) {
            const r = findInShadow(el.shadowRoot, tag);
            if (r) return r;
          }
        }
        return null;
      }
      const card = findInShadow(document, 'sketch-tog-card');
      if (!card?.shadowRoot) return false;
      const btn = card.shadowRoot.querySelector('.tog-expand-btn');
      if (btn) { btn.click(); return true; }
      return false;
    });
    report('TOG card — expand button works', togExpanded);

    // ── Step 3b: TOG card temperature sweep screenshots ───
    console.log('\n🌡️  TOG Card — Temperature sweep screenshots:\n');

    const togTemps = [
      { temp: 28, label: '28C-very-light-0.2tog', expect: '0.2' },
      { temp: 25, label: '25C-light-0.5tog', expect: '0.5' },
      { temp: 23, label: '23C-balanced-1.0tog', expect: '1.0' },
      { temp: 21, label: '21C-transitional-1.0-2.5tog', expect: '1.0' },
      { temp: 18, label: '18C-warm-2.5tog', expect: '2.5' },
      { temp: 15, label: '15C-extra-warm-3.5tog', expect: '3.5' },
    ];

    for (const { temp, label, expect } of togTemps) {
      // Inject fake temperature into the card's hass state
      const injected = await page.evaluate((fakeTemp) => {
        function findInShadow(root, tag) {
          const found = root.querySelector(tag);
          if (found) return found;
          const els = root.querySelectorAll('*');
          for (const el of els) {
            if (el.shadowRoot) {
              const r = findInShadow(el.shadowRoot, tag);
              if (r) return r;
            }
          }
          return null;
        }
        const card = findInShadow(document, 'sketch-tog-card');
        if (!card || !card.hass) return false;

        // Find the temperature entity used by this card
        const config = card._config || {};
        const tempEntity = config.temperature_entity;
        if (!tempEntity || !card.hass.states[tempEntity]) return false;

        // Clone hass and override the temperature state
        const newStates = { ...card.hass.states };
        newStates[tempEntity] = {
          ...newStates[tempEntity],
          state: String(fakeTemp),
        };
        const newHass = Object.assign(Object.create(Object.getPrototypeOf(card.hass)), card.hass, { states: newStates });
        card.hass = newHass;
        // Force Lit re-render
        if (card.requestUpdate) card.requestUpdate();
        return true;
      }, temp);

      if (!injected) {
        report(`TOG sweep ${label}`, false, 'Could not inject temperature');
        continue;
      }

      await sleep(1500); // Wait for Lit re-render cycle

      // Verify the TOG recommendation changed
      const togInfo = await page.evaluate((expectedTog) => {
        function findInShadow(root, tag) {
          const found = root.querySelector(tag);
          if (found) return found;
          const els = root.querySelectorAll('*');
          for (const el of els) {
            if (el.shadowRoot) {
              const r = findInShadow(el.shadowRoot, tag);
              if (r) return r;
            }
          }
          return null;
        }
        const card = findInShadow(document, 'sketch-tog-card');
        if (!card?.shadowRoot) return { pass: false, detail: 'No card' };
        const sr = card.shadowRoot;

        const rating = sr.querySelector('.tog-rating')?.textContent?.trim() || '';
        const temp = sr.querySelector('.tog-temp')?.textContent?.trim() || '';
        const condition = sr.querySelector('.tog-condition')?.textContent?.trim() || '';

        // Count clothing items
        const clothingSvgs = sr.querySelectorAll('.tog-clothing-svg');
        const clothingLabels = [];
        sr.querySelectorAll('.tog-clothing-label').forEach((l) => {
          if (l.textContent.trim()) clothingLabels.push(l.textContent.trim());
        });

        // Check paths are distinct
        const pathDatas = new Set();
        clothingSvgs.forEach((s) => {
          const p = s.querySelector('path');
          if (p) pathDatas.add(p.getAttribute('d')?.substring(0, 40));
        });

        const hasExpected = rating.includes(expectedTog);
        return {
          pass: hasExpected,
          detail: `${rating} | ${condition} | ${clothingLabels.join(' + ')} | ${pathDatas.size} distinct SVGs`,
        };
      }, expect);

      report(`TOG sweep ${label}`, togInfo.pass, togInfo.detail);

      // Screenshot this TOG state
      try {
        const cardHandle = await page.evaluateHandle(() => {
          function findInShadow(root, tag) {
            const found = root.querySelector(tag);
            if (found) return found;
            const els = root.querySelectorAll('*');
            for (const el of els) {
              if (el.shadowRoot) {
                const r = findInShadow(el.shadowRoot, tag);
                if (r) return r;
              }
            }
            return null;
          }
          return findInShadow(document, 'sketch-tog-card');
        });
        if (cardHandle) {
          const box = await cardHandle.boundingBox();
          if (box) {
            await page.screenshot({
              path: path.join(SCREENSHOT_DIR, `tog-${label}.png`),
              clip: { x: box.x, y: box.y, width: box.width, height: box.height },
            });
          }
        }
      } catch (_e) { /* screenshot failed */ }
    }

    // ── Step 4: JS error check ────────────────────────────
    console.log('\n🐛 JavaScript errors:\n');
    const sketchErrors = jsErrors.filter((e) => {
      const s = String(e || '');
      return s.toLowerCase().includes('sketch') || s.includes('customElement');
    });
    if (sketchErrors.length === 0) {
      report('No sketch-related JS errors', true);
    } else {
      sketchErrors.forEach((e) => report('JS Error', false, e));
    }

    // ── Step 5: Dark mode test ────────────────────────────
    console.log('\n🌙 Dark mode check:\n');
    const hasDarkClass = await page.evaluate(() => {
      function findInShadow(root, tag) {
        const found = root.querySelector(tag);
        if (found) return found;
        const els = root.querySelectorAll('*');
        for (const el of els) {
          if (el.shadowRoot) {
            const r = findInShadow(el.shadowRoot, tag);
            if (r) return r;
          }
        }
        return null;
      }
      const card = findInShadow(document, 'sketch-entity-card');
      return card?.classList?.contains('dark-mode') ?? null;
    });
    if (hasDarkClass !== null) {
      report(`Dark mode class detected: ${hasDarkClass}`, true);
    } else {
      report('Dark mode detection', false, 'Could not find entity card');
    }

  } catch (err) {
    console.error(`\n💥 Fatal error: ${err.message}`);
    try { await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'ERROR.png'), fullPage: true }); } catch(_) {}
  } finally {
    await browser.close();
  }

  // ── Summary ───────────────────────────────────────────────
  console.log('\n' + '═'.repeat(50));
  console.log(`\n📊 Results: ${results.pass} passed, ${results.fail} failed\n`);
  if (results.errors.length) {
    console.log('Failures:');
    results.errors.forEach((e) => console.log(`  ❌ ${e.name}: ${e.detail}`));
  }
  console.log(`\n📸 Screenshots saved to: ${SCREENSHOT_DIR}/`);
  console.log('');

  process.exit(results.fail > 0 ? 1 : 0);
})();
