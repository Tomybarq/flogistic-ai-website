import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { LanguageContext } from '@/pages/Home';

const SYSTEM_PROMPT = `You are a smart and helpful assistant for Flogistic Solutions Co., a premium enterprise AI company.
You help visitors learn about the company's services: Digital Marketing, Predictive Analytics, and Process Automation.
You encourage users to book a consultation. Keep replies concise and professional.
Company WhatsApp: +967738866236. Email: contact@flogistic.com.
If asked about pricing, say "Please contact us for a custom quote tailored to your needs."`;

const INITIAL_MESSAGES_EN = [
  { role: 'assistant', content: 'Hello! 👋 I\'m the Flogistic AI assistant. How can I help you today?' }
];
const INITIAL_MESSAGES_AR = [
  { role: 'assistant', content: 'مرحباً! 👋 أنا المساعد الذكي لـ Flogistic. كيف يمكنني مساعدتك اليوم؟' }
];

export default function Chatbot() {
  const { language } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(language === 'ar' ? INITIAL_MESSAGES_AR : INITIAL_MESSAGES_EN);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    setMessages(language === 'ar' ? INITIAL_MESSAGES_AR : INITIAL_MESSAGES_EN);
  }, [language]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = [...messages, userMsg]
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const prompt = `${SYSTEM_PROMPT}\n\nConversation:\n${history}\n\nAssistant:`;

    const result = await base44.integrations.Core.InvokeLLM({ prompt });
    setMessages(prev => [...prev, { role: 'assistant', content: result }]);
    setIsLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const isRtl = language === 'ar';

  return (
    <div className={`fixed bottom-6 ${isRtl ? 'left-6' : 'right-6'} z-50`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ height: '480px' }}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {isRtl ? 'مساعد Flogistic' : 'Flogistic Assistant'}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-blue-100 text-xs">{isRtl ? 'متصل' : 'Online'}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? (isRtl ? 'justify-start' : 'justify-end') : (isRtl ? 'justify-end' : 'justify-start')}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-slate-800 text-slate-200 rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className={`flex ${isRtl ? 'justify-end' : 'justify-start'}`}>
                  <div className="bg-slate-800 rounded-2xl px-4 py-3">
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-slate-700 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={isRtl ? 'اكتب رسالتك...' : 'Type your message...'}
                className="flex-1 bg-slate-800 text-white placeholder:text-slate-500 rounded-xl px-4 py-2.5 text-sm border border-slate-700 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 flex items-center justify-center text-white transition-colors flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(prev => !prev)}
        className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 flex items-center justify-center text-white transition-colors"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}