import React, { useState } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
  } from "framer-motion";
import { ChevronDown } from 'lucide-react';


  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const faqItems = [
    {
      question: "How does the AI make investment recommendations?",
      answer:
        "Our AI analyzes millions of data points including market trends, company financials, economic indicators, and news sentiment. It then generates recommendations based on your risk profile, investment goals, and time horizon. The system continuously learns from market performance to improve its predictions over time.",
    },
    {
      question: "Is my financial data secure on your platform?",
      answer:
        "Absolutely. We employ bank-level encryption and security practices. Your data is encrypted both in transit and at rest. We use multi-factor authentication, regular security audits, and never share your personal information with third parties without your explicit consent.",
    },
    {
      question: "Can I connect my existing brokerage account?",
      answer:
        "Yes, we support integration with major brokerages through secure API connections. Once connected, you can view all your investments in one place and receive AI-powered recommendations specific to your current portfolio.",
    },
    {
      question: "What if the AI recommendations don't perform well?",
      answer:
        "While our AI uses advanced algorithms to make predictions, all investments carry risk. We provide transparent performance metrics and confidence scores with each recommendation. You maintain full control over which recommendations to follow, and our platform includes educational resources to help you make informed decisions.",
    },
    {
      question: "Do I need financial expertise to use this platform?",
      answer:
        "Not at all. Our platform is designed for users of all experience levels. Beginners will appreciate the educational resources and simplified interface, while experienced investors can dive into advanced analytics and customization options.",
    },
  ];

const Faq = React.forwardRef<HTMLDivElement>((props, ref) => {

  const [activeFaq, setActiveFaq] = useState<number | null>(null);


  return (
    <section
        id="faq"
        ref={ref}
        className="relative z-10 py-24 px-6 md:px-10 bg-[#07070d]"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Frequently{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Asked Questions
              </span>
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
                  onClick={() =>
                    setActiveFaq(activeFaq === index ? null : index)
                  }
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold pr-6">
                      {faq.question}
                    </h3>
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
  )
})

export default Faq