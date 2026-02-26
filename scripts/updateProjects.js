// scripts/populateFirestore.js
const admin = require('firebase-admin');
const serviceAccount = require('./portfolio-website-db-firebase-adminsdk-fbsvc-482803dc19.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const projects = [
  {
    title: "Multilingual Image–Text Retrieval Without End-to-End Training",
    description: "Designing a compute-efficient, training-free alternative to end-to-end multimodal learning for multilingual image–text retrieval. This work proposes a non-parametric framework that converts pretrained unimodal embeddings into anchor-relative sparse representations, enabling effective cross-lingual retrieval without expensive multimodal fine-tuning. The core idea leverages pretrained vision and multilingual text encoders alongside a large external anchor set (CC12M) to construct relative representations that align modalities in a shared retrieval space. Using Qwen3-Embedding-8B for multilingual text and c-radio-v4-h for image embeddings—selected through systematic empirical sweeps—the system achieves ~30% Recall@1 on XM3600 without any end-to-end multimodal training. To ensure scalability and reproducibility, I built a full evaluation and orchestration pipeline featuring: Automated hyperparameter sweeps (k, p) for anchor selection and sparsification Per-language Recall@K evaluation across XM3600 Embedding caching to eliminate redundant computation Modular experimentation framework for encoder pairing comparisons This research demonstrates that competitive multilingual retrieval performance can be achieved under limited compute and data constraints by leveraging strong pretrained models and non-parametric alignment strategies. Manuscript and open-source release currently in preparation for ACL Rolling Review.",
    technologies: ["Python", "Non-Parametric Models", "Vision Encoders", "Text Encoders", "Cross-Modal Retrieval"],
    // githubUrl: "https://github.com/mananjen/cs521",
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    startDate: admin.firestore.Timestamp.fromDate(new Date(2025, 10, 15)),
    // endDate: admin.firestore.Timestamp.fromDate(new Date(2025, 10, 15)),
  },
  {
    title: "Hindi-English Code-mixed Sarcasm Detection",
    description: "Developing an advanced deep learning model to accurately detect sarcasm in Hindi-English code-mixed online texts. Leveraging cutting-edge research from 2023–2024 in multilingual and code-mixed NLP, this project expands upon existing frameworks to enhance detection accuracy and adaptability. Additionally, contributing to the research initiative by curating and refining a comprehensive, high-quality dataset specifically designed for Hindi-English code-mixed linguistic patterns, thereby laying a strong foundation for robust experimentation and analysis.",
    technologies: ["Python", "LLMs", "Pytorch", "Transformers"],
    githubUrl: "https://github.com/mananjen/cs521",
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    startDate: admin.firestore.Timestamp.fromDate(new Date(2025, 0, 15)),
    endDate: admin.firestore.Timestamp.fromDate(new Date(2025, 10, 15)),
  },
  {
    title: "Video Enhancement",
    description: "Applied state-of-the-art deep learning techniques to restore and enhance personal video archives (2003–2015), captured via webcams and handycams. Leveraged advanced super-resolution frameworks such as RealESRGAN and SwinIR, combined with Gaussian denoising and frame interpolation methods, to effectively reduce blur, eliminate noise, and significantly improve video quality and clarity. This project demonstrates expertise in computer vision, neural network applications, and practical enhancement of legacy multimedia content.",
    technologies: ["Python", "Tensorflow", "Pytorch", "ffmpeg", "RealESRGAN", "SwinIR", "opencv", "Denoising", "Frame Interpolation"],
    githubUrl: "https://github.com/mananjen/oldMemories",
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    startDate: admin.firestore.Timestamp.fromDate(new Date(2025, 0, 15)),
    endDate: admin.firestore.Timestamp.fromDate(new Date(2025, 5, 15)),
  },
  {
    title: "Sentiment Analyzing Chatbot",
    description: "Developed an interactive chatbot leveraging Natural Language Processing (NLP) techniques and sentiment analysis using NLTK and Markov modeling. Implemented machine learning algorithms such as Logistic Regression, Gaussian Naive Bayes, Linear SVM, and neural networks (MLPClassifier) for accurate sentiment classification. Integrated robust text preprocessing methods, including TF-IDF vectorization and dependency parsing, to enhance the chatbot’s contextual understanding and responsiveness. The project highlights expertise in NLP, machine learning modeling, and developing practical conversational AI applications.",
    technologies: ["Python", "sklearn", "nltk", "Markov Models", "TF-IDF", "Dependency Parsing", "Logistic Regression", "Naive Bayes", "SVM", "Neural Networks"],
    githubUrl: null,
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    startDate: admin.firestore.Timestamp.fromDate(new Date(2024, 6, 15)),
    endDate: admin.firestore.Timestamp.fromDate(new Date(2024, 11, 15)),
  },
  {
    title: "Twitter Data Sentiment Analysis",
    description: "Developed a sentiment classification model leveraging a fine-tuned BERT-based architecture to analyze public sentiment during the 2012 Obama-Romney U.S. presidential election. Processed and analyzed large-scale, raw Twitter datasets using customized NLP preprocessing methods tailored for social media data. This project demonstrated proficiency in transformer-based models, text classification techniques, and insightful sentiment evaluation of political discourse from social media platforms.",
    technologies: ["Python", "BERT", "Pytorch", "sklearn", "tfidf", "Google cloud"],
    githubUrl: "https://github.com/mananjen/CS583",
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    startDate: admin.firestore.Timestamp.fromDate(new Date(2024, 6, 15)),
    endDate: admin.firestore.Timestamp.fromDate(new Date(2024, 11, 15)),
  },
  {
    title: "Riot and Amazon Hackathon",
    description: "Developed an Amazon Bedrock-powered solution using a Retrieval-Augmented Generation (RAG) approach on Riot’s Valorant esports data. Analyzed and distilled over 3 terabytes of raw game data into a concise, 20 MB actionable dataset highlighting key player statistics and distinct playstyles. Built an interactive web interface integrated with an Amazon Bedrock LLM foundation model, enabling users to query detailed player insights and strategically assemble high-performing esports teams. Demonstrated advanced data mining capabilities, large-scale data handling proficiency, and the practical application of cutting-edge generative AI technologies.",
    technologies: ["Python", "LLMs", "Amazon Bedrock", "RAG", "Data Mining", "Web Development"],
    githubUrl: "https://github.com/mananjen/esportsManagerChallenge",
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: "https://docs.google.com/document/d/1Co91tglEuGu7PZ4MbUGruvGPjnvD-0ULLwVkD-RrQwE/edit?usp=sharing",
    startDate: admin.firestore.Timestamp.fromDate(new Date(2024, 9, 15)),
    endDate: admin.firestore.Timestamp.fromDate(new Date(2024, 10, 15)),
  },
  {
    title: "Real or AI-Generated?",
    description: "Developed a deep learning-based method for distinguishing between real and AI-generated images through advanced shadow and lighting analysis. Curated a custom dataset by capturing real images and generating synthetic counterparts using DALL-E and other AI image generators. Employed a novel approach leveraging contextualized foreground-background shadow consistency to detect subtle discrepancies indicative of AI-generated content. This project demonstrates expertise in deep learning, dataset creation, image forensics, and innovative applications of computer vision techniques.",
    technologies: ["Python", "Computer Vision", "Pytorch", "Image Forensics"],
    githubUrl: "https://github.com/mananjen/512_course_project",
    imageUrl: "https://res.cloudinary.com/dry8udott/image/upload/v1742488669/apple_ovzmmo.jpg",
    projectWebsiteUrl: null,
    documentUrl: null,
    startDate: admin.firestore.Timestamp.fromDate(new Date(2024, 0, 15)),
    endDate: admin.firestore.Timestamp.fromDate(new Date(2024, 4, 15)),
  },
  {
    title: "Star Explorer",
    description: "Developed an immersive VR experience for the CAVE2 virtual environment using Unity, enabling interactive exploration of astronomical data. Leveraged precise datasets comprising millions of stars to render accurate and dynamic celestial visualizations. Implemented seamless interactions allowing users to navigate, zoom, and explore intricate cosmic structures intuitively. This project showcased effective integration of real-world astronomical information with advanced VR technology, highlighting capabilities in visualization, graphics programming, and large-scale data handling.",
    technologies: ["C#", "Unity", "CAVE2", "VR", "Python", "Data Mining"],
    githubUrl: "https://github.com/mananjen/VRUnitySpring2024",
    imageUrl: "https://res.cloudinary.com/dry8udott/image/upload/v1742413188/VR_matfhl.jpg",
    projectWebsiteUrl: "https://sites.google.com/uic.edu/vrprojectspring2024/home",
    documentUrl: null,
    startDate: admin.firestore.Timestamp.fromDate(new Date(2024, 0, 15)),
    endDate: admin.firestore.Timestamp.fromDate(new Date(2024, 4, 15)),
  },
  {
    title: "Accident Analysis and Prediction",
    description: "Performed a classification analysis using PyTorch on a comprehensive dataset spanning 10 years of U.S. accident data. Implemented multiple machine learning techniques, including Support Vector Machines (SVM), Logistic Regression, and a custom-built Neural Network to accurately predict accident severity and trends. Demonstrated skills in data preprocessing, model building, evaluation, and comparative analysis, providing actionable insights for accident prediction and prevention strategies.",
    technologies: ["Python", "Pytorch", "SVM", "Logistic Regression", "Neural Networks"],
    githubUrl: null,
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    startDate: admin.firestore.Timestamp.fromDate(new Date(2023, 7, 15)),
    endDate: admin.firestore.Timestamp.fromDate(new Date(2023, 11, 15)),
  },
  {
    title: "Web-based Natural Language Interface for Databases",
    description: "Developed an intuitive web-based system enabling casual users to interact seamlessly with databases through natural language. Leveraged PyTorch for deep learning modeling and GloVe embeddings for semantic understanding, effectively translating user queries into structured database operations. This project simplified database interactions by removing the need for specialized query languages, demonstrating proficiency in NLP, deep learning, semantic embeddings, and user-centric interface design.",
    technologies: ["Python", "Pytorch", "GloVe", "NLP", "Web Development"],
    githubUrl: null,
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    startDate: admin.firestore.Timestamp.fromDate(new Date(2019, 0, 15)),
    endDate: admin.firestore.Timestamp.fromDate(new Date(2019, 4, 15)),
  },
  {
    title: "Data-Driven Smart Building using IoT",
    description: "Developed an IoT-based smart building model utilizing Node.js and Python, hosted on a Raspberry Pi server. Simulated building operations involving electrical appliances such as fans, LEDs, and various environmental sensors. Implemented intelligent automated control systems that adjust device behavior based on real-time sensor feedback, significantly enhancing energy efficiency. Demonstrated practical skills in IoT integration, embedded systems, and energy-efficient automation strategies.",
    technologies: ["Python", "Node.js", "IoT", "Raspberry Pi", "Embedded Systems"],
    githubUrl: null,
    imageUrl: null,
    projectWebsiteUrl: null,
    documentUrl: null,
    startDate: admin.firestore.Timestamp.fromDate(new Date(2017, 7, 15)),
    endDate: admin.firestore.Timestamp.fromDate(new Date(2017, 11, 15)),
  },
];

async function clearCollection(collectionPath) {
  const collectionRef = db.collection(collectionPath);
  const querySnapshot = await collectionRef.get();

  const batchSize = querySnapshot.size;

  if (batchSize === 0) return;

  const batch = db.batch();
  querySnapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(`Cleared ${batchSize} documents from ${collectionPath}`);
}

async function populateFirestore() {
  // First clear existing documents
  await clearCollection('projects');

  // Add fresh documents
  const batch = db.batch();
  projects.forEach((project) => {
    const docRef = db.collection('projects').doc(); // Auto-generated ID
    batch.set(docRef, project);
  });

  await batch.commit();
  console.log('Projects successfully overwritten in Firestore.');
}

populateFirestore().catch(console.error);