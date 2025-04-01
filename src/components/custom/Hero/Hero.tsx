import AnimatedTooltip from "@/components/AnimatedToolTip";
import { GlowingEffect } from "@/components/GlowingEffect";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  ChevronRight,
  LineChart,
  PieChart,
  Star,
  TrendingUp,
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const heroStats = [
  { label: "Active Users", value: "25,000+" },
  { label: "Average ROI", value: "21.6%" },
  { label: "Markets Covered", value: "30+" },
];

const Hero = () => {
  const heroRef = useRef(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef(null);
  const imageContainerRef = useRef(null);
  const badge1Ref = useRef(null);
  const badge2Ref = useRef(null);
  const badge3Ref = useRef(null);
  const badge4Ref = useRef(null);
  const glowRef1 = useRef(null);
  const glowRef2 = useRef(null);

  useEffect(() => {
    // Main timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Hero section entrance
    tl.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 }
    );

    // Staggered text animation
    tl.fromTo(
      headingRef.current?.children ||[],
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
    );

    tl.fromTo(
      paragraphRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    );

    // Button animation with bounce
    tl.fromTo(
      buttonsRef.current?.children || [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.2, ease: "back.out(1.7)" },
      "-=0.3"
    );

    // Stats animation
    tl.fromTo(
      statsRef.current?.children || [],
      { y: 30, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.7, 
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)" 
      },
      "-=0.2"
    );

    // Trust badges animation
    tl.fromTo(
      trustRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    );

    // Image container animation
    tl.fromTo(
      imageContainerRef.current,
      { x: 50, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      "-=1.5"
    );

    // Floating badges animation
    const badges = [badge1Ref, badge2Ref, badge3Ref, badge4Ref];
    badges.forEach((badge, index) => {
      tl.fromTo(
        badge.current,
        { 
          y: 50 + index * 10, 
          opacity: 0, 
          scale: 0.8 
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          duration: 0.7, 
          ease: "back.out(1.7)" 
        },
        "-=0.5"
      );
    });

    // Continuous animations for the glow effects
    gsap.to(glowRef1.current, {
      x: "+=20",
      y: "+=20",
      opacity: 0.7,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(glowRef2.current, {
      x: "-=20",
      y: "-=20",
      opacity: 0.6,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Create pulse animations for each stat
    if (statsRef.current) {
      gsap.to(statsRef.current.children, {
        boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.3,
        ease: "sine.inOut"
      });
    }

    // Scroll-triggered animations
    if (typeof window !== "undefined") {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top center",
        onEnter: () => {
          // Additional animations when scrolling to the section
          gsap.to(headingRef.current, {
            backgroundPosition: "200% center",
            duration: 10,
            repeat: -1,
            ease: "none"
          });
        }
      });
    }

    return () => {
      // Cleanup
      if (typeof window !== "undefined") {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
      gsap.killTweensOf(glowRef1.current);
      gsap.killTweensOf(glowRef2.current);
      if (statsRef.current?.children) {
        gsap.killTweensOf(statsRef.current.children);
      }
    };
  }, []);

  // Split the heading into spans for better animation control
  const createHeadingElements = () => {
    const text = "Make smarter investing decisions with AI";
    const words = text.split(" ");
    return (
      <>
        {words.map((word, i) => (
          <span 
            key={i} 
            className={word === "smarter" ? "bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent" : ""}
          >
            {word}{" "}
          </span>
        ))}
      </>
    );
  };

  return (
    <section 
      ref={heroRef} 
      className="relative z-10 pt-28 pb-24 px-6 md:px-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div 
              className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-lg"
              ref={glowRef1}
            ></div>

            {/* AI-Powered badge */}
            <div 
              className="inline-flex items-center gap-2 bg-blue-500 px-3 py-1 rounded-full border border-blue-500/20 mb-6"
              style={{ transform: "translateY(-20px)", opacity: 0 }}
              ref={buttonsRef}
            >
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
              <span className="text-blue-400 text-sm font-medium">
                AI-Powered Platform
              </span>
            </div>

            <h1 
              ref={headingRef}
              className="text-4xl md:text-6xl font-bold leading-tight mb-6 bg-size-200"
            >
              {createHeadingElements()}
            </h1>
            
            <p 
              ref={paragraphRef}
              className="text-lg text-gray-300 mb-8"
            >
              Our GenAI-powered Financial Assistant analyzes market trends,
              predicts investment outcomes, and provides personalized
              recommendations to maximize your portfolio's performance.
            </p>

            <div 
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <AnimatedTooltip
                content="14-day free trial, no credit card required"
                position="top"
              >
                <div className="relative overflow-hidden group">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-lg relative z-10 overflow-hidden">
                    <span className="relative z-10 flex items-center">
                      Start Free Trial
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </span>
                    <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                  </Button>
                  <div className="absolute -inset-px bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-50 group-hover:opacity-75 transition"></div>
                </div>
              </AnimatedTooltip>

              <AnimatedTooltip
                content="See how our AI works in real-time"
                position="top"
              >
                <Button className="w-full sm:w-auto bg-gray-800/80 hover:bg-gray-700/80 text-white text-lg px-8 py-6 rounded-lg border border-gray-700 relative overflow-hidden group">
                  <span className="relative z-10">Watch Demo</span>
                  <span className="absolute inset-0 h-full w-full bg-gray-700/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></span>
                </Button>
              </AnimatedTooltip>
            </div>

            {/* Enhanced statistics section */}
            <div 
              ref={statsRef}
              className="grid grid-cols-3 gap-4"
            >
              {heroStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:bg-gray-800/50 hover:border-blue-500/30"
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <div
              ref={trustRef}
              className="flex items-center gap-6 mt-12"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-[#050508]"
                  />
                ))}
              </div>
              <div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-400">
                  Over 10,000+ investors trust us
                </p>
              </div>
            </div>
          </div>

          {/* Hero image on the right side */}
          <div
            ref={imageContainerRef}
            className="relative hidden md:block"
          >
            <div 
              ref={glowRef2}
              className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30"
            ></div>

            <GlowingEffect
              disabled={false}
              glow={true}
              borderWidth={1.5}
              spread={20}
              blur={30}
              movementDuration={1}
              className="z-10"
            >
              <div className="relative bg-[#0c0c14] p-1 rounded-2xl overflow-hidden border border-gray-800">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src="https://img.freepik.com/free-photo/robot-handshake-human-background-futuristic-digital-age_53876-129770.jpg?w=1380&t=st=1712443033~exp=1712443633~hmac=e4fa8edefb23f59e4a6c13cea1dd68b38ba6a3be7debc0d0c758f9453c1cddf7"
                    alt="AI Financial Assistant"
                    className="w-full h-auto rounded-xl transform transition-transform hover:scale-105 duration-700"
                  />

                  {/* Interactive elements with tooltips */}
                  <AnimatedTooltip
                    content={
                      <div className="w-48">
                        <p className="font-semibold mb-1">AI Market Analysis</p>
                        <p className="text-xs">
                          Our algorithm processes 1.2M data points daily to
                          forecast market trends
                        </p>
                      </div>
                    }
                    position="top"
                    className="z-30"
                  >
                    <div
                      ref={badge1Ref}
                      className="absolute top-8 left-8 bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg border border-gray-700 flex items-center gap-4 cursor-help"
                      style={{ opacity: 0, transform: "translateY(20px)" }}
                    >
                      <div className="p-2 bg-blue-500/30 rounded-full">
                        <TrendingUp className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Annual Return</p>
                        <p className="text-xl font-bold text-white">+24.8%</p>
                      </div>
                    </div>
                  </AnimatedTooltip>

                  <AnimatedTooltip
                    content={
                      <div className="w-48">
                        <p className="font-semibold mb-1">
                          Smart Risk Assessment
                        </p>
                        <p className="text-xs">
                          Personalized risk analysis based on your investment
                          goals and profile
                        </p>
                      </div>
                    }
                    position="left"
                    className="z-30"
                  >
                    <div
                      ref={badge2Ref}
                      className="absolute bottom-8 right-8 bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg border border-gray-700 flex items-center gap-4 cursor-help"
                      style={{ opacity: 0, transform: "translateY(20px)" }}
                    >
                      <div className="p-2 bg-purple-500/30 rounded-full">
                        <LineChart className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Risk Score</p>
                        <p className="text-xl font-bold text-white">Low</p>
                      </div>
                    </div>
                  </AnimatedTooltip>

                  <AnimatedTooltip
                    content={
                      <div className="w-48">
                        <p className="font-semibold mb-1">
                          Portfolio Performance
                        </p>
                        <p className="text-xs">
                          Real-time tracking and visualization of your
                          investments
                        </p>
                      </div>
                    }
                    position="right"
                  >
                    <div
                      ref={badge3Ref}
                      className="absolute bottom-24 left-12 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center cursor-help"
                      style={{ opacity: 0, transform: "translateY(20px)" }}
                    >
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                  </AnimatedTooltip>

                  <AnimatedTooltip
                    content={
                      <div className="w-48">
                        <p className="font-semibold mb-1">Asset Allocation</p>
                        <p className="text-xs">
                          AI-optimized diversification across multiple asset
                          classes
                        </p>
                      </div>
                    }
                    position="left"
                  >
                    <div
                      ref={badge4Ref}
                      className="absolute top-24 right-12 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center cursor-help"
                      style={{ opacity: 0, transform: "translateY(20px)" }}
                    >
                      <PieChart className="h-5 w-5 text-white" />
                    </div>
                  </AnimatedTooltip>
                </div>
              </div>
            </GlowingEffect>

            {/* Floating glow effects */}
            <div className="absolute -top-10 right-20 w-40 h-40 bg-blue-600/20 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-10 left-20 w-40 h-40 bg-purple-600/20 rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;