// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ChevronRight, 
  BarChart3, 
  TrendingUp, 
  BookOpen, 
  LineChart, 
  PieChart, 
  Search, 
  BrainCircuit, 
  Star, 
  ShieldCheck,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Info
} from "lucide-react";
import { ThreeDMarquee } from "@/components/ThreeDMarquee";
import { GlowingEffect } from "@/components/GlowingEffect";
import { AnimatedTestimonials } from "../components/AnimatedTestimonials";
import { AnimatedTooltip } from "../components/AnimatedToolTip";

// Pricing plans data
const pricingPlans = [
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
      "Mobile app access"
    ],
    isPopular: false
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
      "API access"
    ],
    isPopular: true
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
      "Team collaboration tools"
    ],
    isPopular: false
  }
];

// FAQs data
const faqItems = [
  {
    question: "How does the AI make investment recommendations?",
    answer: "Our AI analyzes millions of data points including market trends, company financials, economic indicators, and news sentiment. It then generates recommendations based on your risk profile, investment goals, and time horizon. The system continuously learns from market performance to improve its predictions over time."
  },
  {
    question: "Is my financial data secure on your platform?",
    answer: "Absolutely. We employ bank-level encryption and security practices. Your data is encrypted both in transit and at rest. We use multi-factor authentication, regular security audits, and never share your personal information with third parties without your explicit consent."
  },
  {
    question: "Can I connect my existing brokerage account?",
    answer: "Yes, we support integration with major brokerages through secure API connections. Once connected, you can view all your investments in one place and receive AI-powered recommendations specific to your current portfolio."
  },
  {
    question: "What if the AI recommendations don't perform well?",
    answer: "While our AI uses advanced algorithms to make predictions, all investments carry risk. We provide transparent performance metrics and confidence scores with each recommendation. You maintain full control over which recommendations to follow, and our platform includes educational resources to help you make informed decisions."
  },
  {
    question: "Do I need financial expertise to use this platform?",
    answer: "Not at all. Our platform is designed for users of all experience levels. Beginners will appreciate the educational resources and simplified interface, while experienced investors can dive into advanced analytics and customization options."
  }
];

// Enhanced stats for the hero section
const heroStats = [
  { label: "Active Users", value: "25,000+" },
  { label: "Average ROI", value: "21.6%" },
  { label: "Markets Covered", value: "30+" }
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.98]);
  const headerBlur = useTransform(scrollYProgress, [0, 0.1], [0, 8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Array of dashboard UI images for the 3D marquee
  const dashboardImages = [
    "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
    "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
    "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
    "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
    "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
    "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
    "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
    "https://img.freepik.com/free-photo/advanced-technological-robot-interacting-with-money-finance_23-2151612687.jpg?t=st=1742662094~exp=1742665694~hmac=ed4f4293c9b0002e29af321d5f71742088cd55464c2326791508d397c29c825b&w=1380",
  ];

  // Testimonials data for the animated testimonials component
  const testimonialsData = [
    {
      quote: "The AI recommendations have increased my portfolio's performance by 32% in just six months. The market trend predictions are eerily accurate and have helped me stay ahead of major market movements.",
      name: "Alex Thompson",
      designation: "Angel Investor",
      src: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=740&t=st=1712442626~exp=1712443226~hmac=7a688b43644a53f1dc07e7fc0be5dd70f5f5b3d5a8bd126fd24de127d0fcd4a0"
    },
    {
      quote: "As someone new to investing, this platform has been invaluable. It's like having a financial advisor that's available 24/7 with insights tailored to my goals and risk tolerance.",
      name: "Sarah Chen",
      designation: "Retail Investor",
      src: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=826&t=st=1712442676~exp=1712443276~hmac=c17077be3a936760dba6d6aea88e00731cf9d9c26afb43835abee7a717c1d722"
    },
    {
      quote: "The risk assessment features have saved me from several potential losses. The AI catches patterns that even experienced investors might miss. I'm constantly impressed by how it analyzes multiple data sources.",
      name: "Michael Roberts",
      designation: "Portfolio Manager",
      src: "https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?w=740&t=st=1712442702~exp=1712443302~hmac=e4e8d2eda0a7e7b25774b2ee341d0982574f14f2a1ced7c9f2d1e18aeccf83f8"
    },
    {
      quote: "I've been able to diversify my investments more effectively with the AI's sector analysis. The platform identified opportunities I would have never considered on my own. Truly game-changing technology.",
      name: "Jessica Wong",
      designation: "Financial Analyst",
      src: "https://img.freepik.com/free-photo/young-beautiful-woman-smart-casual-wear-glasses-holding-laptop-looking-confident_176420-11857.jpg?w=826&t=st=1712442738~exp=1712443338~hmac=0f67f0f2f972b2cef6e082cca29d9dd6bc749d8d11024a8eae9128ced61e891f"
    }
  ];

  // AI feature data with tooltips
  const aiFeatures = [
    {
      icon: <TrendingUp size={24} />,
      title: "Market Trend Analysis",
      description: "Real-time analysis of market trends with predictive insights to help you stay ahead of market movements.",
      tooltip: "Uses advanced pattern recognition to identify market trends before they become obvious to the average investor."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Portfolio Optimization",
      description: "AI-driven recommendations to optimize your portfolio allocation based on your risk tolerance and goals.",
      tooltip: "Balances your portfolio across sectors, asset classes, and risk levels to maximize returns while respecting your risk tolerance."
    },
    {
      icon: <Search size={24} />,
      title: "Investment Opportunities",
      description: "Discover hidden investment opportunities with our advanced pattern recognition algorithms.",
      tooltip: "Identifies undervalued assets and emerging market segments using a combination of technical and fundamental analysis."
    },
    {
      icon: <LineChart size={24} />,
      title: "Risk Assessment",
      description: "Comprehensive risk analysis to help you understand and mitigate potential downsides.",
      tooltip: "Calculates Value at Risk (VaR) and other risk metrics to quantify potential losses and suggest hedging strategies."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Financial Education",
      description: "Personalized learning resources to improve your financial literacy and investment knowledge.",
      tooltip: "Tailors educational content to your knowledge level and learning gaps, with interactive simulations to test strategies risk-free."
    },
    {
      icon: <PieChart size={24} />,
      title: "Wealth Growth Planning",
      description: "Long-term wealth growth strategies tailored to your personal financial situation and goals.",
      tooltip: "Simulates different investment scenarios over decades to help you plan for retirement, education funding, or other financial goals."
    }
  ];

  // Animations
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-hidden">
      {/* Gradient background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-600/20 rounded-full filter blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-600/20 rounded-full filter blur-[100px]" />
      </div>

      {/* Header - now with scroll effect */}
      <motion.header 
        className="fixed top-0 w-full z-50 py-4 px-6 md:px-10 transition-all duration-200"
        style={{ 
          backgroundColor: "rgba(5, 5, 8, 0.8)",
          backdropFilter: `blur(${headerBlur}px)`,
          opacity: headerOpacity,
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
              <BrainCircuit className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">FinanceAI</span>
          </motion.div>
          
          <motion.nav 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex gap-8"
          >
            <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
            <a href="#demo" className="hover:text-blue-400 transition-colors">Demo</a>
            <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-blue-400 transition-colors">Testimonials</a>
            <a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a>
          </motion.nav>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-4"
          >
            <Button variant="outline" className="hidden md:flex border-gray-700 bg-gray-800/50 text-white">
              Log In
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg">
              Get Started
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section - with padding-top to offset fixed header */}
      <section className="relative z-10 pt-28 pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-lg"></div>
              
              {/* AI-Powered badge */}
              <div className="inline-flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                <span className="text-blue-400 text-sm font-medium">AI-Powered Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Make <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">smarter</span> investing decisions with AI
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Our GenAI-powered Financial Assistant analyzes market trends, predicts investment outcomes, and provides personalized recommendations to maximize your portfolio's performance.
              </p>
                            
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <AnimatedTooltip 
                  content="14-day free trial, no credit card required"
                  position="top"
                >
                  <div className="relative">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-lg">
                      Start Free Trial
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                    <div className="absolute -inset-px bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-50 group-hover:opacity-75 transition"></div>
                  </div>
                </AnimatedTooltip>
                
                <AnimatedTooltip 
                  content="See how our AI works in real-time"
                  position="top"
                >
                  <Button className="w-full sm:w-auto bg-gray-800/80 hover:bg-gray-700/80 text-white text-lg px-8 py-6 rounded-lg border border-gray-700">
                    Watch Demo
                  </Button>
                </AnimatedTooltip>
              </div>
              
              {/* Enhanced statistics section */}
              <div className="grid grid-cols-3 gap-4">
                {heroStats.map((stat, index) => (
                  <div key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex items-center gap-6 mt-12"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-[#050508]" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">Over 10,000+ investors trust us</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Add back the hero image on the right side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden md:block"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30"></div>
              
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
                          <p className="text-xs">Our algorithm processes 1.2M data points daily to forecast market trends</p>
                        </div>
                      }
                      position="top"
                      className="z-30"
                    >
                      <motion.div 
                        className="absolute top-8 left-8 bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg border border-gray-700 flex items-center gap-4 cursor-help"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                      >
                        <div className="p-2 bg-blue-500/30 rounded-full">
                          <TrendingUp className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Annual Return</p>
                          <p className="text-xl font-bold text-white">+24.8%</p>
                        </div>
                      </motion.div>
                    </AnimatedTooltip>
                    
                    <AnimatedTooltip
                      content={
                        <div className="w-48">
                          <p className="font-semibold mb-1">Smart Risk Assessment</p>
                          <p className="text-xs">Personalized risk analysis based on your investment goals and profile</p>
                        </div>
                      }
                      position="left"
                      className="z-30"
                    >
                      <motion.div 
                        className="absolute bottom-8 right-8 bg-gray-900/90 backdrop-blur-sm p-4 rounded-lg border border-gray-700 flex items-center gap-4 cursor-help"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
                      >
                        <div className="p-2 bg-purple-500/30 rounded-full">
                          <LineChart className="h-6 w-6 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Risk Score</p>
                          <p className="text-xl font-bold text-white">Low</p>
                        </div>
                      </motion.div>
                    </AnimatedTooltip>
                    
                    <AnimatedTooltip
                      content={
                        <div className="w-48">
                          <p className="font-semibold mb-1">Portfolio Performance</p>
                          <p className="text-xs">Real-time tracking and visualization of your investments</p>
                        </div>
                      }
                      position="right"
                    >
                      <motion.div 
                        className="absolute bottom-24 left-12 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center cursor-help"
                        animate={{ 
                          y: [0, -15, 0],
                          rotate: [0, 10, 0]
                        }}
                        transition={{ 
                          duration: 5, 
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        whileHover={{ scale: 1.2, boxShadow: "0 0 25px rgba(59, 130, 246, 0.6)" }}
                      >
                        <BarChart3 className="h-6 w-6 text-white" />
                      </motion.div>
                    </AnimatedTooltip>
                    
                    <AnimatedTooltip
                      content={
                        <div className="w-48">
                          <p className="font-semibold mb-1">Asset Allocation</p>
                          <p className="text-xs">AI-optimized diversification across multiple asset classes</p>
                        </div>
                      }
                      position="left"
                    >
                      <motion.div 
                        className="absolute top-24 right-12 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center cursor-help"
                        animate={{ 
                          y: [0, 15, 0],
                          rotate: [0, -10, 0]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: 1
                        }}
                        whileHover={{ scale: 1.2, boxShadow: "0 0 25px rgba(168, 85, 247, 0.6)" }}
                      >
                        <PieChart className="h-5 w-5 text-white" />
                      </motion.div>
                    </AnimatedTooltip>
                  </div>
                </div>
              </GlowingEffect>
              
              {/* Floating glow effects */}
              <div className="absolute -top-10 right-20 w-40 h-40 bg-blue-600/20 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-10 left-20 w-40 h-40 bg-purple-600/20 rounded-full filter blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-6 md:px-10 bg-[#07070d]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">AI-Powered</span> Features
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our advanced financial assistant uses cutting-edge GenAI technology to provide you with the tools you need to make informed investment decisions.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {aiFeatures.map((feature, index) => (
              <motion.div 
                key={index} 
                variants={scaleIn}
                className="relative p-0.5 rounded-2xl"
              >
                <Card className="relative bg-[#0c0c14]/70 border-0 rounded-2xl p-6 h-full backdrop-blur-sm overflow-hidden">
                  <GlowingEffect
                    disabled={false}
                    glow={true}
                    borderWidth={1.5}
                    spread={10}
                    movementDuration={1.5}
                  />
                  <div className="relative z-10">
                    <AnimatedTooltip content={feature.tooltip} position="top">
                      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4 group cursor-help">
                        {feature.icon}
                      </div>
                    </AnimatedTooltip>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="demo" className="relative z-10 py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Powerful <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Dashboard</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Intuitive interface with advanced analytics and visualizations to help you make data-driven investment decisions.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-[#0c0c14] p-2 rounded-2xl overflow-hidden border border-gray-800">
              {mounted && <ThreeDMarquee images={dashboardImages} />}
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-600/30 rounded-full filter blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/30 rounded-full filter blur-2xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-24 px-6 md:px-10 bg-[#07070d]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              What Our <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Users Say</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Hear from investors who've transformed their financial decision-making with our AI assistant.
            </p>
          </motion.div>
          
          <AnimatedTestimonials testimonials={testimonialsData} autoplay={true} />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Simple, <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Transparent</span> Pricing
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Choose the plan that fits your investment needs. All plans include our core AI features.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {pricingPlans.map((plan, index) => (
              <motion.div 
                key={index} 
                variants={scaleIn}
                className="relative"
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium py-1 px-4 rounded-full z-10">
                    Most Popular
                  </div>
                )}
                
                <Card className={`relative backdrop-blur-sm overflow-hidden h-full ${
                  plan.isPopular 
                    ? "bg-gradient-to-b from-blue-900/20 to-purple-900/20 border-2 border-blue-500/20" 
                    : "bg-[#0c0c14]/70 border border-gray-800"
                } rounded-2xl p-8`}>
                  {plan.isPopular && <GlowingEffect disabled={false} glow={true} borderWidth={1.5} spread={15} movementDuration={1.5} />}
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                    <p className="text-gray-400 mb-6">{plan.description}</p>
                    
                    <div className="mb-8">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-gray-400 ml-2">{plan.period}</span>
                    </div>
                    
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-white">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className={`w-full py-6 ${
                      plan.isPopular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                    } text-white rounded-lg text-lg`}>
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="relative z-10 py-24 px-6 md:px-10 bg-[#07070d]">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Frequently <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Asked Questions</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about our AI investment platform.
            </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            {faqItems.map((faq, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                className="rounded-xl overflow-hidden"
              >
                <div 
                  className={`p-6 bg-[#0c0c14]/70 border border-gray-800 rounded-xl cursor-pointer transition-all duration-200 ${
                    activeFaq === index ? "bg-[#0c0c14]/90" : ""
                  }`}
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold pr-6">{faq.question}</h3>
                    <ChevronDown 
                      className={`h-5 w-5 transform transition-transform duration-200 ${
                        activeFaq === index ? "rotate-180" : ""
                      }`} 
                    />
                  </div>
                  
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="mt-4 text-gray-300 border-t border-gray-800 pt-4">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative z-10 py-24 px-6 md:px-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-5xl mx-auto relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-50"></div>
          <Card className="relative bg-[#0c0c14]/90 border-0 rounded-3xl p-12 backdrop-blur-md">
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-40 h-40 bg-purple-600/30 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-40 h-40 bg-blue-600/30 rounded-full filter blur-3xl"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Ready to <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Transform</span> Your Investments?
              </h2>
              <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
                Join thousands of investors who are leveraging the power of AI to make smarter financial decisions and achieve their wealth goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-lg">
                  Get Started for Free
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="text-lg px-8 py-6 border-gray-700 bg-gray-800/50 text-white rounded-lg">
                  Schedule a Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-400" />
                <p className="text-sm text-gray-400">14-day free trial • No credit card required</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 md:px-10 bg-[#07070d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                  <BrainCircuit className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">FinanceAI</span>
              </div>
              <p className="text-sm text-gray-400">
                Making advanced financial analysis accessible to everyone with the power of AI.
              </p>
            </div>
            
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "API", "Documentation"]
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Press Kit", "Contact"]
              },
              {
                title: "Resources",
                links: ["Tutorials", "Market Analysis", "Investment Guides", "Community", "Webinars"]
              }
            ].map((col, index) => (
              <div key={index}>
                <h3 className="font-bold mb-6">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 FinanceAI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}