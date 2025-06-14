import React, { useEffect, useRef, useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import { ChatBotProvider } from '../contexts/ChatBotContext';
import { ShoppingCart, Megaphone, TrendingUp, Users, Home, Bot, FileText, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import '../animations.css';

const SpecServices = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [selectedNiche, setSelectedNiche] = useState('E-Commerce');
  const [hoveredNiche, setHoveredNiche] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const niches = ['E-Commerce', 'Marketing', 'Sales', 'Coaching', 'Real-Estate'];

  const nicheContent = {
    'E-Commerce': [
      {
        icon: Bot,
        title: 'Inventory Automation',
        description: 'AI-powered stock management and reordering'
      },
      {
        icon: Users,
        title: 'Customer Service Bots',
        description: '24/7 automated customer support'
      },
      {
        icon: TrendingUp,
        title: 'Price Optimization',
        description: 'Dynamic pricing based on market analysis'
      }
    ],
    'Marketing': [
      {
        icon: FileText,
        title: 'Content Generation',
        description: 'AI-created marketing copy and campaigns'
      },
      {
        icon: TrendingUp,
        title: 'Lead Scoring',
        description: 'Automated prospect qualification and ranking'
      },
      {
        icon: Megaphone,
        title: 'Social Media Automation',
        description: 'Scheduled posting and engagement'
      }
    ],
    'Sales': [
      {
        icon: Users,
        title: 'CRM Automation',
        description: 'Streamlined pipeline and follow-up processes'
      },
      {
        icon: FileText,
        title: 'Proposal Generation',
        description: 'AI-powered custom proposals'
      },
      {
        icon: TrendingUp,
        title: 'Sales Forecasting',
        description: 'Predictive analytics for revenue planning'
      }
    ],
    'Coaching': [
      {
        icon: TrendingUp,
        title: 'Progress Tracking',
        description: 'Automated client milestone monitoring'
      },
      {
        icon: Calendar,
        title: 'Session Scheduling',
        description: 'Smart calendar and reminder systems'
      },
      {
        icon: FileText,
        title: 'Content Delivery',
        description: 'Personalized learning path automation'
      }
    ],
    'Real-Estate': [
      {
        icon: Home,
        title: 'Property Valuation',
        description: 'AI-driven market analysis and pricing'
      },
      {
        icon: Users,
        title: 'Lead Qualification',
        description: 'Automated buyer/seller screening'
      },
      {
        icon: FileText,
        title: 'Document Processing',
        description: 'Streamlined contract and paperwork handling'
      }
    ]
  };

  const handleNicheChange = (niche: string) => {
    if (niche !== selectedNiche) {
      setSelectedNiche(niche);
    }
  };

  const handleMobileNicheChange = (direction: 'left' | 'right') => {
    const currentIndex = niches.indexOf(selectedNiche);
    let newIndex;
    
    if (direction === 'left') {
      newIndex = currentIndex === 0 ? niches.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === niches.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedNiche(niches[newIndex]);
  };

  const getIndicatorPosition = () => {
    const targetNiche = hoveredNiche || selectedNiche;
    return (niches.indexOf(targetNiche) * 100) / niches.length;
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Set up intersection observer for scroll animations with improved performance
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
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
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <ChatBotProvider>
      <div className="min-h-screen bg-[#0D0D0D] text-white overflow-x-hidden relative">
        {/* Full website background like hero section */}
        <div className="fixed inset-0 bg-gradient-to-br from-[#0052D4]/15 via-black/50 to-[#6FB1FC]/15 animate-breathe"></div>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,rgba(67,100,247,0.3)_0%,rgba(0,82,212,0.1)_40%,transparent_70%)] animate-breathe-slow"></div>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(111,177,252,0.2)_0%,transparent_50%)] animate-breathe-reverse"></div>
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(0,82,212,0.15)_0%,transparent_60%)]"></div>
        <div className="relative z-10">
          <Navigation />
          <main>
            {/* Hero Section */}
            <section className="pt-32 pb-8 relative">
              <div className="container mx-auto px-6 text-center relative z-10">
                <div className="hero-headline">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                    <span className="dynamic-gradient-text">Specific Niche Services</span>
                  </h1>
                  <p className="hero-subtitle text-lg font-light text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed tracking-wide">
                    Industry-focused AI solutions tailored to meet the unique challenges and opportunities of your specific sector.
                  </p>
                </div>
              </div>
            </section>

            {/* Niche Selector Section */}
            <section className="pb-16 relative">
              <div className="container mx-auto px-6 relative z-10">
                <div className="animate-on-scroll max-w-4xl mx-auto">
                  {/* Desktop Niche Selector */}
                  {!isMobile && (
                    <div className="relative bg-black/20 backdrop-blur-sm rounded-full p-3 border border-white/10 mb-8">
                      <div className="flex relative">
                        {/* Moving indicator */}
                        <div 
                          className="absolute top-3 bottom-3 bg-white rounded-full transition-all duration-300 ease-in-out niche-selector-glow"
                          style={{
                            left: `${getIndicatorPosition()}%`,
                            width: `${100 / niches.length}%`,
                            transform: 'translateX(6px)',
                            right: '6px'
                          }}
                        />
                        {niches.map((niche, index) => (
                          <button
                            key={niche}
                            onClick={() => handleNicheChange(niche)}
                            onMouseEnter={() => setHoveredNiche(niche)}
                            onMouseLeave={() => setHoveredNiche(null)}
                            className={`relative z-10 flex-1 py-4 px-6 text-sm font-bold tracking-wide transition-all duration-300 rounded-full ${
                              (hoveredNiche === niche || (hoveredNiche === null && selectedNiche === niche)) 
                                ? 'text-black' 
                                : 'text-white'
                            }`}
                          >
                            {niche}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mobile Niche Selector */}
                  {isMobile && (
                    <div className="flex items-center justify-center mb-8 space-x-4">
                      <button
                        onClick={() => handleMobileNicheChange('left')}
                        className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      
                      <div className="bg-black/20 backdrop-blur-sm rounded-full px-8 py-4 border border-white/10 min-w-[200px] text-center">
                        <span className="text-white font-bold tracking-wide">{selectedNiche}</span>
                      </div>
                      
                      <button
                        onClick={() => handleMobileNicheChange('right')}
                        className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  )}

                  {/* Dynamic Cards Section with smooth content transition */}
                  <div className="grid md:grid-cols-3 gap-8">
                    {nicheContent[selectedNiche as keyof typeof nicheContent].map((service, index) => (
                      <div
                        key={index}
                        className={`animate-on-scroll feature-card bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm p-8 hover:bg-white/10 group transition-all duration-300 stagger-${index + 1}`}
                      >
                        <div className="w-16 h-16 dynamic-gradient-icon rounded-lg flex items-center justify-center mb-6 feature-icon transition-all duration-300">
                          <service.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white tracking-wide mb-4 transition-all duration-300">{service.title}</h3>
                        <p className="text-gray-400 font-light leading-relaxed tracking-wide transition-all duration-300">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
          <ChatBot />
        </div>
      </div>
    </ChatBotProvider>
  );
};

export default SpecServices;