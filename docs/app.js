/**
 * OrgSets Community Hub & GitHub Pages SEO Site — Interactive Controller
 * Pure Vanilla JavaScript (0 Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHierarchySimulator();
  initFaqAccordion();
  initTelemetryClock();
  initCopyButtons();
});

/* --------------------------------------------------------------------------
   1. Mobile Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const headerNav = document.querySelector('.header-nav');

  if (!menuBtn || !headerNav) return;

  menuBtn.addEventListener('click', () => {
    headerNav.classList.toggle('menu-open');
    const isOpen = headerNav.classList.contains('menu-open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuBtn.innerHTML = isOpen ? '✕' : '☰';
  });

  // Close menu when clicking on nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      headerNav.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.innerHTML = '☰';
    });
  });
}

/* --------------------------------------------------------------------------
   2. Interactive Hierarchy Simulator
   -------------------------------------------------------------------------- */
const HIERARCHY_DATA = {
  council: {
    levelTag: 'Tier 1: Root Apex',
    nodeName: 'National Governing Council',
    nodeType: 'ROOT_ORGANIZATION',
    splitRatio: '10% National Reserve',
    memberCount: '12,450 Members',
    subNodeCount: '14 Districts / 180 Chapters',
    vaultAccess: 'Apex Vault (Constitution, Master Bylaws, Global Insurance Policy)',
    pulseAuthority: 'Global SMS Blast & Emergency Broadcast across all subordinate nodes',
    stripeEngine: 'Automated Tier 1 Split aggregator with Stripe Connect Custom accounts',
    rolesLocked: 'PRESIDENT, EXECUTIVE_DIRECTOR, TREASURER, COMPLIANCE_OFFICER',
    quote: 'Central leadership maintains sovereign compliance and ledger auditing without bottlenecking local chapter independence.'
  },
  district: {
    levelTag: 'Tier 2: Regional League',
    nodeName: 'Tri-State Regional District',
    nodeType: 'INTERMEDIATE_BRANCH',
    splitRatio: '25% Regional Allocation (10% upstream to Council)',
    memberCount: '1,850 Members',
    subNodeCount: '18 Chapters',
    vaultAccess: 'Regional Vault (District Charters, Facility Leases, Tournament Rules)',
    pulseAuthority: 'District-wide announcements & multi-chapter emergency alerts',
    stripeEngine: 'Automatic escrow holding for joint district meets and referee payouts',
    rolesLocked: 'DISTRICT_CHAIR, COMMISSIONER, REGIONAL_TREASURER',
    quote: 'Coordinates joint cross-node events, referee pools, and unified tournament calendars across 18 separate local chapters.'
  },
  chapter: {
    levelTag: 'Tier 3: Local Chapter / Troop',
    nodeName: 'Metro Chapter #104 / Local Unit',
    nodeType: 'OPERATIONAL_LEAF',
    splitRatio: '65% Net Local Operating Funds (Direct Deposit)',
    memberCount: '94 Members',
    subNodeCount: '4 Sub-Units / Squads',
    vaultAccess: 'Local Vault (Youth Medical Waivers, Parent Sign-offs, Photo Releases)',
    pulseAuthority: 'Instant unit reminders, rain delays, and meeting location pings',
    stripeEngine: 'Direct dues collection via Apple Pay, Google Pay, and Credit Card',
    rolesLocked: 'SCOUTMASTER, UNIT_LEADER, SECRETARY, VOLUNTEER_COACH',
    quote: 'Coaches and leaders handle rosters, daily checkoffs, and dues without touching cumbersome accounting spreadsheets.'
  }
};

function initHierarchySimulator() {
  const tabBtns = document.querySelectorAll('.sim-tab-btn');
  const treeItems = document.querySelectorAll('.tree-node-item');
  if (!tabBtns.length) return;

  function renderLevel(levelKey) {
    const data = HIERARCHY_DATA[levelKey];
    if (!data) return;

    // Update active tab buttons
    tabBtns.forEach(btn => {
      const active = btn.dataset.level === levelKey;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    // Update tree visual node highlight
    treeItems.forEach(item => {
      item.classList.toggle('selected', item.dataset.level === levelKey);
    });

    // Update Inspector DOM
    const tagEl = document.getElementById('sim-level-tag');
    const nameEl = document.getElementById('sim-node-name');
    const typeEl = document.getElementById('sim-node-type');
    const splitEl = document.getElementById('sim-split-ratio');
    const membersEl = document.getElementById('sim-members');
    const subnodesEl = document.getElementById('sim-subnodes');
    const vaultEl = document.getElementById('sim-vault');
    const pulseEl = document.getElementById('sim-pulse');
    const rolesEl = document.getElementById('sim-roles');
    const quoteEl = document.getElementById('sim-quote');

    if (tagEl) tagEl.textContent = data.levelTag;
    if (nameEl) nameEl.textContent = data.nodeName;
    if (typeEl) typeEl.textContent = data.nodeType;
    if (splitEl) splitEl.textContent = data.splitRatio;
    if (membersEl) membersEl.textContent = data.memberCount;
    if (subnodesEl) subnodesEl.textContent = data.subNodeCount;
    if (vaultEl) vaultEl.textContent = data.vaultAccess;
    if (pulseEl) pulseEl.textContent = data.pulseAuthority;
    if (rolesEl) rolesEl.textContent = data.rolesLocked;
    if (quoteEl) quoteEl.textContent = `"${data.quote}"`;
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      renderLevel(btn.dataset.level);
    });
  });

  treeItems.forEach(item => {
    item.addEventListener('click', () => {
      renderLevel(item.dataset.level);
    });
  });

  // Default to Chapter or Council
  renderLevel('council');
}

/* --------------------------------------------------------------------------
   3. FAQ Accordion Logic
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');

      // Optional: Close others or keep open
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          const indicator = otherItem.querySelector('.faq-indicator');
          if (indicator) indicator.textContent = '+';
        }
      });

      item.classList.toggle('active', !isCurrentlyActive);
      questionBtn.setAttribute('aria-expanded', !isCurrentlyActive ? 'true' : 'false');
      const indicator = item.querySelector('.faq-indicator');
      if (indicator) {
        indicator.textContent = !isCurrentlyActive ? '−' : '+';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   4. Live Telemetry Clock & Simulated Engine Pulse
   -------------------------------------------------------------------------- */
function initTelemetryClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  function updateClock() {
    const now = new Date();
    const utcString = now.toUTCString().replace('GMT', 'UTC');
    clockEl.textContent = utcString;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* --------------------------------------------------------------------------
   5. Copy to Clipboard Utility
   -------------------------------------------------------------------------- */
function initCopyButtons() {
  document.querySelectorAll('[data-copy-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.copyTarget;
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ COPIED!';
        btn.classList.add('badge-yellow');
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.classList.remove('badge-yellow');
        }, 2000);
      });
    });
  });
}
