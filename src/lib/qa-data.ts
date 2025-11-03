// Q&A data structure for chat responses
export interface QAItem {
  question: string;
  answer: string;
  keywords: string[]; // Keywords to match user questions
}

export const qaData: QAItem[] = [
  {
    question: "🧑‍💻 Who are you?",
    answer: "I'm Mann Gupta, a passionate Software Engineer skilled in Backend Development, AI/ML, and DevOps, focused on creating scalable, automated, and intelligent systems.",
    keywords: ["who", "are", "you", "introduction", "introduce", "yourself"]
  },
  {
    question: "💼 What was your last company?",
    answer: "My last role was at WorkIndia, where I worked as a Software Developer Intern from February 2025 to July 2025.",
    keywords: ["last", "company", "previous", "work", "worked", "company", "role", "job"]
  },
  {
    question: "❓ Why did you leave your last company?",
    answer: "I had to step away due to a family emergency, which required my full attention. During that time, I began developing a product prototype and continued learning advanced backend and AI technologies. Now, I'm back with double the energy and focus, ready to take on challenging roles again.",
    keywords: ["why", "leave", "left", "departure", "resign", "quit", "reason"]
  },
  {
    question: "💡 What kind of projects have you worked on recently?",
    answer: "**Multi-Tenant Project Management System** (Jira-inspired) - Built with TypeScript, Node.js, MongoDB, featuring role-based access and real-time updates for multiple organizations.\n\n**Pneumonia Detection CNN Model** - Achieved 92% accuracy using TensorFlow/Keras, optimized with GPU acceleration for medical imaging classification.\n\n**Course Differentiator Platform** - AI-powered chatbot using Generative AI and web scraping (BeautifulSoup) to provide personalized course recommendations.\n\n**EduTube Live Streaming App** - Full-stack platform with secure authentication, AI-filtered content, and CI/CD automation.\n\n**Player-Ball Interaction Analysis** - Computer vision pipeline for sports analytics using OpenCV and deep learning.\n\nEach project demonstrates my ability to build production-ready systems across different domains.",
    keywords: ["projects", "worked", "recent", "built", "developed", "project", "portfolio"]
  },
  {
    question: "🧠 What do you specialize in?",
    answer: "I specialize in three core areas:\n\n**Backend Development** - Building scalable microservices, RESTful APIs, and multi-tenant architectures (like my Jira-inspired project management system).\n\n**AI/ML Engineering** - Developing intelligent systems, chatbots, and computer vision models. At ITC Infotech, I built Agentic AI bots that reduced HR workload significantly.\n\n**DevOps & Cloud** - Optimizing infrastructure on AWS (EKS, EC2, S3), implementing CI/CD pipelines, and reducing operational costs. I cut WorkIndia's costs by 50% through auto-scaling.",
    keywords: ["specialize", "specialization", "expertise", "focus", "skills", "specialty"]
  },
  {
    question: "🌟 What makes you different from other candidates?",
    answer: "My unique combination of **JEE Advanced qualification** (among 1M+ candidates) and **1900+ LeetCode rating** shows both academic excellence and consistent problem-solving skills. I've delivered measurable impact: reducing operational costs by 50% at WorkIndia, building a 92% accurate CNN model for pneumonia detection, and creating AI systems that actually improve team productivity. I'm not just a coder—I design solutions that scale and save costs while maintaining quality.",
    keywords: ["different", "unique", "stand", "out", "advantage", "edge", "candidate"]
  },
  {
    question: "⚙️ What technologies do you work with?",
    answer: "Languages: Python, C++, Java, TypeScript, JavaScript\n\nFrameworks: Django, Node.js, React.js, Next.js\n\nAI/ML: TensorFlow, Keras, Scikit-learn, LangChain, Agentic AI\n\nCloud & DevOps: AWS (EC2, EKS, S3), Docker, Kubernetes, Jenkins, CI/CD\n\nDatabases: MySQL, PostgreSQL, MongoDB",
    keywords: ["technologies", "tech", "stack", "tools", "languages", "frameworks", "skills", "tech"]
  },
  {
    question: "📍 Where are you located?",
    answer: "I'm currently based in Bangalore, India, but open to remote work or relocation for the right opportunity.",
    keywords: ["where", "located", "location", "base", "based", "live", "city"]
  },
  {
    question: "🚀 What motivates you at work?",
    answer: "**Real impact**—I'm driven by building systems that genuinely improve efficiency, like cutting costs by 50% or reducing team workload with AI automation. **Technical challenges** that push me to learn—mastering Kubernetes, building 92% accurate ML models, and designing multi-tenant architectures. **Continuous growth**—working with teams that value innovation, where I can contribute to meaningful projects while expanding my skills in enterprise-level development, cloud infrastructure, and AI/ML systems.",
    keywords: ["motivate", "motivation", "drive", "inspire", "excite", "passion", "work"]
  },
  {
    question: "🔧 What's a technical challenge you solved recently?",
    answer: "At WorkIndia, I migrated and optimized an Amazon EKS cluster hosting 15+ microservices. I implemented auto-scaling, reducing operational costs and boosting stability — a key win for deployment efficiency.",
    keywords: ["challenge", "technical", "problem", "solved", "difficulty", "recent"]
  },
  {
    question: "💬 How do you handle challenges or pressure?",
    answer: "I focus on breaking problems into small, logical steps, automate repetitive parts, and collaborate with teammates. My calm mindset and structured problem-solving approach help me deliver under tight deadlines.",
    keywords: ["handle", "challenge", "pressure", "stress", "deal", "coping", "difficult"]
  },
  {
    question: "🧩 How do you keep your technical skills up-to-date?",
    answer: "**Hands-on practice**: I maintain a 1900+ LeetCode rating through consistent problem-solving. **Building real projects**: Each new project introduces me to new tech—I learned Kubernetes and EKS while optimizing WorkIndia's infrastructure, and mastered LangChain/Agentic AI at ITC Infotech. **Following industry trends**: I stay updated on AI research, cloud innovations (AWS updates), and DevOps best practices. **Learning by doing**: Rather than just reading, I implement new technologies in personal projects—my Course Differentiator taught me web scraping, and my CNN model deepened my understanding of medical AI.",
    keywords: ["skills", "up-to-date", "learn", "learning", "improve", "develop", "grow"]
  },
  {
    question: "🏆 What are you most proud of in your career so far?",
    answer: "**At WorkIndia**: Reducing operational costs by 50% through smart auto-scaling in Amazon EKS—this had real financial impact and improved system reliability.\n\n**At ITC Infotech**: Building Agentic AI bots (Customer Support & HR) that autonomously handled queries, genuinely reducing team workload.\n\n**Technical Achievement**: Building a 92% accurate CNN model for pneumonia detection—applying deep learning to healthcare showed me how tech can save lives.\n\n**Academic Excellence**: Qualifying JEE Advanced among 1M+ candidates and maintaining 1900+ LeetCode rating demonstrates consistent excellence in both academics and problem-solving.",
    keywords: ["proud", "achievement", "accomplishment", "proudest", "best", "career"]
  },
  {
    question: "🔥 What do you look for in a company?",
    answer: "A culture that values innovation, ownership, and learning. I thrive in environments where I can build end-to-end systems, take initiative, and work with teams solving impactful, technical problems.",
    keywords: ["company", "look", "for", "culture", "values", "expect", "want"]
  },
  {
    question: "📈 What's your long-term goal?",
    answer: "To grow into a Tech Lead or AI Systems Engineer, driving scalable backend architectures and integrating AI into real-world automation systems.",
    keywords: ["goal", "long-term", "future", "aspiration", "plan", "vision", "career"]
  },
  {
    question: "💻 What kind of project would make you say \"yes\" immediately?",
    answer: "Projects that combine **AI with real-world impact**—like my pneumonia detection model (92% accuracy) or the Agentic AI bots that reduced HR workload. I'm excited about **scalable backend systems** that serve multiple organizations (like my multi-tenant project management system). **DevOps challenges** where I can optimize costs and infrastructure—I cut WorkIndia's costs by 50% through smart auto-scaling. Any role where I can build systems that genuinely improve efficiency and scale to serve thousands of users.",
    keywords: ["project", "yes", "immediately", "interest", "excite", "would", "want"]
  },
  {
    question: "🤝 How do you work in a team?",
    answer: "I believe in clear communication, ownership, and collaboration. I often take initiative in debugging, reviewing PRs, or automating tasks to support my team's productivity.",
    keywords: ["team", "work", "collaboration", "collaborate", "together", "colleagues"]
  },
  {
    question: "✨ What are your strengths?",
    answer: "**Technical Excellence**: Fast learner who mastered Kubernetes, EKS, and AI frameworks quickly—reduced deployment costs by 50% within months at WorkIndia.\n\n**Problem-Solving**: Strong analytical skills shown through 1900+ LeetCode rating and building complex systems like multi-tenant architectures.\n\n**Attention to Detail**: Achieved 92% accuracy in medical AI models and designed systems that handle production workloads reliably.\n\n**Team Collaboration**: Built Agentic AI bots that reduced HR workload, showing I create tools that help entire teams, not just myself.",
    keywords: ["strengths", "strength", "strong", "good", "at", "excel", "best"]
  },
  {
    question: "💬 What are your weaknesses?",
    answer: "I tend to overanalyze details initially, but I've learned to balance speed with precision through structured planning and task prioritization.",
    keywords: ["weaknesses", "weakness", "weak", "improve", "improvement", "challenge"]
  },
  {
    question: "🎯 What are your interests outside work?",
    answer: "Exploring new technologies, playing sports, and traveling — they help me recharge and approach problems with fresh perspectives.",
    keywords: ["interests", "interest", "hobby", "hobbies", "outside", "work", "personal"]
  },
  {
    question: "📞 How can someone reach you?",
    answer: "**Email**: manngupta923@gmail.com\n**Phone**: +91 6266725150\n**LinkedIn**: [linkedin.com/in/gupta-mann](https://linkedin.com/in/gupta-mann)\n**GitHub**: [github.com/mann-gupta1](https://github.com/mann-gupta1)\n**LeetCode**: [leetcode.com/m-g](https://leetcode.com/m-g)\n\nI'm based in Bangalore, India, and available for immediate opportunities. Feel free to reach out for collaborations, opportunities, or just to connect!",
    keywords: ["reach", "contact", "email", "phone", "connect", "get", "touch"]
  }
];

// Function to find the best matching Q&A based on user input
export function findBestMatch(userInput: string): QAItem | null {
  const normalizedInput = userInput.toLowerCase().trim();
  
  // Remove common question words for better matching
  const stopWords = ["what", "where", "who", "why", "how", "when", "which", "can", "do", "does", "did", "will", "are", "is", "the", "a", "an"];
  const inputWords = normalizedInput
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.includes(word));
  
  // Score each Q&A item based on keyword matches
  let bestMatch: QAItem | null = null;
  let bestScore = 0;
  
  for (const qa of qaData) {
    let score = 0;
    
    // Check for direct keyword matches
    for (const keyword of qa.keywords) {
      if (normalizedInput.includes(keyword.toLowerCase())) {
        score += 2;
      }
      if (inputWords.some(word => word.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(word))) {
        score += 1;
      }
    }
    
    // Check for exact question match (without emoji)
    const questionWithoutEmoji = qa.question.replace(/^[^\s]+\s/, '').toLowerCase();
    if (normalizedInput.includes(questionWithoutEmoji) || questionWithoutEmoji.includes(normalizedInput)) {
      score += 5;
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = qa;
    }
  }
  
  // Only return a match if score is above threshold
  return bestScore > 0 ? bestMatch : null;
}

// Function to get suggested questions (excluding already asked ones)
export function getSuggestedQuestions(askedQuestionIds: Set<number>, count: number = 3): QAItem[] {
  const availableQuestions = qaData.filter((_, index) => !askedQuestionIds.has(index));
  
  // Shuffle and return requested count
  const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
