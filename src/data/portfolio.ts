// Single source of truth for all portfolio content.
// Compiled from Vineet Kumar's resume (Aug 2025) and SJSU project repositories.

export const profile = {
  name: "Vineet Kumar",
  initials: "VK",
  role: "AI Software Engineer",
  tagline: "AI software engineer building agentic, AI-native platforms on top of resilient distributed systems.",
  intro:
    "I'm a software engineer with 4+ years of experience shipping production systems in financial technology. I'm currently pursuing my Master's in Computer Software Engineering at San Jose State University in the Bay Area, after a 2026 software-engineering internship at Microsoft.",
  location: "San Francisco Bay Area, CA",
  photo: "/vineet-portrait.jpg",
  email: "vineetkia@gmail.com",
  phone: "+1 408 581 4026",
  linkedin: "https://www.linkedin.com/in/-vineet/",
  github: "https://github.com/vineetkia",
  resumeUrl: "/Vineet_Kumar_Resume.pdf",
};

export const about = {
  paragraphs: [
    "Last summer I interned at Microsoft on the platform behind Sentinel's data lake, building a workload-placement engine for about 7 million pipeline jobs. The part I'm proudest of wasn't code: I questioned an assumption the team had designed around, checked it against 7 million job runs over 30 days, and found it was wrong.",
    "Before that, three and a half years at ION Trading writing trade systems in C#, Java, and C++. Real users, real money, real 2am pages. It taught me that boring and well-tested beats clever.",
    "Now I'm finishing a Master's at San Jose State, graduating May 2027, and co-founding TrueStar on the side. I'd rather work on something hard with people who know more than me than be the most confident person in the room.",
  ],
  stats: [
    { value: "4+", label: "Years in tech" },
    { value: "14+", label: "Projects shipped" },
    { value: "120+", label: "Modules automated" },
    { value: "3.87", label: "Undergrad GPA" },
  ],
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "Microsoft",
    location: "Redmond, Washington · On-site",
    period: "May 2026 to Aug 2026",
    summary:
      "Software engineering intern on the Microsoft Security IQ team (formerly the Sentinel Platform), building the large-scale data-ingestion platform that powers Microsoft Sentinel's data lake.",
    highlights: [
      "Designed and delivered an end-to-end intelligent workload-placement engine in C# and .NET that routes about 7 million shared-tenant pipeline jobs onto right-sized Kubernetes compute, consolidating the fleet from D16 onto D8 SKU nodes to save $150,000 per month across 4 regions, about $1.8 million yearly on projection.",
      "Architected a two-step, config-driven placement algorithm with a network-boundary (VNet) match guard that structurally prevents mis-routing across isolated networks, shipped behind feature flags for zero-downtime, reversible rollout.",
      "Led a data-driven design correction by analyzing 7 million job runs over 30 days in Kusto (ADX) on Azure Data Lake, then hardened it with 22 integration tests and a classifier suite.",
    ],
    tags: ["C#", ".NET", "Kubernetes", "Kusto (ADX)", "Azure Data Lake", "Distributed Systems", "Feature Flags"],
  },
  {
    role: "Software Development Engineer",
    company: "ION Trading",
    location: "Pune, India",
    period: "Jan 2022 to Aug 2025",
    summary:
      "Built and maintained trade-processing systems for major financial institutions across C#, Java, and C++.",
    highlights: [
      "Built a C# desktop interface to streamline import/export of market index, correlation, and volatility data in XML, cutting setup time from 1 week to 10 minutes between UAT and Production.",
      "Engineered a trade-processing framework with Apache Camel and Java, integrating Kafka and ActiveMQ for ExxonMobil to enable real-time trade data exchange and reduce latency.",
      "Enhanced a commodity trading module using Java Native Interface and C++ to automate bulk trade scheduling, cutting UAT time from 4 weeks to 30 minutes.",
      "Automated .NET Framework upgrades with PowerShell across 120+ modules, slashing upgrade time from 2 months to 1 week.",
      "Achieved a consistent 95% CI pass rate through rigorous code reviews, SonarQube, and SOLID-principles sessions for the team and new hires.",
      "Authored technical documentation that reduced new-hire onboarding time by 60%.",
    ],
    tags: ["C#", "Java", "C++", "Apache Camel", "Kafka", "ActiveMQ", "PowerShell", "SonarQube"],
  },
];

// Volunteering and mentorship, kept out of `experience` (paid roles) and
// rendered as a second timeline under Education.
export type Involvement = {
  period: string;
  role: string;
  org: string;
  detail: string;
};

export const involvement: Involvement[] = [
  {
    period: "Jan 2020 to Aug 2021",
    role: "Microsoft Learn Student Ambassador",
    org: "Microsoft · Beta rank",
    detail:
      "Ran hands-on workshops for 150 students, every attendee shipping a full-stack deployment on Node.js, Docker, and Nginx, plus Azure sessions for 200+ participants.",
  },
  {
    period: "2019 to 2022",
    role: "Author, Code To Express",
    org: "Vellore Institute of Technology",
    detail:
      "Wrote and maintained an open data-structures and algorithms repository used by 250+ students.",
  },
];

export type AsciiScene =
  | "waveform"
  | "vectorsearch"
  | "servers"
  | "mapreduce"
  | "stack"
  | "calendar"
  | "chart";

export type AccentName =
  | "emerald"
  | "cyan"
  | "sky"
  | "indigo"
  | "violet"
  | "amber";

export type Project = {
  name: string;
  blurb: string;
  description: string;
  tags: string[];
  context: string;
  highlights: string[];
  featured: boolean;
  category: "AI / ML" | "Distributed Systems" | "Full-Stack" | "Systems" | "Fintech";
  accent: AccentName;
  link?: string;
  ascii: AsciiScene;
};

// Projects are ordered by most in-demand skills:
// AI/ML, then distributed systems, full-stack, fintech, systems.

export const projects: Project[] = [
  {
    name: "Hyrd: Voice-AI Career Platform",
    blurb:
      "An agentic AI career platform: résumé optimization, a real-time voice interview agent, and post-interview performance analytics.",
    description:
      "An AI-powered job-search workspace combining LLM résumé optimization (recruiter-grade rewrites with per-change approval and ATS scoring), a real-time voice mock-interview agent, and post-interview performance analytics scoring six dimensions.",
    tags: ["LLM", "Voice AI", "Real-time STT/TTS", "Prompt Engineering", "Inference", "Azure OpenAI", "Next.js 15"],
    context: "CMPE 280 · Final Project · Team of 5",
    highlights: [
      "LLM résumé optimizer with diff annotations, per-change approval, and live ATS scoring.",
      "Real-time AI voice mock interview (sub-second speech to text, LLM, then speech back) with audio analysis.",
      "Performance dashboard scoring clarity, confidence, relevance, structure, depth, and pace.",
    ],
    featured: true,
    category: "AI / ML",
    accent: "emerald",
    link: "https://github.com/vineetkia/Hyrd-AI-Career-Platform",
    ascii: "waveform",
  },
  {
    name: "Self-Healing AI Ops Mesh",
    blurb: "An LLM-driven self-healing service mesh with autonomous, AI root-cause remediation.",
    description:
      "A gRPC service mesh that observes itself, identifies the deepest failing dependency in its call graph, and applies bounded remediation autonomously. An LLM drives the reasoning while a deterministic rule engine guarantees safety. Detects failures in under 5 seconds and recovers in under 10.",
    tags: ["LLM Agents", "AI Root-Cause", "Inference", "gRPC", "FastAPI", "OpenTelemetry", "Docker"],
    context: "CMPE 273 · Enterprise Distributed Systems · Final Project",
    highlights: [
      "18-microservice mesh with failure detection via 2-of-3 statistical consensus.",
      "Dependency-graph root-cause algorithm distinguishing symptom from cause.",
      "LLM reasoning (Azure GPT) with a deterministic rule-engine fallback and 12s cooldown.",
    ],
    featured: true,
    category: "Distributed Systems",
    accent: "sky",
    link: "https://github.com/vineetkia/Self-Healing-AI-Microservice-Mesh",
    ascii: "servers",
  },
  {
    name: "Clinical RAG Diagnostic Engine",
    blurb: "A retrieval-augmented (RAG) clinical engine that ranks diagnoses with auditable, cited evidence.",
    description:
      "A clinical decision-support pipeline that ranks likely diseases from a patient's symptom set and shows the evidence behind each ranking: the FP-Growth association rule that fired, plus biomedical passages retrieved from MedQuAD via dense vector search. Built so every prediction is explainable, not a black box.",
    tags: ["RAG", "Vector Search", "Embeddings", "Cross-Encoder Rerank", "FAISS", "Pinecone", "Azure OpenAI"],
    context: "CMPE 255 · Data Mining · Final Project",
    highlights: [
      "Hybrid retrieval over 24,063 MedQuAD passages and 23,839 association rules.",
      "Cross-encoder reranking with FAISS (local) or Pinecone (serverless) vector stores.",
      "Per-diagnosis explanation cards with evidence highlights and a live confidence slider.",
    ],
    featured: true,
    category: "AI / ML",
    accent: "cyan",
    link: "https://github.com/vineetkia/Symptom-Based-Disease-Identification-AI-Inference",
    ascii: "vectorsearch",
  },
  {
    name: "AI Assisted Marketplace",
    blurb: "A full-stack, AI-assisted marketplace for buying and selling student essentials.",
    description:
      "A modular, microservice-based marketplace where students buy and sell textbooks, electronics, and gadgets, with AI-powered product search, real-time chat, role-based auth, and image storage, deployed on auto-scaling AWS infrastructure.",
    tags: ["Java", "Spring", "React", "PostgreSQL", "Redis", "Docker", "AWS", "Nginx"],
    context: "CMPE 202 · Group Project · Team Lead",
    highlights: [
      "Owned authentication/authorization backend with 40+ unit tests.",
      "Designed AWS architecture: EC2 auto-scaling, Application Load Balancer, and S3 storage.",
      "Built an AI product-search microservice and led DevOps/Docker integration across services.",
    ],
    featured: true,
    category: "Full-Stack",
    accent: "violet",
    link: "https://github.com/vineetkia/AI-Campus-Marketplace",
    ascii: "stack",
  },
  {
    name: "TradeHub",
    blurb: "A real-time, scalable stock and crypto trading platform.",
    description:
      "A professional-grade web trading application providing live stock and cryptocurrency market data, portfolio management, P&L analytics, and secure authentication, powered by Python microservices for price streaming, news, and reporting.",
    tags: ["React", "Vite", "Express", "PostgreSQL", "Drizzle", "WebSocket", "FastAPI", "JWT/2FA"],
    context: "CMPE 272 · Enterprise Software Platforms",
    highlights: [
      "Real-time price streaming over WebSocket with 1 to 10s update intervals.",
      "JWT auth with optional TOTP-based two-factor authentication.",
      "Python/FastAPI microservices for price stream, news feed, and P&L reporting.",
    ],
    featured: true,
    category: "Fintech",
    accent: "amber",
    link: "https://github.com/vineetkia/TradeHub",
    ascii: "chart",
  },
  {
    name: "Distributed Fire Query System",
    blurb: "A graduate distributed-systems study on 1.17M wildfire air-quality records.",
    description:
      "A three-part distributed-systems project processing California wildfire air-quality data: from parallel-processing performance analysis to a multi-process gRPC query engine with leader election and fault tolerance.",
    tags: ["C++", "Python", "gRPC", "OpenMP", "POSIX Shared Memory", "Bully Algorithm"],
    context: "CMPE 275 · Enterprise Application Development · Mini 1 to 3",
    highlights: [
      "Parallel query engine achieving 2.77× speedup with OpenMP over single-threaded.",
      "6-process, 3-tier hierarchical query system with gRPC streaming and C++/Python interop.",
      "Overlay network with Bully leader election, health checks, and work redistribution.",
    ],
    featured: true,
    category: "Distributed Systems",
    accent: "indigo",
    link: "https://github.com/vineetkia/Distributed-Fire-Query-System",
    ascii: "mapreduce",
  },
];

export const startup = {
  name: "TrueStar",
  role: "Co-Founder & Engineer",
  tagline: "An AI-native expert research platform.",
  description:
    "TrueStar runs two research tracks in parallel and merges them into one cited report. Primary research is live, AI-moderated expert interviews: a voice agent named Aria interviews vetted human experts over LiveKit, paying them per interview via Stripe Connect. Secondary research is TARS: four specialized AI agents that independently research the open web, debate their findings, cross-check claims, and produce a synthesis with a hallucination audit and grounding score.",
  highlights: [
    {
      title: "Aria, the real-time voice interviewer",
      body: "Sub-second voice agent over LiveKit WebRTC (Deepgram STT · Azure OpenAI · Fish Audio TTS) conducting 10-minute expert interviews.",
    },
    {
      title: "TARS, multi-agent fact verification",
      body: "Four adversarial agents (Data Scientist, Investigative Journalist, Domain Expert, Devil's Advocate) debate, reflect, and synthesize an auditable verdict with cited sources.",
    },
    {
      title: "RAG document intelligence",
      body: "Namespace-scoped retrieval over expert documents, embedded into Pinecone with Cohere Rerank 3.5.",
    },
    {
      title: "Production microservices",
      body: "Four services on a shared Docker network: React 19 SPA + Express API, FastAPI RAG, FastAPI multi-agent orchestrator, and the voice worker.",
    },
  ],
  tags: [
    "React 19",
    "Express",
    "PostgreSQL 17",
    "Redis",
    "Azure OpenAI",
    "Pinecone",
    "Cohere Rerank",
    "Tavily",
    "LiveKit",
    "Deepgram",
    "Stripe Connect",
    "Docker",
  ],
  link: "https://truestar.tech",
};

export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    title: "Languages",
    items: ["Java", "C#", "C++", "Python", "TypeScript", "SQL", "Bash"],
  },
  {
    title: "AI & Retrieval",
    items: [
      "LLMs",
      "RAG",
      "AI agents",
      "Prompt engineering",
      "Embeddings",
      "Vector search",
      "Azure OpenAI",
      "Pinecone",
      "FAISS",
    ],
  },
  {
    title: "Backend & Distributed",
    items: [
      "Microservices",
      "gRPC",
      "REST APIs",
      "Spring Boot",
      "FastAPI",
      "Node.js",
      "Apache Kafka",
      "ActiveMQ",
      "Apache Camel",
      "Fault tolerance",
    ],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "GSAP", "Three.js"],
  },
  {
    title: "Data & Storage",
    items: ["PostgreSQL", "Redis", "MongoDB", "MySQL", "Prisma", "Drizzle"],
  },
  {
    title: "Cloud & Delivery",
    items: [
      "AWS",
      "Azure",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Linux",
      "Nginx",
      "OpenTelemetry",
    ],
  },
  {
    title: "Practices",
    items: [
      "OOP",
      "SOLID",
      "Design patterns",
      "Test-driven development",
      "Code review",
      "Agile",
    ],
  },
];

export type Education = {
  degree: string;
  field: string;
  school: string;
  location: string;
  period: string;
  detail?: string;
};

export const education: Education[] = [
  {
    degree: "Master of Science",
    field: "Computer Software Engineering",
    school: "San Jose State University",
    location: "San Jose, California",
    period: "Aug 2025 to May 2027",
  },
  {
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering (Information Security)",
    school: "Vellore Institute of Technology",
    location: "Vellore, India",
    period: "Jul 2018 to Jun 2022",
    detail: "GPA 3.87",
  },
];

export const accomplishments: string[] = [
  "Awarded Beta-rank Microsoft Learn Student Ambassador by Microsoft.",
  "2nd Place, Code Run Seek, IEEE IAS and IEEE WIE International Techno Carnival, VIT.",
];

export const certifications: string[] = [
  "Google Cloud Fundamentals: Core Infrastructure",
  "Fundamentals of Parallelism on Intel Architecture",
  "Cybersecurity and the Internet of Things",
  "Microsoft Learn Student Ambassador",
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];
