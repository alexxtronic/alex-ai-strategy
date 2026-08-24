export type InsightSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type Insight = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  author: string;
  opening: string;
  sections: InsightSection[];
  closing: string;
};

// To publish another post, copy one object, give it a unique slug, and add the article content below.
// The Insights index, article route, sitemap, RSS feed, metadata, and structured data update automatically.
export const insights: Insight[] = [
  {
    slug: "where-enterprise-ai-value-actually-lives",
    title: "The AI opportunity is rarely where the demo is",
    description: "A practical way to find enterprise AI opportunities by examining workflow economics, operating friction, and the systems around the work.",
    category: "AI strategy",
    publishedAt: "2026-08-24",
    readingTime: "6 min read",
    author: "VITRUS",
    opening: "The most persuasive AI demo is not always where the economic value lives. A demo shows what a model can do in isolation. An enterprise opportunity depends on what changes when that capability meets a real workflow, real data, and real accountability.",
    sections: [
      {
        heading: "Start with operating friction",
        paragraphs: [
          "Strong AI opportunities often begin as ordinary business complaints. Reporting takes too long. Customer history is scattered across systems. Experts answer the same questions repeatedly. Teams cannot see why a metric changed until the moment has passed.",
          "These are not AI problems yet. They are operating problems with a measurable cost. The useful question is whether AI can change the economics, speed, quality, or reach of the workflow without introducing more risk than value.",
        ],
      },
      {
        heading: "Value appears in systems, not isolated tasks",
        paragraphs: [
          "Automating one task may save minutes. Redesigning the system around that task can change throughput, service quality, and decision speed. That is why opportunity assessment should look beyond a single prompt or assistant.",
          "A credible assessment connects four layers before recommending a build:",
        ],
        points: [
          "The volume and cost of the current work",
          "The information, tools, and decisions surrounding it",
          "The failure modes that require evidence or human review",
          "The operating change needed to realize economic value",
        ],
      },
      {
        heading: "Ask four questions before choosing a tool",
        paragraphs: [
          "First, what happens often enough to matter? Second, what would improve if the work became faster or more consistent? Third, what information does the system need, and can it access that information safely? Fourth, who owns the outcome when the system is in use?",
          "If those answers are weak, a polished prototype will not rescue the opportunity. If they are strong, the technology choice usually becomes clearer and easier to defend.",
        ],
      },
      {
        heading: "The first deliverable is a decision",
        paragraphs: [
          "The purpose of an AI strategy engagement is not to produce the longest list of use cases. It is to create conviction around the few opportunities worth pursuing, define what success means, and make the next investment inspectable.",
          "That decision should include a baseline, an owner, a value hypothesis, technical constraints, and a practical route into daily operation. Only then does a build become more than an experiment.",
        ],
      },
    ],
    closing: "The best enterprise AI opportunities are often unglamorous at first glance. Their advantage comes from being close to the work, economically meaningful, and designed to survive contact with the business.",
  },
  {
    slug: "ai-business-case-finance-can-trust",
    title: "How to build an AI business case that finance can trust",
    description: "A disciplined framework for separating capacity, cash savings, revenue upside, and implementation cost in an enterprise AI business case.",
    category: "Business case",
    publishedAt: "2026-08-24",
    readingTime: "7 min read",
    author: "VITRUS",
    opening: "AI business cases become unreliable when every saved hour is treated as cash. A stronger case separates the value created by the system from the value the company can realistically capture.",
    sections: [
      {
        heading: "Model the current workflow first",
        paragraphs: [
          "Begin with the work as it happens today. Identify the people involved, frequency, handling time, loaded cost, rework, delay, error rates, and any spend attached to the process. The baseline should be understandable without mentioning AI.",
          "This is more demanding than estimating a percentage improvement, but it creates a model that finance and operations can challenge together. It also exposes whether the opportunity is large enough to justify implementation.",
        ],
      },
      {
        heading: "Separate four kinds of value",
        paragraphs: [
          "Different forms of value behave differently in a financial model. Keeping them separate prevents a promising idea from becoming an inflated promise.",
        ],
        points: [
          "Hard savings are costs that will actually disappear",
          "Capacity created is time that can be redirected into more valuable work",
          "Revenue upside should be measured as contribution, not top-line revenue alone",
          "Avoided cost covers hiring, vendor spend, rework, errors, or delay that can credibly be prevented",
        ],
      },
      {
        heading: "Use a realization factor",
        paragraphs: [
          "A system may create ten hours of weekly capacity while the company captures only six. Adoption may take time. Some work remains necessary. Demand may not be available to absorb every recovered hour.",
          "A realization factor makes that uncertainty visible. It converts theoretical capacity into a more defensible estimate of economic value and gives the implementation team a target it can influence through workflow design and adoption.",
        ],
      },
      {
        heading: "Show the full cost of operation",
        paragraphs: [
          "Implementation is not the only cost. Include integration, data preparation, evaluation, monitoring, maintenance, model usage, change management, and internal ownership. A system that cannot be operated responsibly is not an asset, even if the prototype was inexpensive.",
          "The final model should show a base case, a conservative case, and the assumptions that change the result most. The purpose is not certainty. It is a decision that remains credible when conditions move.",
        ],
      },
    ],
    closing: "A good AI business case does not make the opportunity look as large as possible. It makes the logic clear enough that leadership can decide where to invest, what to measure, and when to stop.",
  },
  {
    slug: "from-ai-pilot-to-operating-system",
    title: "From AI pilot to operating system",
    description: "Four decisions that help enterprise AI move from a promising prototype into dependable daily operation.",
    category: "Implementation",
    publishedAt: "2026-08-24",
    readingTime: "6 min read",
    author: "VITRUS",
    opening: "Most AI pilots are designed to answer one question: can the technology perform the task? Operational systems must answer a harder set of questions about ownership, boundaries, evidence, and improvement.",
    sections: [
      {
        heading: "Decide who owns the outcome",
        paragraphs: [
          "A prototype can survive with an enthusiastic sponsor. A working system needs an operating owner who is accountable for performance, exceptions, adoption, and change. Technical ownership matters too, but it is not a substitute for business ownership.",
          "The owner should have authority over the workflow and a reason to improve it. Without that connection, the system becomes an additional tool rather than a better way of working.",
        ],
      },
      {
        heading: "Define boundaries before autonomy",
        paragraphs: [
          "Agentic systems become valuable when they can take action across tools. They also become risky when authority is vague. A production design should specify what the system may decide, what evidence it must retain, when a person reviews the output, and how an exception is escalated.",
          "These boundaries are not friction added after the build. They are part of the product. Clear boundaries let the system do more useful work because the organization understands where trust begins and ends.",
        ],
      },
      {
        heading: "Keep evidence close to the result",
        paragraphs: [
          "A generated answer is easier to trust when the source, transformation, and review status remain attached. The same principle applies to recommendations, classifications, and automated actions.",
          "Evidence improves more than governance. It shortens review time, makes errors easier to diagnose, and creates the feedback needed to improve prompts, retrieval, rules, and model selection.",
        ],
      },
      {
        heading: "Design the learning loop",
        paragraphs: [
          "The first release is a starting point. Real usage reveals new edge cases, better data, and places where the workflow should change. Decide in advance which signals will be reviewed, how often the system will be evaluated, and who can approve improvements.",
          "Measure operating outcomes alongside model quality. Adoption, cycle time, exception rate, review effort, and economic value usually matter more to leadership than a standalone accuracy score.",
        ],
      },
    ],
    closing: "The difference between an AI pilot and an operating system is not model sophistication. It is the discipline that connects capability to ownership, evidence, controlled action, and measurable improvement.",
  },
];

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}

export function formatInsightDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}
