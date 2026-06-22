# Vineet Kumar — Project & Profile Catalog

> Source-of-truth reference compiled from the Aug 2025 résumé and the SJSU project
> repositories (`/Users/vineetkia/SJSU/Projects`). The website renders this content
> from `src/data/portfolio.ts`. Update both when details change.

**Contact:** vineetkia@gmail.com · +1 408 581 4026 ·
[LinkedIn](https://www.linkedin.com/in/-vineet/) · [GitHub](https://github.com/vineetkia)

---

## Academic Projects (San Jose State University — MS, 2025–present)

### 1. Hyrd — Premium Career Platform · CMPE 280 (Final, Team of 5)
The entire job search in one editorial workspace: AI résumé optimization (recruiter-grade
rewrites with per-change approval + ATS scoring), a kanban application tracker, AI **voice**
mock interviews, and a post-interview performance dashboard scoring six dimensions
(clarity, confidence, relevance, structure, technical depth, pace).
**Stack:** Next.js 15, TypeScript, PostgreSQL 16, Azure OpenAI (GPT-5), Cartesia Sonic-2 (TTS),
Docker, Framer Motion.

### 2. Mesh Control — Self-Healing Microservice Mesh · CMPE 273 (Final)
A gRPC service mesh with AI-driven root-cause analysis and autonomous remediation. Detects
failures in <5s via 2-of-3 statistical consensus, walks the dependency graph to find the
deepest failing dependency, and applies bounded remediation in <10s. An LLM (Azure GPT-5.3)
drives reasoning while a deterministic rule engine guarantees safety. 16 Docker containers.
**Stack:** Python 3.11, FastAPI, gRPC, React 18, Vite, OpenTelemetry, Jaeger, Prometheus,
NATS, etcd, Docker Compose.
**My role:** Docker orchestration, gRPC proto contracts, resilience primitives
(retry/timeout/circuit-breaker), root-cause algorithm, dashboard + dependency-graph viz.

### 3. Record-Based Medical Diagnostic Assistant · CMPE 255 (Final)
A clinical decision-support pipeline: given a patient's symptoms, it ranks likely diseases and
shows the evidence behind each ranking — the FP-Growth association rule that fired plus
biomedical passages retrieved from MedQuAD. Designed so every prediction is auditable.
**Stack:** Next.js 14, TypeScript, Tailwind, FastAPI (Python 3.11), FAISS / Pinecone vector
stores, Azure OpenAI embeddings + GPT, cross-encoder rerank. 24,063 passages, 23,839 rules.

### 4. Campus Marketplace · CMPE 202 (Group, Team Lead)
A full-stack, microservice marketplace for SJSU students to buy/sell textbooks, electronics,
and essentials — with AI product search, real-time chat, role-based auth, and S3 image storage,
deployed on auto-scaling AWS.
**Stack:** Java/Spring, React, PostgreSQL, Redis, Docker, Nginx, AWS (EC2 auto-scaling, ALB, S3), JWT.
**My role:** Team lead; auth/authz backend (40+ tests), AI search microservice, AWS architecture
& deployment, Docker/DevOps integration.

### 5. TradeHub — Real-time Trading Platform · CMPE 272
A professional web trading app with live stock & crypto market data, portfolio management,
P&L analytics, and secure auth, powered by Python microservices.
**Stack:** React 18, Vite, Tailwind, Radix UI, Express, PostgreSQL, Drizzle ORM, JWT + TOTP 2FA,
WebSocket, Python/FastAPI microservices (price stream, news feed, P&L report).

### 6. Distributed Fire Query System · CMPE 275 (Mini 1–3)
A three-part distributed-systems study on California wildfire air-quality data (1.17M records):
- **Mini-1:** Parallel-processing performance analysis (OpenMP vs pthreads) — 2.77× speedup.
- **Mini-2:** Multi-process distributed query system — 6 processes in a 3-tier hierarchy, gRPC
  server-streaming, C++/Python interop, POSIX shared memory, chunked streaming.
- **Mini-3:** Overlay-network query system with Bully leader election, health checks, and
  fault-tolerant work redistribution with exponential backoff.
**Stack:** C++, Python, gRPC, OpenMP, POSIX shared memory.

### 7. Log Analyzer · CMPE 202 (Individual)
A Java CLI that classifies and aggregates intermingled APM metrics, application events, and HTTP
request logs from a single file into type-specific JSON analytics. Built on Chain of
Responsibility + Strategy patterns; 40 unit tests.
**Stack:** Java 17, Maven, JUnit.

### 8. StudyPilot — Academic Co-Pilot · CMPE 280 (Hackathon)
A unified student productivity hub: dashboard, todo CRUD, color-coded calendar, assignment
tracker, and an Azure OpenAI study assistant, with full dark mode and WCAG AA accessibility.
**Stack:** Next.js 14, TypeScript, Material UI v6, react-hook-form + zod, Azure OpenAI, Vercel.

---

## Personal Projects

### 9. SaaS Accelerator Platform (Founder)
A SaaS platform letting entrepreneurs sell digital products on recurring monthly/quarterly/yearly
subscriptions, with Razorpay + Stripe payments.
**Stack:** React, Next.js, Prisma, PostgreSQL, Tailwind, Razorpay, Stripe SDK.

### 10. Binance Crypto Trade Bot
A multi-threaded crypto trading bot on the Binance API managing long/short positions and P&L
across 12 client accounts in the futures market.
**Stack:** Python, Binance API, multithreading.

---

## Experience

- **Software Engineer Intern — Microsoft** · Bay Area · 2026–Present *(current; confirm title/dates)*
- **Software Development Engineer — ION Trading** · Pune, India · Jan 2022 – Aug 2025
  - C# desktop interface for market data (XML); setup 1 week → 10 min.
  - Apache Camel + Java trade framework; Kafka + ActiveMQ for ExxonMobil real-time trade data.
  - JNI + C++ commodity module; UAT 4 weeks → 30 min.
  - PowerShell automation of .NET upgrades across 120+ modules; 2 months → 1 week.
  - 95% CI pass rate via code reviews, SonarQube, SOLID sessions; docs cut onboarding 60%.
- **Microsoft Learn Student Ambassador — Microsoft** · Vellore, India · Jan 2020 – Aug 2021
  - Workshops for 150 students (Node.js, Docker, Nginx); Azure sessions for 200+ participants.

## Education
- **M.S. Computer Software Engineering** — San Jose State University · Aug 2025–Present
- **B.Tech Computer Science (Information Security)** — Vellore Institute of Technology · 2018–2022 · GPA 3.87

## Skills
- **Languages:** C++, C#, Java, Python, TypeScript, JavaScript, SQL, Bash, PowerShell
- **Frameworks:** React, Next.js, Node.js, Spring, Apache Camel, FastAPI, Tailwind
- **Messaging/Data:** Kafka, RabbitMQ, ActiveMQ, PostgreSQL, MongoDB, Redis, Prisma
- **Cloud/Infra:** AWS, Azure, Docker, Linux, Microservices, Distributed Systems, Nginx
- **AI/Data:** Azure OpenAI, RAG, FAISS, Pinecone, gRPC, OpenTelemetry
- **Practices:** OOP, SOLID, Agile, TDD, Design Patterns, TOGAF

## Accomplishments
- Beta-rank Microsoft Learn Student Ambassador.
- 2nd Place — Code Run Seek (IEEE IAS & WIE), International Techno Carnival, VIT.

## Certifications
Google Cloud: Core Infrastructure · Intel Parallelism Fundamentals · Cybersecurity & IoT · MLSA.
