import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  BarChart3,
  TrendingUp,
  Search,
  BookOpen,
  PieChart,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  tooltip: string;
}

const aiFeatures: FeatureItem[] = [
  {
    icon: <TrendingUp size={24} />,
    title: "Market Trend Analysis",
    description:
      "Real-time analysis of market trends with predictive insights to help you stay ahead of market movements.",
    tooltip:
      "Uses advanced pattern recognition to identify market trends before they become obvious to the average investor.",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Portfolio Optimization",
    description:
      "AI-driven recommendations to optimize your portfolio allocation based on your risk tolerance and goals.",
    tooltip:
      "Balances your portfolio across sectors, asset classes, and risk levels to maximize returns while respecting your risk tolerance.",
  },
  {
    icon: <Search size={24} />,
    title: "Investment Opportunities",
    description:
      "Discover hidden investment opportunities with our advanced pattern recognition algorithms.",
    tooltip:
      "Identifies undervalued assets and emerging market segments using a combination of technical and fundamental analysis.",
  },
  {
    icon: <LineChart size={24} />,
    title: "Risk Assessment",
    description:
      "Comprehensive risk analysis to help you understand and mitigate potential downsides.",
    tooltip:
      "Calculates Value at Risk (VaR) and other risk metrics to quantify potential losses and suggest hedging strategies.",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Financial Education",
    description:
      "Personalized learning resources to improve your financial literacy and investment knowledge.",
    tooltip:
      "Tailors educational content to your knowledge level and learning gaps, with interactive simulations to test strategies risk-free.",
  },
  {
    icon: <PieChart size={24} />,
    title: "Wealth Growth Planning",
    description:
      "Long-term wealth growth strategies tailored to your personal financial situation and goals.",
    tooltip:
      "Simulates different investment scenarios over decades to help you plan for retirement, education funding, or other financial goals.",
  },
];

// Spotlight effect with enhanced interaction
const Spotlight = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(120, 140, 255, 0.25), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

const Feature: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const featuresGridRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tooltipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Initialize animations with a slight delay to ensure DOM is fully rendered
    setTimeout(() => {
      // Main section entrance animation
      const sectionTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        }
      });

      // Animate title with a manual implementation instead of using SplitText
      if (titleRef.current) {
        // Select the individual spans we created in the JSX
        const titleSpans = titleRef.current.querySelectorAll(".title-word");
        
        sectionTl.fromTo(
          titleSpans,
          { 
            y: 50, 
            opacity: 0,
            rotationX: 15
          },
          { 
            y: 0, 
            opacity: 1,
            rotationX: 0,
            duration: 0.8, 
            stagger: 0.15, 
            ease: "power4.out",
            transformPerspective: 1000
          }
        );
      }

      // Subtitle animation with a slight bounce effect
      sectionTl.fromTo(
        descriptionRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" },
        "-=0.5"
      );

      // Grid container fade in
      sectionTl.fromTo(
        featuresGridRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

      // Staggered card animations with 3D perspective
      featureRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        // Calculate grid position (row and column)
        const col = index % 3;
        const row = Math.floor(index / 3);
        
        // Different starting positions based on grid position for more interesting animation
        const startX = (col - 1) * 50;
        const startY = 80 + row * 20;
        const startRotation = ((col - 1) * 5) + ((row - 1) * 3);
        
        gsap.fromTo(
          ref,
          { 
            y: startY,
            x: startX,
            opacity: 0,
            scale: 0.85,
            rotationX: 10,
            rotationY: startRotation,
            transformPerspective: 1000
          },
          { 
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.2 + index * 0.12,
            scrollTrigger: {
              trigger: ref,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );

        // Enhance hover interactions
        ref.addEventListener("mouseenter", () => {
          gsap.to(ref, {
            y: -8,
            scale: 1.03,
            duration: 0.35,
            ease: "power2.out",
            boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)"
          });
          
          // Animate icon on hover
          const iconEl = ref.querySelector(".icon-container");
          if (iconEl) {
            gsap.to(iconEl, {
              scale: 1.15,
              rotation: 5,
              backgroundColor: "rgba(88, 101, 242, 0.3)",
              duration: 0.4
            });
          }
          
          // Animate tooltip on hover
          const tooltipEl = ref.querySelector(".tooltip");
          if (tooltipEl) {
            gsap.to(tooltipEl, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
        
        ref.addEventListener("mouseleave", () => {
          gsap.to(ref, {
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
            boxShadow: "none"
          });
          
          // Reset icon animation
          const iconEl = ref.querySelector(".icon-container");
          if (iconEl) {
            gsap.to(iconEl, {
              scale: 1,
              rotation: 0,
              backgroundColor: "rgba(88, 101, 242, 0.15)",
              duration: 0.4
            });
          }
          
          // Hide tooltip
          const tooltipEl = ref.querySelector(".tooltip");
          if (tooltipEl) {
            gsap.to(tooltipEl, {
              opacity: 0,
              y: 10,
              duration: 0.3,
              ease: "power2.in"
            });
          }
        });
        
        // Floating animation for icons with randomized parameters
        const iconElement = ref.querySelector(".icon-container");
        if (iconElement) {
          const randomDelay = Math.random() * 2;
          const randomDuration = 1.5 + Math.random();
          
          gsap.to(iconElement, {
            y: "-8px",
            duration: randomDuration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: randomDelay
          });
        }
      });
    }, 200);

    return () => {
      // Clean up ScrollTriggers
      if (typeof window !== "undefined") {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative z-10 py-28 px-6 md:px-10 bg-[#07070d] overflow-hidden"
    >
      {/* Enhanced background with more dynamic gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/15 rounded-full filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/15 rounded-full filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/10 rounded-full filter blur-3xl opacity-50 animate-pulse" style={{ animationDelay: "3s" }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          {/* Title with manually pre-split words for animation */}
          <div 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight text-white h-auto overflow-visible"
          >
            <span className="inline-block overflow-hidden mx-1">
              <span className="title-word inline-block transform translate-y-full opacity-0">
                <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  AI-Powered
                </span>
              </span>
            </span>
            <span className="inline-block overflow-hidden mx-1">
              <span className="title-word inline-block transform translate-y-full opacity-0">
                Features
              </span>
            </span>
          </div>
          
          <p 
            ref={descriptionRef}
            className="text-xl text-gray-300 max-w-3xl mx-auto font-light"
          >
            Our advanced financial assistant uses cutting-edge GenAI technology
            to provide you with the tools you need to make informed investment
            decisions.
          </p>
        </div>

        <div
          ref={featuresGridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {aiFeatures.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                featureRefs.current[index] = el;
              }}
              className="relative group"
            >
              <Spotlight className="h-full rounded-2xl">
                <Card className="relative bg-gradient-to-b from-[#0c0c14]/90 to-[#0c0c14]/80 border border-gray-800/50 rounded-2xl p-6 h-full backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-gray-700/80">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-purple-800/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="group relative">
                      <div className="icon-container bg-indigo-500/15 p-3 rounded-xl w-14 h-14 flex items-center justify-center mb-5 text-indigo-400 group-hover:text-indigo-300 transition-all duration-300">
                        {feature.icon}
                      </div>
                      
                      {/* Tooltip */}
                      {/* <div
                        ref={(el) => {
                          tooltipRefs.current[index] = el;
                        }}
                        className="tooltip absolute z-50 left-0 top-0 -translate-y-full mt-[-10px] px-4 py-3 bg-gray-900/95 text-white text-sm rounded-lg shadow-xl w-64 opacity-0 pointer-events-none transform -translate-x-1/4 border border-gray-700/50"
                        style={{ backdropFilter: "blur(10px)" }}
                      >
                        {feature.tooltip}
                        <div className="absolute bottom-[-8px] left-16 transform rotate-45 w-4 h-4 bg-gray-900/95 border-r border-b border-gray-700/50"></div>
                      </div> */}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </Spotlight>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;