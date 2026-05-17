// Nexus Capital Group — Executive Leadership Data

export interface Executive {
  id:       string;
  name:     string;
  title:    string;
  tenure:   string;
  initials: string;
  bio:      string;
  focus:    string[];
}

export const executives: Executive[] = [
  {
    id:       'ceo',
    name:     'Eleanor Ashworth',
    title:    'Chief Executive Officer',
    tenure:   '2011–Present',
    initials: 'EA',
    focus:    ['Global Strategy', 'Capital Allocation', 'Stakeholder Relations'],
    bio:
      'Eleanor Ashworth joined Nexus Capital Group in 2004 and was appointed Chief Executive Officer in 2011. Under her leadership, the firm has expanded to 47 offices across six continents and grown assets under advisory from $680 billion to $2.8 trillion. Prior to Nexus, she was a Managing Director at Goldman Sachs and served as an economic advisor to the G20. She holds an MBA from Harvard Business School and a BA in Economics from Oxford.',
  },
  {
    id:       'cio',
    name:     'Marcus Vane',
    title:    'Chief Investment Officer',
    tenure:   '2008–Present',
    initials: 'MV',
    focus:    ['Portfolio Construction', 'Alternative Assets', 'Risk-Adjusted Returns'],
    bio:
      'Marcus Vane leads Nexus Capital Group\'s global investment philosophy and portfolio construction frameworks. He joined in 2008 following a distinguished career at Bridgewater Associates and the Yale Endowment. Marcus pioneered the firm\'s Adaptive Allocation Model™ — a proprietary quantitative framework now governing over $1.4 trillion in advised portfolios. He holds a PhD in Financial Economics from the University of Chicago.',
  },
  {
    id:       'cso',
    name:     'Priya Nair',
    title:    'Chief Strategy Officer',
    tenure:   '2015–Present',
    initials: 'PN',
    focus:    ['Corporate Strategy', 'M&A', 'Emerging Markets'],
    bio:
      'Priya Nair leads enterprise strategy, acquisitions, and the firm\'s expansion into emerging and frontier markets. She joined Nexus from McKinsey & Company where she was a Senior Partner in the Financial Institutions Group. Priya has been instrumental in the firm\'s landmark expansions into Southeast Asia, the Middle East, and Sub-Saharan Africa. She holds dual degrees in International Law and Finance from the London School of Economics.',
  },
  {
    id:       'cfo',
    name:     'James Okafor',
    title:    'Chief Financial Officer',
    tenure:   '2013–Present',
    initials: 'JO',
    focus:    ['Financial Planning', 'Capital Structure', 'Regulatory Compliance'],
    bio:
      'James Okafor oversees the financial operations of all Nexus Capital Group entities across 47 jurisdictions. He joined in 2013 from BlackRock, where he served as Global Head of Finance. James has led four major debt restructurings, supervised two IPO advisory mandates, and built the firm\'s enterprise risk reporting infrastructure now recognized as an industry standard. He is a CPA and holds an MBA from Wharton.',
  },
  {
    id:       'cro',
    name:     'Sophia Laurent',
    title:    'Chief Risk Officer',
    tenure:   '2017–Present',
    initials: 'SL',
    focus:    ['Enterprise Risk', 'Regulatory Affairs', 'ESG Integration'],
    bio:
      'Sophia Laurent leads Nexus Capital Group\'s global risk management program, overseeing regulatory strategy across 23 regulatory jurisdictions. She joined from the Bank for International Settlements where she contributed to Basel IV framework development. Sophia introduced the firm\'s Integrated ESG Risk Model in 2019, now a reference architecture used by peer institutions. She is a Chartered Risk Analyst and graduate of Sciences Po Paris.',
  },
  {
    id:       'cdo',
    name:     'Kai Tanaka',
    title:    'Chief Digital Officer',
    tenure:   '2020–Present',
    initials: 'KT',
    focus:    ['Digital Transformation', 'AI & Analytics', 'Technology Infrastructure'],
    bio:
      'Kai Tanaka leads the digital transformation of Nexus Capital Group, overseeing AI-driven analytics, proprietary platform development, and global technology infrastructure. He joined from Microsoft\'s Azure Financial Services division and previously founded two fintech companies that achieved unicorn status. Kai has spearheaded the deployment of the firm\'s NexusAI decision-support engine, reducing advisory cycle times by 34% globally. He holds degrees in Computer Science and Finance from MIT.',
  },
];
