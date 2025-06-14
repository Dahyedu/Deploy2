import React from 'react';
import { Calendar, MessageCircle } from 'lucide-react';
import { useChatBot } from '../contexts/ChatBotContext';

const ReadyToTransform = () => {
  const { openChat } = useChatBot();

  return (
    <section className="py-20 relative">
      {/* Background - Same as SpecServices */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0052D4]/15 via-black/50 to-[#6FB1FC]/15 animate-breathe"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(67,100,247,0.3)_0%,rgba(0,82,212,0.1)_40%,transparent_70%)] animate-breathe-slow"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(111,177,252,0.2)_0%,transparent_50%)] animate-breathe-reverse"></div>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(0,82,212,0.15)_0%,transparent_60%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-wide">
            Ready To Transform
            <br />
            <span className="dynamic-gradient-text">
              Your Business?
            </span>
          </h2>
          <p className="text-lg font-light text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed tracking-wide">
            Let's discuss how AI can revolutionize your operations and drive unprecedented growth for your company.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => openChat('Book A Call')}
              className="premium-button px-8 py-4 bg-gradient-to-r from-[#0052D4]/20 via-[#4364F7]/20 to-[#6FB1FC]/20 border border-[#4364F7]/30 rounded-lg backdrop-blur-sm tracking-wide hover:from-[#0052D4]/30 hover:via-[#4364F7]/30 hover:to-[#6FB1FC]/30 transition-all duration-300 text-white font-normal"
            >
              Book A Call
            </button>
            <button 
              onClick={() => openChat()} 
              className="premium-button px-8 py-4 bg-white/10 border border-white/20 rounded-lg backdrop-blur-sm tracking-wide hover:bg-white/20 transition-all duration-300 text-white font-normal"
            >
              Chat With Our Bot
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToTransform;