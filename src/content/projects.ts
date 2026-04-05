export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  title: string
  slug: string
  tagline: string
  summary: string
  impact: string
  technologies: string[]
  githubUrl?: string | null
  imageUrl?: string | null
  projectWebsiteUrl?: string | null
  documentUrl?: string | null
  featured: boolean
  category: "AI Research" | "NLP" | "Computer Vision" | "Web" | "VR" | "IoT" | "ML"
  timeframe: string
}

export const projects: Project[] = [
  {
    title: "Multilingual Image–Text Retrieval Without End-to-End Training",
    slug: "multilingual-image-text-retrieval",
    tagline: "Compute-efficient multilingual cross-modal retrieval",
    summary:
      "A non-parametric multilingual image-text retrieval system built around pretrained vision and multilingual text encoders, designed to avoid expensive end-to-end multimodal training.",
    impact:
      "One of the strongest portfolio pieces because it combines multimodal reasoning, multilingual retrieval, experimental rigor, and practical system design under compute constraints.",
    technologies: [
      "Python",
      "Non-Parametric Models",
      "Vision Encoders",
      "Text Encoders",
      "Cross-Modal Retrieval",
    ],
    githubUrl: null,
    imageUrl:
      "https://res.cloudinary.com/dry8udott/image/upload/v1772150883/0b30ad1afeba9bca_gmpfok.jpg",
    projectWebsiteUrl: null,
    documentUrl: null,
    featured: true,
    category: "AI Research",
    timeframe: "2025 – 2026",
  },
  {
    title: "Hindi-English Code-mixed Sarcasm Detection",
    slug: "hinglish-sarcasm-detection",
    tagline: "Multilingual NLP for nuanced sarcasm detection",
    summary:
      "An advanced deep learning project focused on sarcasm detection in Hindi-English code-mixed text, including experimentation and dataset-oriented research support.",
    impact:
      "Strong evidence of practical multilingual NLP work, with a problem that is genuinely difficult because of code-switching, informal language, and cultural context.",
    technologies: ["Python", "LLMs", "PyTorch", "Transformers"],
    githubUrl: "https://github.com/mananjen/cs521",
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    featured: true,
    category: "NLP",
    timeframe: "2025",
  },
  {
    title: "Riot and Amazon Hackathon",
    slug: "riot-amazon-hackathon",
    tagline: "RAG system over esports data with Bedrock",
    summary:
      "A Retrieval-Augmented Generation project built on Riot Valorant esports data using Amazon Bedrock, turning a massive raw dataset into an interactive player-insight web experience.",
    impact:
      "A very strong portfolio project because it shows applied LLM usage, large-scale data reduction, product thinking, and a demo-oriented build under hackathon constraints.",
    technologies: [
      "Python",
      "LLMs",
      "Amazon Bedrock",
      "RAG",
      "Data Mining",
      "Web Development",
    ],
    githubUrl: "https://github.com/mananjen/esportsManagerChallenge",
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl:
      "https://docs.google.com/document/d/1Co91tglEuGu7PZ4MbUGruvGPjnvD-0ULLwVkD-RrQwE/edit?usp=sharing",
    featured: true,
    category: "AI Research",
    timeframe: "2024",
  },
  {
    title: "Real or AI-Generated?",
    slug: "real-or-ai-generated",
    tagline: "Image forensics through shadow and lighting analysis",
    summary:
      "A computer vision project for distinguishing real and AI-generated images using foreground-background shadow consistency and a custom-built comparison dataset.",
    impact:
      "A strong computer vision case study that adds depth beyond NLP and shows original thinking in image forensics.",
    technologies: ["Python", "Computer Vision", "PyTorch", "Image Forensics"],
    githubUrl: "https://github.com/mananjen/512_course_project",
    imageUrl:
      "https://res.cloudinary.com/dry8udott/image/upload/v1742488669/apple_ovzmmo.jpg",
    projectWebsiteUrl: null,
    documentUrl: null,
    featured: false,
    category: "Computer Vision",
    timeframe: "2024",
  },
  {
    title: "Star Explorer",
    slug: "star-explorer",
    tagline: "Immersive astronomy exploration in VR",
    summary:
      "A Unity-based VR experience for the CAVE2 environment that visualizes millions of stars and allows interactive exploration of large astronomical datasets.",
    impact:
      "Adds visual range to the portfolio and shows comfort with immersive systems, data visualization, and interaction design.",
    technologies: ["C#", "Unity", "CAVE2", "VR", "Python", "Data Mining"],
    githubUrl: "https://github.com/mananjen/VRUnitySpring2024",
    imageUrl:
      "https://res.cloudinary.com/dry8udott/image/upload/v1742413188/VR_matfhl.jpg",
    projectWebsiteUrl: "https://sites.google.com/uic.edu/vrprojectspring2024/home",
    documentUrl: null,
    featured: false,
    category: "VR",
    timeframe: "2024",
  },
  {
    title: "Video Enhancement",
    slug: "video-enhancement",
    tagline: "Restoring legacy personal video archives",
    summary:
      "A practical computer vision pipeline using super-resolution, denoising, and frame interpolation methods to restore older personal videos.",
    impact:
      "Shows applied CV engineering with a real-world restoration use case instead of only benchmark-style experimentation.",
    technologies: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "ffmpeg",
      "RealESRGAN",
      "SwinIR",
      "OpenCV",
      "Denoising",
      "Frame Interpolation",
    ],
    githubUrl: "https://github.com/mananjen/oldMemories",
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    featured: false,
    category: "Computer Vision",
    timeframe: "2025",
  },
  {
    title: "Twitter Data Sentiment Analysis",
    slug: "twitter-data-sentiment-analysis",
    tagline: "BERT-based sentiment classification on election discourse",
    summary:
      "A sentiment classification project using a fine-tuned BERT-based model to analyze Twitter discourse from the 2012 Obama-Romney election.",
    impact:
      "Useful supporting NLP project because it shows transformer-based classification and social-media-specific preprocessing work.",
    technologies: ["Python", "BERT", "PyTorch", "scikit-learn", "TF-IDF", "Google Cloud"],
    githubUrl: "https://github.com/mananjen/CS583",
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    featured: false,
    category: "NLP",
    timeframe: "2024",
  },
  {
    title: "Sentiment Analyzing Chatbot",
    slug: "sentiment-analyzing-chatbot",
    tagline: "Conversational NLP with sentiment classification",
    summary:
      "An interactive chatbot using sentiment analysis, Markov modeling, TF-IDF, dependency parsing, and multiple classical ML approaches.",
    impact:
      "Adds breadth by showing earlier conversational NLP work built from a more traditional ML stack.",
    technologies: [
      "Python",
      "scikit-learn",
      "NLTK",
      "Markov Models",
      "TF-IDF",
      "Dependency Parsing",
      "Logistic Regression",
      "Naive Bayes",
      "SVM",
      "Neural Networks",
    ],
    githubUrl: null,
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    featured: false,
    category: "NLP",
    timeframe: "2024",
  },
  {
    title: "Accident Analysis and Prediction",
    slug: "accident-analysis-and-prediction",
    tagline: "Severity prediction over long-range accident data",
    summary:
      "A classification project over 10 years of U.S. accident data using multiple models including SVM, logistic regression, and neural networks.",
    impact:
      "Shows applied ML workflow skills in preprocessing, model comparison, and evaluation over a large real-world dataset.",
    technologies: ["Python", "PyTorch", "SVM", "Logistic Regression", "Neural Networks"],
    githubUrl: null,
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    featured: false,
    category: "ML",
    timeframe: "2023",
  },
  {
    title: "Web-based Natural Language Interface for Databases",
    slug: "nl-interface-for-databases",
    tagline: "Natural language access to structured data",
    summary:
      "A web-based system that translates natural language queries into database operations using semantic modeling and deep learning.",
    impact:
      "An older but useful project that shows early interest in human-friendly interfaces over technical systems.",
    technologies: ["Python", "PyTorch", "GloVe", "NLP", "Web Development"],
    githubUrl: null,
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    featured: false,
    category: "Web",
    timeframe: "2019",
  },
  {
    title: "Data-Driven Smart Building using IoT",
    slug: "smart-building-iot",
    tagline: "Sensor-driven automation on Raspberry Pi",
    summary:
      "An IoT-based smart building model using Node.js and Python on a Raspberry Pi, with automated control of appliances based on sensor feedback.",
    impact:
      "Adds embedded and systems breadth to the portfolio by showing hardware-aware automation work.",
    technologies: ["Python", "Node.js", "IoT", "Raspberry Pi", "Embedded Systems"],
    githubUrl: null,
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    featured: false,
    category: "IoT",
    timeframe: "2017",
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export const additionalProjects = projects.filter((project) => !project.featured)

export function getProjectLinks(project: Project): ProjectLink[] {
  return [
    project.githubUrl ? { label: "GitHub", href: project.githubUrl } : null,
    project.projectWebsiteUrl
      ? { label: "Website", href: project.projectWebsiteUrl }
      : null,
    project.documentUrl ? { label: "Document", href: project.documentUrl } : null,
  ].filter(Boolean) as ProjectLink[]
}