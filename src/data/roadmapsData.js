export const CAREER_ROADMAPS = {
  'Software Developer': {
    title: 'Software Development Engineering (SDE)',
    description: 'A structured, industry-aligned pathway to master problem-solving, software architecture, core CS fundamentals, and full-scale system development.',
    icon: 'Code2',
    color: 'indigo',
    steps: [
      {
        id: 'sde-1',
        title: 'Step 1: Programming Fundamentals & OOP',
        description: 'Master at least one primary compiled language (C++, Java, or Python) with object-oriented paradigms.',
        checklist: [
          { id: 'c1', label: 'Variables, data types, operators & control flow', completed: true },
          { id: 'c2', label: 'Functions, recursion & memory management (pointers/references)', completed: true },
          { id: 'c3', label: 'Object Oriented Programming (Encapsulation, Inheritance, Polymorphism, Abstraction)', completed: true },
          { id: 'c4', label: 'File handling, exception handling & modular code design', completed: false }
        ],
        resources: [
          { name: 'CS50x: Introduction to Computer Science', url: 'https://cs50.harvard.edu/x' },
          { name: 'OOP Principles Guide', url: 'https://developer.mozilla.org/' }
        ]
      },
      {
        id: 'sde-2',
        title: 'Step 2: Data Structures & Algorithms (DSA)',
        description: 'Develop strong problem-solving skills to pass coding rounds at tech companies.',
        checklist: [
          { id: 'c5', label: 'Arrays, Strings, HashMaps & Two-Pointer techniques', completed: true },
          { id: 'c6', label: 'Linked Lists, Stacks, Queues and Monotonic Stacks', completed: true },
          { id: 'c7', label: 'Trees, Binary Search Trees & Heaps/Priority Queues', completed: false },
          { id: 'c8', label: 'Graphs (BFS, DFS, Dijkstra) & Dynamic Programming basics', completed: false },
          { id: 'c9', label: 'Solve 150+ standard problems on LeetCode/GeeksforGeeks', completed: false }
        ],
        resources: [
          { name: 'NeetCode 150 Roadmap', url: 'https://neetcode.io/roadmap' },
          { name: 'Striver A2Z DSA Sheet', url: 'https://takeuforward.org/' }
        ]
      },
      {
        id: 'sde-3',
        title: 'Step 3: Core CS Subjects & Operating Systems',
        description: 'Essential computer science theory required for technical interviews and engineering fundamentals.',
        checklist: [
          { id: 'c10', label: 'Operating Systems (Processes, Threads, Concurrency, Virtual Memory, Deadlocks)', completed: false },
          { id: 'c11', label: 'Database Management Systems (Relational SQL, Indexing, Normalization, ACID)', completed: false },
          { id: 'c12', label: 'Computer Networks (OSI Model, TCP/IP, HTTP/HTTPS, DNS, WebSockets)', completed: false }
        ],
        resources: [
          { name: 'Gate Smashers CS Playlists', url: 'https://youtube.com' },
          { name: 'OS Three Easy Pieces', url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/' }
        ]
      },
      {
        id: 'sde-4',
        title: 'Step 4: Version Control & Git Collaboration',
        description: 'Learn modern software workflows used across engineering teams.',
        checklist: [
          { id: 'c13', label: 'Git basics: init, add, commit, branch, merge, stash', completed: true },
          { id: 'c14', label: 'GitHub workflows: Pull Requests, resolving merge conflicts, fork & clone', completed: true },
          { id: 'c15', label: 'Writing clean commit messages and README markdown documentation', completed: false }
        ],
        resources: [
          { name: 'Learn Git Branching Interactive', url: 'https://learngitbranching.js.org/' }
        ]
      },
      {
        id: 'sde-5',
        title: 'Step 5: Full-Stack Project Building & APIs',
        description: 'Build 2-3 substantial end-to-end applications demonstrating clean code and architecture.',
        checklist: [
          { id: 'c16', label: 'Build a RESTful backend with authentication (JWT/OAuth) and database persistence', completed: false },
          { id: 'c17', label: 'Design a responsive frontend interface with clean state management', completed: false },
          { id: 'c18', label: 'Deploy application with live URL on Vercel, Render, or AWS', completed: false }
        ],
        resources: [
          { name: 'FullStackOpen Course', url: 'https://fullstackopen.com/' }
        ]
      },
      {
        id: 'sde-6',
        title: 'Step 6: Resume, Portfolio & Online Presence',
        description: 'Showcase your engineering accomplishments and stand out to hiring managers.',
        checklist: [
          { id: 'c19', label: 'Create an ATS-friendly single page LaTeX resume (Jake\'s resume format)', completed: false },
          { id: 'c20', label: 'Optimize LinkedIn profile with clear headline, featured projects and skills', completed: false },
          { id: 'c21', label: 'Pin top 3 open-source or showcase repositories on GitHub with live demos', completed: false }
        ],
        resources: [
          { name: 'Jake\'s Resume LaTeX Template', url: 'https://overleaf.com' }
        ]
      },
      {
        id: 'sde-7',
        title: 'Step 7: Internship Applications & Networking',
        description: 'Systematically apply for internship roles and connect with engineers.',
        checklist: [
          { id: 'c22', label: 'Apply to 5-10 curated openings daily across LinkedIn, Wellfound & Careers pages', completed: false },
          { id: 'c23', label: 'Reach out to college alumni and recruiters with tailored referral messages', completed: false },
          { id: 'c24', label: 'Participate in hackathons and open-source contribution programs', completed: false }
        ],
        resources: [
          { name: 'Simplify Jobs Internship Tracker', url: 'https://simplify.jobs/' }
        ]
      },
      {
        id: 'sde-8',
        title: 'Step 8: Mock Interviews & Behavioral Prep',
        description: 'Hone your live coding performance, system design basics, and STAR method answers.',
        checklist: [
          { id: 'c25', label: 'Practice behavioral interview questions using the STAR framework', completed: false },
          { id: 'c26', label: 'Conduct 5+ peer mock interviews on Pramp or with classmates', completed: false },
          { id: 'c27', label: 'Master Low-Level Design / Basic System Design concepts', completed: false }
        ],
        resources: [
          { name: 'Pramp Free Peer Mock Interviews', url: 'https://pramp.com' }
        ]
      }
    ]
  },
  'Web Developer': {
    title: 'Full-Stack Web Development',
    description: 'Master modern frontend interfaces, high-performance backends, REST/GraphQL APIs, and cloud deployments.',
    icon: 'Globe',
    color: 'emerald',
    steps: [
      {
        id: 'web-1',
        title: 'Step 1: Modern HTML, CSS & Responsive Design',
        description: 'Master semantic HTML5, CSS Grid/Flexbox, Tailwind CSS, and mobile-first layouts.',
        checklist: [
          { id: 'w1', label: 'Semantic HTML5 elements & Accessibility (a11y) basics', completed: true },
          { id: 'w2', label: 'Flexbox & CSS Grid deep dive with fluid responsive layouts', completed: true },
          { id: 'w3', label: 'Tailwind CSS utility-first framework & animations', completed: true }
        ],
        resources: [{ name: 'MDN Web Docs', url: 'https://developer.mozilla.org/' }]
      },
      {
        id: 'web-2',
        title: 'Step 2: JavaScript Deep Dive (ES6+)',
        description: 'Understand closures, prototypes, event loop, Promises, async/await, and DOM manipulation.',
        checklist: [
          { id: 'w4', label: 'ES6+ Syntax: arrow functions, destructuring, spread/rest, modules', completed: true },
          { id: 'w5', label: 'Asynchronous JS: Fetch API, Promises, Async/Await, Error handling', completed: false },
          { id: 'w6', label: 'DOM manipulation, Event bubbling & LocalStorage / SessionStorage', completed: false }
        ],
        resources: [{ name: 'JavaScript.info', url: 'https://javascript.info/' }]
      },
      {
        id: 'web-3',
        title: 'Step 3: React & Modern Frontend Ecosystem',
        description: 'Build interactive SPAs using React, Hooks, state management, and component architecture.',
        checklist: [
          { id: 'w7', label: 'Component lifecycles, JSX, and Core Hooks (useState, useEffect, useMemo, useCallback)', completed: false },
          { id: 'w8', label: 'Client-side routing with React Router & Global State (Context / Zustand)', completed: false },
          { id: 'w9', label: 'Form handling, validation, and API data fetching (TanStack Query)', completed: false }
        ],
        resources: [{ name: 'React Official Documentation', url: 'https://react.dev/' }]
      },
      {
        id: 'web-4',
        title: 'Step 4: Backend Development (Node.js / Express / Next.js)',
        description: 'Build scalable servers, middleware, authentication, and secure REST APIs.',
        checklist: [
          { id: 'w10', label: 'Node.js runtime basics, Express routing, and custom middlewares', completed: false },
          { id: 'w11', label: 'Authentication with JWT, bcrypt password hashing, and cookies/sessions', completed: false },
          { id: 'w12', label: 'API security (CORS, Rate Limiting, Input Sanitization)', completed: false }
        ],
        resources: [{ name: 'Express Guide', url: 'https://expressjs.com/' }]
      },
      {
        id: 'web-5',
        title: 'Step 5: Databases & ORMs',
        description: 'Work with SQL (PostgreSQL) and NoSQL (MongoDB) databases and modern ORMs (Prisma).',
        checklist: [
          { id: 'w13', label: 'PostgreSQL relational modeling, migrations, and indexing', completed: false },
          { id: 'w14', label: 'Prisma ORM schema definition and query methods', completed: false },
          { id: 'w15', label: 'MongoDB & Mongoose document database modeling', completed: false }
        ],
        resources: [{ name: 'Prisma Documentation', url: 'https://www.prisma.io/docs' }]
      },
      {
        id: 'web-6',
        title: 'Step 6: Capstone Projects & Production Deployment',
        description: 'Deploy production-grade full-stack applications with CI/CD pipelines.',
        checklist: [
          { id: 'w16', label: 'Build SaaS product or collaboration platform with real-time features', completed: false },
          { id: 'w17', label: 'Deploy to Vercel/Render with environment variables and custom domain', completed: false },
          { id: 'w18', label: 'Setup automated testing with Jest/Vitest and GitHub Actions', completed: false }
        ],
        resources: [{ name: 'Vercel Deployment Guide', url: 'https://vercel.com/docs' }]
      }
    ]
  },
  'Data Analyst': {
    title: 'Data Analytics & Business Intelligence',
    description: 'Transform raw data into strategic insights using SQL, Python/R, Excel, PowerBI/Tableau, and statistical modeling.',
    icon: 'BarChart3',
    color: 'amber',
    steps: [
      {
        id: 'da-1',
        title: 'Step 1: Advanced Excel & Spreadsheet Mastery',
        description: 'Formulas, Pivot Tables, VLOOKUP/XLOOKUP, index-match, and financial modeling basics.',
        checklist: [
          { id: 'da1', label: 'Advanced formulas (XLOOKUP, SUMIFS, INDEX-MATCH)', completed: true },
          { id: 'da2', label: 'Pivot tables, slicers, and interactive dashboard creation', completed: true },
          { id: 'da3', label: 'Data validation and conditional formatting logic', completed: false }
        ],
        resources: [{ name: 'Excelisfun YouTube Series', url: 'https://youtube.com' }]
      },
      {
        id: 'da-2',
        title: 'Step 2: Relational Databases & Advanced SQL',
        description: 'The core superpower of data analysts: Joins, Window Functions, CTEs, and aggregations.',
        checklist: [
          { id: 'da4', label: 'Multi-table JOINs, subqueries, and GROUP BY aggregations', completed: false },
          { id: 'da5', label: 'Window functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD)', completed: false },
          { id: 'da6', label: 'Common Table Expressions (CTEs) and performance indexing', completed: false }
        ],
        resources: [{ name: 'Mode Analytics SQL Tutorial', url: 'https://mode.com/sql-tutorial/' }]
      },
      {
        id: 'da-3',
        title: 'Step 3: Python for Data Analysis (Pandas & NumPy)',
        description: 'Data cleaning, transformation, wrangling, and exploratory data analysis (EDA).',
        checklist: [
          { id: 'da7', label: 'NumPy arrays, mathematical operations, and vectorized computations', completed: false },
          { id: 'da8', label: 'Pandas DataFrames: filtering, grouping, merging, handling missing values', completed: false },
          { id: 'da9', label: 'Exploratory Data Analysis (EDA) workflow on real-world CSV datasets', completed: false }
        ],
        resources: [{ name: 'Kaggle Python & Pandas Micro-courses', url: 'https://kaggle.com/learn' }]
      },
      {
        id: 'da-4',
        title: 'Step 4: Data Visualization (Power BI / Tableau / Seaborn)',
        description: 'Build executive-ready KPI dashboards and visual storytelling charts.',
        checklist: [
          { id: 'da10', label: 'Matplotlib and Seaborn statistical visualization in Python', completed: false },
          { id: 'da11', label: 'Power BI / Tableau: Data modeling (Star schema) & DAX formulas', completed: false },
          { id: 'da12', label: 'Design 2 interactive business dashboards for sales & customer retention', completed: false }
        ],
        resources: [{ name: 'Storytelling with Data', url: 'https://storytellingwithdata.com' }]
      },
      {
        id: 'da-5',
        title: 'Step 5: Applied Statistics & Business Analytics',
        description: 'Hypothesis testing, A/B testing, regression analysis, and metrics definition.',
        checklist: [
          { id: 'da13', label: 'Descriptive stats, probability distributions, standard deviation & z-score', completed: false },
          { id: 'da14', label: 'Hypothesis testing (p-value, t-test, ANOVA, Chi-square)', completed: false },
          { id: 'da15', label: 'A/B testing methodology and sample size calculations', completed: false }
        ],
        resources: [{ name: 'StatQuest with Josh Starmer', url: 'https://statquest.org' }]
      },
      {
        id: 'da-6',
        title: 'Step 6: Real-World Portfolio Projects & Case Studies',
        description: 'Publish end-to-end data analysis case studies on GitHub & Tableau Public.',
        checklist: [
          { id: 'da16', label: 'E-commerce cohort analysis and churn prediction case study', completed: false },
          { id: 'da17', label: 'Publish interactive Tableau/PowerBI dashboard link on portfolio', completed: false },
          { id: 'da18', label: 'Prepare for SQL live interview coding questions', completed: false }
        ],
        resources: [{ name: 'StrataScratch Data Science Interview Questions', url: 'https://stratascratch.com' }]
      }
    ]
  },
  'AI/ML Engineer': {
    title: 'Artificial Intelligence & Machine Learning',
    description: 'From mathematical foundations and deep learning to generative AI, LLM prompting, and model deployment.',
    icon: 'Cpu',
    color: 'purple',
    steps: [
      {
        id: 'ai-1',
        title: 'Step 1: Mathematics & Linear Algebra Foundations',
        description: 'Master vectors, matrices, eigenvalues, multivariate calculus, probability & optimization.',
        checklist: [
          { id: 'm1', label: 'Linear Algebra: Matrix multiplication, inverses, eigenvectors, SVD', completed: true },
          { id: 'm2', label: 'Calculus: Derivatives, partial gradients, chain rule, Hessian matrices', completed: false },
          { id: 'm3', label: 'Probability & Distributions: Gaussian, Bayes theorem, expectation & variance', completed: false }
        ],
        resources: [{ name: '3Blue1Brown Essence of Linear Algebra', url: 'https://youtube.com' }]
      },
      {
        id: 'ai-2',
        title: 'Step 2: Classical Machine Learning with Scikit-Learn',
        description: 'Supervised and unsupervised algorithms, feature engineering, and evaluation metrics.',
        checklist: [
          { id: 'm4', label: 'Linear & Logistic Regression, Decision Trees, Random Forests, XGBoost', completed: false },
          { id: 'm5', label: 'Clustering: K-Means, DBSCAN, and Dimensionality Reduction (PCA, t-SNE)', completed: false },
          { id: 'm6', label: 'Model evaluation: Precision, Recall, F1-Score, ROC-AUC, Cross-Validation', completed: false }
        ],
        resources: [{ name: 'Hands-On Machine Learning with Scikit-Learn, Keras & TF', url: 'https://oreilly.com' }]
      },
      {
        id: 'ai-3',
        title: 'Step 3: Deep Learning & Neural Networks (PyTorch)',
        description: 'Perceptrons, backpropagation, CNNs for vision, RNNs/LSTMs for sequence data.',
        checklist: [
          { id: 'm7', label: 'PyTorch tensors, autograd, forward/backward passes, and Loss functions', completed: false },
          { id: 'm8', label: 'Convolutional Neural Networks (CNNs) & Transfer Learning (ResNet, EfficientNet)', completed: false },
          { id: 'm9', label: 'Regularization techniques: Dropout, Batch Normalization, Adam optimizer', completed: false }
        ],
        resources: [{ name: 'DeepLearning.AI Deep Learning Specialization', url: 'https://deeplearning.ai' }]
      },
      {
        id: 'ai-4',
        title: 'Step 4: Transformers & Modern NLP',
        description: 'Attention mechanisms, BERT, GPT architectures, tokenizers, and Hugging Face.',
        checklist: [
          { id: 'm10', label: 'Self-Attention mechanism and Transformer Architecture (Vaswani et al.)', completed: false },
          { id: 'm11', label: 'Hugging Face Transformers library: tokenizers, pipelines, pre-trained models', completed: false },
          { id: 'm12', label: 'Fine-tuning LLMs with LoRA / QLoRA techniques', completed: false }
        ],
        resources: [{ name: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course' }]
      },
      {
        id: 'ai-5',
        title: 'Step 5: Generative AI & Retrieval-Augmented Generation (RAG)',
        description: 'Build practical AI applications using LangChain/LlamaIndex and Vector Databases.',
        checklist: [
          { id: 'm13', label: 'Vector databases (Pinecone, ChromaDB, FAISS) & embedding generation', completed: false },
          { id: 'm14', label: 'Build end-to-end RAG system for document Q&A with evaluation', completed: false },
          { id: 'm15', label: 'Function calling, structured output generation, and AI Agent workflows', completed: false }
        ],
        resources: [{ name: 'DeepLearning.AI RAG Courses', url: 'https://deeplearning.ai' }]
      },
      {
        id: 'ai-6',
        title: 'Step 6: MLOps & Model Deployment',
        description: 'Deploy models as high-throughput APIs using FastAPI, Docker, and monitoring tools.',
        checklist: [
          { id: 'm16', label: 'Wrap PyTorch/ONNX models in high-speed FastAPI endpoints', completed: false },
          { id: 'm17', label: 'Dockerize model inference container and deploy to cloud (AWS/GCP)', completed: false },
          { id: 'm18', label: 'Track experiments using MLflow or Weights & Biases', completed: false }
        ],
        resources: [{ name: 'Made With ML MLOps Course', url: 'https://madewithml.com/' }]
      }
    ]
  },
  'Cybersecurity': {
    title: 'Cybersecurity & Ethical Hacking',
    description: 'Defend networks, analyze vulnerabilities, master penetration testing, and understand cryptography.',
    icon: 'Shield',
    color: 'red',
    steps: [
      {
        id: 'sec-1',
        title: 'Step 1: Networking & Protocol Fundamentals',
        description: 'Deep understanding of TCP/IP, subnetting, Wireshark packet analysis, DNS, and firewalls.',
        checklist: [
          { id: 'sc1', label: 'OSI 7 layers, TCP/UDP 3-way handshake, and IP routing', completed: true },
          { id: 'sc2', label: 'Packet capture and deep inspection using Wireshark', completed: false },
          { id: 'sc3', label: 'Network scanning & reconnaissance with Nmap', completed: false }
        ],
        resources: [{ name: 'Professor Messer CompTIA Network+ Series', url: 'https://professormesser.com' }]
      },
      {
        id: 'sec-2',
        title: 'Step 2: Linux Administration & Bash/Python Scripting',
        description: 'Command line power, Linux permissions, bash automation, and Python socket programming.',
        checklist: [
          { id: 'sc4', label: 'Linux directory hierarchy, user permissions (chmod/chown), and process inspection', completed: false },
          { id: 'sc5', label: 'Automate network scanning and log parsing using Python and Bash scripts', completed: false },
          { id: 'sc6', label: 'Master Kali Linux tool suite and terminal workflows', completed: false }
        ],
        resources: [{ name: 'OverTheWire Bandit Wargame', url: 'https://overthewire.org/wargames/bandit/' }]
      },
      {
        id: 'sec-3',
        title: 'Step 3: Web Application Security (OWASP Top 10)',
        description: 'SQL injection, XSS, CSRF, IDOR, Broken Access Control, and Burp Suite.',
        checklist: [
          { id: 'sc7', label: 'Burp Suite proxy configuration, request interception, and Repeater/Intruder', completed: false },
          { id: 'sc8', label: 'SQL Injection (SQLi), Cross-Site Scripting (XSS), and CSRF vulnerabilities', completed: false },
          { id: 'sc9', label: 'Complete PortSwigger Web Security Academy free labs', completed: false }
        ],
        resources: [{ name: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security' }]
      },
      {
        id: 'sec-4',
        title: 'Step 4: Cryptography & Identity Security',
        description: 'Symmetric/Asymmetric encryption (AES, RSA), hashing (SHA-256), PKI certificates, OAuth 2.0.',
        checklist: [
          { id: 'sc10', label: 'Understand AES, RSA, Diffie-Hellman key exchange, and digital signatures', completed: false },
          { id: 'sc11', label: 'SSL/TLS handshake mechanism, HTTPS certificates, and CA trust chains', completed: false },
          { id: 'sc12', label: 'Authentication tokens, OAuth2, and Single Sign-On (SSO) architecture', completed: false }
        ],
        resources: [{ name: 'Crypto101 Free Book', url: 'https://crypto101.io/' }]
      },
      {
        id: 'sec-5',
        title: 'Step 5: Penetration Testing & CTF Challenges',
        description: 'Hands-on practical exploitation and defense on TryHackMe & Hack The Box.',
        checklist: [
          { id: 'sc13', label: 'Complete TryHackMe Complete Beginner & Jr Penetration Tester learning paths', completed: false },
          { id: 'sc14', label: 'Solve 15+ Easy/Medium machines on Hack The Box', completed: false },
          { id: 'sc15', label: 'Write detailed vulnerability assessment reports with remediation steps', completed: false }
        ],
        resources: [{ name: 'TryHackMe Learning Paths', url: 'https://tryhackme.com' }]
      }
    ]
  },
  'UI/UX Designer': {
    title: 'UI/UX Product Design',
    description: 'Design intuitive, accessible, and delightful digital user experiences with Figma, research, and prototyping.',
    icon: 'Palette',
    color: 'rose',
    steps: [
      {
        id: 'ui-1',
        title: 'Step 1: Visual Design & Typography Foundations',
        description: 'Color theory, typography hierarchy, spacing rules (8pt grid), and layout balance.',
        checklist: [
          { id: 'u1', label: '8-point grid system, spatial rhythm, and responsive layouts', completed: true },
          { id: 'u2', label: 'Color psychology, 60-30-10 rule, contrast ratios for WCAG compliance', completed: false },
          { id: 'u3', label: 'Type scale, font pairings, line height, and readability principles', completed: false }
        ],
        resources: [{ name: 'Refactoring UI Book & Tips', url: 'https://refactoringui.com' }]
      },
      {
        id: 'ui-2',
        title: 'Step 2: Figma Mastery & Design Systems',
        description: 'Auto-layout, components, variants, variables, interactive components, and token management.',
        checklist: [
          { id: 'u4', label: 'Master Figma Auto Layout with nested frames and resizing behaviors', completed: false },
          { id: 'u5', label: 'Build reusable Component sets with Variants, Boolean, and Instance Swap props', completed: false },
          { id: 'u6', label: 'Set up Color and Typography Design Tokens / Variables in Figma', completed: false }
        ],
        resources: [{ name: 'Figma Official Tutorials', url: 'https://youtube.com/figma' }]
      },
      {
        id: 'ui-3',
        title: 'Step 3: User Research & Information Architecture',
        description: 'User interviews, personas, user journey mapping, wireframing, and card sorting.',
        checklist: [
          { id: 'u7', label: 'Conduct 5 user interviews and synthesize insights into user personas', completed: false },
          { id: 'u8', label: 'Create user flow diagrams and low-fidelity paper/digital wireframes', completed: false },
          { id: 'u9', label: 'Perform tree testing and card sorting for information hierarchy', completed: false }
        ],
        resources: [{ name: 'Nielsen Norman Group Articles', url: 'https://nngroup.com' }]
      },
      {
        id: 'ui-4',
        title: 'Step 4: Interactive Prototyping & Usability Testing',
        description: 'Smart animations, micro-interactions, mobile transitions, and user usability testing.',
        checklist: [
          { id: 'u10', label: 'Build realistic interactive prototypes with smart animate and delay triggers', completed: false },
          { id: 'u11', label: 'Run unmoderated or moderated usability tests on prototypes (Maze/Lyssna)', completed: false },
          { id: 'u12', label: 'Iterate designs based on direct usability feedback and heatmaps', completed: false }
        ],
        resources: [{ name: 'Maze UX Testing Guides', url: 'https://maze.co/guides/' }]
      },
      {
        id: 'ui-5',
        title: 'Step 5: Case Studies & Portfolio Website',
        description: 'Craft 2 in-depth case studies detailing problem statement, research, iterations, and final impact.',
        checklist: [
          { id: 'u13', label: 'Write Case Study 1: Mobile App redesign solving real user pain point', completed: false },
          { id: 'u14', label: 'Write Case Study 2: Web SaaS Dashboard with full design system', completed: false },
          { id: 'u15', label: 'Publish responsive portfolio on Framer, Webflow, or Notion', completed: false }
        ],
        resources: [{ name: 'Best UX Case Studies on Cofolios', url: 'https://cofolios.com' }]
      }
    ]
  }
};

