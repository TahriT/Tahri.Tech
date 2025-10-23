// Tahri Turner's Professional Projects
const PROJECTS_DATA = {
    // AI/Digital Transformation Project at IDEXX
    'idexx-ai-platform': {
        id: 'idexx-ai-platform',
        title: 'AI-Powered Industrial Data Platform',
        category: 'ai-data',
        tags: ['AI/ML', 'LLMOps', 'Snowflake', 'AWS', 'Unified Name Space'],
        image: 'https://via.placeholder.com/800x400/00ff88/000000?text=IDEXX+AI+Platform',
        demoUrl: 'https://idexx.com',
        githubUrl: 'https://github.com/tahriturner', // Update with your GitHub
        description: 'Leading digital transformation at IDEXX through AI integration and advanced data modeling. Built unified name space architecture for seamless data flow across manufacturing systems, implementing LLMOps for intelligent automation and predictive analytics.',
        technologies: ['Ignition', 'Snowflake Cloud', 'AWS', 'Large Language Models', 'MQTT', 'Data Historian', 'MCP Server', 'Python'],
        features: [
            'Unified Name Space (UNS) implementation for enterprise data integration',
            'LLMOps pipeline for automated decision making',
            'Real-time SCADA data analysis with AI insights',
            'Cloud-native data warehousing with Snowflake',
            'MCP Server integration for external system connectivity',
            'Continuous integration for industrial AI workflows'
        ],
        skillsUsed: ['ai-ml', 'data-engineering', 'scada', 'cloud-architecture'],
        complexity: 'expert'
    },

    // Robotics & Automation Project at LG-MRI
    'lg-mri-automation': {
        id: 'lg-mri-automation',
        title: 'Intelligent Manufacturing Automation System',
        category: 'automation',
        tags: ['Robotics', 'Python', 'AGV', 'MES', 'Ignition'],
        image: 'https://via.placeholder.com/800x400/ff6b35/000000?text=LG-MRI+Automation',
        demoUrl: 'https://lg-mri.com',
        githubUrl: 'https://github.com/tahriturner',
        description: 'Spearheaded complete automation ecosystem integrating SCADA, HMI, MES systems with intelligent robotics. Orchestrated AGV path planning and robot coordination through advanced Ignition HTTP requests, revolutionizing manufacturing efficiency.',
        technologies: ['Python', 'Ignition SCADA', 'FANUC Robots', 'C#', 'SQL', 'PowerBI', 'Git', 'CI/CD'],
        features: [
            'Automated Guided Vehicle (AGV) path planning and coordination',
            'FANUC robot integration with real-time control systems',
            'Database-centric recipe management for parametric processes',
            'MES & ERP integration for seamless manufacturing workflow',
            'Dynamic PowerBI dashboards for real-time analytics',
            'Python-driven external system integrations'
        ],
        skillsUsed: ['robotics', 'automation', 'mes-erp', 'data-visualization'],
        complexity: 'expert'
    },

    // Multi-Robot Manufacturing at Freudenberg
    'freudenberg-robotics': {
        id: 'freudenberg-robotics',
        title: 'Multi-Robot Manufacturing Ecosystem',
        category: 'robotics',
        tags: ['FANUC', 'KAWASAKI', 'Vision Systems', 'PLC', 'CAD'],
        image: 'https://via.placeholder.com/800x400/61dafb/000000?text=Freudenberg+Robotics',
        demoUrl: 'https://freudenberg.com',
        githubUrl: 'https://github.com/tahriturner',
        description: 'Designed and implemented comprehensive robotics automation for global manufacturing operations. Managed FANUC & KAWASAKI robot programming, automated vision control systems, and lean manufacturing processes across international facilities.',
        technologies: ['FANUC Robots', 'KAWASAKI Robots', 'PLC Programming', 'HMI', 'SQL', 'AutoCAD', 'SolidWorks', 'Vision Systems'],
        features: [
            'Multi-vendor robot automation (FANUC & KAWASAKI)',
            'Automated Vision Control (AVC) systems implementation',
            'Global collaboration across USA, France, Italy, Japan, Germany',
            'Injection molding automation with Arburg & Steinl machines',
            'Process Flow diagrams and PFMEA documentation',
            'Lean manufacturing process optimization'
        ],
        skillsUsed: ['robotics', 'vision-systems', 'manufacturing', 'cad-design'],
        complexity: 'advanced'
    }
};

// Tahri Turner's Professional Skill Tree - Industrial Automation & AI Expert (Scaled 2.5x larger)
const SKILL_TREE_STRUCTURE = {
    root: {
        position: [0, -1, 0],
        name: 'Engineering Foundation',
        level: 0,
        children: ['automation-systems', 'ai-data', 'robotics']
    },
    
    // Main Professional Domains
    'automation-systems': {
        position: [-1.5, 1.8, 0.2],
        name: 'Automation & SCADA',
        color: '#ff6b35',
        level: 1,
        angle: -45,
        children: ['ignition', 'mes-erp', 'plc-hmi', 'networking'],
        projects: ['lg-mri-automation']
    },
    
    'ai-data': {
        position: [1.5, 2.0, -0.1],
        name: 'AI & Data Engineering',
        color: '#00ff88',
        level: 1,
        angle: 45,
        children: ['ai-ml', 'data-engineering', 'cloud-architecture'],
        projects: ['idexx-ai-platform']
    },
    
    'robotics': {
        position: [0, 2.3, 0.9],
        name: 'Robotics & Manufacturing',
        color: '#61dafb',
        level: 1,
        angle: 0,
        children: ['robot-programming', 'vision-systems', 'manufacturing'],
        projects: ['freudenberg-robotics']
    },
    
    // Automation & SCADA Branch
    ignition: {
        position: [-2.2, 3.0, 0.5],
        name: 'Ignition Platform',
        color: '#ff8c00',
        level: 2,
        parent: 'automation-systems',
        children: ['python-integration', 'http-requests']
    },
    
    'mes-erp': {
        position: [-1.0, 3.2, -0.3],
        name: 'MES & ERP Systems',
        color: '#4169e1',
        level: 2,
        parent: 'automation-systems',
        children: ['jobboss', 'recipe-management']
    },
    
    'plc-hmi': {
        position: [-1.8, 2.6, -0.5],
        name: 'PLC & HMI',
        color: '#32cd32',
        level: 2,
        parent: 'automation-systems',
        children: ['ladder-logic', 'scada-development']
    },
    
    networking: {
        position: [-0.8, 2.8, 0.7],
        name: 'Industrial Networking',
        color: '#ff1493',
        level: 2,
        parent: 'automation-systems',
        children: ['mqtt', 'modbus']
    },
    
    // AI & Data Engineering Branch
    'ai-ml': {
        position: [2.0, 3.1, -0.4],
        name: 'AI & Machine Learning',
        color: '#9400d3',
        level: 2,
        parent: 'ai-data',
        children: ['llmops', 'predictive-analytics']
    },
    
    'data-engineering': {
        position: [1.2, 3.3, 0.3],
        name: 'Data Engineering',
        color: '#1e90ff',
        level: 2,
        parent: 'ai-data',
        children: ['snowflake', 'data-historian', 'unified-namespace']
    },
    
    'cloud-architecture': {
        position: [0.92, 1.08, 0.04],
        name: 'Cloud Architecture',
        color: '#ffa500',
        level: 2,
        parent: 'ai-data',
        children: ['aws', 'mcp-server']
    },
    
    // Robotics & Manufacturing Branch
    'robot-programming': {
        position: [-0.3, 3.4, 1.3],
        name: 'Robot Programming',
        color: '#ff4500',
        level: 2,
        parent: 'robotics',
        children: ['fanuc', 'kawasaki', 'agv-coordination']
    },
    
    'vision-systems': {
        position: [0.4, 3.5, 0.6],
        name: 'Vision Systems',
        color: '#00ced1',
        level: 2,
        parent: 'robotics',
        children: ['automated-vision', 'quality-control']
    },
    
    manufacturing: {
        position: [0.1, 3.0, 1.4],
        name: 'Manufacturing Processes',
        color: '#8b4513',
        level: 2,
        parent: 'robotics',
        children: ['injection-molding', 'lean-processes']
    },
    
    // Third Level - Specific Technologies
    'python-integration': {
        position: [-2.6, 3.9, 0.8],
        name: 'Python Integration',
        color: '#3776ab',
        level: 3,
        parent: 'ignition'
    },
    
    'http-requests': {
        position: [-2.4, 3.7, 0.2],
        name: 'HTTP/API Integration',
        color: '#008080',
        level: 3,
        parent: 'ignition'
    },
    
    llmops: {
        position: [2.4, 4.0, -0.7],
        name: 'LLMOps',
        color: '#8a2be2',
        level: 3,
        parent: 'ai-ml'
    },
    
    'predictive-analytics': {
        position: [2.2, 3.8, -0.1],
        name: 'Predictive Analytics',
        color: '#dc143c',
        level: 3,
        parent: 'ai-ml'
    },
    
    snowflake: {
        position: [0.9, 4.1, 0.6],
        name: 'Snowflake Cloud',
        color: '#29b5e8',
        level: 3,
        parent: 'data-engineering'
    },
    
    'unified-namespace': {
        position: [1.5, 4.0, 0.0],
        name: 'Unified Name Space',
        color: '#ff6347',
        level: 3,
        parent: 'data-engineering'
    },
    
    'data-historian': {
        position: [1.0, 3.9, 0.9],
        name: 'Data Historian',
        color: '#4682b4',
        level: 3,
        parent: 'data-engineering'
    },
    
    aws: {
        position: [2.7, 3.5, 0.4],
        name: 'Amazon Web Services',
        color: '#ff9900',
        level: 3,
        parent: 'cloud-architecture'
    },
    
    'mcp-server': {
        position: [2.5, 3.3, -0.2],
        name: 'MCP Server Integration',
        color: '#228b22',
        level: 3,
        parent: 'cloud-architecture'
    },
    
    fanuc: {
        position: [-0.6, 4.2, 1.6],
        name: 'FANUC Robots',
        color: '#ffff00',
        level: 3,
        parent: 'robot-programming'
    },
    
    kawasaki: {
        position: [0.0, 4.3, 1.0],
        name: 'KAWASAKI Robots',
        color: '#00ff00',
        level: 3,
        parent: 'robot-programming'
    },
    
    'agv-coordination': {
        position: [-0.1, 4.0, 1.7],
        name: 'AGV Path Planning',
        color: '#ff69b4',
        level: 3,
        parent: 'robot-programming'
    },
    
    'automated-vision': {
        position: [0.7, 4.3, 0.9],
        name: 'Automated Vision Control',
        color: '#40e0d0',
        level: 3,
        parent: 'vision-systems'
    },
    
    'quality-control': {
        position: [0.2, 4.2, 0.3],
        name: 'Quality Control Systems',
        color: '#da70d6',
        level: 3,
        parent: 'vision-systems'
    }
};

// Skill categories for Tahri's professional domains
const SKILL_CATEGORIES = {
    'automation-systems': { color: '#ff6b35', description: 'Industrial Automation & SCADA' },
    'ai-data': { color: '#00ff88', description: 'AI & Data Engineering' },
    'robotics': { color: '#61dafb', description: 'Robotics & Manufacturing' },
    'programming': { color: '#3776ab', description: 'Programming & Development' },
    'cloud-platforms': { color: '#ff9900', description: 'Cloud & Infrastructure' },
    'vision-systems': { color: '#00ced1', description: 'Machine Vision & Control' },
    'digital-transformation': { color: '#9400d3', description: 'Digital Innovation & AI' }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PROJECTS_DATA,
        SKILL_TREE_STRUCTURE,
        SKILL_CATEGORIES
    };
}