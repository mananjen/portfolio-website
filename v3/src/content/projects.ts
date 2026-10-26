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
// Supporting-project narratives are carried over; their editorial review is pending.
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
    summary: "An advanced deep learning project focused on sarcasm detection in Hindi-English code-mixed online text, paired with dataset curation and experimentation support.",
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
        text: "Sarcasm detection is hard even in monolingual settings, and Hindi-English code-mixed text introduces additional complexity through code-switching and informal language patterns."
      },
      {
        heading: "The work",
        text: "Built on recent multilingual and code-mixed NLP research from 2023–2024. Used deep learning methods to improve sarcasm detection accuracy and adaptability for Hinglish text. Contributed to the research effort by curating and refining a higher-quality dataset for Hindi-English code-mixed linguistic patterns."
      },
      {
        heading: "Outcome",
        text: "Created a stronger experimental base for sarcasm detection in code-mixed text. Improved the quality of the underlying dataset used for experimentation and analysis. Strengthened the portfolio’s research depth in multilingual NLP."
      }
    ]
  },
  {
    slug: "riot-amazon-hackathon",
    title: "Riot and Amazon Hackathon",
    summary: "A Retrieval-Augmented Generation project built on Riot Valorant esports data using Amazon Bedrock, turning a massive raw dataset into an interactive player-insight web experience.",
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
        text: "The core challenge was making a very large esports dataset usable inside a hackathon project while still producing a meaningful interactive experience."
      },
      {
        heading: "The work",
        text: "Used Riot Valorant esports data as the knowledge source for a RAG system powered by Amazon Bedrock. Reduced more than 3 TB of raw game data into a concise 20 MB actionable dataset focused on player statistics and playstyles. Built an interactive web interface that lets users query player insights and assemble strong esports teams."
      },
      {
        heading: "Outcome",
        text: "Delivered a working AI-assisted web product with real user-facing value. Demonstrated large-scale data handling and practical generative AI integration. Preserved both a GitHub artifact and a supporting document for the project."
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
        text: "The project focused on detecting subtle cues that separate real photos from synthetic images, especially when AI generation quality is high."
      },
      {
        heading: "The work",
        text: "Curated a custom dataset by capturing real images and generating synthetic counterparts with DALL-E and other AI image generators. Used foreground-background shadow consistency as the main forensic signal for identifying synthetic content. Framed the project as an image forensics problem instead of relying only on shallow visual artifact detection."
      },
      {
        heading: "Outcome",
        text: "Produced a computer vision project with a clear and interesting forensic angle. Demonstrated dataset creation skills in addition to modeling work. Added variety beyond the portfolio’s NLP-heavy projects."
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
        text: "The goal was to make astronomical data exploration immersive, intuitive, and visually compelling inside a CAVE2 virtual environment."
      },
      {
        heading: "The work",
        text: "Built the experience in Unity for the CAVE2 environment. Used precise datasets containing millions of stars to render dynamic celestial visualizations. Implemented navigation, zoom, and interactive exploration features for browsing large cosmic structures."
      },
      {
        heading: "Outcome",
        text: "Combined real astronomical data with advanced VR interaction. Showcased graphics, visualization, and large-scale data handling skills. Produced one of the most visually distinctive projects in the portfolio."
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
        text: "Older webcam and handycam video suffers from blur, noise, and low resolution, making restoration a practical but technically messy problem."
      },
      {
        heading: "The work",
        text: "Applied super-resolution frameworks including RealESRGAN and SwinIR. Combined these with Gaussian denoising and frame interpolation methods to improve quality and temporal smoothness. Built the workflow around realistic archival footage rather than curated benchmark media."
      },
      {
        heading: "Outcome",
        text: "Improved the clarity and usability of legacy personal videos. Demonstrated practical use of deep learning for video restoration. Added a hands-on computer vision engineering project with a real-world use case."
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
        text: "The project focused on extracting meaningful political sentiment from large volumes of messy social-media text."
      },
      {
        heading: "The work",
        text: "Fine-tuned a BERT-based architecture for sentiment classification. Processed large-scale raw Twitter data with preprocessing tailored for social media text. Used the model to analyze discourse around the 2012 Obama-Romney election."
      },
      {
        heading: "Outcome",
        text: "Demonstrated strong transformer-based NLP fundamentals. Showed practical skill in preprocessing noisy public text data. Added a politically themed but technically grounded classification project to the portfolio."
      }
    ]
  },
  {
    slug: "sentiment-analyzing-chatbot",
    title: "Sentiment Analyzing Chatbot",
    summary: "An interactive chatbot using sentiment analysis, Markov modeling, TF-IDF, dependency parsing, and multiple classical machine learning approaches.",
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
        text: "The goal was to build a chatbot that could respond conversationally while also understanding sentiment from user input."
      },
      {
        heading: "The work",
        text: "Used NLTK and Markov modeling as the conversational backbone. Implemented Logistic Regression, Gaussian Naive Bayes, Linear SVM, and MLP-based neural networks for sentiment classification. Applied TF-IDF vectorization and dependency parsing to improve contextual understanding and response quality."
      },
      {
        heading: "Outcome",
        text: "Delivered a practical conversational NLP system with sentiment-awareness. Demonstrated model comparison across multiple classical ML approaches. Strengthened the portfolio’s breadth in practical NLP applications."
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
        text: "The project focused on predicting accident severity and trends from a long-range real-world dataset spanning a decade of U.S. accident records."
      },
      {
        heading: "The work",
        text: "Preprocessed a large accident dataset for classification modeling. Implemented Support Vector Machines, Logistic Regression, and a custom-built neural network. Compared model behavior and evaluation outcomes to understand performance tradeoffs."
      },
      {
        heading: "Outcome",
        text: "Built a full applied ML workflow around a realistic tabular dataset. Produced comparative model results rather than relying on a single baseline. Connected the work to prevention-oriented insight rather than just raw accuracy."
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
      },
      {
        heading: "What it demonstrates",
        text: "An early project showing interest in user-friendly interfaces over technical systems."
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
      },
      {
        heading: "What it demonstrates",
        text: "An early project showing embedded systems and automation experience."
      }
    ]
  }
]

export const featuredProjects = projects.filter(project => project.featured)
export const additionalProjects = projects.filter(project => !project.featured)
  .sort((a, b) => b.year - a.year)
