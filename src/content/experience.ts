export type ExperienceEntry = {
  title: string
  organization: string
  location?: string
  period: string
  summary: string
  bullets: string[]
  homeHighlights?: string[]
}

export type EducationEntry = {
  school: string
  degree: string
  period: string
  summary: string
  bullets: string[]
}

export const workExperience: ExperienceEntry[] = [
  {
    title: "Graduate Research Assistant",
    organization: "UIC NLP Lab",
    location: "Chicago, IL",
    period: "May 2025 – Present",
    summary:
      "Research spanning multilingual retrieval and sarcasm detection with a focus on experimentation, evaluation, and practical system design.",
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
    location: "Bangalore, India",
    period: "July 2019 – August 2023",
    summary:
      "Frontend and internal platform work centered on usability, maintainability, analytics quality, and business-facing product improvements.",
    bullets: [
      "Improved in-store application usability by 10% through optimized UI development for store associates.",
      "Revamped the Non-Product Content web application UI, increasing customer engagement by 20% and improving user experience.",
      "Improved code clarity and reusability by 50% while optimizing analytics tagging across the Lowe’s website; led migration from Adobe DTM to Adobe Launch within two months.",
      "Completed migration of CAAS data from Adobe Experience Manager to an in-house application in five months, improving internal data control and operational reliability.",
      "Streamlined web content management using an internal Content-as-a-Service application, accelerating delivery and improving operational efficiency.",
    ],
    homeHighlights: [
      "Worked on various frontend and internal platform projects, improving usability, maintainability, and analytics quality across the Lowe’s website.",
    ],
  },
  {
    title: "Intern",
    organization: "I.O.C.L.",
    location: "Haldia, India",
    period: "May 2018 – July 2018",
    summary:
      "Early systems-oriented work focused on network simulation and infrastructure modeling.",
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
    summary:
      "Specialized in Artificial Intelligence, Machine Learning, and Natural Language Processing.",
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