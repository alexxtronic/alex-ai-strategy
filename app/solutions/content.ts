export type Solution = {
  slug: string;
  shortTitle: string;
  menuText: string;
  hero: string;
  description: string;
  problemTitle: string;
  problem: string[];
  buildTitle: string;
  buildIntro: string;
  capabilities: string[];
  connectionsTitle: string;
  connections: string[];
  tools: string[];
  controlsTitle: string;
  controlsIntro: string;
  controls: string[];
  workflow: string[];
  value: string;
  proof?: {
    title: string;
    text: string;
    client: string;
  };
  ctaTitle: string;
  ctaText: string;
  visual: "grants" | "intelligence" | "listening" | "knowledge";
};

export const solutions: Solution[] = [
  {
    slug: "grant-reporting-automation",
    shortTitle: "Grant and reporting automation",
    menuText: "Build evidence-grounded proposals and reports.",
    hero: "Grant and reporting automation, grounded in your evidence.",
    description: "VITRUS connects funding data, institutional knowledge, and approved source material so teams can prepare proposals and reports with greater speed, consistency, and control.",
    problemTitle: "Funding work should not begin with a blank page or a search.",
    problem: [
      "Grant teams often spend more time finding information than shaping the case for support. Outcomes sit in one system, budgets in another, previous language in shared folders, and relationship history in the CRM.",
      "A generic AI writing tool does not solve that fragmentation. The real opportunity is to connect the right knowledge, then make it usable within a controlled workflow.",
    ],
    buildTitle: "A governed path from requirement to reviewed output.",
    buildIntro: "We build tailored systems that retrieve approved material, organize it around proposal or reporting requirements, and prepare a structured first version for human review.",
    capabilities: [
      "Find relevant outcomes, language, and supporting evidence",
      "Organize approved material around each requirement",
      "Identify missing information before a deadline",
      "Keep proposals, outcome reports, and relationship records connected",
    ],
    connectionsTitle: "Your systems already hold the ingredients.",
    connections: [
      "Your CRM remains the source of truth for funders, opportunities, deadlines, and relationship history. Document platforms hold previous proposals and approved language. Program and finance systems contain the evidence.",
      "AI retrieves, organizes, summarizes, and drafts. Workflow automation moves the work between owners, reviewers, and approval stages. Nothing needs to become another isolated tool.",
    ],
    tools: ["CRM", "Document systems", "Finance data", "AI retrieval", "Review workflow", "Reporting"],
    controlsTitle: "Every important claim stays reviewable.",
    controlsIntro: "The system supports specialist judgment and keeps approval with your team.",
    controls: ["Source citations", "Role-based access", "Human approval", "Facts separated from generated language"],
    workflow: ["Proposal or report request enters the workflow", "Approved evidence is gathered", "AI prepares a structured first version", "Specialists review and return approved work to the shared record"],
    value: "Reduce repetitive preparation, improve consistency, preserve institutional knowledge, and give specialists more time for funder strategy and relationship building.",
    proof: {
      title: "A repeatable grant workflow.",
      text: "For DFIN, we brought requirements, approved evidence, and prior applications into one structured drafting workflow, with human review before submission.",
      client: "DFIN",
    },
    ctaTitle: "Bring us one recurring funding or reporting workflow.",
    ctaText: "We will identify where AI and automation can return the most useful capacity.",
    visual: "grants",
  },
  {
    slug: "funder-partner-intelligence",
    shortTitle: "Fundraising and partner intelligence",
    menuText: "Turn scattered signals into clearer priorities.",
    hero: "Know who to approach, why now, and what matters to them.",
    description: "VITRUS turns scattered relationship data and external signals into practical intelligence for fundraising and partnership teams.",
    problemTitle: "The next opportunity is often hidden in existing information.",
    problem: [
      "Fundraising teams rarely lack data. They lack a clear view of it. Relationship history sits in the CRM, research lives in documents and browser tabs, and engagement signals sit in marketing platforms.",
      "The result is slow research, inconsistent prioritization, and valuable context arriving too late to shape the conversation.",
    ],
    buildTitle: "Intelligence your team can act on.",
    buildIntro: "We connect relevant signals in one reviewable view, helping teams prepare stronger conversations without replacing relationship judgment.",
    capabilities: [
      "Research funders and potential partners",
      "Summarize relationship and engagement history",
      "Match opportunities against clear criteria",
      "Prepare concise briefs, next steps, and relevant alerts",
    ],
    connectionsTitle: "CRM, MarTech, and AI each have a distinct role.",
    connections: [
      "The CRM holds the relationship record. Marketing platforms show engagement. Approved public and internal sources add context. AI organizes that information and prepares a concise briefing.",
      "Automation delivers the right information to the right person and records the resulting activity. Your team keeps ownership of the relationship and every next move.",
    ],
    tools: ["CRM", "Marketing automation", "Approved research", "AI analysis", "Alerts", "Relationship workflow"],
    controlsTitle: "Prioritization stays explainable.",
    controlsIntro: "Recommendations are useful only when the team can see why they were made.",
    controls: ["Visible sources", "Transparent criteria", "Data minimization", "Human review"],
    workflow: ["Define the partner profile", "Gather approved signals", "Summarize and prioritize with evidence visible", "Brief the owner and update the CRM"],
    value: "Accelerate research, prepare better conversations, make prioritization more consistent, and create a clearer view across the pipeline.",
    ctaTitle: "Start with one funder segment or partner campaign.",
    ctaText: "We will map the research burden, available signals, and most practical first system.",
    visual: "intelligence",
  },
  {
    slug: "listening-decision-dashboards",
    shortTitle: "Live listening and decision dashboards",
    menuText: "Turn public conversation into usable signals.",
    hero: "Turn a noisy public conversation into a usable signal.",
    description: "VITRUS connects live listening, campaign, and organizational data in dashboards built for decisions, not decoration.",
    problemTitle: "More data does not automatically create more clarity.",
    problem: [
      "Mission-driven organizations operate across news, social platforms, community conversations, partner networks, and public policy.",
      "Traditional reporting captures a snapshot. Teams gather screenshots, clean exports, and rebuild the same presentation while the conversation continues to move.",
    ],
    buildTitle: "From collection to decision.",
    buildIntro: "We build connected listening systems that preserve context, reveal meaningful change, and help teams decide what deserves attention.",
    capabilities: [
      "Connect live or scheduled data feeds",
      "Track topic, narrative, and audience movement",
      "Keep source-level evidence close",
      "Create decision views and route material alerts",
    ],
    connectionsTitle: "One operating view across the stack.",
    connections: [
      "Listening platforms and secure connectors gather the data. CRM and MarTech systems add campaign, audience, and relationship context. AI classifies themes, summarizes change, and surfaces unusual patterns.",
      "The dashboard brings those layers together. Workflow automation sends relevant alerts, assigns follow-up, and records the resulting decision.",
    ],
    tools: ["Listening platforms", "Secure connectors", "Campaign data", "CRM", "AI classification", "Decision dashboards"],
    controlsTitle: "Signals need context and scrutiny.",
    controlsIntro: "Important decisions should never depend on an unexplained score.",
    controls: ["Inspectable evidence", "Documented definitions", "Human review", "Privacy-conscious collection"],
    workflow: ["Connect approved sources", "Clean and organize signals", "Group themes and inspect evidence", "Route alerts and record decisions"],
    value: "Reduce manual reporting, create a shared evidence base, improve response speed, and make campaign learning easier to carry forward.",
    proof: {
      title: "Live social intelligence for Global Citizen.",
      text: "We connected listening sources through secure MCP integrations in one live sentiment dashboard, with supporting evidence available for human review.",
      client: "Global Citizen",
    },
    ctaTitle: "Bring us one conversation you cannot afford to misunderstand.",
    ctaText: "We will explore how live intelligence could support faster, better informed decisions.",
    visual: "listening",
  },
  {
    slug: "secure-knowledge-systems",
    shortTitle: "Secure organizational knowledge",
    menuText: "Make trusted knowledge easier to find and use.",
    hero: "Make trusted knowledge easier to find and safer to use.",
    description: "VITRUS builds permission-aware knowledge systems that help teams find reliable answers across policies, programs, operations, and organizational history.",
    problemTitle: "Critical knowledge should not depend on who is available.",
    problem: [
      "Established organizations accumulate valuable information across shared drives, intranets, CRM records, policy documents, project folders, and individual expertise.",
      "Teams repeat questions, recreate work, and rely on outdated documents. Generic AI can make the problem worse by returning confident answers without a trustworthy source.",
    ],
    buildTitle: "Trusted answers from approved sources.",
    buildIntro: "We make selected organizational knowledge usable within the right permissions, ownership, and controls.",
    capabilities: [
      "Search across approved organizational sources",
      "Answer questions with citations",
      "Respect existing access permissions",
      "Surface current material and route uncertainty to a specialist",
    ],
    connectionsTitle: "Existing platforms remain the source of truth.",
    connections: [
      "Document repositories, intranets, CRM platforms, and operational systems continue to hold the official record.",
      "Secure connectors make selected content available to an AI retrieval layer. Workflow automation handles review, escalation, feedback, and correction.",
    ],
    tools: ["Document repositories", "Intranets", "CRM", "AI retrieval", "Access controls", "Collaboration tools"],
    controlsTitle: "Trust is designed into the system.",
    controlsIntro: "A knowledge assistant should show where an answer came from and know when not to answer.",
    controls: ["Existing permissions", "Source citations", "Approved content boundaries", "Human escalation"],
    workflow: ["Catalogue approved sources and permissions", "Index selected knowledge", "Answer with supporting sources", "Escalate uncertainty and capture corrections"],
    value: "Reduce repeated searching, improve consistency, support faster onboarding, and protect valuable expertise from disappearing into folders or inboxes.",
    ctaTitle: "Start with one knowledge area your team relies on every week.",
    ctaText: "We will assess the sources, access requirements, and most useful first experience.",
    visual: "knowledge",
  },
];

export const solutionLinks = solutions.map(({ slug, shortTitle, menuText }) => ({ slug, shortTitle, menuText }));

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
