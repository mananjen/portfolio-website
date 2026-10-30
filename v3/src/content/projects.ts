import researchImage from "../../../src/assets/training_free_cross_modal_alignment.JPG?url"
import sarcasmImage from "../../../src/assets/hinglish_sarcasm_infographic.svg?url"

export type Project = {
  slug: string
  title: string
  summary: string
  category: string
  timeframe: string
  year: number
  featured: boolean
  technologies: string[]
  image?: string
  role?: string
  links: { label: string; href: string }[]
  brief: { heading: string; text: string }[]
}

// Featured order is editorial. Other projects sort by project year, with stable ties.
// Supporting briefs are edited from existing portfolio records, not independently
// verified results. Confirm contribution details and artifact availability before launch.
export const projects: Project[] = [
  {
    slug: "multilingual-image-text-retrieval",
    title: "Training-free multilingual image retrieval",
    summary: "Connecting frozen text and vision encoders through paired anchors to retrieve images across 36 languages.",
    category: "AI Research",
    timeframe: "2025 – Present",
    year: 2025,
    featured: true,
    technologies: [
      "Python",
      "PyTorch",
      "Multilingual embeddings",
      "Sparse retrieval",
      "ASIF"
    ],
    image: researchImage,
    links: [
      {
        label: "Paper",
        href: "https://openreview.net/forum?id=v35BaCj1kc"
      }
    ],
    brief: [
      {
        heading: "My contribution",
        text: "Equal-contributing coauthor. Conducted the initial literature review, investigated datasets and models, built the complete research codebase, and contributed experimental results and research discussions."
      },
      {
        heading: "Engineering decision",
        text: "Stored sparse relative representations in an inverted index to match shared anchors efficiently across nine encoder pairings. Reused cached embeddings for repeated retrieval experiments."
      },
      {
        heading: "Result",
        text: "Reached 57.5% Recall@10 on XM3600 across 36 languages without training a new alignment model. The correct image appeared in the top ten results for 57.5% of queries; strong multimodal and translation-based baselines remained ahead."
      }
    ],
    role: "Equal-contributing coauthor / Research & engineering"
  },
  {
    slug: "hinglish-sarcasm-detection",
    title: "Hindi-English Code-mixed Sarcasm Detection",
    summary: "Sarcasm detection in Hindi-English code-mixed text, combining dataset curation, deep learning, and experimental evaluation.",
    category: "NLP",
    timeframe: "2025",
    year: 2025,
    featured: true,
    technologies: [
      "Python",
      "LLMs",
      "PyTorch",
      "Transformers"
    ],
    image: sarcasmImage,
    links: [
      {
        label: "GitHub",
        href: "https://github.com/mananjen/cs521"
      }
    ],
    brief: [
      {
        heading: "The problem",
        text: "Hindi-English online text mixes languages and informal expressions. Detecting sarcasm requires handling those patterns as well as the gap between literal wording and intended meaning."
      },
      {
        heading: "The work",
        text: "Built a deep learning pipeline for Hinglish sarcasm detection and curated and refined the dataset, drawing on multilingual and code-mixed NLP research from 2023–2024."
      },
      {
        heading: "Evaluation",
        text: "Ran ablations and error analysis as part of the research effort and contributed to an ACL Rolling Review submission."
      }
    ]
  },
  {
    slug: "riot-amazon-hackathon",
    title: "Riot and Amazon Hackathon",
    summary: "An Amazon Bedrock RAG application for querying Valorant player statistics and playstyles and assembling esports teams.",
    category: "AI Research",
    timeframe: "2024",
    year: 2024,
    featured: true,
    technologies: [
      "Python",
      "LLMs",
      "Amazon Bedrock",
      "RAG",
      "Data Mining",
      "Web Development"
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/mananjen/esportsManagerChallenge"
      },
      {
        label: "Document",
        href: "https://docs.google.com/document/d/1Co91tglEuGu7PZ4MbUGruvGPjnvD-0ULLwVkD-RrQwE/edit?usp=sharing"
      }
    ],
    brief: [
      {
        heading: "The problem",
        text: "Make a large collection of Valorant esports data usable for player analysis within a hackathon project."
      },
      {
        heading: "The work",
        text: "Reduced more than 3 TB of raw game data to a 20 MB dataset focused on player statistics and playstyles. Used that dataset as the knowledge source for a retrieval-augmented generation system powered by Amazon Bedrock."
      },
      {
        heading: "Outcome",
        text: "Built an interactive web interface for querying player insights and assembling esports teams. The repository and supporting document provide the implementation and project context."
      }
    ]
  },
  {
    slug: "real-or-ai-generated",
    title: "Real or AI-Generated?",
    summary: "A deep learning-based project for distinguishing real and AI-generated images through shadow and lighting analysis.",
    category: "Computer Vision",
    timeframe: "2024",
    year: 2024,
    featured: false,
    technologies: [
      "Python",
      "Computer Vision",
      "PyTorch",
      "Image Forensics"
    ],
    image: "https://res.cloudinary.com/dry8udott/image/upload/v1742488669/apple_ovzmmo.jpg",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/mananjen/512_course_project"
      }
    ],
    brief: [
      {
        heading: "The problem",
        text: "Investigate whether inconsistencies in shadows and lighting can help distinguish real photographs from AI-generated images."
      },
      {
        heading: "Dataset",
        text: "Captured real images and generated synthetic counterparts with DALL-E and other image generators to curate a custom dataset."
      },
      {
        heading: "Approach",
        text: "Used foreground-background shadow consistency as the main forensic signal. The project examined lighting relationships within an image rather than relying only on visible generation artifacts."
      }
    ]
  },
  {
    slug: "star-explorer",
    title: "Star Explorer",
    summary: "A Unity-based VR experience for the CAVE2 environment that visualizes millions of stars and supports interactive exploration of astronomical data.",
    category: "VR",
    timeframe: "2024",
    year: 2024,
    featured: false,
    technologies: [
      "C#",
      "Unity",
      "CAVE2",
      "VR",
      "Python",
      "Data Mining"
    ],
    image: "https://res.cloudinary.com/dry8udott/image/upload/v1742413188/VR_matfhl.jpg",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/mananjen/VRUnitySpring2024"
      },
      {
        label: "Website",
        href: "https://sites.google.com/uic.edu/vrprojectspring2024/home"
      }
    ],
    brief: [
      {
        heading: "The problem",
        text: "Turn astronomical datasets containing millions of stars into an explorable visualization inside the CAVE2 virtual environment."
      },
      {
        heading: "The work",
        text: "Built the experience in Unity using real astronomical datasets to render celestial visualizations for CAVE2."
      },
      {
        heading: "Outcome",
        text: "Implemented navigation and zoom so users could explore the star data interactively. The project website provides additional context alongside the Unity repository."
      }
    ]
  },
  {
    slug: "video-enhancement",
    title: "Video Enhancement",
    summary: "A practical deep learning workflow for restoring and enhancing personal video archives captured between 2003 and 2015.",
    category: "Computer Vision",
    timeframe: "2025",
    year: 2025,
    featured: false,
    technologies: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "ffmpeg",
      "RealESRGAN",
      "SwinIR",
      "OpenCV",
      "Denoising",
      "Frame Interpolation"
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/mananjen/oldMemories"
      }
    ],
    brief: [
      {
        heading: "The problem",
        text: "Restore personal webcam and handycam recordings from 2003–2015 affected by blur, noise, and low resolution."
      },
      {
        heading: "The work",
        text: "Built a restoration workflow around the archival footage, applying RealESRGAN and SwinIR for super-resolution alongside Gaussian denoising and frame interpolation. Combined spatial enhancement with temporal smoothing to address both image quality and motion."
      }
    ]
  },
  {
    slug: "twitter-data-sentiment-analysis",
    title: "Twitter Data Sentiment Analysis",
    summary: "A sentiment classification project using a fine-tuned BERT-based model to analyze public sentiment during the 2012 Obama-Romney U.S. presidential election.",
    category: "NLP",
    timeframe: "2024",
    year: 2024,
    featured: false,
    technologies: [
      "Python",
      "BERT",
      "PyTorch",
      "scikit-learn",
      "TF-IDF",
      "Google Cloud"
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/mananjen/CS583"
      }
    ],
    brief: [
      {
        heading: "The problem",
        text: "Analyze political sentiment in noisy Twitter posts from the 2012 Obama-Romney U.S. presidential election."
      },
      {
        heading: "The work",
        text: "Preprocessed the raw Twitter data for social-media language and fine-tuned a BERT-based model for sentiment classification. Applied the model to the election discourse to examine public sentiment."
      }
    ]
  },
  {
    slug: "sentiment-analyzing-chatbot",
    title: "Sentiment Analyzing Chatbot",
    summary: "A sentiment-aware chatbot combining Markov-based conversation with a comparison of classical sentiment classifiers.",
    category: "NLP",
    timeframe: "2024",
    year: 2024,
    featured: false,
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
      "Neural Networks"
    ],
    links: [],
    brief: [
      {
        heading: "The problem",
        text: "Build a chatbot that can respond conversationally while identifying sentiment in user input."
      },
      {
        heading: "Conversation",
        text: "Used NLTK and Markov modeling for the conversational backbone, with TF-IDF vectorization and dependency parsing to represent and analyze the input text."
      },
      {
        heading: "Sentiment classification",
        text: "Implemented and compared Logistic Regression, Gaussian Naive Bayes, Linear SVM, and MLP neural networks as sentiment classifiers."
      }
    ]
  },
  {
    slug: "accident-analysis-and-prediction",
    title: "Accident Analysis and Prediction",
    summary: "A classification project over 10 years of U.S. accident data using SVM, logistic regression, and custom neural network models.",
    category: "ML",
    timeframe: "2023",
    year: 2023,
    featured: false,
    technologies: [
      "Python",
      "PyTorch",
      "SVM",
      "Logistic Regression",
      "Neural Networks"
    ],
    links: [],
    brief: [
      {
        heading: "The problem",
        text: "Predict accident severity and analyze trends using ten years of U.S. accident records."
      },
      {
        heading: "The work",
        text: "Preprocessed the tabular accident data and implemented Support Vector Machines, Logistic Regression, and a custom neural network. Compared model behavior and evaluation results across those approaches."
      }
    ]
  },
  {
    slug: "nl-interface-for-databases",
    title: "Web-based Natural Language Interface for Databases",
    summary: "A web-based system that translates natural language queries into database operations using semantic modeling and deep learning.",
    category: "Web",
    timeframe: "2019",
    year: 2019,
    featured: false,
    technologies: [
      "Python",
      "PyTorch",
      "GloVe",
      "NLP",
      "Web Development"
    ],
    links: [],
    brief: [
      {
        heading: "The project",
        text: "A web-based system that translates natural language queries into database operations using semantic modeling and deep learning."
      }
    ]
  },
  {
    slug: "smart-building-iot",
    title: "Data-Driven Smart Building using IoT",
    summary: "An IoT-based smart building model using Node.js and Python on a Raspberry Pi, with automated control of appliances based on sensor feedback.",
    category: "IoT",
    timeframe: "2017",
    year: 2017,
    featured: false,
    technologies: [
      "Python",
      "Node.js",
      "IoT",
      "Raspberry Pi",
      "Embedded Systems"
    ],
    links: [],
    brief: [
      {
        heading: "The project",
        text: "An IoT-based smart building model using Node.js and Python on a Raspberry Pi, with automated control of appliances based on sensor feedback."
      }
    ]
  }
]

export const featuredProjects = projects.filter(project => project.featured)
export const homeProjects = {
  lead: featuredProjects[0],
  supporting: featuredProjects.slice(1),
}
export const additionalProjects = projects.filter(project => !project.featured)
  .sort((a, b) => b.year - a.year)
