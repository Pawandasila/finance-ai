import React, { useEffect, useRef, forwardRef, MutableRefObject } from "react";
import { Card } from "@/components/ui/card";
import { GlowingEffect } from "@/components/GlowingEffect";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "$29",
    period: "per month",
    description: "Perfect for individual investors",
    features: [
      "Market trend analysis",
      "Portfolio tracking",
      "Basic AI recommendations",
      "Email reports",
      "Mobile app access",
    ],
    isPopular: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "per month",
    description: "For serious investors looking to optimize returns",
    features: [
      "Everything in Basic",
      "Advanced AI predictions",
      "Portfolio optimization",
      "Risk management tools",
      "Weekly strategy reports",
      "API access",
    ],
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For financial teams and organizations",
    features: [
      "Everything in Pro",
      "White-label solution",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced data analytics",
      "Team collaboration tools",
    ],
    isPopular: false,
  },
];

const Pricing = forwardRef<HTMLDivElement>((props, forwardedRef) => {
  // Use MutableRefObject to avoid the read-only error
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const featureRefs = useRef<(HTMLLIElement | null)[][]>([]);

  // Initialize feature refs for each plan
  useEffect(() => {
    featureRefs.current = pricingPlans.map(() => []);
  }, []);

  // GSAP animations setup
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Header animations
    const headerTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    headerTimeline
      .from(headerRef.current?.querySelector("h2") as HTMLHeadingElement, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(
        headerRef.current?.querySelector("p") as HTMLParagraphElement,
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );

    // Card animations with stagger
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 100,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      },
    });

    // Feature animations
    featureRefs.current.forEach((planFeatures, planIndex) => {
      gsap.from(planFeatures, {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current[planIndex],
          start: "top 70%",
        },
      });
    });

    // Hover effects for cards
    cardsRef.current.forEach((card) => {
      if (!card) return;
      
      // Create hover timeline but don't play it yet
      const hoverTimeline = gsap.timeline({ paused: true });
      
      hoverTimeline
        .to(card, {
          y: -10,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        })
        .to(card.querySelector("button"), {
          scale: 1.05,
          duration: 0.2,
        }, "-=0.2");
      
      // Add event listeners to play/reverse the timeline
      card.addEventListener("mouseenter", () => hoverTimeline.play());
      card.addEventListener("mouseleave", () => hoverTimeline.reverse());
    });

    // Cleanup
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    };
  }, []);

  return (
    <section 
      id="pricing" 
      ref={(node) => {
        // Handle forwarded ref properly
        if (typeof forwardedRef === 'function') {
          forwardedRef(node as HTMLDivElement | null);
        } else if (forwardedRef) {
          // Only set if ref is not null
          forwardedRef.current = node as HTMLDivElement | null;
        }
        
        // Set internal ref
        if (node instanceof HTMLDivElement) {
          (sectionRef as MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      className="relative z-10 py-24 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Transparent
            </span>{" "}
            Pricing
          </h2>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Choose the plan that fits your investment needs. All plans include
            our core AI features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              ref={(el) => { cardsRef.current[index] = el; }}
              className="relative"
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium py-1 px-4 rounded-full z-10">
                  Most Popular
                </div>
              )}

              <Card
                className={`relative backdrop-blur-sm overflow-hidden h-full ${
                  plan.isPopular
                    ? "bg-gradient-to-b from-blue-900/20 to-purple-900/20 border-2 border-blue-500/20"
                    : "bg-[#0c0c14]/70 border border-gray-800"
                } rounded-2xl p-8`}
              >
                {plan.isPopular && (
                  <GlowingEffect
                    disabled={false}
                    glow={true}
                    borderWidth={1.5}
                    spread={15}
                    movementDuration={1.5}
                  />
                )}

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 mb-6">{plan.description}</p>

                  <div className="mb-8">
                    <span className="text-4xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li 
                        key={fIndex} 
                        ref={(el) => {
                          if (!featureRefs.current[index]) {
                            featureRefs.current[index] = [];
                          }
                          featureRefs.current[index][fIndex] = el;
                        }}
                        className="flex items-start"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-6 ${
                      plan.isPopular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                    } text-white rounded-lg text-lg`}
                  >
                    {plan.name === "Enterprise"
                      ? "Contact Sales"
                      : "Get Started"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Pricing.displayName = "Pricing";

export default Pricing;