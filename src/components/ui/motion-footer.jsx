'use client';

import * as React from 'react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Linkedin,
  ArrowUp,
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import useContactsStore from '../../store/contacts';
import { companyName } from '../../data/siteData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  --foreground: #f5f5f5;
  --background: #050505;
  --primary: #d4d4d4;
  --secondary: #7a7a7a;
  --muted-foreground: rgba(245, 245, 245, 0.72);
  --border: rgba(255, 255, 255, 0.12);

  --pill-bg-1: rgba(255, 255, 255, 0.08);
  --pill-bg-2: rgba(255, 255, 255, 0.03);
  --pill-shadow: rgba(0, 0, 0, 0.35);
  --pill-highlight: rgba(255, 255, 255, 0.12);
  --pill-inset-shadow: rgba(0, 0, 0, 0.35);
  --pill-border: rgba(255, 255, 255, 0.1);
  --pill-bg-1-hover: rgba(255, 255, 255, 0.12);
  --pill-bg-2-hover: rgba(255, 255, 255, 0.05);
  --pill-border-hover: rgba(255, 255, 255, 0.22);
  --pill-shadow-hover: rgba(0, 0, 0, 0.5);
  --pill-highlight-hover: rgba(255, 255, 255, 0.16);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.55; }
  100% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
  circle at 50% 50%,
  rgba(124, 58, 237, 0.3) 90%,
  rgba(124, 58, 237, 0.25) 95%,
  transparent 70%
);
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
    0 10px 30px -10px var(--pill-shadow),
    inset 0 1px 1px var(--pill-highlight),
    inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
    0 20px 40px -10px var(--pill-shadow-hover),
    inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-giant-bg-text {
  font-size: 13vw;
  line-height: 1.75;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.06);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

@media (max-width: 767px) {
  .footer-giant-bg-text {
    font-size: 24vw;
  }
}
`;

const MagneticButton = React.forwardRef(
  ({ className, children, as: elementTag = 'button', ...props }, forwardedRef) => {
    const localRef = useRef(null);

    useEffect(() => {
      if (typeof window === 'undefined') return undefined;
      const element = localRef.current;
      if (!element) return undefined;

      const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const halfWidth = rect.width / 2;
        const halfHeight = rect.height / 2;
        const x = e.clientX - rect.left - halfWidth;
        const y = e.clientY - rect.top - halfHeight;

        gsap.to(element, {
          x: x * 0.12,
          y: y * 0.12,
          rotationX: -y * 0.04,
          rotationY: x * 0.04,
          scale: 1.02,
          ease: 'power2.out',
          duration: 0.35,
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: 'elastic.out(1, 0.3)',
          duration: 1,
        });
      };

      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, []);

    return React.createElement(
      elementTag,
      {
        ref: (node) => {
          localRef.current = node;
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        },
        className: cn('cursor-pointer block', className),
        ...props,
      },
      children
    );
  }
);

MagneticButton.displayName = 'MagneticButton';

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    <span>Architecture</span>
    <span className="text-white/45">✦</span>
    <span>Engineering</span>
    <span className="text-white/45">✦</span>
    <span>Execution Services</span>
    <span className="text-white/45">✦</span>
    <span>Technical Precision</span>
    <span className="text-white/45">✦</span>
    <span>Dependable Delivery</span>
  </div>
);

export function MotionFooter() {
  const { items, fetchAll } = useContactsStore();
  const location = useLocation();
  const wrapperRef = useRef(null);
  const giantTextRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!items || items.length === 0) fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contact = items && items.length > 0 ? items[0] : null;

  useEffect(() => {
    if (typeof window === 'undefined' || !wrapperRef.current) return undefined;

    const ctx = gsap.context(() => {
      const children = contentRef.current?.children
        ? Array.from(contentRef.current.children)
        : [];

      gsap.fromTo(
        giantTextRef.current,
        { y: '6vh', scale: 0.96, opacity: 0.2 },
        {
          y: '0vh',
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          duration: 1.1,
        }
      );

      gsap.fromTo(
        children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: 'power3.out',
          duration: 0.9,
          delay: 0.15,
        }
      );

      ScrollTrigger.refresh();
    }, wrapperRef);

    return () => ctx.revert();
  }, [contact, location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayName = companyName || 'CUBE CARVED';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        ref={wrapperRef}
        className="relative w-full min-h-[980px] md:min-h-[620px] md:h-[85vh]"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      >
        <footer className="relative md:fixed bottom-0 left-0 flex h-auto min-h-[980px] md:h-[85vh] md:min-h-[620px] w-full flex-col justify-between overflow-hidden bg-black text-white cinematic-footer-wrapper">
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          <div
            ref={giantTextRef}
            className="footer-giant-bg-text hidden lg:block absolute -bottom-[2vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none uppercase"
          >
            {displayName}
          </div>

          <div className="absolute top-8 md:top-12 left-0 w-full overflow-hidden border-y border-white/10 bg-black/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-white/60 uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-32 md:pt-0 mt-24 md:mt-32 w-full max-w-7xl mx-auto">
            <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full text-left">
              <div>
                <MagneticButton as="a" href="/" className="w-fit mb-5">
                  <img src="/logo.png" alt={displayName} className="w-20 object-contain" />
                </MagneticButton>
                <h3 className="text-3xl md:text-4xl font-light tracking-wide mb-4">
                  Let&apos;s Build Something Exceptional
                </h3>
                <p className="text-white/65 leading-relaxed max-w-sm">
                  Integrated architectural, engineering, and execution services that connect
                  creativity, technical precision, and dependable delivery.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6 text-white tracking-wide uppercase">
                  Contact Info
                </h3>
                <div className="space-y-4">
                  <MagneticButton
                    as="a"
                    href={contact?.email ? `mailto:${contact.email}` : '#'}
                    className="footer-glass-pill px-6 py-3 rounded-full flex items-center space-x-3 text-white/70 w-fit"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="break-all">{contact?.email || 'info@cubecarved.com'}</span>
                  </MagneticButton>

                  <div className="footer-glass-pill px-6 py-3 rounded-full flex items-center space-x-3 text-white/70 w-fit">
                    <MapPin className="w-5 h-5 flex-shrink-0" />
                    <span>{contact?.address || 'Erbil, Iraq'}</span>
                  </div>

                  <MagneticButton
                    as="a"
                    href={contact?.phone ? `tel:${contact.phone}` : '#'}
                    className="footer-glass-pill px-6 py-3 rounded-full flex items-center space-x-3 text-white/70 w-fit"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="break-all">{contact?.phone || '+964 750 000 0000'}</span>
                  </MagneticButton>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-6 text-white tracking-wide uppercase">
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-4">
                  <MagneticButton
                    as="a"
                    href={contact?.social?.instagram || '#'}
                    className="w-14 h-14 footer-glass-pill rounded-2xl flex items-center justify-center text-white/70"
                  >
                    <Instagram className="w-6 h-6" />
                  </MagneticButton>

                  <MagneticButton
                    as="a"
                    href={contact?.social?.facebook || '#'}
                    className="w-14 h-14 footer-glass-pill rounded-2xl flex items-center justify-center text-white/70"
                  >
                    <Facebook className="w-6 h-6" />
                  </MagneticButton>

                  <MagneticButton
                    as="a"
                    href={contact?.social?.linkedin || '#'}
                    className="w-14 h-14 footer-glass-pill rounded-2xl flex items-center justify-center text-white/70"
                  >
                    <Linkedin className="w-6 h-6" />
                  </MagneticButton>
                </div>
                <div className="mt-8 max-w-sm">
                  <p className="text-white/55 text-sm leading-relaxed">
                    Reach out to discuss design, execution, supervision, or a full engineering
                    package tailored to your next project.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-20 w-full pt-12 pb-10 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white/55 text-[10px] md:text-xs font-semibold tracking-widest uppercase order-2 md:order-1 text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} {displayName}. All rights reserved.</p>
              <p className="mt-1 opacity-70">
                Developed by{' '}
                <a
                  href="https://wa.me/9647701411893"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  Al-Code
                </a>
              </p>
            </div>

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-white/70 group order-1 md:order-3"
            >
              <ArrowUp className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" />
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MotionFooter;
