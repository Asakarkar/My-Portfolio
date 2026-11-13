export const PROJECTS = [
  {
    id: 'science-on-wheels',
    title: 'Science on Wheels',
    hook: 'A full-stack operational management platform powering mobile science laboratories and bringing hands-on STEM education to schools.',
    problem:
      'Managing multiple mobile science laboratories involves complex coordination of buses, school visits, staff rosters, equipment, consumables, and inventory. Without a centralized system, tracking stock movement, scheduling visits, and maintaining operational accountability becomes difficult.',
    solution:
      'Architected a centralized management platform with three role-based portals for administrators, regional coordinators, and field staff. Implemented school visit scheduling, fleet management, staff rosters, inventory allocation, and a transaction-based stock reconciliation workflow.',
    architecture:
      'React 19 and TypeScript frontend with a modular Node.js and Express backend. PostgreSQL provides relational data storage through Prisma ORM. Zod handles request validation, while role-scoped controllers enforce access boundaries. Three.js powers interactive visual elements in the interface.',
    stack: [
      'React 19',
      'TypeScript',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Prisma',
      'Zod',
      'Three.js',
    ],
    metrics: [
      { label: 'Mobile Labs', value: '5' },
      { label: 'UI Modules', value: '31' },
      { label: 'REST Endpoints', value: '20+' },
      { label: 'Role-Based Portals', value: '3' },
    ],
    challenges:
      'Maintaining inventory consistency across multiple operational locations was challenging. Implemented a four-step reconciliation workflow using atomic database transactions and non-negative constraints, enforcing Opening - Consumed = Closing to detect stock discrepancies.',
    learnings:
      'Inventory systems require strong transactional guarantees. Database constraints, atomic operations, and auditability are essential when software manages physical resources.',
    image: '/images/project-science-on-wheels.png',
    duration: 'July 2026 – Present',
    role: 'Full-stack Developer',
    liveUrl: 'https://science-on-wheels.vercel.app/login',
    githubUrl: 'https://github.com/Asakarkar/Science-on-Wheels',
  },
  {
    id: 'fox',
    title: 'Fox — Multi-Tenant Project Management SaaS',
    hook: 'A scalable multi-tenant SaaS platform enabling teams to manage workspaces, projects, tasks, and collaboration with secure access control.',
    problem:
      'Traditional project management applications often struggle with workspace isolation, nested resource permissions, and secure collaboration. Managing multiple organizations within one application requires strict data boundaries and reliable authorization.',
    solution:
      'Architected a multi-tenant MERN application where users can create and join multiple workspaces. Implemented workspace-scoped data access, nested role-based permissions, secure authentication, project management, task management, and invitation-based collaboration.',
    architecture:
      'React and TypeScript frontend with React Query for server-state management. Node.js and Express backend with MongoDB and Mongoose. Zod validates incoming requests. JWT-based authentication, HTTP-only cookie sessions, Google OAuth 2.0, and password hashing secure user access. Mongoose transactions protect multi-step database operations.',
    stack: [
      'React.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'Tailwind CSS',
      'React Query',
      'Zod',
      'Google OAuth 2.0',
    ],
    metrics: [
      { label: 'REST Endpoints', value: '25+' },
      { label: 'User Roles', value: '3' },
      { label: 'Permission Checks', value: '12+' },
      { label: 'Auth Methods', value: '2' },
    ],
    challenges:
      'Preventing cross-workspace data leakage across nested resources was a major architectural challenge. Solved by enforcing workspace ID scoping across all relevant queries and implementing granular authorization checks for workspace, project, and task operations.',
    learnings:
      'Multi-tenancy is fundamentally a data-isolation problem. Authorization must be enforced at the backend query and resource level rather than relying on frontend restrictions.',
    image: '/images/project-fox.png',
    duration: 'December 2025 – Present',
    role: 'Full-stack Developer',
    liveUrl: '#',
    githubUrl: 'https://github.com/Asakarkar/Fox-2.0',
  },
  {
    id: 'cardiopulse',
    title: 'CardioPulse — ECG Arrhythmia Classification',
    hook: 'An end-to-end machine learning platform that analyzes ECG patient data and classifies cardiac arrhythmias using comparative ML experiments.',
    problem:
      'ECG arrhythmia classification involves high-dimensional medical datasets, missing values, and complex relationships between features. Building reliable classification models requires careful preprocessing, dimensionality reduction, and evaluation without data leakage.',
    solution:
      'Developed an end-to-end machine learning pipeline using the UCI Arrhythmia dataset containing 452 patient records, 279 features, and 16 classes. Trained and compared 12 model configurations using different algorithms and PCA configurations. Achieved 80.22% test accuracy with Kernelized SVC and Linear SVC on a held-out test set.',
    architecture:
      'Python-based ML pipeline using Pandas and NumPy for preprocessing, scikit-learn for model training and evaluation, and PCA for dimensionality reduction. FastAPI exposes prediction endpoints, while React 19 provides the frontend. Joblib handles model serialization and Pydantic validates API data.',
    stack: [
      'Python',
      'scikit-learn',
      'FastAPI',
      'React 19',
      'Tailwind CSS',
      'Pandas',
      'NumPy',
      'PCA',
      'SVM',
      'Joblib',
      'Pydantic',
    ],
    metrics: [
      { label: 'Test Accuracy', value: '80.22%' },
      { label: 'Models Compared', value: '12' },
      { label: 'PCA Dimensions', value: '122' },
      { label: 'Variance Retained', value: '98.07%' },
    ],
    challenges:
      'High-dimensional features and overfitting affected model generalization. Implemented a leakage-free preprocessing pipeline by fitting mean imputation, standard scaling, and PCA exclusively on the training split. Reduced 278 features to 122 components while retaining 98.07% of variance.',
    learnings:
      'Model accuracy alone does not establish model reliability. Proper train-test separation, leakage prevention, dimensionality reduction, and comparative experimentation are essential for meaningful ML evaluation.',
    image: '/images/project-cariopulse.png',
    duration: 'July 2026 – Present',
    role: 'ML & Full-stack Developer',
    liveUrl: '#',
    githubUrl: 'https://github.com/Asakarkar/CardioPulse',
  },
  {
    id: 'smart-college-event',
    title: 'Smart College Event Management System',
    hook: 'A Java-based event registration platform featuring multi-level approvals, design-pattern-driven architecture, and database-backed event management.',
    problem:
      'College event registration requires coordination between students, event organizers, faculty coordinators, and department heads. Manual approval processes and disconnected registration systems make it difficult to manage seats, notifications, cancellations, and event approvals.',
    solution:
      'Developed a Java 17 event management platform with a web interface, console client, and embedded REST API server. Implemented a three-tier approval workflow, event registration, seat availability management, cancellation handling, and fee calculation using interchangeable pricing strategies.',
    architecture:
      'Java 17 application with an embedded Java HTTP server exposing REST APIs. JDBC manages SQLite persistence across four relational tables. Maven handles dependency management, while JUnit 5 supports testing. Applied 13 design patterns to build a modular architecture following SOLID principles.',
    stack: [
      'Java 17',
      'JDBC',
      'SQLite',
      'Maven',
      'JUnit 5',
      'REST API',
      'OOP',
      'Design Patterns',
    ],
    metrics: [
      { label: 'Design Patterns', value: '13' },
      { label: 'Approval Levels', value: '3' },
      { label: 'Registration Stages', value: '10' },
      { label: 'Database Tables', value: '4' },
    ],
    challenges:
      'Coordinating multi-stage event approvals while keeping the application loosely coupled was challenging. Implemented Chain of Responsibility for the three-tier approval workflow and Mediator to orchestrate the 10-step registration pipeline.',
    learnings:
      'Design patterns are most valuable when they solve real architectural problems. Separating responsibilities through SOLID principles improves maintainability, extensibility, and testability.',
    image: '/images/project-smart-college-event-management.png',
    duration: 'September 2026',
    role: 'Java Backend Developer',
    liveUrl: '#',
    githubUrl: 'https://github.com/Asakarkar/Smart-College-Event-Managment-System',
  },
];
