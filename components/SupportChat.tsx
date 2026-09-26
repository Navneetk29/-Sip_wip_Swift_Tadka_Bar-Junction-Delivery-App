"use client";

import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

const CANNED = [
  "Track my order",
  "Cancel my order",
  "Change delivery address",
  "Payment issue",
  "Refund status",
];

const REPLIES: Record<string, string> = {
  "Track my order": "Sure! Go to My Orders → tap your order → you'll see a live tracking map with your delivery partner's location and ETA.",
  "Cancel my order": "Orders can be cancelled within 2 minutes of placing. Head to My Orders and tap 'Cancel'. After that, reach out to us here and we'll help!",
  "Change delivery address": "Sorry, we can't change the delivery address once the order is confirmed. Please place a new order with the correct address.",
  "Payment issue": "Please share your order ID and a brief description of the issue. Our team typically resolves payment queries within 2 hours.",
  "Refund status": "Refunds are processed within 5–7 business days depending on your payment method. You can check status in My Orders → Order Details.",
};

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
}

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "bot", text: "Hey there! 👋 I'm your SipSwift support assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text };
    setMessages((p) => [...p, userMsg]);
    setInput("");

    // Simulate bot reply
    setTimeout(() => {
      const reply = REPLIES[text] ?? "Thanks for reaching out! Our support team has been notified and will respond within 30 minutes. Is there anything else I can help you with?";
      setMessages((p) => [...p, { id: Date.now().toString() + "b", role: "bot", text: reply }]);
    }, 800);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-amber hover:bg-amber-light text-void flex items-center justify-center shadow-amber transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Support chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-ruby rounded-full flex items-center justify-center">
            <span className="animate-ping-slow absolute h-3 w-3 rounded-full bg-ruby opacity-75" />
            <span className="text-[8px] text-ivory font-bold relative z-10">1</span>
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 glass-panel rounded-xl3 overflow-hidden shadow-glass animate-scale-in">
          {/* Header */}
          <div className="p-4 bg-amber/10 border-b border-line flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-amber/20 border border-amber/40 flex items-center justify-center">
              <Bot size={18} className="text-amber-light" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ivory">SipSwift Support</p>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-bright" />
                <span className="text-xs text-smoke">Online · Usually replies instantly</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-smoke hover:text-ivory">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-64 overflow-y-auto p-4 flex flex-col gap-3 scroll-rail">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${m.role === "bot" ? "bg-amber/20" : "bg-glass-strong"}`}>
                  {m.role === "bot" ? <Bot size={12} className="text-amber-light" /> : <User size={12} className="text-ivory" />}
                </div>
                <div className={`max-w-[75%] rounded-xl2 px-3 py-2 text-xs leading-relaxed ${m.role === "bot" ? "bg-glass-strong text-ivory" : "bg-amber/20 text-ivory border border-amber/20"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto scroll-rail border-t border-line">
            {CANNED.map((c) => (
              <button
                key={c}
                onClick={() => send(c)}
                className="shrink-0 text-[10px] glass rounded-full px-3 py-1.5 text-smoke hover:text-ivory hover:border-amber/40 transition-all"
              >
                {c}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-line flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Type your message…"
              className="flex-1 bg-transparent text-xs text-ivory placeholder:text-smoke/50 outline-none"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="h-8 w-8 rounded-full bg-amber hover:bg-amber-light text-void flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
