import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const quickReplies = [
  "Tell me about your services",
  "What's your pricing?",
  "How can I contact you?",
  "Show me your projects",
];

const botResponses: Record<string, string> = {
  "tell me about your services": "I offer Discord bot development, web development, and full-stack solutions. My Discord bots include custom commands, moderation, and AI features. Web projects range from portfolios to complex web apps!",
  "what's your pricing": "Discord bots start at ₹1,999, Web development from ₹12,999, and full-stack projects have custom pricing based on requirements. All packages include post-launch support!",
  "how can i contact you": "You can reach me via email at info@nishantchauhan.site, on Discord, or fill out the contact form on this website. I usually respond within 24 hours!",
  "show me your projects": "Check out the Projects section above! I've built Aurix (Discord bot platform), organized esports tournaments with Vanguard India, and developed websites for various businesses.",
  "default": "Thanks for your message! I'm currently away, but I'll get back to you soon. In the meantime, feel free to explore the website or contact me directly through the contact form!",
};

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! 👋 I'm Nishant's chat assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(key) || key.includes(lowerMessage)) {
        return response;
      }
    }
    
    if (lowerMessage.includes("discord") || lowerMessage.includes("bot")) {
      return botResponses["tell me about your services"];
    }
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("rate")) {
      return botResponses["what's your pricing"];
    }
    if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach")) {
      return botResponses["how can i contact you"];
    }
    if (lowerMessage.includes("project") || lowerMessage.includes("work") || lowerMessage.includes("portfolio")) {
      return botResponses["show me your projects"];
    }
    
    return botResponses["default"];
  };

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot typing
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button - positioned on right side */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="fixed bottom-8 right-8 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
            style={{ background: "var(--gradient-red)" }}
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 30px hsl(357 83% 47% / 0.5)" }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-6 h-6 text-white" />
            {/* Notification Dot */}
            <motion.span 
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed z-[200] shadow-2xl rounded-2xl overflow-hidden ${
              isMinimized ? "bottom-8 right-8 w-72" : "bottom-8 right-8 w-96 h-[500px]"
            }`}
            style={{ 
              background: "hsl(var(--card))", 
              border: "1px solid hsl(var(--border))" 
            }}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Header */}
            <motion.div 
              className="p-4 flex items-center justify-between"
              style={{ background: "var(--gradient-red)" }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, repeatDelay: 2 }}
                >
                  <Bot className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-white">Chat with Nishant</h3>
                  <p className="text-xs text-white/70">Usually replies instantly</p>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Minimize2 className="w-4 h-4 text-white" />
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </motion.div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: "320px" }}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      className={`flex gap-2 ${message.sender === "user" ? "justify-end" : ""}`}
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {message.sender === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <motion.div
                        className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                          message.sender === "user"
                            ? "bg-primary text-white rounded-br-sm"
                            : "bg-muted text-foreground rounded-bl-sm"
                        }`}
                        whileHover={{ scale: 1.02 }}
                      >
                        {message.text}
                      </motion.div>
                      {message.sender === "user" && (
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-foreground" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      className="flex gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div className="bg-muted p-3 rounded-2xl rounded-bl-sm">
                        <div className="flex gap-1">
                          <motion.span 
                            className="w-2 h-2 rounded-full bg-muted-foreground"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                          />
                          <motion.span 
                            className="w-2 h-2 rounded-full bg-muted-foreground"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }}
                          />
                          <motion.span 
                            className="w-2 h-2 rounded-full bg-muted-foreground"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                <div className="px-4 pb-2">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {quickReplies.map((reply, index) => (
                      <motion.button
                        key={reply}
                        onClick={() => handleSend(reply)}
                        className="flex-shrink-0 px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-primary hover:text-white transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {reply}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-4 py-2 rounded-full bg-muted text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <motion.button
                      onClick={() => handleSend()}
                      disabled={!inputValue.trim()}
                      className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                      style={{ background: "var(--gradient-red)" }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Send className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChatWidget;