export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: "Branding-App" | "Ios-App" | "Landing Page" | "Website";
  description: string;
  tags: string[];
  image: string; // Picsum image identifier
  client?: string;
  date?: string;
  location?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  letter: string;
  description: string;
  bullets: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

export interface BlogItem {
  id: string;
  title: string;
  category: "Development" | "Design" | "Quote" | "Testing";
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const CV_DATA = {
  name: "Aduniya Mulugeta",
  title: "Front-End Developer",
  bio: "Front-End Developer with hands-on experience in helping companies create and maintain a better code base for reusability. Passionate about learning and development with a desire to apply skills on a larger development team. Eager to tackle more complex problems and continue to find ways to maximize user efficiency.",
  location: "Addis Ababa, Ethiopia",
  email: "aduniya.dev@gmail.com",
  phone: "+251 (9) 3946-6359",
  website: "https://aduniya-dev.me/",
  socials: {
    github: "https://aduniya-dev.me/",
    linkedin: "https://aduniya-dev.me/",
    twitter: "https://aduniya-dev.me/",
    behance: "https://aduniya-dev.me/",
    facebook: "https://aduniya-dev.me/"
  },
  stats: [
    { value: "25+", label: "Projects Completed" },
    { value: "15+", label: "Happy Clients" },
    { value: "400K+", label: "Lines of Clean Code" },
    { value: "5+", label: "Honours & Awards" }
  ],
  experience: [
    {
      id: "freelance-frontend",
      role: "Freelance Front-End Developer",
      company: "Self-Employed",
      location: "Ethiopia, AA",
      period: "2025 - 2026",
      responsibilities: [
        "Designed and developed responsive websites for small businesses and individual clients, focusing on flawless layouts and fluid interactions.",
        "Customized CMS platforms and updated website content, increasing platform adaptability and user engagement.",
        "Performed rigorous testing, debugging, and general maintenance to ensure reliable performance across modern web standards.",
        "Optimized web apps for speed, cross-browser compatibility, and search vehicle visibility.",
        "Provided technical client training and integrated machine learning algorithms to visualize Python data inputs."
      ]
    },
    {
      id: "web-dev-gudalabs",
      role: "Web Developer",
      company: "Gudalabs Technology PLC",
      location: "Remote / Addis Ababa",
      period: "2023 - 2025",
      responsibilities: [
        "Developed and maintained highly robust CMS websites for international and local clients based on unique project specifications.",
        "Created responsive, user-friendly CSS & HTML interfaces to drastically enhance user experience across mobile, tablet, and desktop interfaces.",
        "Conducted thorough browser compatibility testing, bug elimination, and visual troubleshooting to maintain optimal stability.",
        "Collaborated seamlessly with multi-functional teams to deliver production-ready code blocks on schedule.",
        "Maintained existing codebases and rolled out performance updates, enhancing structural accessibility and loading velocities."
      ]
    }
  ] as ExperienceItem[],
  education: [
    {
      id: "bsc-se",
      degree: "Bachelor of Science in Software Engineering",
      institution: "Addis Ababa University",
      location: "Addis Ababa, Ethiopia",
      period: "2019 - 2024"
    }
  ] as EducationItem[],
  skills: {
    Languages: [
      { name: "HTML", percent: 95 },
      { name: "CSS/Tailwind", percent: 95 },
      { name: "JavaScript", percent: 90 },
      { name: "Python", percent: 80 }
    ],
    Libraries: [
      { name: "React", percent: 92 },
      { name: "Redux", percent: 85 },
      { name: "jQuery", percent: 75 }
    ],
    Frameworks: [
      { name: "Angular.js", percent: 80 },
      { name: "Node.js", percent: 75 }
    ],
    Testing: [
      { name: "Jest", percent: 85 }
    ]
  },
  services: [
    {
      id: "web-design",
      title: "Web UI/UX & Responsive Front-End Integration",
      letter: "W",
      description: "Translating sophisticated creative mockups into standard-compliant, fluid, and high-frequency React & Tailwind interactive applications.",
      bullets: [
        "Developing complex responsive layout adapters",
        "Configuring custom typographic grids and transitions",
        "Strictly refining interactive tap and hover zones"
      ]
    },
    {
      id: "cms-customization",
      title: "CMS Platform Customization",
      letter: "C",
      description: "Extending custom web engines, templates, and content models to deliver complete data publishing autonomy to marketing and ops teams.",
      bullets: [
        "Configuring robust editorial panels and schemas",
        "Structuring modular fields for fast site edits",
        "Ensuring clean template reusability and SEO indexing"
      ]
    },
    {
      id: "performance-seo",
      title: "Performance, Speed, & Accessibility Optimization",
      letter: "P",
      description: "Refactoring bulky DOM layers, lazy loading resources, and polishing core web vitals to score 95+ ratings across search indicators.",
      bullets: [
        "Analyzing script payloads and styles",
        "Configuring fluid images and content reflow",
        "Restructuring navigation access for modern screen readers"
      ]
    },
    {
      id: "testing-debugging",
      title: "Robust Testing & Code Debugging",
      letter: "T",
      description: "Securing frontend stability under high traffic by implementing comprehensive Jest unit-testing suites and resolving memory bounds.",
      bullets: [
        "Testing components across multiple mock scenarios",
        "Preventing regression errors with fast linter gates",
        "Detailed browser-level profiling and load audits"
      ]
    }
  ] as ServiceItem[],
  projects: [
    {
      id: "proj-1",
      title: "CMS Hub for Gudalabs Ecosystem",
      category: "Website",
      description: "A comprehensive, high-velocity corporate content management hub configured to support Gudalabs' expanding portfolio of enterprise clients.",
      tags: ["CMS Customization", "CSS/HTML", "SEO Optimization"],
      image: "cms_hub_mockup",
      client: "Gudalabs PLC",
      date: "May 2024",
      location: "Addis Ababa"
    },
    {
      id: "proj-2",
      title: "Responsive FinTech Analytics Suite",
      category: "Branding-App",
      description: "Design and deployment of a multi-browser financial visualization panel that processes user transactional files dynamically using interactive canvas models.",
      tags: ["React", "JavaScript", "Responsive Design"],
      image: "fintech_dashboard",
      client: "Capital Partners Ltd",
      date: "November 2025",
      location: "Remote"
    },
    {
      id: "proj-3",
      title: "Modern E-Commerce Storefront Adapter",
      category: "Landing Page",
      description: "A pixel-perfect, highly responsive landing page configured for a local cosmetics brand. Built using Tailwind grid models with fluid animations.",
      tags: ["TailwindCSS", "Animation", "UI/UX"],
      image: "ecommerce_landing",
      client: "Soles & Glows Ethiopia",
      date: "August 2025",
      location: "Addis Ababa"
    },
    {
      id: "proj-4",
      title: "University Alumni Relations Panel",
      category: "Website",
      description: "A centralized platform for graduates of Addis Ababa University to search regional directories, submit updates, and register for tech meetups.",
      tags: ["React", "State Management", "CMS"],
      image: "alumni_portal",
      client: "AAU Software Engineering Dept",
      date: "March 2024",
      location: "Addis Ababa, AA"
    }
  ] as ProjectItem[],
  testimonials: [
    {
      id: "test-1",
      quote: "Aduniya delivered our corporate platform on an incredibly tight timeline. Her code is extremely clean, highly reusable, and our core pages load twice as fast as their previous iteration. Absolutely brilliant software engineer.",
      author: "Mikias Tekle",
      role: "Lead Systems Architect, Gudalabs Technology",
      avatar: "https://picsum.photos/seed/mikias/100/100",
      rating: 5
    },
    {
      id: "test-2",
      quote: "Working with Aduniya on our SaaS dashboard migration was seamless. She translates abstract visual design requests into pixel-perfect responsive layouts with incredible care. Her Jest testing coverage is exemplary.",
      author: "Elena Vasquez",
      role: "Product Owner, CreativeAdapters",
      avatar: "https://picsum.photos/seed/elena/100/100",
      rating: 5
    },
    {
      id: "test-3",
      quote: "Aduniya customized our content publishing platform flawlessly. Her documentation was clear, her support was prompt, and the resulting UI has substantially upgraded our marketing team's day-to-day workflow.",
      author: "Yohannes Alemu",
      role: "Founder, AfroMedia PLC",
      avatar: "https://picsum.photos/seed/yohannes/100/100",
      rating: 5
    }
  ] as TestimonialItem[],
  blogs: [
    {
      id: "blog-1",
      title: "Structuring Modular Codebases for Maximum Reusability",
      category: "Development",
      date: "October 14, 2025",
      readTime: "5 min read",
      excerpt: "Explraction of modular components patterns that help fast-paced small agency teams scale CMS architectures and prevent overlapping structural conflicts.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "blog-2",
      title: "Achieving 100 on LightHouse Core Web Vitals: A Practical Checklist",
      category: "Testing",
      date: "February 22, 2025",
      readTime: "4 min read",
      excerpt: "A deep dive into non-blocking asset schedules, CSS injection rules, and media configurations that boost and preserve lightning-fast mobile speeds.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "blog-3",
      title: "How Visual Testing Prevents Multi-Device Design Drift",
      category: "Design",
      date: "November 5, 2024",
      readTime: "6 min read",
      excerpt: "Practical tips to maintain pixel-perfect rendering across modern browsers and responsive formats, optimizing breakpoints easily without visual bloat.",
      image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80"
    }
  ] as BlogItem[],
  faqs: [
    {
      question: "What are your standard project-based rates?",
      answer: "Rates vary depending on scope density and timeline goals. I usually scope projects based on key outcomes, delivering fully tested, responsive components, customized CMS templates, and performance optimization reports."
    },
    {
      question: "Which content management systems do you customize?",
      answer: "I specialize in tailor-fitting robust, highly headless configurations and standard CMS architectures (such as WordPress engines, custom Node setups, and visual builders) ensuring editorial groups achieve complete editing agility."
    },
    {
      question: "Are you comfortable collaborating within existing agile engineer groups?",
      answer: "Yes, absolutely! Having spent over two years collaborating directly with tech leaders at Gudalabs, I am comfortable working with Git flow systems, review guidelines, and shared workspaces."
    },
    {
      question: "Do you offer post-handoff support and optimizations?",
      answer: "Yes, I offer standard weekly support agreements to monitor core performance indicators, handle dependency updates, and update website copy/assets as business goals evolve."
    }
  ] as FaqItem[]
};
