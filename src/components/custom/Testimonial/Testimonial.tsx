import React from "react";
import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/AnimatedTestimonials";
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const testimonialsData = [
  {
    quote:
      "The AI recommendations have increased my portfolio's performance by 32% in just six months. The market trend predictions are eerily accurate and have helped me stay ahead of major market movements.",
    name: "Alex Thompson",
    designation: "Angel Investor",
    src: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=740&t=st=1712442626~exp=1712443226~hmac=7a688b43644a53f1dc07e7fc0be5dd70f5f5b3d5a8bd126fd24de127d0fcd4a0",
  },
  {
    quote:
      "As someone new to investing, this platform has been invaluable. It's like having a financial advisor that's available 24/7 with insights tailored to my goals and risk tolerance.",
    name: "Sarah Chen",
    designation: "Retail Investor",
    src: "https://img.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg?w=826&t=st=1712442676~exp=1712443276~hmac=c17077be3a936760dba6d6aea88e00731cf9d9c26afb43835abee7a717c1d722",
  },
  {
    quote:
      "The risk assessment features have saved me from several potential losses. The AI catches patterns that even experienced investors might miss. I'm constantly impressed by how it analyzes multiple data sources.",
    name: "Michael Roberts",
    designation: "Portfolio Manager",
    src: "https://img.freepik.com/free-photo/bohemian-man-with-his-arms-crossed_1368-3542.jpg?w=740&t=st=1712442702~exp=1712443302~hmac=e4e8d2eda0a7e7b25774b2ee341d0982574f14f2a1ced7c9f2d1e18aeccf83f8",
  },
  {
    quote:
      "I've been able to diversify my investments more effectively with the AI's sector analysis. The platform identified opportunities I would have never considered on my own. Truly game-changing technology.",
    name: "Jessica Wong",
    designation: "Financial Analyst",
    src: "https://img.freepik.com/free-photo/young-beautiful-woman-smart-casual-wear-glasses-holding-laptop-looking-confident_176420-11857.jpg?w=826&t=st=1712442738~exp=1712443338~hmac=0f67f0f2f972b2cef6e082cca29d9dd6bc749d8d11024a8eae9128ced61e891f",
  },
];


const Testimonial = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section
      id="testimonials"
      className="relative z-10 py-24 px-6 md:px-10 bg-[#07070d]"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Hear from investors who've transformed their financial
            decision-making with our AI assistant.
          </p>
        </motion.div>

        <AnimatedTestimonials testimonials={testimonialsData} autoplay={true} />
      </div>
    </section>
  );
});

export default Testimonial;
