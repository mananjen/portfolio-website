export type ProjectLink = {
  label: "GitHub" | "Website" | "Document"
  href: string
}

export type ProjectDetails = {
  challenge: string
  approach: string[]
  results: string[]
}

import HingPic from "@/assets/hinglish_sarcasm_infographic.svg"
import ResearchInfographic from "@/assets/training_free_cross_modal_alignment.jpg"

export type Project = {
  title: string
  slug: string
  tagline: string
  summary: string
  impact: string
  details?: ProjectDetails
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
      "Shows multilingual retrieval, multimodal alignment, and strong experimental rigor under realistic compute and data constraints.",
    details: {
      challenge:
        "The project aims to build competitive multilingual image-text retrieval without relying on costly end-to-end multimodal training.",
      approach: [
        "Designed a non-parametric framework that converts pretrained unimodal embeddings into anchor-relative sparse representations.",
        "Used pretrained multilingual text and vision encoders with a large external anchor set to align modalities in a shared retrieval space.",
        "Built an experimentation pipeline with automated hyperparameter sweeps, per-language Recall@K evaluation, embedding caching, and encoder pairing comparisons.",
      ],
      results: [
        "Achieved roughly 30% Recall@1 on XM3600 without end-to-end multimodal training.",
        "Showed that strong multilingual retrieval can be achieved by combining pretrained models with non-parametric alignment strategies.",
        "Manuscript and open-source release are still in preparation.",
      ],
    },
    technologies: [
      "Python",
      "Non-Parametric Models",
      "Vision Encoders",
      "Text Encoders",
      "Cross-Modal Retrieval",
    ],
    githubUrl: null,
    imageUrl: ResearchInfographic,
    projectWebsiteUrl: null,
    documentUrl: null,
    featured: true,
    category: "AI Research",
    timeframe: "2025 – Present",
  },
  {
    title: "Hindi-English Code-mixed Sarcasm Detection",
    slug: "hinglish-sarcasm-detection",
    tagline: "Multilingual NLP for nuanced sarcasm detection",
    summary:
      "An advanced deep learning project focused on sarcasm detection in Hindi-English code-mixed online text, paired with dataset curation and experimentation support.",
    impact:
      "Highlights difficult multilingual NLP work involving code-switching, informal language, and careful dataset design rather than standard text classification alone.",
    details: {
      challenge:
        "Sarcasm detection is hard even in monolingual settings, and Hindi-English code-mixed text introduces additional complexity through code-switching and informal language patterns.",
      approach: [
        "Built on recent multilingual and code-mixed NLP research from 2023–2024.",
        "Used deep learning methods to improve sarcasm detection accuracy and adaptability for Hinglish text.",
        "Contributed to the research effort by curating and refining a higher-quality dataset for Hindi-English code-mixed linguistic patterns.",
      ],
      results: [
        "Created a stronger experimental base for sarcasm detection in code-mixed text.",
        "Improved the quality of the underlying dataset used for experimentation and analysis.",
        "Strengthened the portfolio’s research depth in multilingual NLP.",
      ],
    },
    technologies: ["Python", "LLMs", "PyTorch", "Transformers"],
    githubUrl: "https://github.com/mananjen/cs521",
    imageUrl: HingPic,
    projectWebsiteUrl: null,
    documentUrl: null,
    featured: true,
    category: "NLP",
    timeframe: "2025",
  },
  {
    title: "Riot and Amazon Hackathon",
    slug: "riot-amazon-hackathon",
    tagline: "RAG system over esports data with Amazon Bedrock",
    summary:
      "A Retrieval-Augmented Generation project built on Riot Valorant esports data using Amazon Bedrock, turning a massive raw dataset into an interactive player-insight web experience.",
    impact:
      "Combines large-scale data reduction, applied LLM usage, and a demo-ready product experience in a very practical AI build.",
    details: {
      challenge:
        "The core challenge was making a very large esports dataset usable inside a hackathon project while still producing a meaningful interactive experience.",
      approach: [
        "Used Riot Valorant esports data as the knowledge source for a RAG system powered by Amazon Bedrock.",
        "Reduced more than 3 TB of raw game data into a concise 20 MB actionable dataset focused on player statistics and playstyles.",
        "Built an interactive web interface that lets users query player insights and assemble strong esports teams.",
      ],
      results: [
        "Delivered a working AI-assisted web product with real user-facing value.",
        "Demonstrated large-scale data handling and practical generative AI integration.",
        "Preserved both a GitHub artifact and a supporting document for the project.",
      ],
    },
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
      "A deep learning-based project for distinguishing real and AI-generated images through shadow and lighting analysis.",
    impact:
      "Adds a strong computer vision and image-forensics angle to the portfolio with a visually compelling and technically distinctive problem.",
    details: {
      challenge:
        "The project focused on detecting subtle cues that separate real photos from synthetic images, especially when AI generation quality is high.",
      approach: [
        "Curated a custom dataset by capturing real images and generating synthetic counterparts with DALL-E and other AI image generators.",
        "Used foreground-background shadow consistency as the main forensic signal for identifying synthetic content.",
        "Framed the project as an image forensics problem instead of relying only on shallow visual artifact detection.",
      ],
      results: [
        "Produced a computer vision project with a clear and interesting forensic angle.",
        "Demonstrated dataset creation skills in addition to modeling work.",
        "Added variety beyond the portfolio’s NLP-heavy projects.",
      ],
    },
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
      "A Unity-based VR experience for the CAVE2 environment that visualizes millions of stars and supports interactive exploration of astronomical data.",
    impact:
      "Adds strong visual range to the portfolio and shows experience with immersive systems, scientific visualization, and large-scale data interaction.",
    details: {
      challenge:
        "The goal was to make astronomical data exploration immersive, intuitive, and visually compelling inside a CAVE2 virtual environment.",
      approach: [
        "Built the experience in Unity for the CAVE2 environment.",
        "Used precise datasets containing millions of stars to render dynamic celestial visualizations.",
        "Implemented navigation, zoom, and interactive exploration features for browsing large cosmic structures.",
      ],
      results: [
        "Combined real astronomical data with advanced VR interaction.",
        "Showcased graphics, visualization, and large-scale data handling skills.",
        "Produced one of the most visually distinctive projects in the portfolio.",
      ],
    },
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
      "A practical deep learning workflow for restoring and enhancing personal video archives captured between 2003 and 2015.",
    impact:
      "Shows applied computer vision engineering in a realistic restoration setting rather than only benchmark-style experimentation.",
    details: {
      challenge:
        "Older webcam and handycam video suffers from blur, noise, and low resolution, making restoration a practical but technically messy problem.",
      approach: [
        "Applied super-resolution frameworks including RealESRGAN and SwinIR.",
        "Combined these with Gaussian denoising and frame interpolation methods to improve quality and temporal smoothness.",
        "Built the workflow around realistic archival footage rather than curated benchmark media.",
      ],
      results: [
        "Improved the clarity and usability of legacy personal videos.",
        "Demonstrated practical use of deep learning for video restoration.",
        "Added a hands-on computer vision engineering project with a real-world use case.",
      ],
    },
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
      "A sentiment classification project using a fine-tuned BERT-based model to analyze public sentiment during the 2012 Obama-Romney U.S. presidential election.",
    impact:
      "Shows transformer-based text classification, large-scale social-media preprocessing, and sentiment analysis on noisy real-world data.",
    details: {
      challenge:
        "The project focused on extracting meaningful political sentiment from large volumes of messy social-media text.",
      approach: [
        "Fine-tuned a BERT-based architecture for sentiment classification.",
        "Processed large-scale raw Twitter data with preprocessing tailored for social media text.",
        "Used the model to analyze discourse around the 2012 Obama-Romney election.",
      ],
      results: [
        "Demonstrated strong transformer-based NLP fundamentals.",
        "Showed practical skill in preprocessing noisy public text data.",
        "Added a politically themed but technically grounded classification project to the portfolio.",
      ],
    },
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
      "An interactive chatbot using sentiment analysis, Markov modeling, TF-IDF, dependency parsing, and multiple classical machine learning approaches.",
    impact:
      "Adds breadth by showing earlier conversational NLP work built from a more classical ML stack rather than transformer-only methods.",
    details: {
      challenge:
        "The goal was to build a chatbot that could respond conversationally while also understanding sentiment from user input.",
      approach: [
        "Used NLTK and Markov modeling as the conversational backbone.",
        "Implemented Logistic Regression, Gaussian Naive Bayes, Linear SVM, and MLP-based neural networks for sentiment classification.",
        "Applied TF-IDF vectorization and dependency parsing to improve contextual understanding and response quality.",
      ],
      results: [
        "Delivered a practical conversational NLP system with sentiment-awareness.",
        "Demonstrated model comparison across multiple classical ML approaches.",
        "Strengthened the portfolio’s breadth in practical NLP applications.",
      ],
    },
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
      "A classification project over 10 years of U.S. accident data using SVM, logistic regression, and custom neural network models.",
    impact:
      "Shows applied ML workflow skills in preprocessing, model comparison, evaluation, and extracting actionable insight from a large real-world dataset.",
    details: {
      challenge:
        "The project focused on predicting accident severity and trends from a long-range real-world dataset spanning a decade of U.S. accident records.",
      approach: [
        "Preprocessed a large accident dataset for classification modeling.",
        "Implemented Support Vector Machines, Logistic Regression, and a custom-built neural network.",
        "Compared model behavior and evaluation outcomes to understand performance tradeoffs.",
      ],
      results: [
        "Built a full applied ML workflow around a realistic tabular dataset.",
        "Produced comparative model results rather than relying on a single baseline.",
        "Connected the work to prevention-oriented insight rather than just raw accuracy.",
      ],
    },
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
      "An early project showing interest in user-friendly interfaces over technical systems.",
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
      "An early project showing embedded systems and automation experience.",
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
  const links: ProjectLink[] = []

  if (project.githubUrl) {
    links.push({ label: "GitHub", href: project.githubUrl })
  }

  if (project.projectWebsiteUrl) {
    links.push({ label: "Website", href: project.projectWebsiteUrl })
  }

  if (project.documentUrl) {
    links.push({ label: "Document", href: project.documentUrl })
  }

  return links
}