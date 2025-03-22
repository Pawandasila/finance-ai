"use client";

import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  ChevronLeft,
  Trash2,
  Download,
  BrainCircuit,
  Sparkles,
  Loader2,
  Settings,
  Share,
  History,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlowingEffect } from "@/components/GlowingEffect";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to FinanceAI! I can help with investment strategies, market analysis, retirement planning, and more. What questions do you have about your finances today?",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const conversationHistory: string[] = [
    "Retirement Planning",
    "Stock Market Analysis",
    "Tax Optimization",
    "Real Estate Investment",
  ];

  const sampleResponses: string[] = [
    "Based on current market trends, I recommend diversifying your portfolio with at least 20% allocated to technology stocks. Companies focusing on AI and cloud solutions show particularly strong growth potential. Consider ETFs that track the sector if you prefer lower risk exposure.",
    "For your retirement goals, a mix of 60% stocks and 40% bonds would balance growth and stability. Consider index funds with low expense ratios to maximize returns over time. Based on your timeline, increasing your monthly contributions by 15% would significantly improve your projected retirement income.",
    "The housing market is showing signs of cooling in urban areas. If you're planning to invest in real estate, consider emerging suburban markets with strong job growth and infrastructure development. Multi-family properties in these regions are showing particularly strong returns on investment.",
    "Your current debt-to-income ratio is higher than recommended. I suggest prioritizing the repayment of high-interest debt before increasing your investment contributions. Creating a debt snowball plan could help you eliminate these obligations 30% faster.",
    "Based on the information provided, you could optimize your tax strategy by increasing contributions to your 401(k) and considering a health savings account (HSA) for additional tax-advantaged savings. This approach could potentially reduce your tax liability by up to $3,500 annually.",
  ];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [input]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const isScrolledToBottom = (): boolean => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      return Math.abs(scrollHeight - scrollTop - clientHeight) < 10;
    }
    return true;
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsThinking(true);

    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);

    setTimeout(() => {
      setIsThinking(false);

      setTimeout(() => {
        const randomResponse =
          sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: randomResponse },
        ]);
        setIsLoading(false);

        setTimeout(() => {
          if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
          }
        }, 50);
      }, 800);
    }, 1500);
  };

  const clearChat = (): void => {
    setMessages([
      {
        role: "assistant",
        content:
          "Welcome to FinanceAI! I can help with investment strategies, market analysis, retirement planning, and more. What questions do you have about your finances today?",
      },
    ]);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const sidebarVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        const event = new Event("submit", {
          bubbles: true,
          cancelable: true,
        }) as unknown as FormEvent<HTMLFormElement>;
        handleSubmit(event);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown as unknown as EventListener
    );
    return () =>
      document.removeEventListener(
        "keydown",
        handleKeyDown as unknown as EventListener
      );
  }, [input]);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#050510] to-[#0a0a1a] text-white overflow-hidden">
      {/* Gradient background elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-600/10 rounded-full filter blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-600/10 rounded-full filter blur-[120px]" />
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <>
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setShowSidebar(false)}
            />
            <motion.div
              className="fixed top-0 left-0 h-full w-64 bg-[#0c0c18] border-r border-gray-800 z-50 p-4 overflow-y-auto"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                  <BrainCircuit className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  FinanceAI
                </span>
              </div>

              <div className="mb-6">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => {
                    clearChat();
                    setShowSidebar(false);
                  }}
                >
                  New Chat
                </Button>
              </div>

              <div className="space-y-1 mb-8">
                <h3 className="text-xs uppercase text-gray-500 font-medium mb-2 px-2">
                  Recent Conversations
                </h3>
                {conversationHistory.map((topic, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-800/50 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    onClick={() => setShowSidebar(false)}
                  >
                    <History className="h-4 w-4" />
                    {topic}
                  </button>
                ))}
              </div>

              <div className="absolute bottom-4 left-0 right-0 px-4">
                <div className="border-t border-gray-800 pt-4 space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-800/50 flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-800/50 flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <Info className="h-4 w-4" />
                    About FinanceAI
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-30 py-3 px-4 md:px-6 bg-[#050508]/90 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-full"
              onClick={() => setShowSidebar(true)}
            >
              <History className="h-5 w-5" />
            </Button>
            <div className="hidden lg:flex items-center gap-2">
              <Button
                variant="ghost"
                className="p-2 hover:bg-gray-800/50 hover:text-white rounded-full"
                onClick={() => (window.location.href = "/")}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1.5 rounded-lg">
                  <BrainCircuit className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  FinanceAI
                </span>
              </div>
            </div>
            <div className="h-6 w-px bg-gray-800 mx-2 hidden lg:block"></div>
            <div className="hidden lg:block text-sm text-gray-400">
              {formattedDate}
            </div>
          </div>

          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 hover:bg-gray-800/50 rounded-full text-gray-400 hover:text-white"
                    onClick={clearChat}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear chat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 hover:bg-gray-800/50 rounded-full text-gray-400 hover:text-white"
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export chat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 hover:bg-gray-800/50 rounded-full text-gray-400 hover:text-white"
                  >
                    <Share className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share insights</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2 hover:bg-gray-800/50 rounded-full text-gray-400 hover:text-white"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-[#0c0c18] border-gray-800 text-gray-200 hover:text-white"
              >
                <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer hover:text-white">
                  <Info className="h-4 w-4 mr-2" />
                  <span className="hover:text-white">About FinanceAI</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer hover:text-white">
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hover:text-white">Preferences</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem className="hover:bg-gray-800 focus:bg-gray-800 cursor-pointer hover:text-white">
                  <BrainCircuit className="h-4 w-4 mr-2" />
                  <span className="hover:text-white">AI Settings</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 overflow-hidden px-4 md:px-6">
        {/* Sidebar for larger screens */}
        <div className="hidden lg:block w-64 pr-6 flex-shrink-0 py-4">
          <div className="sticky top-20">
            <Button
              className="w-full mb-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={clearChat}
            >
              New Chat
            </Button>

            <div className="space-y-1 mb-6">
              <h3 className="text-xs uppercase text-gray-500 font-medium mb-2 px-2">
                Recent Conversations
              </h3>
              {conversationHistory.map((topic, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-gray-800/50 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <History className="h-4 w-4" />
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat area */}
        <motion.div
          className="flex-1 flex flex-col relative rounded-xl overflow-hidden bg-[#0c0c18]/60 backdrop-blur-sm border border-gray-800 my-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-6 ${
                  message.role === "user"
                    ? "ml-auto max-w-3xl"
                    : "mr-auto max-w-3xl"
                }`}
              >
                <div
                  className={`p-4 rounded-xl shadow-sm ${
                    message.role === "user"
                      ? "bg-blue-600/20 border border-blue-500/30 ml-auto"
                      : "bg-[#15152d]/50 border border-indigo-900/30"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2 text-blue-400">
                      <div className="p-1 rounded-md bg-blue-500/20">
                        <Sparkles className="h-3 w-3" />
                      </div>
                      <span className="font-medium text-sm">FinanceAI</span>
                    </div>
                  )}
                  <p className="text-gray-100 leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="mb-6 mr-auto max-w-3xl">
                <div className="p-4 rounded-xl bg-[#15152d]/50 border border-indigo-900/30 shadow-sm">
                  <div className="flex items-center gap-2 mb-2 text-blue-400">
                    <div className="p-1 rounded-md bg-blue-500/20">
                      <Sparkles className="h-3 w-3" />
                    </div>
                    <span className="font-medium text-sm">FinanceAI</span>
                  </div>
                  {isThinking ? (
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div
                          className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"
                          style={{ animationDelay: "600ms" }}
                        ></div>
                      </div>
                      <span className="text-gray-400 text-sm">Thinking...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                      <span className="text-gray-400 text-sm">
                        Generating financial insights...
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-1" />
          </div>
        </motion.div>
      </main>

      {/* Input area */}
      <div className="sticky bottom-0 left-0 right-0 p-4 md:p-6 bg-[#050508]/95 backdrop-blur-lg border-t border-gray-800 z-20">
        <div className="max-w-6xl mx-auto">
          <GlowingEffect
            disabled={false}
            glow={true}
            borderWidth={1.5}
            spread={15}
            blur={20}
            movementDuration={2}
          >
            <form
              onSubmit={handleSubmit}
              className="flex items-end gap-2 bg-[#0c0c18] p-2 rounded-xl border border-gray-800 relative shadow-lg"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                className="flex-1 bg-transparent border-none outline-none p-3 text-white placeholder-gray-500 resize-none max-h-32 min-h-[44px] text-sm"
                placeholder="Ask about investment strategies, retirement planning, market trends..."
                disabled={isLoading}
                rows={1}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-2 h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Send className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send message (Ctrl+Enter)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </form>
          </GlowingEffect>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2 px-1">
            <p>
              AI insights for educational purposes only. Not financial advice.
            </p>
            <p className="text-right">Ctrl+Enter to send</p>
          </div>
        </div>
      </div>
    </div>
  );
}
