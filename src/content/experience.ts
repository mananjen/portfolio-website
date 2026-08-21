export type ExperienceEntry = {
  title: string
  organization: string
  jobLocation?: string
  period: string
  summary: string
  technologies: string[]
  bullets: string[]
  homeHighlights?: string[]
}

export type EducationEntry = {
  school: string
  degree: string
  period: string
  summary: string
  technologies: string[]
  bullets: string[]
  homeLabel?: string
}

export const workExperience: ExperienceEntry[] = [
  {
    title: "ML Engineer",
    organization: "Velocitor Solutions",
    jobLocation: "Hyderabad, Telangana",
    period: "July 2026 – Present",
    summary:
      "Ramping up on a real-time data lakehouse built on streamed vehicle-fleet telemetry, while building a LangChain-based AI agent over its data.",
    technologies: [
      "Python",
      "LangChain",
      "Apache Spark",
      "Apache Iceberg",
      "Kafka",
      "Kubernetes",
      "AIOps",
    ],
    bullets: [
      "Ramping up on a production Spark and Apache Iceberg lakehouse (bronze/silver/gold medallion architecture) built on real-time vehicle-fleet telemetry streamed through Kafka, running on Kubernetes.",
      "Building a LangChain-based AI agent to query and surface insights from the platform's processed fleet data.",
      "Gaining hands-on exposure to an AI-driven incident-triage pipeline that pairs a Kubernetes operator with LLM-based root-cause analysis for on-call alerting.",
    ],
    homeHighlights: [
      "Ramping up on a Spark/Iceberg lakehouse built on streamed vehicle-fleet telemetry, while building a LangChain-based AI agent over that data.",
    ],
  },
  {
    title: "Graduate Research Assistant",
    organization: "UIC NLP Lab",
    jobLocation: "Chicago, IL",
    period: "May 2025 – July 2026",
    summary:
      "Research spanning multilingual retrieval and sarcasm detection with a focus on experimentation, evaluation, and practical system design.",
    technologies: [
      "Python",
      "PyTorch",
      "Transformers",
      "Multilingual NLP",
      "Cross-Modal Retrieval",
      "Experimentation",
    ],
    bullets: [
      "Built a training-free / non-parametric multilingual image-text retrieval pipeline using pretrained unimodal vision and multilingual text encoders with an external anchor set.",
      "Reached usable multilingual retrieval performance around 30% R@1 without end-to-end multimodal training; manuscript in preparation for ACL Rolling Review.",
      "Led Hinglish sarcasm detection work by building an end-to-end pipeline, running ablations and error analysis, and contributing to an ACL Rolling Review submission.",
    ],
    homeHighlights: [
      "Led research, implementation and evaluation of solutions for diverse multilingual and code-mixed NLP tasks, on both classical NLP and deep learning based approaches.",
    ],
  },
  {
    title: "Software Engineer",
    organization: "Lowe’s India",
    jobLocation: "Bangalore, India",
    period: "July 2019 – August 2023",
    summary:
      "Frontend and internal platform work centered on usability, maintainability, analytics quality, and business-facing product improvements.",
    technologies: [
      "Frontend Development",
      "UI/UX",
      "Analytics Tagging",
      "Adobe Launch",
      "Content Platforms",
      "Web Applications",
    ],
    bullets: [
      "Improved in-store application usability by 10% through optimized UI development for store associates.",
      "Revamped the Non-Product Content web application UI, increasing customer engagement by 20% and improving user experience.",
      "Improved code clarity and reusability by 50% while optimizing analytics tagging across the Lowe’s website; led migration from Adobe DTM to Adobe Launch within two months.",
      "Completed migration of CAAS data from Adobe Experience Manager to an in-house application in five months, improving internal data control and operational reliability.",
      "Streamlined web content management using an internal Content-as-a-Service application, accelerating delivery and improving operational efficiency.",
    ],
  },
  {
    title: "Intern",
    organization: "I.O.C.L.",
    jobLocation: "Haldia, India",
    period: "May 2018 – July 2018",
    summary:
      "Early systems-oriented work focused on network simulation and infrastructure modeling.",
    technologies: [
      "Network Simulation",
      "CPT",
    ],
    bullets: [
      "Trained in simulating complex networks using CPT.",
      "Modeled large-scale network infrastructures as part of network management training.",
    ],
  },
]

export const education: EducationEntry[] = [
  {
    school: "University of Illinois Chicago",
    degree: "Master of Science in Computer Science",
    period: "Aug 2023 – May 2025",
    homeLabel: "MS CS at UIC",
    summary:
      "Specialized in Artificial Intelligence, Machine Learning, and Natural Language Processing.",
    technologies: [
      "Artificial Intelligence",
      "Machine Learning",
      "NLP",
      "Deep Learning",
      "C#",
      "Unity",
    ],
    bullets: [
      "Developed multiple projects applying advanced NLP and deep learning techniques.",
      "Also studied VR development and C# with Unity.",
    ],
  },
  {
    school: "National Institute of Technology, Kurukshetra",
    degree: "Bachelor of Technology in Computer Engineering",
    period: "Aug 2015 – May 2019",
    summary:
      "Built a strong foundation in software engineering and core computer science.",
    technologies: [
      "Algorithms",
      "C++",
      "Java",
      "Data Structures",
      "Databases",
      "Operating Systems",
      "Web Development",
      "Computer Engineering",
    ],
    bullets: [
      "Core coursework included software development, algorithms, data structures, and database systems.",
      "Completed hands-on projects involving IoT, web development, and early NLP techniques.",
    ],
  },
]

export const homeExperienceHighlights = workExperience
  .filter((item) => item.homeHighlights && item.homeHighlights.length > 0)
  .map((item) => ({
    title: item.title,
    org: item.organization,
    period: item.period,
    description: item.summary,
    highlights: item.homeHighlights!,
  }))