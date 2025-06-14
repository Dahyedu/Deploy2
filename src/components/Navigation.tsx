import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    setShowMobileMenu(false);
    
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isServicesPage = location.pathname === '/genservices' || location.pathname === '/specservices';

  useEffect(() => {
    if (isServicesPage) {
      setActiveSection('services');
      return;
    }

    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      }));

      const current = sections.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, isServicesPage]);

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-black/10 backdrop-blur-xl border border-white/5 rounded-3xl hover-glow">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold tracking-wider">
            AI<span className="text-blue-400">Studio</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 relative">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.id === 'services' ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setShowServicesDropdown(true)}
                    onMouseLeave={() => setShowServicesDropdown(false)}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 rounded-lg ${
                        activeSection === item.id || isServicesPage
                          ? 'text-blue-400 bg-blue-400/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showServicesDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Services Dropdown */}
                    <div className={`nav-dropdown absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl ${showServicesDropdown ? 'show' : ''}`}>
                      <Link
                        to="/genservices"
                        className="nav-dropdown-item block px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 border-b border-white/5"
                      >
                        <div className="font-medium">General Services</div>
                        <div className="text-xs text-gray-500 mt-1">Comprehensive AI solutions</div>
                      </Link>
                      <Link
                        to="/specservices"
                        className="nav-dropdown-item block px-6 py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                      >
                        <div className="font-medium">Specific Niche</div>
                        <div className="text-xs text-gray-500 mt-1">Industry-focused solutions</div>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-4 py-2 text-sm font-light tracking-wide transition-all duration-300 rounded-lg ${
                      activeSection === item.id
                        ? 'text-blue-400 bg-blue-400/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <div key={item.id}>
                  {item.id === 'services' ? (
                    <div>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-4 py-3 text-sm font-light tracking-wide transition-all duration-300 rounded-lg ${
                          activeSection === item.id || isServicesPage
                            ? 'text-blue-400 bg-blue-400/10'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.label}
                      </button>
                      <div className="ml-4 mt-2 space-y-2">
                        <Link
                          to="/genservices"
                          onClick={() => setShowMobileMenu(false)}
                          className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                        >
                          General Services
                        </Link>
                        <Link
                          to="/specservices"
                          onClick={() => setShowMobileMenu(false)}
                          className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                        >
                          Specific Niche
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-3 text-sm font-light tracking-wide transition-all duration-300 rounded-lg ${
                        activeSection === item.id
                          ? 'text-blue-400 bg-blue-400/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;