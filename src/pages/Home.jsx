import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import StartProject from '../components/StartProject';
import AboutNergiz from '../components/AboutNergiz';
import ServicesTitle from '../components/ServicesTitle';
import KineticScrollGallery from '../components/KineticScrollGallery';
import AnimatedText from '../components/AnimatedText';
import { siteContent } from '../data/siteData';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Hero />
      <AboutNergiz />
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedText
            text="Featured Projects"
            className="text-4xl sm:text-5xl font-light text-gray-100 mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {siteContent.featuredProjects.map((project) => (
              <div key={project} className="border border-white/10 p-6 bg-white/5">
                <p className="text-xl font-light text-gray-100">{project}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <KineticScrollGallery />
      <WhyChooseUs />
      <ServicesTitle />
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <AnimatedText
                text="Our Process"
                className="text-4xl sm:text-5xl font-light text-gray-100 mb-8"
              />
              <div className="space-y-4">
                {siteContent.process.map((step, index) => (
                  <div
                    key={step}
                    className="border border-white/10 bg-white/5 px-6 py-5 flex items-center gap-5"
                  >
                    <span className="text-3xl font-light text-gray-500">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xl font-light text-gray-100">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <AnimatedText
                text="Future Goals"
                className="text-4xl sm:text-5xl font-light text-gray-100 mb-8"
              />
              <p className="text-gray-300 leading-relaxed text-lg mb-8">
                {siteContent.futureGoals.description}
              </p>
              <div className="space-y-4">
                {siteContent.futureGoals.items.map((goal) => (
                  <div key={goal} className="border border-white/10 bg-white/5 px-6 py-5">
                    <span className="text-xl font-light text-gray-100">{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <StartProject />
    </div>
  );
}
