export type ProjectLink = {
    label: "GitHub" | "Website" | "Document"
    href: string
}

export type Project = {
    title: string
    slug: string
    tagline: string
    summary: string
    impact: string
    details?: {
        challenge: string
        approach: string[]
        results: string[]
    }
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
            "Shows research depth, multilingual retrieval, multimodal system design, and strong results under realistic compute constraints.",
        details: {
            challenge:
                "The goal was to build competitive multilingual image-text retrieval without relying on costly end-to-end multimodal training.",
            approach: [
                "Designed a non-parametric framework that converts pretrained unimodal embeddings into anchor-relative sparse representations.",
                "Used pretrained multilingual text and vision encoders and aligned them through a shared retrieval space instead of multimodal fine-tuning.",
                "Built a full experimentation pipeline with automated hyperparameter sweeps, per-language Recall@K evaluation, embedding caching, and encoder-pair comparisons."
            ],
            results: [
                "Achieved about 30% Recall@1 on XM3600 without end-to-end multimodal training.",
                "Demonstrated that strong multilingual retrieval performance is possible under compute and data constraints.",
                "Manuscript and open-source release are in preparation."
            ]
        },
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
        timeframe: "2025 – Present",
    },
    {
        title: "Hindi-English Code-mixed Sarcasm Detection",
        slug: "hinglish-sarcasm-detection",
        tagline: "Multilingual NLP for nuanced sarcasm detection",
        summary:
            "An advanced deep learning project focused on sarcasm detection in Hindi-English code-mixed online text, paired with dataset curation and experimentation support.",
        impact:
            "Highlights difficult multilingual NLP work involving code-switching, informal language, and dataset quality, not just standard text classification.",
        details: {
            challenge:
                "Sarcasm detection is already difficult in monolingual settings, and Hindi-English code-mixed text adds code-switching, informal phrasing, and noisy linguistic patterns.",
            approach: [
                "Built on recent multilingual and code-mixed NLP research from 2023–2024.",
                "Used deep learning methods to improve sarcasm detection accuracy and adaptability in Hinglish text.",
                "Contributed to the research effort by curating and refining a higher-quality dataset for robust experimentation."
            ],
            results: [
                "Created a stronger experimental foundation for Hindi-English code-mixed sarcasm detection.",
                "Improved the quality of the dataset used for model development and evaluation.",
                "Strengthened the portfolio’s research depth in multilingual NLP."
            ]
        },
        technologies: ["Python", "LLMs", "PyTorch", "Transformers"],
        githubUrl: "https://github.com/mananjen/cs521",
        imageUrl: null,
        projectWebsiteUrl: null,
        documentUrl: null,
        featured: true,
        category: "NLP",
        timeframe: "2025 – Present",
    },
    {
        title: "Riot and Amazon Hackathon",
        slug: "riot-amazon-hackathon",
        tagline: "RAG system over esports data with Amazon Bedrock",
        summary:
            "A Retrieval-Augmented Generation project built on Riot Valorant esports data using Amazon Bedrock, turning over 3 TB of raw game data into an interactive player-insight web experience.",
        impact:
            "A strong product-oriented AI project that combines large-scale data reduction, applied LLM usage, and a demo-ready user experience.",
        details: {
            challenge:
                "The challenge was to make an extremely large and messy esports dataset usable in a fast-moving hackathon setting.",
            approach: [
                "Used Riot Valorant esports data as the knowledge source for a Retrieval-Augmented Generation workflow.",
                "Built the project with Amazon Bedrock and web tooling to make the system interactive and easy to demo.",
                "Reduced more than 3 TB of raw data into a much smaller, queryable form that supported player-level insights."
            ],
            results: [
                "Produced a working AI-assisted web experience for querying esports insights.",
                "Showed practical use of RAG, LLMs, and large-scale data reduction in a real product-like setting.",
                "Included both GitHub and supporting document artifacts."
            ]
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
            "A deep learning project for distinguishing real and AI-generated images through foreground-background shadow consistency and a custom comparison dataset.",
        impact:
            "One of the most visually compelling projects in the portfolio and a strong computer vision example beyond NLP-focused work.",
        technologies: ["Python", "Computer Vision", "PyTorch", "Image Forensics"],
        githubUrl: "https://github.com/mananjen/512_course_project",
        imageUrl:
            "https://res.cloudinary.com/dry8udott/image/upload/v1742488669/apple_ovzmmo.jpg",
        projectWebsiteUrl: null,
        documentUrl: null,
        featured: false,
        category: "Computer Vision",
        timeframe: "2024",
        details: {
            challenge:
                "The goal was to distinguish real and AI-generated images using visual cues that are hard for generative systems to render consistently.",
            approach: [
                "Focused on shadow and lighting consistency between foreground and background regions.",
                "Built a custom dataset of paired real and AI-generated images for comparison.",
                "Used deep learning and computer vision methods to analyze forensic cues rather than relying only on surface-level artifacts."
            ],
            results: [
                "Produced a visually compelling computer vision project with a clear forensic angle.",
                "Added strong variety to the portfolio beyond text-focused NLP work.",
            ]
        }
    },
    {
        title: "Star Explorer",
        slug: "star-explorer",
        tagline: "Immersive astronomy exploration in VR",
        summary:
            "A Unity-based VR experience for the CAVE2 environment that visualizes millions of stars and supports interactive exploration of astronomical data.",
        impact:
            "Adds strong visual range to the portfolio and shows experience with immersive systems, scientific data, and interaction design.",
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
            "A practical video restoration pipeline using super-resolution, denoising, and frame interpolation methods to improve older personal videos.",
        impact:
            "Shows applied computer vision engineering in a realistic restoration workflow rather than only benchmark-style experimentation.",
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
            "A solid supporting NLP project that shows transformer-based classification and social-media-focused preprocessing.",
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
            "An older project that still helps show early interest in human-friendly interfaces over technical systems.",
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
    const links: ProjectLink[] = []

    if (project.githubUrl) links.push({ label: "GitHub", href: project.githubUrl })
    if (project.projectWebsiteUrl) links.push({ label: "Website", href: project.projectWebsiteUrl })
    if (project.documentUrl) links.push({ label: "Document", href: project.documentUrl })

    return links
}