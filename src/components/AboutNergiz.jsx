import { useEffect, useRef, useState } from 'react';
import AnimatedText from './AnimatedText';
import { AnimatedTiles } from './AnimatedTiles';
import { siteContent } from '../data/siteData';

const AboutNergiz = () => {
  const [activeText, setActiveText] = useState(1);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (text1Ref.current && text2Ref.current && text3Ref.current) {
        const text1Top = text1Ref.current.offsetTop;
        const text2Top = text2Ref.current.offsetTop;
        const text3Top = text3Ref.current.offsetTop;
        const scrollPosition = scrollY + windowHeight / 2;

        if (scrollPosition >= text3Top) {
          setActiveText(3);
        } else if (scrollPosition >= text2Top) {
          setActiveText(2);
        } else if (scrollPosition >= text1Top) {
          setActiveText(1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getImageUrl = () => {
    switch (activeText) {
      case 1:
        return '/images/aboutNergiz.JPG';
      case 2:
        return '/images/about2.jpeg';
      case 3:
        return '/images/servicebg.PNG';
      default:
        return '/images/aboutNergiz.JPG';
    }
  };

  const getTranslateY = () => {
    switch (activeText) {
      case 1:
        return '0%';
      case 2:
        return '30%';
      case 3:
        return '55%';
      default:
        return '0%';
    }
  };

  return (
    <section className="bg-[#121212] min-h-screen pb-20">
      <div className="h-14 w-full bg-gradient-to-t from-[#121212] via-[#0e0e0e] to-transparent -translate-y-8"></div>
      <div className="max-w-7xl m-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-32">
          <div className="space-y-32">
            <AnimatedText
              text={`${siteContent.about.heading} ${siteContent.about.title}`}
              className="text-4xl sm:text-5xl font-light text-gray-100 mb-12 lg:mb-16"
            />
            <div
              ref={text1Ref}
              className={`transition-all duration-700 ${activeText === 1 ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}
            >
              <p className="text1 text-lg text-gray-400 mb-6 max-w-2xl leading-relaxed font-light">
                {siteContent.about.paragraphs[0]}
              </p>
              <div className="lg:hidden mt-8">
                <AnimatedTiles
                  rows={8}
                  cols={6}
                  tileSize={60}
                  imageUrl="/images/aboutNergiz.JPG"
                  backgroundColor="transparent"
                />
              </div>
            </div>

            <div
              ref={text2Ref}
              className={`transition-all duration-700 ${activeText === 2 ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}
            >
              <p className="text2 text-lg text-gray-400 mb-6 max-w-2xl leading-relaxed font-light">
                {siteContent.about.paragraphs[1]}
              </p>
              <div className="lg:hidden mt-8">
                <AnimatedTiles
                  rows={8}
                  cols={6}
                  tileSize={60}
                  imageUrl="/images/about2.jpeg"
                  backgroundColor="transparent"
                />
              </div>
            </div>

            <div
              ref={text3Ref}
              className={`transition-all duration-700 ${activeText === 3 ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}
            >
              <p className="text3 text-lg text-gray-400 max-w-2xl leading-relaxed font-light">
                {siteContent.about.paragraphs[2]}
              </p>
              <div className="lg:hidden mt-8">
                <AnimatedTiles
                  rows={8}
                  cols={6}
                  tileSize={60}
                  imageUrl="/images/servicebg.PNG"
                  backgroundColor="transparent"
                />
              </div>
            </div>
          </div>

          <div className="transition-all duration-700 hidden lg:block">
            <AnimatedTiles
              rows={8}
              cols={6}
              tileSize={65}
              imageUrl={getImageUrl()}
              backgroundColor="transparent"
              translateY={getTranslateY()}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutNergiz;
