// Nexus Capital Group — Services Data

export interface Service {
  slug:        string;
  title:       string;
  shortTitle:  string;
  icon:        string;
  tagline:     string;
  description: string;
  outcomes:    string[];
  process:     { step: string; label: string; description: string }[];
  stats:       { value: string; label: string }[];
}

export const services: Service[] = [
  {
    slug:       'capital-advisory',
    title:      'Capital Markets Advisory',
    shortTitle: 'Capital Advisory',
    icon:       '◈',
    tagline:    'Navigate complexity with precision capital intelligence.',
    description:
      'Our Capital Markets Advisory practice provides boards and C-suites with independent, conflict-free guidance across equity, debt, and hybrid capital markets. From IPO positioning to sovereign debt restructuring, we bring three decades of transactional experience to the most consequential decisions your organization will face.',
    outcomes: [
      'Optimal capital structure design for current and future market conditions',
      'Independent fairness opinions with full regulatory defensibility',
      'Access to our network of 1,200+ institutional investors across 60 markets',
      'Post-transaction integration support and investor relations strategy',
    ],
    process: [
      { step: '01', label: 'Assessment',      description: 'Deep-dive analysis of your current capital structure, market position, and financing objectives.' },
      { step: '02', label: 'Strategy Design', description: 'Development of a tailored capital markets strategy aligned to your three-to-five year vision.' },
      { step: '03', label: 'Execution',       description: 'End-to-end transaction management, investor roadshow preparation, and book-building oversight.' },
      { step: '04', label: 'Optimization',    description: 'Post-transaction performance monitoring, covenant management, and ongoing market positioning.' },
    ],
    stats: [{ value: '$847B', label: 'Capital Raised' }, { value: '320+', label: 'Mandates Completed' }, { value: '98%', label: 'Client Retention' }],
  },
  {
    slug:       'strategic-transformation',
    title:      'Strategic Transformation',
    shortTitle: 'Strategic Transformation',
    icon:       '◉',
    tagline:    'Redefine your competitive position for the next decade.',
    description:
      'Our Strategic Transformation practice partners with executive leadership to design and execute comprehensive organizational reinvention — from portfolio rationalization and business model redesign to culture change and performance architecture. We do not produce reports that gather dust. We embed with your teams and drive measurable outcomes.',
    outcomes: [
      'Clear enterprise strategy with board-level alignment and measurable KPIs',
      'Organizational design calibrated to strategy, not legacy structure',
      'Operational excellence programs with average 22% cost efficiency improvement',
      'Cultural transformation frameworks with employee engagement measurement',
    ],
    process: [
      { step: '01', label: 'Diagnostic',     description: 'Rapid but rigorous assessment of strategic position, operational performance, and organizational health.' },
      { step: '02', label: 'Vision Design',  description: 'Co-creation of a compelling enterprise vision and strategic roadmap with leadership alignment.' },
      { step: '03', label: 'Transformation', description: 'Phased execution of transformation initiatives with embedded client teams and milestone governance.' },
      { step: '04', label: 'Sustain',        description: 'Capability building to sustain transformed performance long after our engagement concludes.' },
    ],
    stats: [{ value: '22%', label: 'Avg. Cost Efficiency Gain' }, { value: '180+', label: 'Transformations Led' }, { value: '4.2×', label: 'Avg. Value Created' }],
  },
  {
    slug:       'private-equity',
    title:      'Private Equity Solutions',
    shortTitle: 'Private Equity',
    icon:       '◆',
    tagline:    'From deal origination to value creation and exit.',
    description:
      'Nexus Capital Group\'s Private Equity Solutions practice serves GPs, LPs, and family offices across the full investment lifecycle. We provide origination support, due diligence leadership, portfolio value creation programs, and exit optimization — delivering the independent perspective that internal teams cannot.',
    outcomes: [
      'Proprietary deal flow from our network of 47 global origination offices',
      'Rigorous commercial, operational, and strategic due diligence',
      'Portfolio company value creation programs delivering 3×+ MOIC improvement',
      'Exit preparation and positioning to maximize competitive process outcomes',
    ],
    process: [
      { step: '01', label: 'Origination',      description: 'Access to our exclusive proprietary deal flow across 27 industry verticals and 60+ markets.' },
      { step: '02', label: 'Due Diligence',    description: 'Integrated commercial, operational, ESG, and management assessment with full regulatory review.' },
      { step: '03', label: 'Value Creation',   description: 'Execution of our Nexus Value Creation Framework across portfolio company operations.' },
      { step: '04', label: 'Exit Strategy',    description: 'Competitive process management, buyer preparation, and post-close value preservation.' },
    ],
    stats: [{ value: '$210B', label: 'PE Transactions Advised' }, { value: '3.8×', label: 'Avg. MOIC' }, { value: '140+', label: 'Portfolio Companies' }],
  },
  {
    slug:       'risk-management',
    title:      'Enterprise Risk Management',
    shortTitle: 'Risk Management',
    icon:       '◇',
    tagline:    'Quantify, govern, and transform risk into advantage.',
    description:
      'In an era of systemic uncertainty, risk management is no longer a compliance function — it is a source of competitive advantage. Our Enterprise Risk Management practice builds world-class risk frameworks, stress-testing capabilities, and governance architectures that convert risk intelligence into strategic insight.',
    outcomes: [
      'Integrated risk frameworks aligned to Basel IV, Solvency II, and IFRS 9',
      'Quantitative stress-testing models calibrated to your specific exposure profile',
      'Board-ready risk dashboards with real-time scenario monitoring',
      'Risk culture embedding programs with measurable behavioral outcomes',
    ],
    process: [
      { step: '01', label: 'Risk Inventory',    description: 'Comprehensive identification and categorization of enterprise risk across financial, operational, and strategic dimensions.' },
      { step: '02', label: 'Framework Design',  description: 'Architecture of your risk management framework, governance structure, and appetite statements.' },
      { step: '03', label: 'Quantification',    description: 'Model development for key risk types including market, credit, liquidity, operational, and climate risk.' },
      { step: '04', label: 'Embedding',         description: 'Integration of risk frameworks into business processes, decision-making, and performance management.' },
    ],
    stats: [{ value: '23', label: 'Regulatory Jurisdictions' }, { value: '95%', label: 'Regulatory Approval Rate' }, { value: '200+', label: 'Risk Programs Delivered' }],
  },
  {
    slug:       'digital-excellence',
    title:      'Digital Excellence',
    shortTitle: 'Digital Excellence',
    icon:       '◈',
    tagline:    'Build the digital core your ambitions demand.',
    description:
      'Digital transformation is not a technology project — it is a business reinvention. Our Digital Excellence practice combines deep industry knowledge with world-class technology capability to design and implement digital strategies that create measurable enterprise value, not just technology change.',
    outcomes: [
      'Enterprise digital strategy with clear ROI accountability and governance',
      'AI and analytics programs generating actionable intelligence at scale',
      'Technology architecture modernization with zero-disruption migration paths',
      'Digital talent and culture programs accelerating organizational capability',
    ],
    process: [
      { step: '01', label: 'Digital Audit',    description: 'Honest assessment of your digital maturity, technical debt, and organizational capability gaps.' },
      { step: '02', label: 'Strategy',         description: 'Development of a prioritized digital roadmap with clear business case and sequencing rationale.' },
      { step: '03', label: 'Build & Deploy',   description: 'Agile implementation of prioritized initiatives with embedded technology and change management expertise.' },
      { step: '04', label: 'Scale',            description: 'Capability transfer, platform scaling, and ongoing optimization to sustain digital advantage.' },
    ],
    stats: [{ value: '34%', label: 'Avg. Cycle Time Reduction' }, { value: '$2.1B', label: 'Digital Value Created' }, { value: '160+', label: 'Digital Programs' }],
  },
  {
    slug:       'global-expansion',
    title:      'Global Market Expansion',
    shortTitle: 'Global Expansion',
    icon:       '◉',
    tagline:    'Enter new markets with intelligence, speed, and certainty.',
    description:
      'Nexus Capital Group\'s Global Market Expansion practice has guided over 200 organizations through the complexity of international growth. With operating presence in 47 markets, we bring boots-on-the-ground intelligence, local regulatory expertise, and proven market entry playbooks that compress your path to profitable operations.',
    outcomes: [
      'Market entry strategies grounded in proprietary local intelligence, not desk research',
      'Regulatory navigation and licensing support across 47 jurisdictions',
      'Local partner identification, vetting, and relationship management',
      'Post-entry performance acceleration and governance framework design',
    ],
    process: [
      { step: '01', label: 'Market Intelligence', description: 'Proprietary market sizing, competitive dynamics, regulatory landscape, and cultural readiness assessment.' },
      { step: '02', label: 'Entry Strategy',      description: 'Design of the optimal market entry mode — from organic build to M&A, JV, or licensing.' },
      { step: '03', label: 'Execution',           description: 'On-the-ground execution support including entity establishment, hiring, and partner activation.' },
      { step: '04', label: 'Scale',               description: 'Performance management, local capability building, and regional expansion sequencing.' },
    ],
    stats: [{ value: '47', label: 'Markets Covered' }, { value: '200+', label: 'Market Entries Led' }, { value: '18 Mo', label: 'Avg. Time to Profitability' }],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}
