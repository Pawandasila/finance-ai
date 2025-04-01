import React from "react";
import {
    motion,
    useScroll,
    useTransform,
    AnimatePresence,
  } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ShieldCheck } from "lucide-react";


const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Cta = () => {
  return (
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
              Ready to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Transform
              </span>{" "}
              Your Investments?
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
              Join thousands of investors who are leveraging the power of AI to
              make smarter financial decisions and achieve their wealth goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-6 rounded-lg">
                Get Started for Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="text-lg px-8 py-6 border-gray-700 bg-gray-800/50 text-white rounded-lg"
              >
                Schedule a Demo
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <ShieldCheck className="h-5 w-5 text-blue-400" />
              <p className="text-sm text-gray-400">
                14-day free trial • No credit card required
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  );
};

export default Cta;
