import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Briefcase, Image, Users, Mail } from 'lucide-react';
import { companyName } from '../data/siteData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for styling
      setScrolled(currentScrollY > 20);
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near top - show navbar
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px - hide navbar
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/about', label: 'About', icon: Users },
    { to: '/portfolio', label: 'Portfolio', icon: Image },
    { to: '/services', label: 'Services', icon: Briefcase },
    { to: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav
      className={`fixed w-full font-light z-50 transition-all duration-300 ${
        scrolled
          ? `backdrop-blur-3xl bg-gradient-to-r from-[#7C3AED]/10 via-[#4F46E5]/10 to-[#60A5FA]/10 ${isVisible ? 'translate-y-0  ' : '-translate-y-full'}`
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 ">
        <div className="flex justify-between items-center ">
          <Link onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} to="/" className="flex items-center space-x-2 group">
            <div className="    flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
             <img src={`${
              scrolled ? '/logo.png' : '/logo.png'
            }`} alt={companyName} className="w-16 " />
            </div>
           
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(({ to, label }) => (
              <Link
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg font-light transition-all duration-300 flex items-center space-x-2 group ${
                  location.pathname === to
                    ? scrolled
                      ? 'backdrop-blur-3xl  text-white'
                      : 'text-white '
                    : scrolled
                    ? 'text-gray-400'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {/* <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" /> */}
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? "" : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-500 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="bg-black h-screen w-full flex flex-col justify-center items-start pl-12 relative">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6.5 right-4 text-white hover:text-amber-300 transition-colors duration-300 p-2"
          >
            <X className="w-7 h-7 font-light" />
          </button>
          
          {navLinks.map(({ to, label }, index) => (
            <Link
              onClick={() => {
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              key={to}
              to={to}
              className={` flex items-center space-x-4 py-6 transition-all duration-700 transform ${
                isOpen 
                  ? 'translate-x-0 translate-y-6 opacity-100' 
                  : '-translate-x-full  opacity-0'
              } ${
                location.pathname === to
                  ? 'text-gray-400 border-l-2 border-gray-400 pl-8'
                  : 'text-white hover:text-gray-300 hover:translate-x-2'
              }`}
              style={{
                transitionDelay: isOpen ? `${index * 150}ms` : '0ms'
              }}
            >
              {/* <Icon className="w-6 h-6" /> */}
              <span className="font-light text-xl tracking-wide">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
