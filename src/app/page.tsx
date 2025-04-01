"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  AnimatePresence,
} from "framer-motion";

import { Button } from "@/components/ui/button";

import {
  BarChart3,
  TrendingUp,
  LineChart,
  PieChart,
  Search,
  BrainCircuit,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import { ThreeDMarquee } from "@/components/ThreeDMarquee";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Footer from "@/components/custom/footer/footer";
import Cta from "@/components/custom/CTA/Cta";
import Faq from "@/components/custom/FAQ/Faq";
import Pricing from "@/components/custom/Pricing/Pricing";
import Testimonial from "@/components/custom/Testimonial/Testimonial";
import Feature from "@/components/custom/Features/feature";
import Hero from "@/components/custom/Hero/Hero";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const demoRef = useRef(null);
  const testimonialRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);

  const { scrollYProgress } = useScroll();

  // Initialize GSAP
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

      // Page load animation
      const tl = gsap.timeline();
      tl.from(".logo-animation", {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".nav-item",
          {
            opacity: 0,
            y: -20,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          ".button-animation",
          {
            opacity: 0,
            y: -20,
            stagger: 0.1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

      // Create animated background effect
      gsap.to(".floating-gradient", {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        duration: "random(10, 20)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });

      // Text reveal animations for headings
      const headings = document.querySelectorAll(".gsap-reveal-text");
      headings.forEach((heading) => {
        const splitText = new SplitType(heading as HTMLElement, {
          types: "words,chars",
        });
        gsap.from(splitText.chars, {
          scrollTrigger: {
            trigger: heading,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 20,
          stagger: 0.02,
          duration: 0.5,
          ease: "power2.out",
        });
      });

      // Staggered card animations
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: "#features",
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Dashboard parallax effect
      gsap.to("#demo-dashboard", {
        scrollTrigger: {
          trigger: "#demo",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -50,
        ease: "none",
      });

      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: "#pricing",
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
      const navLinks = document.querySelectorAll('nav a[href^="#"]');

      navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();

          const targetId = link.getAttribute("href");

          if (!targetId) {
            console.error("No valid target ID found.");
            return;
          }

          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            setMobileMenuOpen(false);

            gsap.to(window, {
              duration: 1.2,
              scrollTo: {
                y: targetElement,
                offsetY: 80,
              },
              ease: "power3.inOut",
            });
          }
        });
      });

      return () => {
        navLinks.forEach((link) => {
          link.removeEventListener("click", () => {});
        });
      };
    }
  }, [mounted]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dashboardImages = [
    "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
    // "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
    // "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
    // "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
    // "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
    // "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
    // "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
    // "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="floating-gradient absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full filter blur-[120px]" />
        <div className="floating-gradient absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-600/15 rounded-full filter blur-[120px]" />
        <div className="floating-gradient absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-600/15 rounded-full filter blur-[120px]" />
        <div className="floating-gradient absolute bottom-1/3 left-1/4 w-64 h-64 bg-indigo-600/15 rounded-full filter blur-[120px]" />
        <div className="floating-gradient absolute top-1/3 right-1/4 w-60 h-60 bg-fuchsia-600/15 rounded-full filter blur-[120px]" />
      </div>

      <motion.header
        className={`fixed top-0 w-full z-50 py-4 px-6 md:px-10 transition-all duration-300 ${
          scrolled
            ? "bg-[#0c0c14] shadow-lg border-b border-gray-800"
            : "bg-[#050508] border-b border-gray-800/30"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
              <BrainCircuit className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              FinanceAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <a
              href="#features"
              className="text-white hover:text-blue-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#demo"
              className="text-white hover:text-blue-400 transition-colors"
            >
              Demo
            </a>
            <a
              href="#pricing"
              className="text-white hover:text-blue-400 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-white hover:text-blue-400 transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="text-white hover:text-blue-400 transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Action Buttons */}
          <div className="hidden md:flex gap-4">
            <Button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center gap-2"
              onClick={() => (window.location.href = "/ai-chat")}
            >
              <MessageSquare className="h-4 w-4" />
              AI Chat
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg">
              Get Started
            </Button>
          </div>
        </div>
      </motion.header>

      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-[#0c0c14] z-40 border-b border-gray-800 shadow-lg">
          <div className="flex flex-col p-6 space-y-4">
            <a
              href="#features"
              className="text-lg py-2 text-white hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#demo"
              className="text-lg py-2 text-white hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Demo
            </a>
            <a
              href="#pricing"
              className="text-lg py-2 text-white hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-lg py-2 text-white hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#faq"
              className="text-lg py-2 text-white hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>

            <div className="flex flex-col gap-3 pt-4">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center justify-center gap-2"
                onClick={() => (window.location.href = "/ai-chat")}
              >
                <MessageSquare className="h-4 w-4" />
                AI Chat
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 w-full bg-[#0c0c14]/95 backdrop-blur-lg z-40 border-b border-gray-800"
          >
            <div className="flex flex-col p-6 space-y-4">
              <a
                href="#features"
                className="text-lg py-2 hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#demo"
                className="text-lg py-2 hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Demo
              </a>
              <a
                href="#pricing"
                className="text-lg py-2 hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-lg py-2 hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className="text-lg py-2 hover:text-blue-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </a>

              <div className="flex flex-col gap-3 pt-4">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg flex items-center justify-center gap-2"
                  onClick={() => (window.location.href = "/ai-chat")}
                >
                  <MessageSquare className="h-4 w-4" />
                  AI Chat
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Hero />

      <Feature />

      <section
        id="demo"
        ref={demoRef}
        className="relative z-10 py-24 px-6 md:px-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="gsap-reveal-text text-3xl md:text-5xl font-bold mb-6">
              Powerful{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text ">
                Dashboard
              </span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Intuitive interface with advanced analytics and visualizations to
              help you make data-driven investment decisions.
            </p>
          </div>

          <div className="relative" id="demo-dashboard">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-[#0c0c14] p-2 rounded-2xl overflow-hidden border border-gray-800">
              {mounted && <ThreeDMarquee images={dashboardImages} />}
            </div>

            <div className="floating-gradient absolute -bottom-6 -right-6 w-32 h-32 bg-purple-600/30 rounded-full filter blur-2xl"></div>
            <div className="floating-gradient absolute -top-6 -left-6 w-32 h-32 bg-blue-600/30 rounded-full filter blur-2xl"></div>

            <motion.div
              className="absolute top-10 right-10 bg-[#0c0c14]/80 backdrop-blur-md p-3 rounded-xl border border-gray-800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <BarChart3 className="h-6 w-6 text-blue-400" />
            </motion.div>

            <motion.div
              className="absolute bottom-10 left-10 bg-[#0c0c14]/80 backdrop-blur-md p-3 rounded-xl border border-gray-800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <TrendingUp className="h-6 w-6 text-green-400" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <motion.div
              className="bg-[#0c0c14]/50 backdrop-blur-md p-6 rounded-xl border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <LineChart className="h-8 w-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Analysis</h3>
              <p className="text-gray-300">
                Stay ahead with instant market insights and real-time data
                analytics.
              </p>
            </motion.div>

            <motion.div
              className="bg-[#0c0c14]/50 backdrop-blur-md p-6 rounded-xl border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <PieChart className="h-8 w-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Portfolio Visualization
              </h3>
              <p className="text-gray-300">
                Visualize your investments with interactive charts and
                comprehensive breakdowns.
              </p>
            </motion.div>

            <motion.div
              className="bg-[#0c0c14]/50 backdrop-blur-md p-6 rounded-xl border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Search className="h-8 w-8 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-300">
                Find opportunities instantly with our AI-powered search
                capabilities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Testimonial ref={testimonialRef} />

      <Pricing ref={pricingRef} />

      <Faq ref={faqRef} />

      <Cta />

      <Footer />

      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <button
          className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all duration-300 group"
          onClick={() => {
            gsap.to(window, {
              duration: 1.2,
              scrollTo: { y: 0 },
              ease: "power3.inOut",
            });
          }}
        >
          <MessageSquare className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
        </button>
      </motion.div>
    </div>
  );
}
