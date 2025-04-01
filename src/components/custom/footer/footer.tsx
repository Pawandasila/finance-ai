import { BrainCircuit } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className="relative z-10 py-12 px-6 md:px-10 bg-[#07070d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
                  <BrainCircuit className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  FinanceAI
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Making advanced financial analysis accessible to everyone with
                the power of AI.
              </p>
            </div>

            {[
              {
                title: "Product",
                links: [
                  "Features",
                  "Pricing",
                  "Integrations",
                  "API",
                  "Documentation",
                ],
              },
              {
                title: "Company",
                links: ["About Us", "Careers", "Blog", "Press Kit", "Contact"],
              },
              {
                title: "Resources",
                links: [
                  "Tutorials",
                  "Market Analysis",
                  "Investment Guides",
                  "Community",
                  "Webinars",
                ],
              },
            ].map((col, index) => (
              <div key={index}>
                <h3 className="font-bold mb-6">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
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
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer