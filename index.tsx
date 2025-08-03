import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams
} from 'react-router-dom';

// --- HELPER HOOKS & COMPONENTS ---

const useIntersectionObserver = (options ? : IntersectionObserverInit): [(node: HTMLElement | null) => void, boolean] => {
  const [ref, setRef] = React.useState < HTMLElement | null > (null);
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    if (!ref) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(entry.target);
        }
      }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, options]);

  return [setRef, isIntersecting];
};

const ScrollAnimator = ({ children, className = '', delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [ref, isIntersecting] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`scroll-animate ${isIntersecting ? 'in-view' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};


// --- ICON COMPONENTS ---

const PanelIcon = ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F2FF" />
                <stop offset="100%" stopColor="#7F00FF" />
            </linearGradient>
        </defs>
        <path d="M49 4H15C13.8954 4 13 4.89543 13 6V58C13 59.1046 13.8954 60 15 60H49C50.1046 60 51 59.1046 51 58V6C51 4.89543 50.1046 4 49 4Z" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 14H32" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 24H40" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 34H32" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 44H40" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M40 14L40 18" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="panel-switch-flicker" />
        <path d="M32 34L32 38" stroke="url(#grad1)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const EvChargeIcon = ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7F00FF" />
                <stop offset="100%" stopColor="#FF00C3" />
            </linearGradient>
        </defs>
        <path d="M44 24V11C44 9.34315 42.6569 8 41 8H23C21.3431 8 20 9.34315 20 11V53C20 54.6569 21.3431 56 23 56H41C42.6569 56 44 54.6569 44 53V38" stroke="url(#grad2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 24H20" stroke="url(#grad2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M30 20L36 26L30 32" stroke="url(#grad2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="ev-charge-arrow"/>
    </svg>
);

const SafetyCheckIcon = ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF00C3" />
                <stop offset="100%" stopColor="#00F2FF" />
            </linearGradient>
        </defs>
        <path d="M32 4L8 14V30.68C8 46.14 18.24 58.42 32 60C45.76 58.42 56 46.14 56 30.68V14L32 4Z" stroke="url(#grad3)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 32L29 39L44 24" stroke="url(#grad3)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const SmokeDetectorIcon = ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad-smoke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F2FF" />
                <stop offset="100%" stopColor="#FF00C3" />
            </linearGradient>
        </defs>
        <path d="M50 32C50 41.9411 41.9411 50 32 50C22.0589 50 14 41.9411 14 32C14 22.0589 22.0589 14 32 14C41.9411 14 50 22.0589 50 32Z" stroke="url(#grad-smoke)" strokeWidth="4"/>
        <g className="smoke-detector-center">
            <path d="M26 38L38 26" stroke="url(#grad-smoke)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M26 26L38 38" stroke="url(#grad-smoke)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M22 32H42" stroke="url(#grad-smoke)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M32 22V42" stroke="url(#grad-smoke)" strokeWidth="3" strokeLinecap="round"/>
        </g>
    </svg>
);

const CeilingFanIcon = ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad-fan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4D9FFF" />
                <stop offset="100%" stopColor="#00F2FF" />
            </linearGradient>
            <path id="fan-blade-shape" d="M32 32.5 C 42 32.5 45 22 55 20" stroke="url(#grad-fan)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        </defs>
        <path d="M32 35V45" stroke="url(#grad-fan)" strokeWidth="3" strokeLinecap="round"/>
        <g className="ceiling-fan-blades">
            <use href="#fan-blade-shape" transform="rotate(0 32 32.5)" />
            <use href="#fan-blade-shape" transform="rotate(120 32 32.5)" />
            <use href="#fan-blade-shape" transform="rotate(240 32 32.5)" />
        </g>
        <circle cx="32" cy="32.5" r="5" stroke="url(#grad-fan)" strokeWidth="3" fill="var(--background-color)" />
    </svg>
);

const CircuitBreakerIcon = ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad-breaker" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7F00FF" />
                <stop offset="100%" stopColor="#00F2FF" />
            </linearGradient>
        </defs>
        <rect x="14" y="8" width="36" height="48" rx="4" stroke="url(#grad-breaker)" strokeWidth="4"/>
        <path d="M26 26H38" stroke="url(#grad-breaker)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="28" y="34" width="8" height="12" fill="url(#grad-breaker)" className="circuit-breaker-switch"/>
    </svg>
);


const HeroAnimation = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = (clientX - left) / width - 0.5;
            const y = (clientY - top) / height - 0.5;

            const orbit1 = container.querySelector('.hero-anim-orbit-1') as HTMLElement;
            const orbit2 = container.querySelector('.hero-anim-orbit-2') as HTMLElement;
            const orbit3 = container.querySelector('.hero-anim-orbit-3') as HTMLElement;
            
            if(orbit1) orbit1.style.transform = `rotate(var(--orbit-1-angle)) translate(${x * -20}px, ${y * -20}px)`;
            if(orbit2) orbit2.style.transform = `rotate(var(--orbit-2-angle)) translate(${x * 15}px, ${y * 15}px)`;
            if(orbit3) orbit3.style.transform = `rotate(var(--orbit-3-angle)) translate(${x * -10}px, ${y * -10}px)`;
        };
        
        container.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    return (
        <div className="hero-animation-container" ref={containerRef}>
            <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="icon-glow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="bolt-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00F2FF" /><stop offset="100%" stopColor="#4D9FFF" /></linearGradient>
                    <linearGradient id="gear-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#7F00FF" /><stop offset="100%" stopColor="#C644FC" /></linearGradient>
                    <linearGradient id="plug-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#FF00C3" /><stop offset="100%" stopColor="#F974D2" /></linearGradient>
                    <radialGradient id="center-pulse-grad">
                        <stop offset="0%" stopColor="rgba(0, 242, 255, 0.4)" />
                        <stop offset="100%" stopColor="rgba(127, 0, 255, 0)" />
                    </radialGradient>
                </defs>
                <circle cx="250" cy="250" r="140" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <circle cx="250" cy="250" r="210" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                
                <circle cx="250" cy="250" r="100" fill="url(#center-pulse-grad)" className="hero-anim-center-pulse" />
                
                <g className="hero-anim-orbit-1">
                    <g transform="translate(100, 180)">
                         <path className="hero-icon" stroke="url(#bolt-grad)" filter="url(#icon-glow)" d="M22.5 12.66V2H11.5L20.5 22.16H13.5L10.5 32H21.5L12.5 52.16V62H23.5L14.5 41.84H21.5L24.5 32H13.5L22.5 12.66Z" transform="scale(0.8)" />
                    </g>
                </g>
                <g className="hero-anim-orbit-2">
                    <g transform="translate(350, 150)">
                       <path className="hero-icon" stroke="url(#gear-grad)" filter="url(#icon-glow)" d="M49.68,36.56,43.2,33.12a13.3,13.3,0,0,0-1.2-14.88l4-5.28a2.08,2.08,0,0,0-2.88-3.36l-5.6,4.32a13.25,13.25,0,0,0-15.68-.8L18.48,8.8a2.08,2.08,0,0,0-3.36,2.88l3.36,6.24a13.3,13.3,0,0,0,.16,16.08l-5.76,3.68a2.08,2.08,0,0,0,2.08,4l6.56-2.56a13.25,13.25,0,0,0,14.24,4.32l2.72,6.56a2.08,2.08,0,0,0,4-2.08l-2.08-5.92a13.3,13.3,0,0,0,8.48-10.72L51,40A2.08,2.08,0,0,0,49.68,36.56ZM32.8,38a8,8,0,1,1,8-8A8,8,0,0,1,32.8,38Z" transform="scale(0.8)"/>
                    </g>
                </g>
                <g className="hero-anim-orbit-3">
                    <g transform="translate(250, 430)">
                        <path className="hero-icon" stroke="url(#plug-grad)" filter="url(#icon-glow)" d="M38.54,23 h-7.08v-6h-9v6H15.46a2.49,2.49,0,0,0-2.5,2.5V36.27a2.5,2.5,0,0,0,2.5,2.5h23.08a2.5,2.5,0,0,0,2.5-2.5V25.5A2.49,2.49,0,0,0,38.54,23 h0Zm-14-3h3v-6h3v6h-6Zm0,12.23h-3V32.2h3Zm6,0h-3V32.2h3Zm6,0h-3V32.2h3Z" transform="scale(1.2)" />
                    </g>
                </g>
            </svg>
        </div>
    );
};

const CheckmarkIcon = () => (
    <svg className="gradient-list-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="check-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F2FF" />
                <stop offset="100%" stopColor="#FF00C3" />
            </linearGradient>
        </defs>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="url(#check-grad)"/>
    </svg>
);

const PlusIcon = () => (
    <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
             <linearGradient id="plus-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F2FF" />
                <stop offset="100%" stopColor="#7F00FF" />
            </linearGradient>
        </defs>
        <path d="M12 5V19M5 12H19" stroke="url(#plus-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TestimonialVectorGraphic = () => (
    <svg className="testimonial-vector-graphic" width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 0C155.228 0 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 0 155.228 0 100C0 44.7715 44.7715 0 100 0Z" fill="url(#paint0_linear_1_100)"/>
        <path d="M100 20C144.183 20 180 55.8172 180 100C180 144.183 144.183 180 100 180C55.8172 180 20 144.183 20 100C20 55.8172 55.8172 20 100 20Z" stroke="url(#paint1_linear_1_100)" strokeOpacity="0.3" strokeWidth="2"/>
        <path d="M158 52L42 148" stroke="url(#paint2_linear_1_100)" strokeOpacity="0.1" strokeWidth="1"/>
        <path d="M178 80L22 176" stroke="url(#paint3_linear_1_100)" strokeOpacity="0.1" strokeWidth="1"/>
        <path d="M198 108L2 204" stroke="url(#paint4_linear_1_100)" strokeOpacity="0.1" strokeWidth="1"/>
        <defs>
            <linearGradient id="paint0_linear_1_100" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1E1C38"/>
                <stop offset="1" stopColor="#121124"/>
            </linearGradient>
            <linearGradient id="paint1_linear_1_100" x1="100" y1="20" x2="100" y2="180" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00F2FF"/>
                <stop offset="1" stopColor="#7F00FF"/>
            </linearGradient>
            <linearGradient id="paint2_linear_1_100" x1="100" y1="100" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
            </linearGradient>
             <linearGradient id="paint3_linear_1_100" x1="100" y1="128" x2="100" y2="128" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
            </linearGradient>
             <linearGradient id="paint4_linear_1_100" x1="100" y1="156" x2="100" y2="156" gradientUnits="userSpaceOnUse">
                <stop stopColor="white"/>
            </linearGradient>
        </defs>
    </svg>
);


// --- DATA ---

const services = [
    { path: "electrical-panel-repair", title: "Electrical Panel Repair", content: "Expert repair and replacement for outdated or malfunctioning electrical panels to ensure your home's safety and efficiency." },
    { path: "smoke-detector-inspections", title: "Smoke Detector Inspections", content: "Comprehensive inspection, testing, and installation of smoke and carbon monoxide detectors to protect what matters most." },
    { path: "car-charging-installs", title: "Car Charging Installs", content: "Professional installation of Level 2 home EV charging stations for all major electric vehicle brands." },
    { path: "ceiling-fans", title: "Ceiling Fan Installation", content: "Safe and secure installation of ceiling fans to improve comfort and energy efficiency in any room." },
    { path: "circuit-breaker-repair", title: "Circuit Breaker Repair", content: "Fast diagnosis and repair of tripping breakers and overloaded circuits to restore power safely." }
];

const serviceData = {
    'electrical-panel-repair': {
      title: "Electrical Panel Repair",
      intro: {
        text: "Electrical panels are crucial for distributing electricity throughout your home or business. Over time, they may need repairs or upgrades due to wear and tear, electrical surges, or outdated components. At VoltTech Electricians, we offer expert electrical panel repair services to ensure your electrical system remains safe and functional. Whether it'sfixing a tripped breaker or replacing an old panel, our experienced electricians provide reliable, long-lasting solutions.",
        video: "tPkoL99QYjQ"
      },
      sections: [
        {
          title: "Electrical Panel Repair Features",
          type: 'list',
          items: [
            "Comprehensive Diagnostics: We inspect the entire electrical panel to identify faults and inefficiencies.",
            "Safe & Efficient Repairs: We follow all safety protocols to repair or replace components safely.",
            "Up-to-Date Equipment: We use the latest tools and techniques to repair or upgrade your electrical panel to modern standards."
          ],
          video: "rbVMn573mew"
        },
        {
          title: "Electrical Panel Repair Benefits",
          type: 'graph',
          graphTitle: 'Panel Performance: Before vs. After Repair',
          graphItems: [
            { label: 'Safety Rating', percentage: 99 },
            { label: 'Energy Efficiency', percentage: 95 },
            { label: 'Appliance Lifespan', percentage: 90 },
          ],
          items: [
            "Enhanced Safety: Repairs prevent potential electrical fires and hazards by fixing faulty components.",
            "Improved Electrical Flow: Proper repairs ensure that electricity is evenly distributed throughout your home or business.",
            "Cost Savings: Timely repairs help avoid costly damage to appliances and systems caused by a malfunctioning panel."
          ],
          video: "f6crsRRF7dE"
        },
        {
          title: "Value of The Service",
          type: 'list',
          items: [
            "Prevents Costly Breakdowns: Proactive repairs save you money by addressing issues early before they cause major damage.",
            "Increases System Longevity: Regular repairs ensure your electrical panel remains functional and efficient for years.",
            "Compliance with Safety Codes: We ensure that your electrical system meets local building codes and safety regulations."
          ]
        },
        {
          title: "Our Unique Selling Proposition",
          type: 'paragraph',
          content: "We offer a quick response time, top-tier customer service, and skilled electricians who handle electrical panel repairs with precision. Our commitment to safety and efficiency makes us the trusted choice for homeowners and businesses alike. No matter the issue, we provide lasting solutions to keep your electrical system running smoothly."
        },
        {
          title: "Why We Are The Best / Reviews",
          type: 'reviews',
          intro_paragraph: "Our electricians are licensed, insured, and experienced in handling all types of electrical panel repairs. We take pride in our transparent pricing and honest assessments. Our customers consistently rave about our quick, reliable, and affordable services.",
          reviews: [
            { text: "They were professional, on-time, and got my electrical panel up and running in no time. Highly recommend them!", author: "Sarah T." },
            { text: "I had an issue with frequent tripping circuit breakers. Their electricians pinpointed the problem, fixed it, and explained everything clearly. Excellent service!", author: "James P." },
            { text: "Affordable and reliable. I wouldn’t trust anyone else with my electrical needs. These guys are the best!", author: "Laura D." }
          ]
        },
        {
          title: "How to Get Started",
          type: 'list',
          items: [
            "Call Us to Talk: Reach out by phone for a quick consultation about your electrical panel issues.",
            "Book an Appointment: Schedule an appointment for one of our electricians to visit your home or business.",
            "Get Started: Our team will efficiently begin the repair process to get your electrical system back on track."
          ]
        },
        {
          title: "Frequently Asked Questions",
          type: 'faq',
          items: [
            { q: "How do I know if my electrical panel needs repair?", a: "Signs include frequent breaker trips, flickering lights, burning smells, or outdated equipment. If you notice these, it’s time for an inspection." },
            { q: "Can I repair my electrical panel myself?", a: "No, electrical panel repairs require professional expertise to ensure safety and proper functioning. Always hire a licensed electrician." },
            { q: "How long do electrical panel repairs take?", a: "Depending on the issue, repairs typically take between 1-3 hours, though more extensive work may take longer." },
            { q: "Will I need to replace my electrical panel?", a: "Not necessarily. Many problems can be repaired, but if your panel is outdated or severely damaged, replacement may be the best option." },
            { q: "How much does electrical panel repair cost?", a: "Costs vary depending on the issue, but we provide competitive pricing and offer free estimates before starting any work." }
          ],
          video: "qr0bUa2gIQU"
        }
      ],
      cta: {
        title: "Ready to Upgrade Your Panel?",
        text: "Contact us today for a free estimate on your electrical panel repairs.",
        buttonText: "Get a Free Estimate"
      }
    },
    'smoke-detector-inspections': {
        title: "Smoke Detector Inspections",
        intro: {
            text: "Regular smoke detector inspections are essential to ensure your home or business is fully protected against fire hazards. Professional inspections verify that all units are working properly, comply with safety codes, and provide peace of mind that you're protected.",
            video: "tPkoL99QYjQ"
        },
        sections: [
            {
                title: "Smoke Detector Inspection Features",
                type: 'list',
                items: [
                    "Comprehensive System Check: Inspecting each smoke detector to ensure it's properly installed, functioning, and up to code.",
                    "Battery & Wiring Testing: Checking both battery life and wiring connections to ensure reliability in case of emergency.",
                    "Certification of Compliance: Providing documentation that your property meets local building codes and safety regulations."
                ],
                video: "rbVMn573mew"
            },
            {
                title: "Smoke Detector Inspection Benefits",
                type: 'graph',
                graphTitle: 'Inspection Impact Analysis',
                graphItems: [
                    { label: 'Detection Reliability', percentage: 99 },
                    { label: 'Safety Code Compliance', percentage: 100 },
                    { label: 'Peace of Mind Index', percentage: 95 },
                ],
                items: [
                    "Enhanced Safety: Regular inspections reduce the risk of undetected failures and ensure your detectors alert you in time of danger.",
                    "Peace of Mind: Knowing that your smoke detectors are fully functional keeps you confident in the safety of your property.",
                    "Lower Risk of Liability: By staying up to code, you minimize the risk of legal or insurance complications in case of a fire emergency."
                ],
                video: "f6crsRRF7dE"
            },
            {
                title: "Value of The Service",
                type: 'list',
                items: [
                    "Proactive Fire Protection: Timely inspections ensure that any issues with your smoke detectors are addressed before they become serious safety hazards.",
                    "Improved Response Time: A fully functional smoke detector gives you and your family or employees critical time to react in case of fire.",
                    "Compliance Assurance: Inspections ensure that your property meets fire safety codes and regulations, avoiding fines or penalties."
                ]
            },
            {
                title: "Our Unique Selling Proposition",
                type: 'paragraph',
                content: "We specialize in quick, thorough, and reliable smoke detector inspections. Our licensed electricians are dedicated to maintaining the highest safety standards, providing you with peace of mind. Inspections are comprehensive and meet all local regulations, ensuring you're always protected."
            },
            {
                title: "Why We Are The Best / Reviews",
                type: 'reviews',
                intro_paragraph: "Our expert electricians handle smoke detector inspections with the utmost care and professionalism. Customer reviews consistently highlight our reliability, efficiency, and dedication to safety. Trust in our years of experience to handle all your safety needs.",
                reviews: [
                    { text: "I had my smoke detectors checked, and I’m so glad I did. The team was prompt, professional, and provided a clear report. Great service!", author: "Linda M." },
                    { text: "The team inspected our smoke detectors, and they found a few issues we didn’t even know existed. Now I feel much safer in my home.", author: "Tim R." },
                    { text: "I’ve been using this service for years. They always ensure my smoke detectors are in tip-top shape. Excellent service every time!", author: "Greg F." }
                ]
            },
            {
                title: "How to Get Started",
                type: 'list',
                items: [
                    "Call Us to Talk: Reach out to discuss your smoke detector inspection needs and ask any questions.",
                    "Book an Appointment: Schedule a convenient time for one of our electricians to visit and inspect your detectors.",
                    "Get Your Report: The inspection will be performed efficiently, and you’ll receive a report for your records and peace of mind."
                ]
            },
            {
                title: "Frequently Asked Questions",
                type: 'faq',
                items: [
                    { q: "How often should I have my smoke detectors inspected?", a: "It's recommended to have your smoke detectors inspected by a professional at least once a year to ensure they are in good working condition." },
                    { q: "What will you check during the inspection?", a: "The inspection includes checking the battery, wiring, placement, functionality, and compliance with local fire codes." },
                    { q: "How long does an inspection take?", a: "A typical inspection takes 30 to 60 minutes, depending on the number of detectors in your home or business." },
                    { q: "What if my smoke detector isn't working?", a: "If a detector is malfunctioning, our licensed electricians can repair or replace faulty units to ensure your safety." },
                    { q: "Are professional inspections required by law?", a: "In many areas, local building codes require that smoke detectors be inspected and maintained regularly by qualified professionals." }
                ],
                video: "eZxwxp6E2Nk"
            }
        ],
        cta: {
            title: "Ready to Secure Your Home?",
            text: "Contact us today for a free consultation on smoke detector inspections.",
            buttonText: "Book an Inspection"
        }
    },
    'car-charging-installs': {
      title: "Car Charging Installations",
      intro: {
          text: "As electric vehicles (EVs) become more popular, having a dedicated home charging station is essential for convenience and efficiency. Professional EV charger installation services ensure you have a safe and reliable power source for your electric vehicle.",
          video: "tPkoL99QYjQ"
      },
      sections: [
          {
              title: "Car Charging Installation Features",
              type: 'list',
              items: [
                  "Custom Installation: Tailored installations to suit your vehicle type and the specific electrical requirements of your home.",
                  "Safety Compliance: Installations meet all safety codes and ensure that your charger operates securely and efficiently.",
                  "Smart Charger Options: Offering the latest in smart charging technology, allowing you to control charging times and monitor usage remotely."
              ],
              video: "rbVMn573mew"
          },
          {
              title: "Car Charging Installation Benefits",
              type: 'graph',
              graphTitle: 'EV Charging Performance Boost',
              graphItems: [
                  { label: 'Charging Speed', percentage: 90 },
                  { label: 'Home Property Value', percentage: 95 },
                  { label: 'Daily Convenience', percentage: 100 },
              ],
              items: [
                  "Convenience: Charge your electric vehicle at home, on your own schedule, without needing to visit public charging stations.",
                  "Cost Savings: Save on charging fees that would otherwise be incurred at commercial locations.",
                  "Increased EV Range: Consistent at-home charging ensures your vehicle is always ready to go, boosting the convenience of EV ownership."
              ],
              video: "f6crsRRF7dE"
          },
          {
              title: "Value of The Service",
              type: 'list',
              items: [
                  "Faster Charging: Home charging stations typically offer faster charging speeds compared to standard outlets, so you spend less time waiting.",
                  "Long-Term Investment: Installing a car charging station increases the value of your property while also preparing you for future EV needs.",
                  "Environmental Impact: Charging at home with a renewable energy source can reduce your carbon footprint, contributing to a greener environment."
              ]
          },
          {
              title: "Our Unique Selling Proposition",
              type: 'paragraph',
              content: "Specializing in hassle-free and expert EV charger installations, electricians ensure a smooth, reliable, and safe setup that works seamlessly with your vehicle. Whether you're installing for the first time or upgrading, top-notch service is always provided at competitive rates. Experience the ease of charging your car at home with the latest technology and safety features."
          },
          {
              title: "Why We Are The Best / Reviews",
              type: 'reviews',
              intro_paragraph: "Trusted for attention to detail and high-quality workmanship, we are the go-to experts in EV charger installations. Our commitment to customer satisfaction and transparent pricing makes us the top choice for homeowners. With years of experience in electrical work, we deliver safe, efficient, and user-friendly EV charging solutions.",
              reviews: [
                  { text: "I couldn’t be happier with the EV charger installation. The team was professional, quick, and everything works perfectly!", author: "John D." },
                  { text: "The team did an outstanding job installing my home charging station. They explained the process and took care of everything. Highly recommend!", author: "Emily S." },
                  { text: "Fast, reliable, and affordable. If you need an EV charger installation, these are the pros to call.", author: "Tom L." }
              ]
          },
          {
              title: "How to Get Started",
              type: 'list',
              items: [
                  "Call us to talk: Get in touch to discuss your EV charger installation needs and ask any questions.",
                  "Book an Appointment for Home Visit: Schedule an in-home consultation to assess your electrical setup and determine the best charging solution.",
                  "Get Started: After evaluating your space, the installation will be completed professionally, and you’ll be ready to start charging your car at home."
              ]
          },
          {
              title: "Frequently Asked Questions",
              type: 'faq',
              items: [
                  { q: "How long does it take to install an EV charger?", a: "The installation typically takes 4-6 hours, depending on the complexity of your electrical system and charger type." },
                  { q: "Do I need a special electrical outlet for the EV charger?", a: "Yes, most EV chargers require a dedicated 240V outlet, which may involve an upgrade to your home’s electrical panel." },
                  { q: "Can I use a regular outlet to charge my electric vehicle?", a: "While you can use a standard 120V outlet, it will charge your car very slowly. A 240V outlet provides faster and more efficient charging." },
                  { q: "Is the installation covered by insurance?", a: "In most cases, your home insurance will cover damages or issues during installation. Be sure to check with your insurance provider for details." },
                  { q: "What is the cost of installing an EV charger?", a: "The cost varies based on the type of charger and any necessary electrical upgrades, but competitive pricing is offered, along with free estimates before starting any work." }
              ],
              video: "YRRcujYB6hg"
          }
      ],
      cta: {
          title: "Ready to Power Up Your EV?",
          text: "Contact us today for a free estimate on your car charging station installation.",
          buttonText: "Get a Free Estimate"
      }
  },
  'ceiling-fans': {
    title: "Ceiling Fan Installation",
    intro: {
      text: "Ceiling fans are an excellent way to improve airflow, reduce energy costs, and add style to any room in your home or business. Professional ceiling fan installation ensures the fan is mounted safely and efficiently, providing you with maximum comfort.",
      video: "tPkoL99QYjQ"
    },
    sections: [
      {
        title: "Ceiling Fan Installation Features",
        type: 'list',
        items: [
          "Custom Placement: Fans are installed in the most effective locations to maximize airflow and comfort.",
          "Electrical Safety: Proper wiring and secure installation ensure that your fan is both safe and efficient.",
          "Light & Fan Integration: We offer fans with integrated lighting, combining two functions into one sleek, space-saving unit."
        ],
        video: "rbVMn573mew"
      },
      {
        title: "Ceiling Fan Installation Benefits",
        type: 'graph',
        graphTitle: 'Airflow & Style Enhancement',
        graphItems: [
            { label: 'Energy Savings', percentage: 30 },
            { label: 'Improved Comfort', percentage: 95 },
            { label: 'Aesthetic Appeal', percentage: 90 },
        ],
        items: [
          "Improved Comfort: Ceiling fans help maintain a comfortable temperature in your home, especially in warmer weather, by circulating air effectively.",
          "Energy Savings: Using ceiling fans reduces reliance on air conditioning, which can lower your energy bills.",
          "Aesthetic Appeal: Ceiling fans come in various designs and finishes, adding both function and style to your living or working space."
        ],
        video: "f6crsRRF7dE"
      },
      {
        title: "Value of The Service",
        type: 'list',
        items: [
          "Enhanced Air Circulation: Proper fan placement ensures even air distribution, improving comfort in any room.",
          "Energy Efficiency: Ceiling fans can cool a room effectively without the high energy costs of air conditioning, saving you money in the long run.",
          "Increased Home Value: A well-installed ceiling fan adds both functionality and a modern touch, increasing the value of your home."
        ]
      },
      {
        title: "Our Unique Selling Proposition",
        type: 'paragraph',
        content: "With years of experience, our electricians ensure that every ceiling fan installation is done to the highest safety standards. We offer a wide range of ceiling fan options, from standard models to advanced systems with integrated lighting. Our fast, efficient, and reliable service means you’ll enjoy the comfort and aesthetic benefits of your new ceiling fan right away."
      },
      {
        title: "Why We Are The Best / Reviews",
        type: 'reviews',
        intro_paragraph: "Our team is known for providing seamless ceiling fan installations, ensuring that every detail is handled with care and precision. Customers rave about our prompt service, professionalism, and attention to detail. We are committed to delivering exceptional results on every installation, leaving you with the perfect ceiling fan setup for your home or business.",
        reviews: [
          { text: "I had two ceiling fans installed, and the service was excellent! They were quick, efficient, and the fans look fantastic in my living room and bedroom.", author: "Rachel P." },
          { text: "The team did an amazing job installing our new ceiling fan. They were friendly, and the installation was completed without any issues.", author: "Mark T." },
          { text: "Fantastic service! The electrician installed our ceiling fan seamlessly, and I’m impressed with how quickly it was done. Highly recommend.", author: "Lisa W." }
        ]
      },
      {
        title: "How to Get Started",
        type: 'list',
        items: [
          "Call us to talk: Reach out to discuss your ceiling fan installation needs and ask any questions you may have.",
          "Book an Appointment for Home Visit: Schedule a convenient time for an electrician to come to your home and assess the installation.",
          "Get Started: Our team will quickly and professionally install your ceiling fan, leaving you with a fully functioning, stylish addition to your home."
        ]
      },
      {
        title: "Frequently Asked Questions",
        type: 'faq',
        items: [
          { q: "How long does it take to install a ceiling fan?", a: "Typically, ceiling fan installation takes about 1 to 2 hours, depending on the complexity of the installation and any additional wiring needed." },
          { q: "Can I install a ceiling fan myself?", a: "While it’s possible for experienced DIYers, we recommend hiring a licensed electrician to ensure safe and efficient installation, especially when dealing with electrical wiring." },
          { q: "Do I need a special outlet for the ceiling fan?", a: "Yes, most ceiling fans require a dedicated outlet and proper wiring to ensure safety. An electrician can assess your existing setup and make the necessary adjustments." },
          { q: "Can ceiling fans be installed without an existing light fixture?", a: "Yes, ceiling fans can be installed in rooms without pre-existing light fixtures, though it may require additional electrical work to ensure proper wiring." },
          { q: "Are there energy-efficient ceiling fan options?", a: "Yes, many ceiling fan models are designed with energy efficiency in mind, including those with energy-saving motors and LED lighting options." }
        ],
        video: "xbkROaTUlww"
      }
    ],
    cta: {
      title: "Ready for a Cool Change?",
      text: "Contact us today to schedule your ceiling fan installation.",
      buttonText: "Schedule Installation"
    }
  },
  'circuit-breaker-repair': {
      title: "Circuit Breaker Repair",
      intro: {
          text: "Circuit breakers are a vital component of your electrical system, designed to protect your home or business from electrical overloads and short circuits. When a circuit breaker trips or malfunctions, it can pose a serious safety hazard. Professional circuit breaker repair ensures that your system operates safely and efficiently.",
          video: "tPkoL99QYjQ"
      },
      sections: [
          {
              title: "Circuit Breaker Repair Features",
              type: 'list',
              items: [
                  "Expert Diagnostics: We thoroughly assess your circuit breaker to diagnose the root cause of the issue, ensuring accurate repairs.",
                  "High-Quality Replacement Parts: We only use code-compliant replacement parts to ensure long-lasting performance.",
                  "Safety Compliance: All repairs are performed according to the latest safety codes and industry standards, keeping your property protected."
              ],
              video: "rbVMn573mew"
          },
          {
              title: "Circuit Breaker Repair Benefits",
              type: 'graph',
              graphTitle: 'Safety & Reliability Boost',
              graphItems: [
                  { label: 'System Reliability', percentage: 98 },
                  { label: 'Hazard Prevention', percentage: 99 },
                  { label: 'Appliance Protection', percentage: 95 },
              ],
              items: [
                  "Improved Safety: Timely repairs prevent electrical hazards like short circuits, sparks, and fires, keeping your property safe.",
                  "Restored Functionality: A properly functioning circuit breaker ensures your home’s electrical system works without interruptions or overloads.",
                  "Increased Peace of Mind: Knowing that your electrical system is in top shape gives you confidence and minimizes the risk of power disruptions."
              ],
              video: "f6crsRRF7dE"
          },
          {
              title: "Value of The Service",
              type: 'list',
              items: [
                  "Prevents Larger Issues: Addressing circuit breaker issues early can prevent costly damage to electrical appliances or wiring.",
                  "Cost-Effective: Circuit breaker repairs are often more affordable than replacing damaged electrical components caused by untreated issues.",
                  "Boosts Property Value: A well-maintained electrical system can improve the value and safety of your property."
              ]
          },
          {
              title: "Our Unique Selling Proposition",
              type: 'paragraph',
              content: "With years of expertise, our electricians offer fast, reliable circuit breaker repairs that restore safety and functionality. We use top-quality parts and ensure all repairs meet the latest safety codes. Our commitment to excellence means every job is done right the first time, providing lasting results and peace of mind."
          },
          {
              title: "Why We Are The Best / Reviews",
              type: 'reviews',
              intro_paragraph: "We’re known for our quick response time and thorough repair services, ensuring your circuit breakers function safely. Our customers appreciate our professional service, transparency, and attention to detail. We are committed to delivering quality repairs that exceed expectations.",
              reviews: [
                  { text: "The team quickly diagnosed the issue with our circuit breaker and fixed it without any hassle. Very professional and efficient!", author: "Jessica H." },
                  { text: "I was worried about a breaker issue, but they came out the same day and handled everything. Great service, would recommend!", author: "Mike W." },
                  { text: "The electrician was friendly, knowledgeable, and had our circuit breaker fixed in no time. I feel much safer now.", author: "Sarah P." }
              ]
          },
          {
              title: "How to Get Started",
              type: 'list',
              items: [
                  "Call Us to Talk: Get in touch to discuss your circuit breaker issues and ask any questions.",
                  "Book an Appointment: Schedule a convenient time for one of our electricians to visit and assess the issue.",
                  "Get Started: Our team will perform the necessary repairs, restoring your circuit breaker to full functionality."
              ]
          },
          {
              title: "Frequently Asked Questions",
              type: 'faq',
              items: [
                  { q: "How do I know if my circuit breaker needs repair?", a: "Signs include frequent tripping, a breaker that won’t reset, or visible damage. If you notice any of these, it’s time for a professional assessment." },
                  { q: "What causes a circuit breaker to trip?", a: "Breakers trip due to overloading, short circuits, or electrical faults. A malfunctioning breaker may trip without these issues, signaling it needs repair." },
                  { q: "Can I repair a circuit breaker myself?", a: "No. Circuit breakers are a critical safety component, and working on them can be dangerous. Always hire a licensed professional." },
                  { q: "How long does a circuit breaker repair take?", a: "Depending on the complexity, most circuit breaker repairs take 1-2 hours to complete." },
                  { q: "How much does it cost to repair a circuit breaker?", a: "Repair costs vary. After an inspection, you’ll receive an accurate estimate before any work is performed." }
              ],
              video: "xbkROaTUlww"
          }
      ],
      cta: {
          title: "Need a Quick Breaker Fix?",
          text: "Contact us now to schedule your circuit breaker repair and ensure your home is safe.",
          buttonText: "Schedule Repair"
      }
  }
};


// --- PAGE COMPONENTS ---

const Home = () => {
    const testimonialData = [
        {
            text: "Excellent service! They handled a full electrical rewiring of our house, and we couldn’t be more satisfied with the results. The electricians were professional, on time, and incredibly helpful.",
            author: "Kelly W.",
            title: "Homeowner",
            avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            text: "Quick, reliable, and highly skilled. We had an electrical emergency at 2 AM, and they arrived in less than an hour. Couldn’t recommend them enough.",
            author: "Adam L.",
            title: "Small Business Owner",
            avatar: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            text: "From start to finish, the team was exceptional. The pricing was fair, the work was done efficiently, and we felt completely comfortable with their service.",
            author: "Diane T.",
            title: "Property Manager",
            avatar: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            text: "These guys are amazing! They installed our new ceiling fans and updated our fuse box with such precision. Highly recommend them for any electrical needs.",
            author: "George P.",
            title: "Homeowner",
            avatar: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
    ];

    const stats = [
        { label: "Customer Satisfaction", value: 98, suffix: "%" },
        { label: "On-Time Arrival", value: 99, suffix: "%" },
        { label: "Licensed & Insured", value: 100, suffix: "%" },
        { label: "Projects Completed", value: 5000, suffix: "+" }
    ];

    return (
        <main>
            <section className="container hero">
                <div className="hero-content">
                    <ScrollAnimator>
                        <h1>Modern Electrical Solutions For Your Home & Business</h1>
                    </ScrollAnimator>
                    <ScrollAnimator delay={100}>
                        <p className="hero-subheading">High-tech, reliable, and safe electrical services powered by expertise and innovation.</p>
                    </ScrollAnimator>
                    <ScrollAnimator delay={200}>
                        <Link to="/services/electrical-panel-repair" className="btn btn-gradient">Explore Services</Link>
                    </ScrollAnimator>
                </div>
                <HeroAnimation />
            </section>
            
            <section className="container">
                <ScrollAnimator>
                    <h2 className="section-title">Our Core Services</h2>
                </ScrollAnimator>
                <div className="grid">
                    <ParallaxServiceCard delay={100} icon={<PanelIcon className="service-icon" />} title="Panel Repairs" text="Safe and efficient electrical panel upgrades and repairs." />
                    <ParallaxServiceCard delay={200} icon={<EvChargeIcon className="service-icon" />} title="EV Charging" text="Professional installation of home car charging stations." />
                    <ParallaxServiceCard delay={300} icon={<SafetyCheckIcon className="service-icon" />} title="Safety Checks" text="Comprehensive smoke detector and circuit inspections." />
                </div>
            </section>
            
            <section className="container">
                <ScrollAnimator>
                    <h2 className="section-title">Why Choose Us?</h2>
                </ScrollAnimator>
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <AnimatedStatCounter key={stat.label} {...stat} delay={index * 100} />
                    ))}
                </div>
            </section>

            <section className="container">
                <ScrollAnimator>
                     <h2 className="section-title">What Our Clients Say</h2>
                </ScrollAnimator>
                <ReviewsSlideshow reviews={testimonialData} />
            </section>
        </main>
    );
};

const ParallaxServiceCard = ({ icon, title, text, delay }: { icon: React.ReactNode, title: string, text: string, delay: number }) => {
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / (width / 2);
        const y = (e.clientY - top - height / 2) / (height / 2);
        
        card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.05)`;
        const inner = card.querySelector('.service-card-inner') as HTMLDivElement;
        if(inner) inner.style.transform = `translateZ(20px)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
        const inner = card.querySelector('.service-card-inner') as HTMLDivElement;
        if(inner) inner.style.transform = `translateZ(0px)`;
    };

    return (
        <ScrollAnimator delay={delay}>
            <div className="service-card" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                <div className="service-card-inner">
                    {icon}
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>
            </div>
        </ScrollAnimator>
    );
};

const useCountUp = (endValue: number, duration: number, isIntersecting: boolean) => {
    const [count, setCount] = React.useState(0);
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    React.useEffect(() => {
        if (!isIntersecting) return;
        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(endValue * progress);
            
            setCount(currentCount > endValue ? endValue : currentCount);

            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, frameRate);
        
        return () => clearInterval(counter);
    }, [isIntersecting, endValue, duration, frameRate, totalFrames]);

    return count;
};

const AnimatedStatCounter = ({ label, value, suffix = "", delay = 0 }: { label: string, value: number, suffix?: string, delay?: number }) => {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.5 });
    const count = useCountUp(value, 1500, isIntersecting);

    return (
        <div ref={ref} className="stat-counter">
            <ScrollAnimator delay={delay}>
                <div className="stat-value">{count}{suffix}</div>
                <div className="stat-label">{label}</div>
            </ScrollAnimator>
        </div>
    );
};

const aboutContent = {
    intro: "With over 20 years of experience, we are the trusted electricians who prioritize safety, quality, and customer satisfaction in every job. Our licensed, highly skilled team provides fast, reliable, and affordable electrical services—from installations to emergency repairs—ensuring your home or business stays powered and safe. We use the latest tools and technology, offering tailored solutions that meet your unique needs, whether it’s a simple fix or a complex installation. Our commitment to integrity, excellence, and customer satisfaction sets us apart, making us the go-to electrical service provider in the community. With a proven track record of success and glowing customer reviews, we’re the best choice for all your electrical needs—on time, every time.",
    sections: [
        {
            title: "Who We Are",
            isOpen: true,
            content: [
                "Experienced Professionals: With over 20 years of industry experience, we provide expert electrical services that guarantee safety and reliability for every project.",
                "Licensed & Certified: Our electricians are fully licensed and insured, ensuring every job meets the highest safety and quality standards.",
                "Customer-Centric Approach: We put your needs first, providing personalized, prompt service that delivers results every time, on time."
            ],
            videos: ["tPkoL99QYjQ", "rbVMn573mew"]
        },
        {
            title: "What We Do",
            content: [
                "Comprehensive Electrical Services: From installations and repairs to routine maintenance and emergency services, we handle it all with unmatched expertise.",
                "Quick & Reliable Response: We understand electrical issues can’t wait. That’s why we provide fast response times, getting to you when you need us the most.",
                "Affordable, Transparent Pricing: No hidden fees—just honest pricing that fits your budget. We provide upfront estimates so you know exactly what to expect."
            ],
            videos: ["f6crsRRF7dE", "c-ub136W8SY"]
        },
        {
            title: "Why Us",
            content: [
                "Top-Rated Service: Our skilled electricians are dedicated to delivering excellence. With a track record of satisfied clients, we’ve built a reputation as the go-to electrician service in the area.",
                "State-of-the-Art Equipment: We use only the latest technology and tools to ensure every job is completed efficiently, accurately, and safely.",
                "No Job Too Big or Small: Whether it’s a minor repair or a major installation, we treat every project with the same level of commitment and attention to detail."
            ],
            videos: ["v7ONvhioSlM", "msm7YmuEqvA"]
        },
        {
            title: "Where - Serving the Local Community",
            content: [
                 "Locally Owned & Operated: As a part of the community, we understand the needs of our neighbors and are committed to delivering top-notch service right where you live.",
                 "Available 24/7 for Emergencies: Electrical issues can arise at any time. We’re always available to serve you, offering emergency services day or night.",
                 "Trusted by Local Businesses: We’re proud to serve local businesses, providing the same high level of service to both residential and commercial customers."
            ]
        },
        {
            title: "Company Values",
            content: [
                "Integrity First: We believe in honest communication and doing the right thing, even when no one is looking.",
                "Safety Above All: We prioritize safety for both our clients and our team, ensuring that every electrical job is done with the utmost care and caution.",
                "Excellence in Service: We strive to exceed expectations, offering high-quality, efficient service that keeps customers coming back time and time again."
            ]
        },
        {
            title: "Company Difference",
            content: [
                 "Customer Satisfaction Guarantee: We won’t stop until you're completely satisfied with our work, offering a satisfaction guarantee on every job.",
                 "Highly Skilled Team: Our team of experienced electricians is trained to handle all types of electrical challenges, ensuring efficient and safe solutions every time.",
                 "Long-Lasting Solutions: We don’t just fix the problem; we ensure that it’s fixed right the first time, providing long-term, reliable solutions."
            ]
        },
    ],
    team: [
        {
            name: "Jim Smith",
            role: "Owner & Founder",
            avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
            bio: [
                "20 Years of Expertise: Jim has been in the electrical business for over 20 years, bringing vast experience and leadership to every project.",
                "Passionate About Quality: Jim’s dedication to top-tier service and customer satisfaction is what drives the company to consistently provide the best electrical solutions.",
                "Locally Committed: As a long-time resident and business owner, Jim takes pride in serving the community and supporting local growth."
            ],
        },
        {
            name: "Bob Smith",
            role: "Job Manager",
            avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
            bio: "Bob brings over 15 years of leadership experience, ensuring every job runs smoothly and is completed on time. His expertise guarantees top-quality project management for all customers."
        },
        {
            name: "Ryan Brown",
            role: "Journeyman",
            avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
            bio: "With 10+ years as a journeyman, Ryan is known for his thoroughness and attention to detail, making sure every electrical task is handled to perfection."
        },
    ],
    reviews: [
        {
            text: "Excellent service! They handled a full electrical rewiring of our house, and we couldn’t be more satisfied with the results. The electricians were professional, on time, and incredibly helpful.",
            author: "Kelly W.",
            title: "Homeowner",
            avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            text: "Quick, reliable, and highly skilled. We had an electrical emergency at 2 AM, and they arrived in less than an hour. Couldn’t recommend them enough.",
            author: "Adam L.",
            title: "Small Business Owner",
            avatar: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            text: "These guys are amazing! They installed our new ceiling fans and updated our fuse box with such precision. Highly recommend them for any electrical needs.",
            author: "George P.",
            title: "Homeowner",
            avatar: "https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            text: "We had several outlets go out, and this team not only fixed them fast but also made sure everything was up to code. Excellent customer service!",
            author: "Samantha F.",
            title: "Homeowner",
            avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600"
        }
    ]
};

const RadialProgressDial = ({ label, percentage }: { label: string, percentage: number }) => {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.5 });
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = isIntersecting ? circumference - (percentage / 100) * circumference : circumference;

    return (
        <div ref={ref} className="radial-dial">
            <svg viewBox="0 0 120 120">
                <circle
                    className="dial-background"
                    cx="60"
                    cy="60"
                    r={radius}
                />
                <circle
                    className="dial-progress"
                    cx="60"
                    cy="60"
                    r={radius}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
                <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="dial-percentage">
                    {percentage}%
                </text>
            </svg>
            <p className="dial-label">{label}</p>
        </div>
    );
};

const RadialBenefitsGraph = ({ title, items }: { title: string, items: { label: string, percentage: number }[] }) => {
    return (
      <div className="benefits-graph-radial">
        <h4>{title}</h4>
        <div className="dials-container">
            {items.map((item, index) => (
              <ScrollAnimator key={item.label} delay={index * 150}>
                  <RadialProgressDial label={item.label} percentage={item.percentage} />
              </ScrollAnimator>
            ))}
        </div>
      </div>
    );
};


const ServiceDetailPage = () => {
    const { servicePath } = useParams();
    const data = serviceData[servicePath || ''];
    const [openAccordion, setOpenAccordion] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (data && data.sections.length > 0) {
            setOpenAccordion(data.sections[0].title);
        } else {
            setOpenAccordion(null);
        }
    }, [data]);
    
    if (!data) {
        return (
            <main className="container">
                <h1 className="section-title">Service Not Found</h1>
                <p style={{textAlign: 'center'}}>The service you are looking for does not exist. Please check the URL or navigate back to our services list.</p>
            </main>
        )
    }

    const handleAccordionClick = (title: string) => {
        setOpenAccordion(openAccordion === title ? null : title);
    };

    return (
        <main className="container service-detail-page">
            <ScrollAnimator>
                <div className="service-page-header">
                    {servicePath === 'electrical-panel-repair' && <PanelIcon className="service-page-icon" />}
                    {servicePath === 'smoke-detector-inspections' && <SmokeDetectorIcon className="service-page-icon" />}
                    {servicePath === 'car-charging-installs' && <EvChargeIcon className="service-page-icon" />}
                    {servicePath === 'ceiling-fans' && <CeilingFanIcon className="service-page-icon" />}
                    {servicePath === 'circuit-breaker-repair' && <CircuitBreakerIcon className="service-page-icon" />}
                    <h1>{data.title}</h1>
                    <p className="sub-heading">{data.intro.text}</p>
                </div>
                {data.intro.video &&
                    <div className="video-grid single-video-grid">
                        <YouTubeEmbed embedId={data.intro.video} />
                    </div>
                }
            </ScrollAnimator>
            
            {data.sections.length > 0 && (
                <div className="accordion">
                    {data.sections.map((section, index) => (
                        <ScrollAnimator key={section.title} delay={index * 100}>
                            <AccordionItem
                                title={section.title}
                                isOpen={openAccordion === section.title}
                                onClick={() => handleAccordionClick(section.title)}
                            >
                                {section.type === 'list' && (
                                    <ul className="gradient-list">
                                        {section.items.map((item, i) => (
                                            <li key={i}><CheckmarkIcon /> <span>{item}</span></li>
                                        ))}
                                    </ul>
                                )}
                                 {section.type === 'graph' && (
                                    <>
                                        <ul className="gradient-list">
                                            {section.items.map((item, i) => (
                                                <li key={i}><CheckmarkIcon /> <span>{item}</span></li>
                                            ))}
                                        </ul>
                                        <RadialBenefitsGraph title={section.graphTitle} items={section.graphItems} />
                                    </>
                                )}
                                {section.type === 'paragraph' && <p>{section.content}</p>}
                                {section.type === 'reviews' && (
                                    <div>
                                        <p>{section.intro_paragraph}</p>
                                        <div className="service-reviews-container">
                                            {section.reviews.map(review => (
                                                <blockquote key={review.author} className="service-review-card">
                                                    <p>{review.text}</p>
                                                    <footer>— {review.author}</footer>
                                                </blockquote>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {section.type === 'faq' && (
                                    <div className="faq-container">
                                        {section.items.map(faq => (
                                            <div key={faq.q} className="faq-item">
                                                <h4 className="faq-question">{faq.q}</h4>
                                                <p className="faq-answer">{faq.a}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {section.video && (
                                    <div className="video-grid single-video-grid">
                                        <YouTubeEmbed embedId={section.video} />
                                    </div>
                                )}
                            </AccordionItem>
                        </ScrollAnimator>
                    ))}
                </div>
            )}

            <ScrollAnimator className="contact-cta">
                 <h2>{data.cta?.title || 'Ready to Get Started?'}</h2>
                <p>{data.cta?.text || 'Contact us today for a free estimate.'}</p>
                <Link to="/about" className="btn btn-gradient">{data.cta?.buttonText || 'Contact Us Today'}</Link>
            </ScrollAnimator>
        </main>
    );
};


interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({ title, children, isOpen, onClick }: AccordionItemProps) => {
    const contentRef = React.useRef<HTMLDivElement>(null);

    return (
        <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
            <button className="accordion-title" onClick={onClick}>
                {title}
                <PlusIcon />
            </button>
            <div
                ref={contentRef}
                className="accordion-content"
                style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
            >
                <div className="accordion-content-inner">{children}</div>
            </div>
        </div>
    );
};

interface YouTubeEmbedProps {
    embedId: string;
}

const YouTubeEmbed = ({ embedId }: YouTubeEmbedProps) => (
    <div className="video-wrapper">
        <iframe
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
        />
    </div>
);

const About = () => {
    const [openAccordion, setOpenAccordion] = React.useState<string | null>(aboutContent.sections[0].title);

    const handleAccordionClick = (title: string) => {
        setOpenAccordion(openAccordion === title ? null : title);
    };

    return (
        <main className="container">
            <ScrollAnimator>
                <h1 className="section-title">About VoltTech Electricians</h1>
                <p className="sub-heading about-intro">{aboutContent.intro}</p>
            </ScrollAnimator>

            <div className="accordion">
                {aboutContent.sections.map((section, index) => (
                    <ScrollAnimator key={section.title} delay={index * 100}>
                        <AccordionItem
                            title={section.title}
                            isOpen={openAccordion === section.title}
                            onClick={() => handleAccordionClick(section.title)}
                        >
                            {Array.isArray(section.content) && (
                                <ul className="gradient-list">
                                    {section.content.map((item, i) => (
                                        <li key={i}><CheckmarkIcon /> <span>{item}</span></li>
                                    ))}
                                </ul>
                            )}
                            {section.videos && (
                                <div className="video-grid">
                                    {section.videos.map(videoId => (
                                         <YouTubeEmbed embedId={videoId} key={videoId} />
                                    ))}
                                </div>
                            )}
                        </AccordionItem>
                    </ScrollAnimator>
                ))}
            </div>

            <ScrollAnimator className="about-standalone-section">
                 <h2 className="section-title">Meet The Team</h2>
                <div className="about-team-layout">
                    {aboutContent.team.map((member, index) => (
                        <ScrollAnimator key={member.name} delay={index * 150}>
                            <div className="about-team-member">
                                <div className="team-avatar">
                                    <div style={{ backgroundImage: `url(${member.avatar})` }} />
                                </div>
                                <div className="team-member-info">
                                    <h3>{member.name} <span>{member.role}</span></h3>
                                    {Array.isArray(member.bio) ? (
                                        <ul className="gradient-list">
                                            {member.bio.map((item, i) => (
                                                 <li key={i}><CheckmarkIcon /> <span>{item}</span></li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>{member.bio}</p>
                                    )}
                                </div>
                            </div>
                        </ScrollAnimator>
                    ))}
                </div>
            </ScrollAnimator>
            
            <ScrollAnimator className="about-standalone-section">
                <h2 className="section-title">Client Testimonials</h2>
                <ReviewsSlideshow reviews={aboutContent.reviews} />
            </ScrollAnimator>
        </main>
    );
};


interface Review {
    text: string;
    author: string;
    title: string;
    avatar: string;
}

const ReviewsSlideshow = ({ reviews }: { reviews: Review[] }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const timeoutRef = React.useRef<number | null>(null);
    const numReviews = reviews.length;

    const resetTimeout = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = window.setTimeout(() => 
            setCurrentIndex(prev => (prev + 1) % numReviews), 
        5000);
        return () => resetTimeout();
    }, [currentIndex, numReviews]);
    
    const getCardStyle = (index: number): React.CSSProperties => {
        const offset = (index - currentIndex + numReviews) % numReviews;

        // Default state for cards that are far away in the stack or have been dismissed
        // They will animate from the top
        let transform = 'translateY(-200%) scale(0.8) translateZ(-500px)';
        let opacity = 0;
        let zIndex = 0;

        if (offset === 0) {
            // Active card: centered, fully scaled, and in front
            transform = 'translateY(0) scale(1) translateZ(0)';
            opacity = 1;
            zIndex = 3;
        } else if (offset === 1) {
            // Next card: stacked behind and slightly above the active one
            transform = 'translateY(-40px) scale(0.9) translateZ(-80px)';
            opacity = 1;
            zIndex = 2;
        } else if (offset === 2) {
            // The card after that: further back and higher
            transform = 'translateY(-80px) scale(0.8) translateZ(-160px)';
            opacity = 1;
            zIndex = 1;
        } else if (offset === numReviews - 1) {
            // Previous card that is animating up and out of view
            transform = 'translateY(-200%) scale(1) translateZ(0)';
            opacity = 0;
            zIndex = 2;
        }

        // Any other cards in the stack are hidden
        if(offset > 2 && offset < numReviews - 1) {
            opacity = 0;
            transform = 'translateY(-120px) scale(0.7) translateZ(-240px)';
        }

        return {
            transform,
            opacity,
            zIndex,
            pointerEvents: offset === 0 ? 'auto' : 'none',
        };
    };

    return (
        <div className="testimonial-carousel-container">
            <div className="testimonial-carousel">
                <div className="carousel-inner">
                    {reviews.map((review, index) => (
                        <div className={`testimonial-card ${currentIndex === index ? 'active' : ''}`} key={index} style={getCardStyle(index)}>
                            <div className="testimonial-card-content">
                                <div className="testimonial-text">
                                    <p>"{review.text}"</p>
                                    <div className="testimonial-author">
                                        <div>
                                            <h3>{review.author}</h3>
                                            <p>{review.title}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="testimonial-visual">
                                    <TestimonialVectorGraphic />
                                    <div className="author-avatar">
                                        <div style={{ backgroundImage: `url(${review.avatar})` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="slideshow-controls">
                <div className="slideshow-dots">
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${currentIndex === index ? "active" : ""}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
                <button className="btn btn-gradient testimonial-read-more">Read More</button>
            </div>
        </div>
    );
};


// --- LAYOUT COMPONENTS ---

const Header = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    React.useEffect(() => {
        document.body.classList.toggle('menu-open', menuOpen);
    }, [menuOpen]);
    
    const closeMenu = () => {
        setMenuOpen(false);
        setDropdownOpen(false);
    }

    return (
        <header className="header">
            <Link to="/" className="logo" onClick={closeMenu}>Volt<span className="logo-accent">Tech</span></Link>
            <button className="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
                 <svg className="mobile-menu-icon" width="30" height="30" viewBox="0 0 100 80">
                    <rect className={`line top ${menuOpen ? 'open' : ''}`} width="80" height="10" x="10" y="15" rx="5"></rect>
                    <rect className={`line middle ${menuOpen ? 'open' : ''}`} width="80" height="10" x="10" y="35" rx="5"></rect>
                    <rect className={`line bottom ${menuOpen ? 'open' : ''}`} width="80" height="10" x="10" y="55" rx="5"></rect>
                </svg>
            </button>
            <nav className={menuOpen ? 'nav-open' : ''}>
                <ul className="nav-links">
                    <li className="nav-link"><NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
                    <li className={`nav-link dropdown ${dropdownOpen ? 'dropdown-open' : ''}`}>
                         <button className="nav-link-button" onClick={() => setDropdownOpen(!dropdownOpen)}>Services</button>
                         <div className="dropdown-menu-wrapper">
                            <ul className="dropdown-menu">
                                {services.map(service => (
                                    <li key={service.path} className="dropdown-item">
                                        <NavLink to={`/services/${service.path}`} onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>{service.title}</NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                    <li className="nav-link"><NavLink to="/about" onClick={closeMenu} className={({ isActive }) => isActive ? 'active' : ''}>About Us</NavLink></li>
                </ul>
            </nav>
        </header>
    );
};

const Footer = () => {
    const footerLinks = [
        { name: "Community", path: "/" },
        { name: "Blog", path: "/" },
        { name: "Pricing", path: "/" },
        { name: "Support", path: "/" },
        { name: "Contact", path: "/about" },
        { name: "Terms", path: "/" },
        { name: "Privacy", path: "/" }
    ];
    
    return (
        <footer className="footer">
            <ScrollAnimator>
                <div className="footer-content">
                    <Link to="/" className="logo footer-logo-text">Volt<span className="logo-accent">Tech</span></Link>
                    <ul className="footer-nav">
                        {footerLinks.map(link => (
                            <li key={link.name}><Link to={link.path}>{link.name}</Link></li>
                        ))}
                    </ul>
                    <div className="footer-socials">
                        <a href="#" aria-label="Instagram"><svg className="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg></a>
                        <a href="#" aria-label="LinkedIn"><svg className="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-11 4H5v10h3V7zm-1.5-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm11 12h-3v-4.32c0-1.1-.02-2.5-1.52-2.5c-1.53 0-1.77 1.19-1.77 2.42V19h-3V7h3v1.38h.04c.42-.8 1.45-1.64 3.01-1.64 3.22 0 3.82 2.12 3.82 4.88V19z"/></svg></a>
                        <a href="#" aria-label="YouTube"><svg className="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M21.58 7.19c-.23-.86-.9-1.52-1.76-1.75C18.25 5 12 5 12 5s-6.25 0-7.82.44c-.86.23-1.52.89-1.75 1.75C2 8.76 2 12 2 12s0 3.24.43 4.81c.23.86.9 1.52 1.75 1.75C5.75 19 12 19 12 19s6.25 0 7.82-.44c.86-.23 1.52-.89 1.76-1.75C22 15.24 22 12 22 12s0-3.24-.42-4.81zM9.75 15.5V8.5L15.75 12 9.75 15.5z"/></svg></a>
                        <a href="#" aria-label="Facebook"><svg className="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7.02h-2.54v-2.89h2.54V9.84c0-2.51 1.49-3.9 3.8-3.9 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.89h-2.33v7.02c4.78-.75 8.44-4.9 8.44-9.9C22 6.53 17.5 2.04 12 2.04z"/></svg></a>
                    </div>
                    <p className="copyright">&copy; {new Date().getFullYear()} VoltTech Electricians. All Rights Reserved.</p>
                </div>
            </ScrollAnimator>
        </footer>
    );
};

const MouseFollower = () => {
    const followerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (followerRef.current) {
                followerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return <div id="mouse-follower" ref={followerRef}></div>;
};


const App = () => {
  return (
    <HashRouter>
      <MouseFollower />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/:servicePath" element={<ServiceDetailPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);