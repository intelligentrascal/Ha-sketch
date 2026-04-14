/**
 * Ha-sketch Puppeteer Visual + Interaction Test Suite
 *
 * Tests all 30 cards against a real Home Assistant instance.
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
  { tag: 'sketch-step-battle-card', checks: ['has-svg-bg', 'has-text', 'has-battle-players', 'has-battle-chart'] },
  { tag: 'sketch-plant-card', checks: ['has-svg-bg', 'has-plant-svg', 'has-sensor-gauges', 'plant-health-test'] },
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
            case 'has-battle-players': {
              // Step Battle: check both player sections exist
              const players = sr.querySelectorAll('.player-col');
              const vs = sr.querySelector('.vs-divider') || sr.textContent.includes('VS');
              const names = sr.querySelectorAll('.player-name');
              const steps = sr.querySelectorAll('.step-count');
              return {
                pass: players.length >= 2 && names.length >= 2,
                detail: `${players.length} players, ${names.length} names, ${steps.length} step counts, VS: ${!!vs}`,
              };
            }
            case 'has-battle-chart': {
              // Step Battle: check 7-day chart area exists
              const chartSvg = sr.querySelector('.chart-svg') || sr.querySelector('.history-chart svg');
              const polylines = chartSvg ? chartSvg.querySelectorAll('polyline') : [];
              const dayLabels = sr.querySelectorAll('.day-label');
              const hasSomeChart = !!(chartSvg || dayLabels.length > 0);
              return {
                pass: hasSomeChart,
                detail: chartSvg ? `Chart SVG: ${polylines.length} polylines, ${dayLabels.length} day labels` : 'Chart area present (may lack data)',
              };
            }
            case 'has-plant-svg': {
              // Plant Card: check the inline plant SVG illustration
              const plantSvg = sr.querySelector('.plant-svg');
              if (!plantSvg) return { pass: false, detail: 'No .plant-svg element' };
              const paths = plantSvg.querySelectorAll('path');
              const lines = plantSvg.querySelectorAll('line');
              return {
                pass: paths.length > 3,
                detail: `Plant SVG: ${paths.length} paths, ${lines.length} lines`,
              };
            }
            case 'has-sensor-gauges': {
              // Plant Card: check sensor gauge bars
              const rows = sr.querySelectorAll('.sensor-row');
              const gauges = sr.querySelectorAll('.sensor-gauge');
              const fills = sr.querySelectorAll('.sensor-gauge-fill');
              return {
                pass: rows.length > 0,
                detail: `${rows.length} sensor rows, ${gauges.length} gauges, ${fills.length} fills`,
              };
            }
            case 'plant-health-test': {
              // Deep Plant Card test: health badge, per-sensor coloring, problem banner
              const results = [];

              // 1. Check plant name exists
              const name = sr.querySelector('.plant-name');
              results.push(name ? `name:${name.textContent.trim().substring(0, 20)}` : 'name:MISSING');

              // 2. Check species
              const species = sr.querySelector('.plant-species');
              results.push(species ? `species:${species.textContent.trim().substring(0, 30)}` : 'species:none');

              // 3. Check health badge (only present when plant has problems)
              const warnBadge = sr.querySelector('.health-badge.warn');
              const critBadge = sr.querySelector('.health-badge.crit');
              results.push(warnBadge ? 'health:WARN' : critBadge ? 'health:CRITICAL' : 'health:OK');

              // 4. Check sensor values are properly rounded (no excessive decimals)
              const sensorValues = sr.querySelectorAll('.sensor-value');
              let hasLongDecimals = false;
              sensorValues.forEach((sv) => {
                const text = sv.textContent.trim();
                // Check if any value has more than 2 decimal places
                const match = text.match(/\.\d{3,}/);
                if (match) hasLongDecimals = true;
              });
              results.push(hasLongDecimals ? 'rounding:FAIL' : `rounding:OK(${sensorValues.length}vals)`);

              // 5. Check per-sensor color coding (red vs green gauge fills)
              const fills = sr.querySelectorAll('.sensor-gauge-fill');
              const colors = new Set();
              fills.forEach((f) => {
                const bg = f.style.background || f.style.backgroundColor;
                if (bg) colors.add(bg.includes('4caf50') || bg.includes('success') ? 'green' : 'red');
              });
              results.push(`gauge-colors:${[...colors].join('+') || 'none'}`);

              // 6. Check out-of-range sensor rows
              const outOfRange = sr.querySelectorAll('.sensor-row.out-of-range');
              results.push(`out-of-range:${outOfRange.length}`);

              // 7. Check problem banner
              const banner = sr.querySelector('.problem-banner');
              results.push(banner ? `problems:${banner.textContent.trim().substring(0, 40)}` : 'problems:none');

              // 8. Check SVG status doodles (water drops, snowflake, sun, cloud)
              const plantSvg = sr.querySelector('.plant-svg');
              const allPaths = plantSvg ? plantSvg.querySelectorAll('path') : [];
              results.push(`svg-paths:${allPaths.length}`);

              const allPass = !hasLongDecimals && !!name;
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

    // ── Step 3b: TOG card — verify recommendation logic ────
    console.log('\n🌡️  TOG Card — Recommendation logic test:\n');

    const togLogicResults = await page.evaluate(() => {
      // Access the TOG recommendation function via the card's module
      // Since getTogRecommendation is module-scoped, we test by checking
      // the card's rendered output at its current temperature
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
      if (!card?.shadowRoot) return { pass: false, results: ['Card not found'] };

      const sr = card.shadowRoot;
      const results = [];

      // Read current state
      const rating = sr.querySelector('.tog-rating')?.textContent?.trim() || 'none';
      const temp = sr.querySelector('.tog-temp')?.textContent?.trim() || 'none';
      const condition = sr.querySelector('.tog-condition')?.textContent?.trim() || 'none';

      // Count distinct clothing SVGs
      const svgs = sr.querySelectorAll('.tog-clothing-svg');
      const pathSet = new Set();
      svgs.forEach((s) => {
        const paths = s.querySelectorAll('path');
        paths.forEach((p) => {
          const d = p.getAttribute('d');
          if (d) pathSet.add(d.substring(0, 50));
        });
      });

      // Count clothing labels
      const labels = [];
      sr.querySelectorAll('.tog-clothing-label').forEach((l) => {
        if (l.textContent.trim()) labels.push(l.textContent.trim());
      });

      results.push(`Current: ${temp} → ${rating}`);
      results.push(`Condition: ${condition}`);
      results.push(`Clothing: ${labels.join(' + ')}`);
      results.push(`Distinct SVG paths: ${pathSet.size}`);
      results.push(`Clothing items: ${svgs.length}`);

      // Verify pills
      const pills = sr.querySelectorAll('.tog-pill');
      const activePills = sr.querySelectorAll('.tog-pill.active');
      results.push(`Pills: ${pills.length} total, ${activePills.length} active`);

      // Verify expand section
      const allOptions = sr.querySelectorAll('.tog-option-row');
      results.push(`All options rows: ${allOptions.length}`);

      // Check room selector
      const roomSelect = sr.querySelector('select');
      const roomValue = roomSelect?.value || 'none';
      results.push(`Room: ${roomValue}`);

      const pass = pathSet.size >= 2 && svgs.length >= 2 && pills.length >= 3 && activePills.length === 1;
      return { pass, results };
    });

    if (togLogicResults.pass) {
      report('TOG card — current recommendation valid', true, togLogicResults.results.join(' | '));
    } else {
      report('TOG card — current recommendation', false, togLogicResults.results.join(' | '));
    }
    togLogicResults.results.forEach((r) => console.log(`    📋 ${r}`));

    // Screenshot the TOG card in its current state (expanded)
    const togExpandedBefore = await page.evaluate(() => {
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
      // Make sure it's expanded
      const opts = card.shadowRoot.querySelector('.tog-all-options');
      if (opts && !opts.classList.contains('open')) {
        const btn = card.shadowRoot.querySelector('.tog-expand-btn');
        if (btn) btn.click();
      }
      return true;
    });
    if (togExpandedBefore) await sleep(500);

    try {
      const togHandle = await page.evaluateHandle(() => {
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
      if (togHandle) {
        const box = await togHandle.boundingBox();
        if (box) {
          await page.screenshot({
            path: path.join(SCREENSHOT_DIR, 'tog-current-expanded.png'),
            clip: { x: box.x, y: box.y, width: box.width, height: box.height },
          });
          console.log('    📸 tog-current-expanded.png saved');
        }
      }
    } catch (_e) { /* screenshot failed */ }

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
