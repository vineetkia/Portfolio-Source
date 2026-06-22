// Single source of truth for all portfolio content.
// Compiled from Vineet Kumar's resume (Aug 2025) and SJSU project repositories.

export const profile = {
  name: "Vineet Kumar",
  initials: "VK",
  role: "Software Engineer",
  tagline: "Software engineer building distributed systems, AI-powered platforms, and the occasional trading bot.",
  intro:
    "I'm a software engineer with 3+ years of experience shipping production systems in financial technology. I'm currently pursuing my Master's in Computer Software Engineering at San Jose State University in the Bay Area, and interning at Microsoft.",
  location: "San Francisco Bay Area, CA",
  photo: "/vineet-kumar.jpeg",
  email: "vineetkia@gmail.com",
  phone: "+1 408 581 4026",
  linkedin: "https://www.linkedin.com/in/-vineet/",
  github: "https://github.com/vineetkia",
  resumeUrl: "/Vineet_Kumar_Resume.pdf",
};

export const about = {
  paragraphs: [
    "I spent three and a half years at ION Trading building trade-processing systems for global financial institutions — working across C#, Java, and C++, integrating Kafka and ActiveMQ for real-time data exchange, and automating infrastructure that cut multi-week processes down to minutes.",
    "Now I'm at San Jose State University earning my Master's in Computer Software Engineering, where I've built everything from a self-healing microservice mesh with AI-driven root-cause analysis to a clinical decision-support engine with auditable diagnoses. I care about clean architecture, distributed systems, and using AI where it genuinely earns its place.",
    "Outside coursework, I'm interning at Microsoft, mentoring engineers, and shipping side projects ranging from SaaS platforms to crypto trading bots.",
  ],
  stats: [
    { value: "3+", label: "Years in tech" },
    { value: "10+", label: "Projects shipped" },
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
    location: "San Francisco Bay Area, CA",
    period: "2026 — Present",
    current: true,
    summary:
      "Building software as an engineering intern while completing my Master's in the Bay Area.",
    highlights: [
      "Contributing to engineering work alongside my graduate studies at San Jose State University.",
    ],
    tags: ["Software Engineering", "Cloud"],
  },
  {
    role: "Software Development Engineer",
    company: "ION Trading",
    location: "Pune, India",
    period: "Jan 2022 — Aug 2025",
    summary:
      "Built and maintained trade-processing systems for major financial institutions across C#, Java, and C++.",
    highlights: [
      "Built a C# desktop interface to streamline import/export of market index, correlation, and volatility data in XML — cutting setup time from 1 week to 10 minutes between UAT and Production.",
      "Engineered a trade-processing framework with Apache Camel and Java, integrating Kafka and ActiveMQ for ExxonMobil to enable real-time trade data exchange and reduce latency.",
      "Enhanced a commodity trading module using Java Native Interface and C++ to automate bulk trade scheduling — cutting UAT time from 4 weeks to 30 minutes.",
      "Automated .NET Framework upgrades with PowerShell across 120+ modules, slashing upgrade time from 2 months to 1 week.",
      "Achieved a consistent 95% CI pass rate through rigorous code reviews, SonarQube, and SOLID-principles sessions for the team and new hires.",
      "Authored technical documentation that reduced new-hire onboarding time by 60%.",
    ],
    tags: ["C#", "Java", "C++", "Apache Camel", "Kafka", "ActiveMQ", "PowerShell", "SonarQube"],
  },
  {
    role: "Microsoft Learn Student Ambassador",
    company: "Microsoft",
    location: "Vellore, India",
    period: "Jan 2020 — Aug 2021",
    summary:
      "Led hands-on cloud and full-stack workshops as a Beta-ranked Student Ambassador.",
    highlights: [
      "Facilitated hands-on workshops for 150 students, achieving 100% completion of a full-stack deployment project using Node.js, Docker, and Nginx.",
      "Conducted Azure sessions for 200+ participants on cloud computing, spot VMs, and Apache HTTP servers.",
    ],
    tags: ["Azure", "Node.js", "Docker", "Nginx"],
  },
];

export type Project = {
  name: string;
  blurb: string;
  description: string;
  tags: string[];
  context: string;
  highlights: string[];
  featured: boolean;
  category: "AI / ML" | "Distributed Systems" | "Full-Stack" | "Systems" | "Fintech";
  github?: string;
};

export const projects: Project[] = [
  {
    name: "Hyrd",
    blurb: "A premium career platform — the entire job search in one editorial workspace.",
    description:
      "An AI-powered job-search workspace combining résumé optimization (recruiter-grade rewrites with per-change approval and ATS scoring), a kanban application tracker, AI voice mock interviews, and post-interview performance analytics scoring six dimensions.",
    tags: ["Next.js 15", "TypeScript", "PostgreSQL", "Azure OpenAI", "Cartesia", "Docker", "Framer Motion"],
    context: "CMPE 280 · Final Project · Team of 5",
    highlights: [
      "Résumé optimizer with diff annotations, per-change approval, and live ATS scoring.",
      "2-minute AI voice mock interview with real-time audio analysis (Web Audio API).",
      "Performance dashboard scoring clarity, confidence, relevance, structure, depth, and pace.",
    ],
    featured: true,
    category: "AI / ML",
  },
  {
    name: "Mesh Control",
    blurb: "A self-healing microservice mesh with AI-driven root-cause analysis.",
    description:
      "A gRPC service mesh that observes itself, identifies the deepest failing dependency in its call graph, and applies bounded remediation autonomously — an LLM drives reasoning while a deterministic rule engine guarantees safety. Detects failures in under 5 seconds and recovers in under 10.",
    tags: ["Python", "FastAPI", "gRPC", "React", "OpenTelemetry", "Prometheus", "Docker", "etcd", "NATS"],
    context: "CMPE 273 · Enterprise Distributed Systems · Final Project",
    highlights: [
      "16-container mesh with failure detection via 2-of-3 statistical consensus.",
      "Dependency-graph root-cause algorithm distinguishing symptom from cause.",
      "Azure GPT-5.3 reasoning with a deterministic rule-engine fallback and 12s cooldown.",
    ],
    featured: true,
    category: "Distributed Systems",
  },
  {
    name: "Medical Diagnostic Assistant",
    blurb: "Record-based clinical decision support where every prediction is auditable.",
    description:
      "A clinical decision-support pipeline that ranks likely diseases from a patient's symptom set and shows the evidence behind each ranking — the FP-Growth association rule that fired plus biomedical passages retrieved from MedQuAD. Built so every prediction is explainable, not a black box.",
    tags: ["Next.js", "FastAPI", "FAISS", "Pinecone", "Azure OpenAI", "FP-Growth", "RAG"],
    context: "CMPE 255 · Data Mining · Final Project",
    highlights: [
      "Hybrid retrieval over 24,063 MedQuAD passages and 23,839 association rules.",
      "Cross-encoder reranking with FAISS (local) or Pinecone (serverless) vector stores.",
      "Per-diagnosis explanation cards with evidence highlights and a live confidence slider.",
    ],
    featured: true,
    category: "AI / ML",
  },
  {
    name: "Campus Marketplace",
    blurb: "A full-stack marketplace for SJSU students to buy and sell essentials.",
    description:
      "A modular, microservice-based marketplace where students buy and sell textbooks, electronics, and gadgets — featuring AI-powered product search, real-time chat, role-based auth, and image storage, deployed on auto-scaling AWS infrastructure.",
    tags: ["Java", "Spring", "React", "PostgreSQL", "Redis", "Docker", "AWS", "Nginx"],
    context: "CMPE 202 · Group Project · Team Lead",
    highlights: [
      "Owned authentication/authorization backend with 40+ unit tests.",
      "Designed AWS architecture: EC2 auto-scaling, Application Load Balancer, and S3 storage.",
      "Built an AI product-search microservice and led DevOps/Docker integration across services.",
    ],
    featured: true,
    category: "Full-Stack",
  },
  {
    name: "TradeHub",
    blurb: "A real-time, scalable stock and crypto trading platform.",
    description:
      "A professional-grade web trading application providing live stock and cryptocurrency market data, portfolio management, P&L analytics, and secure authentication — powered by Python microservices for price streaming, news, and reporting.",
    tags: ["React", "Vite", "Express", "PostgreSQL", "Drizzle", "WebSocket", "FastAPI", "JWT/2FA"],
    context: "CMPE 272 · Enterprise Software Platforms",
    highlights: [
      "Real-time price streaming over WebSocket with 1–10s update intervals.",
      "JWT auth with optional TOTP-based two-factor authentication.",
      "Python/FastAPI microservices for price stream, news feed, and P&L reporting.",
    ],
    featured: true,
    category: "Fintech",
  },
  {
    name: "Distributed Fire Query System",
    blurb: "A graduate distributed-systems study on 1.17M wildfire air-quality records.",
    description:
      "A three-part distributed-systems project processing California wildfire air-quality data: from parallel-processing performance analysis to a multi-process gRPC query engine with leader election and fault tolerance.",
    tags: ["C++", "Python", "gRPC", "OpenMP", "POSIX Shared Memory", "Bully Algorithm"],
    context: "CMPE 275 · Enterprise Application Development · Mini 1–3",
    highlights: [
      "Parallel query engine achieving 2.77× speedup with OpenMP over single-threaded.",
      "6-process, 3-tier hierarchical query system with gRPC streaming and C++/Python interop.",
      "Overlay network with Bully leader election, health checks, and work redistribution.",
    ],
    featured: false,
    category: "Distributed Systems",
  },
  {
    name: "Log Analyzer",
    blurb: "A Java CLI that classifies and aggregates heterogeneous log streams.",
    description:
      "A command-line application that parses intermingled APM metrics, application events, and HTTP request logs from a single file and generates type-specific JSON analytics — built on the Chain of Responsibility and Strategy patterns for runtime extensibility.",
    tags: ["Java 17", "Maven", "Design Patterns", "JUnit"],
    context: "CMPE 202 · Individual Project",
    highlights: [
      "Chain of Responsibility for runtime log classification; Strategy for swappable aggregation.",
      "Computes statistics, percentiles, and status-code categorization per log type.",
      "40 unit tests with graceful handling of corrupted and malformed entries.",
    ],
    featured: false,
    category: "Systems",
  },
  {
    name: "StudyPilot",
    blurb: "An academic co-pilot unifying tasks, calendar, and AI study help.",
    description:
      "A student productivity hub bringing tasks, assignments, a color-coded calendar, and an Azure OpenAI study assistant into one responsive, accessible dashboard with full light/dark theming.",
    tags: ["Next.js", "TypeScript", "Material UI", "Azure OpenAI", "Vercel"],
    context: "CMPE 280 · Hackathon Project",
    highlights: [
      "Full CRUD task management with priorities, categories, search, and filters.",
      "Custom monthly calendar with color-coded events and an assignment tracker.",
      "WCAG AA accessibility with semantic HTML, ARIA labels, and keyboard navigation.",
    ],
    featured: false,
    category: "Full-Stack",
  },
  {
    name: "SaaS Accelerator Platform",
    blurb: "A founder-built SaaS platform for selling subscription digital products.",
    description:
      "A SaaS platform enabling entrepreneurs to sell digital products on recurring monthly, quarterly, and yearly subscriptions, with integrated payments via Razorpay and Stripe.",
    tags: ["React", "Next.js", "Prisma", "PostgreSQL", "Tailwind", "Stripe", "Razorpay"],
    context: "Personal · Founder",
    highlights: [
      "Recurring subscription billing across multiple intervals.",
      "Dual payment-gateway integration with Stripe and Razorpay SDKs.",
    ],
    featured: false,
    category: "Full-Stack",
  },
  {
    name: "Binance Crypto Trade Bot",
    blurb: "A multi-threaded crypto trading bot managing 12 client accounts.",
    description:
      "A multi-threaded cryptocurrency trading bot built on the Binance API, enabling seamless management of long and short positions and P&L adjustments across 12 client accounts in the futures market.",
    tags: ["Python", "Binance API", "Multithreading", "Futures Trading"],
    context: "Personal Project",
    highlights: [
      "Concurrent management of long/short positions across 12 accounts.",
      "Automated P&L adjustments in the futures market.",
    ],
    featured: false,
    category: "Fintech",
  },
];

export type SkillGroup = { title: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    title: "Languages",
    items: ["C++", "C#", "Java", "Python", "TypeScript", "JavaScript", "SQL", "Bash", "PowerShell"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["React", "Next.js", "Node.js", "Spring", "Apache Camel", "FastAPI", "Tailwind CSS"],
  },
  {
    title: "Messaging & Data",
    items: ["Apache Kafka", "RabbitMQ", "ActiveMQ", "PostgreSQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    title: "Cloud & Infrastructure",
    items: ["AWS", "Azure", "Docker", "Linux", "Microservices", "Distributed Systems", "Nginx"],
  },
  {
    title: "AI & Data",
    items: ["Azure OpenAI", "RAG", "FAISS", "Pinecone", "gRPC", "OpenTelemetry"],
  },
  {
    title: "Practices",
    items: ["OOP", "SOLID Principles", "Agile", "Test-Driven Development", "Design Patterns", "TOGAF"],
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
    period: "Aug 2025 — Present",
  },
  {
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering — Information Security",
    school: "Vellore Institute of Technology",
    location: "Vellore, India",
    period: "Jul 2018 — Jun 2022",
    detail: "GPA 3.87",
  },
];

export const accomplishments: string[] = [
  "Awarded Beta-rank Microsoft Learn Student Ambassador by Microsoft.",
  "2nd Place — Code Run Seek, IEEE IAS & IEEE WIE International Techno Carnival, VIT.",
];

export const certifications: string[] = [
  "Google Cloud Fundamentals: Core Infrastructure",
  "Fundamentals of Parallelism on Intel Architecture",
  "Cybersecurity and the Internet of Things",
  "Microsoft Learn Student Ambassador",
];

export const mentorship: string[] = [
  "Mentored new hires at ION Group on OOP, SOLID principles, debugging, and coding practices.",
  "Authored a DSA repository (Code To Express) benefiting 250+ students at VIT.",
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];
