import React, { useEffect, useRef } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import FAQ from '../components/FAQ';
import ReadyToTransform from '../components/ReadyToTransform';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import { ChatBotProvider } from '../contexts/ChatBotContext';
import '../animations.css';

function Home() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Set up intersection observer for scroll animations that work continuously
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            // Remove animation class when element goes out of view
            // This allows animations to retrigger when scrolling back
            entry.target.classList.remove('animate-in');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all animatable elements
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <ChatBotProvider>
          <Navigation />
          <main>
            <Hero />
            <About />
            <Services />
            <FAQ />
            <ReadyToTransform />
            <Contact />
          </main>
          <Footer />
          <ChatBot />
        </div>
      </div>
    </ChatBotProvider>
  );
}

export default Home;