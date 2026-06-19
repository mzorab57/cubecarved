import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import videoMp4 from '/videos/hero.mp4';
import videoWebm from '/videos/hero.webm';
import { companyName, siteContent } from '../data/siteData';

const Hero = () => {
  return (
    <section name="hero" className="section text-white h-screen">
      <div className="relative overflow-hidden bg-transparent flex h-screen">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-screen object-cover brightness-50"
          style={{ aspectRatio: '16/9' }}
          preload="metadata"
          loading="eager"
        >
          <source src={videoWebm} type="video/webm" />
          <source src={videoMp4} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/45" />
        {/* <img
          src="/logo.png"
          alt={companyName}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:w-[600px] w-[350px] h-auto z-10 opacity-20"
        /> */}

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white space-y-6 px-4 z-20">
          {/* <p className="tracking-[0.45em] uppercase text-sm md:text-base text-gray-300">
            {siteContent.hero.eyebrow}
          </p> */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.2em]">
            {siteContent.hero.title}
          </h1>
          <div className="space-y-2">
            <p className="text-xl md:text-3xl font-light tracking-[0.35em] uppercase text-gray-200">
              {siteContent.hero.subtitle}
            </p>
            {/* <p className="text-sm md:text-lg tracking-[0.3em] uppercase text-gray-400">
              {siteContent.hero.tagline}
            </p> */}
          </div>
          {/* <p className="max-w-3xl text-sm md:text-lg text-gray-300 leading-relaxed">
            Integrated architectural, engineering, and execution solutions built around quality,
            functionality, and modern design.
          </p> */}
          {/* <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/portfolio"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-transparent border border-white text-white px-8 py-3 text-lg font-light hover:bg-white hover:text-black transition-all duration-300"
            >
              <span>View Portfolio</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-3 text-lg font-light hover:border-white transition-all duration-300"
            >
              About Us
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
