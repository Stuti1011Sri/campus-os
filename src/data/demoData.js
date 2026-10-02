import { CAREER_ROADMAPS } from './roadmapsData';

// Generate dynamic dates so demo data is always fresh relative to right now
const today = new Date();

const getFutureDate = (daysAhead) => {
  const d = new Date(today);
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
};

const getPastDate = (daysAgo) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const DEMO_USER_PROFILE = {
  name: 'Aryan Sharma',
  collegeName: 'National Institute of Technology (NIT)',
  course: 'B.Tech',
  branch: 'Computer Science & Engineering',
  year: '2nd Year',
  semester: '4th Semester',
  careerGoal: 'Software Developer',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  targetAttendancePercentage: 75,
  joinedDate: getPastDate(90)
};

export const DEMO_SUBJECTS = [
  {
    id: 'sub-1',
    name: 'Data Structures & Algorithms',
    code: 'CS201',
    professor: 'Dr. Ramesh Kumar',
    room: 'Hall B-302',
    color: '#6366F1', // Indigo
    schedule: [
      { day: 'Monday', time: '09:00 AM - 10:00 AM' },
      { day: 'Wednesday', time: '11:00 AM - 12:00 PM' },
      { day: 'Friday', time: '02:00 PM - 03:00 PM' }
    ]
  },
  {
    id: 'sub-2',
    name: 'Database Management Systems',
    code: 'CS202',
    professor: 'Prof. Ananya Sen',
    room: 'Lab 4 / CS Dept',
    color: '#EC4899', // Pink
    schedule: [
      { day: 'Tuesday', time: '10:00 AM - 11:30 AM' },
      { day: 'Thursday', time: '10:00 AM - 11:30 AM' }
    ]
  },
  {
    id: 'sub-3',
    name: 'Operating Systems',
    code: 'CS203',
    professor: 'Dr. Vikram Rao',
    room: 'Room 204',
    color: '#10B981', // Emerald
    schedule: [
      { day: 'Monday', time: '11:00 AM - 12:00 PM' },
      { day: 'Wednesday', time: '09:00 AM - 10:00 AM' },
      { day: 'Thursday', time: '02:00 PM - 03:00 PM' }
    ]
  },
  {
    id: 'sub-4',
    name: 'Digital Electronics',
    code: 'EC205',
    professor: 'Dr. Sneha Verma',
    room: 'ECE Annex 101',
    color: '#F59E0B', // Amber
    schedule: [
      { day: 'Tuesday', time: '02:00 PM - 03:30 PM' },
      { day: 'Friday', time: '10:00 AM - 11:00 AM' }
    ]
  },
  {
    id: 'sub-5',
    name: 'Discrete Mathematics',
    code: 'MA201',
    professor: 'Prof. Alok Gupta',
    room: 'Lecture Hall 1',
    color: '#8B5CF6', // Purple
    schedule: [
      { day: 'Monday', time: '02:00 PM - 03:00 PM' },
      { day: 'Wednesday', time: '02:00 PM - 03:00 PM' },
      { day: 'Friday', time: '09:00 AM - 10:00 AM' }
    ]
  }
];

export const DEMO_ATTENDANCE = {
  'sub-1': { total: 40, present: 32, absent: 8 }, // 80% (Safe)
  'sub-2': { total: 38, present: 27, absent: 11 }, // 71.05% (Below 75% warning)
  'sub-3': { total: 40, present: 36, absent: 4 }, // 90% (Great)
  'sub-4': { total: 30, present: 26, absent: 4 }, // 86.6% (Safe)
  'sub-5': { total: 40, present: 33, absent: 7 }  // 82.5% (Safe)
};

export const DEMO_ASSIGNMENTS = [
  {
    id: 'asg-1',
    title: 'Implement Red-Black Trees & AVL Rotation Benchmarks',
    subjectId: 'sub-1',
    subjectName: 'Data Structures & Algorithms',
    description: 'Implement insertion, deletion and tree rotations in C++ with time execution benchmarks.',
    dueDate: getFutureDate(2),
    priority: 'High',
    status: 'In Progress',
    createdAt: getPastDate(5)
  },
  {
    id: 'asg-2',
    title: 'SQL Schema Normalization & B+ Tree Indexing Queries',
    subjectId: 'sub-2',
    subjectName: 'Database Management Systems',
    description: 'Normalize an un-normalized university dataset up to BCNF and write 10 complex analytical queries with explain plans.',
    dueDate: getFutureDate(5),
    priority: 'High',
    status: 'To Do',
    createdAt: getPastDate(3)
  },
  {
    id: 'asg-3',
    title: 'CPU Scheduling Simulator (Round Robin & Multi-Level Queue)',
    subjectId: 'sub-3',
    subjectName: 'Operating Systems',
    description: 'Create a visual simulator displaying Gantt charts and calculating average turnaround/waiting times in Python or C.',
    dueDate: getFutureDate(9),
    priority: 'Medium',
    status: 'To Do',
    createdAt: getPastDate(2)
  },
  {
    id: 'asg-4',
    title: 'Combinational Circuit Logic Minimization with K-Maps',
    subjectId: 'sub-4',
    subjectName: 'Digital Electronics',
    description: 'Solve problem set 4 including 4-variable and 5-variable Karnaugh Maps and simulate in Logisim.',
    dueDate: getPastDate(1), // Overdue for demo
    priority: 'Medium',
    status: 'To Do',
    createdAt: getPastDate(7)
  },
  {
    id: 'asg-5',
    title: 'Graph Theory Proofs on Euler Tours & Planarity',
    subjectId: 'sub-5',
    subjectName: 'Discrete Mathematics',
    description: 'Complete 8 mathematical induction proofs regarding planar graphs and chromatic numbers.',
    dueDate: getPastDate(3),
    priority: 'Low',
    status: 'Completed',
    createdAt: getPastDate(10)
  }
];

export const DEMO_EXAMS = [
  {
    id: 'ex-1',
    subjectId: 'sub-1',
    subjectName: 'Data Structures & Algorithms',
    examType: 'Mid-Term Exam',
    examDate: getFutureDate(6),
    examTime: '10:00 AM - 01:00 PM',
    room: 'Central Examination Hall 2',
    syllabus: [
      { id: 's1', topic: 'Asymptotic Analysis & Master Theorem', done: true },
      { id: 's2', topic: 'Linear Data Structures & Amortized Analysis', done: true },
      { id: 's3', topic: 'Trees, BSTs, Heaps & Segment Trees', done: false },
      { id: 's4', topic: 'Graph Algorithms (Dijkstra, Bellman-Ford, Kruskal)', done: false }
    ],
    notes: 'Calculators not permitted. Carry College ID card.'
  },
  {
    id: 'ex-2',
    subjectId: 'sub-2',
    subjectName: 'Database Management Systems',
    examType: 'Mid-Term Exam',
    examDate: getFutureDate(12),
    examTime: '02:00 PM - 05:00 PM',
    room: 'Room 301',
    syllabus: [
      { id: 's5', topic: 'Relational Algebra & Tuple Calculus', done: true },
      { id: 's6', topic: 'Functional Dependencies & Normalization (1NF to 5NF)', done: true },
      { id: 's7', topic: 'Transaction Processing & ACID Properties', done: false },
      { id: 's8', topic: 'Concurrency Control (2PL, Timestamp ordering)', done: false }
    ],
    notes: 'Bring graph sheets for ER Diagram modeling question.'
  },
  {
    id: 'ex-3',
    subjectId: 'sub-3',
    subjectName: 'Operating Systems',
    examType: 'Lab Practical & Viva',
    examDate: getFutureDate(18),
    examTime: '09:30 AM - 12:30 PM',
    room: 'OS Systems Lab 1',
    syllabus: [
      { id: 's9', topic: 'POSIX Threads & Mutex Locks in C', done: true },
      { id: 's10', topic: 'Dining Philosophers & Reader-Writer Semaphore problems', done: false },
      { id: 's11', topic: 'Custom Shell implementation & Fork/Exec syscalls', done: false }
    ],
    notes: 'Prepare GitHub repository of lab programs for external examiner.'
  }
];

export const DEMO_STUDY_SESSIONS = [
  {
    id: 'ss-1',
    subjectId: 'sub-1',
    subjectName: 'Data Structures & Algorithms',
    topic: 'Dynamic Programming & Memoization Patterns',
    date: getFutureDate(0), // Today
    startTime: '05:00 PM',
    durationMinutes: 90,
    completed: false,
    notes: 'Solve LeetCode #322 (Coin Change) and #300 (Longest Increasing Subsequence).'
  },
  {
    id: 'ss-2',
    subjectId: 'sub-2',
    subjectName: 'Database Management Systems',
    topic: 'Transactions & Two-Phase Locking (2PL)',
    date: getFutureDate(0), // Today
    startTime: '08:00 PM',
    durationMinutes: 60,
    completed: false,
    notes: 'Review strict vs rigorous 2PL slide deck.'
  },
  {
    id: 'ss-3',
    subjectId: 'sub-3',
    subjectName: 'Operating Systems',
    topic: 'Virtual Memory & Page Replacement Algorithms',
    date: getFutureDate(1), // Tomorrow
    startTime: '06:00 PM',
    durationMinutes: 75,
    completed: false,
    notes: 'Work through Belady\'s Anomaly examples and FIFO vs LRU comparisons.'
  },
  {
    id: 'ss-4',
    subjectId: 'sub-5',
    subjectName: 'Discrete Mathematics',
    topic: 'Recurrence Relations & Generating Functions',
    date: getPastDate(1),
    startTime: '04:00 PM',
    durationMinutes: 60,
    completed: true,
    notes: 'Completed all 5 practice exercises from Rosen Chapter 8.'
  }
];

export const DEMO_PROJECTS = [
  {
    id: 'prj-1',
    name: 'DevSync - Collaborative Markdown Workspace',
    description: 'A real-time multiplayer code and markdown documentation editor with live cursor presence and version history.',
    techStack: ['React', 'Node.js', 'WebSockets', 'TailwindCSS', 'Redis'],
    startDate: getPastDate(45),
    deadline: getFutureDate(20),
    githubUrl: 'https://github.com/aryansharma/devsync-workspace',
    liveUrl: 'https://devsync-preview.vercel.app',
    status: 'Development',
    progressPercentage: 65,
    milestones: [
      { id: 'm1', title: 'Design system & rich text editor engine', completed: true },
      { id: 'm2', title: 'WebSocket CRDT synchronization layer', completed: true },
      { id: 'm3', title: 'User authentication & workspace permissions', completed: false },
      { id: 'm4', title: 'Document export (PDF/Markdown) and deployment', completed: false }
    ]
  },
  {
    id: 'prj-2',
    name: 'Campus RideShare - Student Commute Pool',
    description: 'A verified peer-to-peer campus ride sharing web app helping students carpool safely between campus and transit hubs.',
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Google Maps API'],
    startDate: getPastDate(15),
    deadline: getFutureDate(40),
    githubUrl: 'https://github.com/aryansharma/campus-rideshare',
    liveUrl: '',
    status: 'Planning',
    progressPercentage: 25,
    milestones: [
      { id: 'm5', title: 'User stories & database schema design', completed: true },
      { id: 'm6', title: 'Route matching algorithm & geocoding', completed: false },
      { id: 'm7', title: 'In-app chat & ride confirmation flow', completed: false }
    ]
  },
  {
    id: 'prj-3',
    name: 'AlgoViz - 3D Sorting & Graph Visualizer',
    description: 'Interactive visual tool for learning Pathfinding (Dijkstra, A*) and Sorting algorithms with custom speed & step controls.',
    techStack: ['JavaScript', 'Canvas API', 'CSS3', 'HTML5'],
    startDate: getPastDate(80),
    deadline: getPastDate(20),
    githubUrl: 'https://github.com/aryansharma/algoviz-3d',
    liveUrl: 'https://algoviz-interactive.surge.sh',
    status: 'Completed',
    progressPercentage: 100,
    milestones: [
      { id: 'm8', title: 'Core sorting visual engine', completed: true },
      { id: 'm9', title: 'Grid maze generator and pathfinder', completed: true },
      { id: 'm10', title: 'Audio synthesis on element swaps', completed: true },
      { id: 'm11', title: 'Published open source on GitHub', completed: true }
    ]
  }
];

export const DEMO_RESOURCES = [
  {
    id: 'res-1',
    title: 'NeetCode Roadmap & Problem Explanations',
    category: 'DSA',
    url: 'https://neetcode.io/roadmap',
    description: 'Interactive visual flowchart of all essential algorithmic categories with free video walkthroughs.',
    tags: ['LeetCode', 'Algorithms', 'Interview Prep'],
    isFavorite: true
  },
  {
    id: 'res-2',
    title: 'Full Stack Open - University of Helsinki',
    category: 'Programming',
    url: 'https://fullstackopen.com/en/',
    description: 'World-renowned free deep-dive course covering modern JavaScript, React, Redux, Node.js, GraphQL and TypeScript.',
    tags: ['React', 'NodeJS', 'FullStack', 'Free Certificate'],
    isFavorite: true
  },
  {
    id: 'res-3',
    title: 'Operating Systems: Three Easy Pieces (OSTEP)',
    category: 'Learning',
    url: 'https://pages.cs.wisc.edu/~remzi/OSTEP/',
    description: 'The golden standard textbook for Virtualization, Concurrency, and Persistence. Freely available online.',
    tags: ['OS', 'CS Fundamentals', 'Textbook'],
    isFavorite: false
  },
  {
    id: 'res-4',
    title: 'Simplify Tech Internships 2025/2026 Tracker',
    category: 'Internships',
    url: 'https://github.com/SimplifyJobs/Summer2025-Internships',
    description: 'Actively maintained repository of verified software engineering internships with 1-click apply links.',
    tags: ['Internships', 'Jobs', 'Hiring'],
    isFavorite: true
  },
  {
    id: 'res-5',
    title: 'Awesome System Design Primer by Donne Martin',
    category: 'Career',
    url: 'https://github.com/donnemartin/system-design-primer',
    description: 'Learn how to design large-scale systems. Covers scalability, caching, load balancers, and CDN architecture.',
    tags: ['System Design', 'Architecture', 'SDE'],
    isFavorite: false
  },
  {
    id: 'res-6',
    title: 'Lucide Icons & Tailwind CSS Component Library',
    category: 'Projects',
    url: 'https://lucide.dev',
    description: 'Crisp, lightweight icons and modern design system components for building polished portfolio apps.',
    tags: ['UI', 'Icons', 'Frontend'],
    isFavorite: false
  },
  {
    id: 'res-7',
    title: 'University Digital Library & IEEE Xplore Portal',
    category: 'College',
    url: 'https://ieeexplore.ieee.org/',
    description: 'Access research papers, whitepapers, and academic conference publications using institute credentials.',
    tags: ['Research', 'Papers', 'IEEE'],
    isFavorite: false
  }
];

export const DEMO_COLLEGE_INFO = {
  institution: 'National Institute of Technology',
  portalUrl: 'https://erp.nit.edu.in/student/portal',
  examPortalUrl: 'https://exams.nit.edu.in/results',
  libraryUrl: 'https://library.nit.edu.in/opac',
  placementCellUrl: 'https://tnp.nit.edu.in',
  quickLinks: [
    { id: 'cl-1', title: 'Student ERP Portal', url: 'https://erp.nit.edu.in', category: 'Portals', icon: 'Globe' },
    { id: 'cl-2', title: 'Academic Calendar 2025-26', url: 'https://nit.edu.in/academics/calendar.pdf', category: 'Academics', icon: 'Calendar' },
    { id: 'cl-3', title: 'Central Library E-Resources', url: 'https://library.nit.edu.in', category: 'Library', icon: 'BookOpen' },
    { id: 'cl-4', title: 'Placement & Internship Cell', url: 'https://tnp.nit.edu.in', category: 'Career', icon: 'Briefcase' },
    { id: 'cl-5', title: 'Hostel & Mess Committee Notices', url: 'https://hostels.nit.edu.in', category: 'Campus Life', icon: 'Home' }
  ],
  contacts: [
    { id: 'ct-1', name: 'Dr. Ramesh Kumar', role: 'Head of Department (CSE)', email: 'hod.cse@nit.edu.in', phone: '+91 98765 43210', office: 'CS Block, Room 102' },
    { id: 'ct-2', name: 'Prof. Ananya Sen', role: 'Faculty Academic Advisor', email: 'ananya.sen@nit.edu.in', phone: '+91 98765 43211', office: 'Faculty Cabin 204' },
    { id: 'ct-3', name: 'Training & Placement Office', role: 'Placement Coordinator', email: 'placements@nit.edu.in', phone: '+91 98765 43212', office: 'Admin Building Wing C' }
  ]
};

export const DEMO_NOTES = [
  {
    id: 'nt-1',
    title: 'Red-Black Tree Properties & Rotation Rules',
    category: 'DSA',
    subjectId: 'sub-1',
    content: `# Red-Black Trees Summary

1. Every node is either **RED** or **BLACK**.
2. The root is always **BLACK**.
3. No two red nodes can be adjacent (A red node cannot have a red parent or red child).
4. Every path from root to NULL leaves has the exact same count of **BLACK** nodes (Black Height).
5. Leaf nodes (NULL pointers) are treated as **BLACK**.

### Rotations:
- **Left Rotation (Node X)**: Right child Y becomes root of subtree, Y's left child becomes X's right child.
- **Right Rotation (Node Y)**: Left child X becomes root of subtree, X's right child becomes Y's left child.

Time Complexity: Search, Insert, Delete are guaranteed $O(\\log N)$.`,
    updatedAt: getPastDate(2),
    isPinned: true
  },
  {
    id: 'nt-2',
    title: 'ACID Properties & Transaction Isolation Levels',
    category: 'DBMS',
    subjectId: 'sub-2',
    content: `# ACID Properties in Relational Databases

- **Atomicity**: All operations in transaction succeed, or all rollback. Handled by Undo Logs / WAL.
- **Consistency**: Database transitions from one valid state to another, preserving integrity constraints.
- **Isolation**: Concurrent transactions do not interfere with one another.
- **Durability**: Committed changes survive system crashes or power failures. Handled by Redo Logs.

### ANSI SQL Isolation Levels:
1. **Read Uncommitted** (Dirty Reads possible)
2. **Read Committed** (Prevents dirty reads; default in PostgreSQL)
3. **Repeatable Read** (Prevents non-repeatable reads; uses MVCC)
4. **Serializable** (Strict serial execution, highest isolation, slowest)`,
    updatedAt: getPastDate(4),
    isPinned: true
  },
  {
    id: 'nt-3',
    title: 'Deadlock Necessary Conditions & Coffman Conditions',
    category: 'OS',
    subjectId: 'sub-3',
    content: `# Coffman 4 Conditions for Deadlock

Deadlock occurs if and only if all 4 conditions hold simultaneously:

1. **Mutual Exclusion**: At least one resource must be held in a non-shareable mode.
2. **Hold and Wait**: A process is holding at least one resource and requesting additional resources.
3. **No Preemption**: Resources cannot be forcibly taken from a process; must be released voluntarily.
4. **Circular Wait**: A closed chain of processes exists such that each process holds at least one resource needed by the next.

### Prevention:
- Prevent Circular Wait by numbering all resources and requiring processes to request in strictly ascending order.`,
    updatedAt: getPastDate(6),
    isPinned: false
  },
  {
    id: 'nt-4',
    title: 'TCP 3-Way Handshake & FIN Termination Flow',
    category: 'Computer Networks',
    subjectId: null,
    content: `# TCP Connection Lifecycle

### 3-Way Handshake (Establishment):
1. Client -> Server: **SYN** (Seq = X)
2. Server -> Client: **SYN + ACK** (Seq = Y, Ack = X + 1)
3. Client -> Server: **ACK** (Seq = X + 1, Ack = Y + 1)

### 4-Way Handshake (Termination):
1. Client -> Server: **FIN** (Seq = u)
2. Server -> Client: **ACK** (Ack = u + 1)
3. Server -> Client: **FIN** (Seq = v)
4. Client -> Server: **ACK** (Ack = v + 1) -> Client enters TIME_WAIT (2 * MSL).`,
    updatedAt: getPastDate(12),
    isPinned: false
  }
];

export const DEMO_TODAY_TASKS = [
  { id: 'tsk-1', text: 'Attend DSA Lecture on Segment Trees at 09:00 AM', completed: true, category: 'class' },
  { id: 'tsk-2', text: 'Finish Red-Black Tree rotation benchmark assignment', completed: false, category: 'assignment' },
  { id: 'tsk-3', text: 'Solve 2 LeetCode Medium problems (DP / Graphs)', completed: true, category: 'career' },
  { id: 'tsk-4', text: 'Review DBMS Normalization notes for 30 mins', completed: false, category: 'study' }
];

export const DEMO_ACTIVITY_LOG = [
  { id: 'act-1', message: 'Marked present in Data Structures & Algorithms', time: 'Today at 09:15 AM', type: 'attendance' },
  { id: 'act-2', message: 'Completed task: Solve 2 LeetCode Medium problems', time: 'Today at 03:30 PM', type: 'task' },
  { id: 'act-3', message: 'Created new project milestone: WebSocket CRDT sync', time: 'Yesterday at 07:20 PM', type: 'project' },
  { id: 'act-4', message: 'Updated note: ACID Properties & Transaction Isolation', time: '2 days ago', type: 'notes' }
];

