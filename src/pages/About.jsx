import { Heart, Target, Eye, Award, Users, Sparkles } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import AboutNergiz from '../components/AboutNergiz';
import { companyName, siteContent } from '../data/siteData';

export default function About() {
  return (
    <div>
      <section className="relative hidden lg:block py-[30rem]  overflow-hidden ">
        <div   className="absolute aspect-auto lg:aspect-[5/4] inset-0 bg-[url('/images/aboutabg.JPG')] bg-cover bg-center  opacity-40"></div>
      </section>
      <section className="relative overflow-hidden ">
        <div className=" aspect-square lg:hidden lg:aspect-[5.5/3] inset-0 bg-[url('/images/aboutabg.JPG')] bg-cover bg-center  opacity-40"></div>
      </section>

{/* about */}
      <AboutNergiz />

{/* ouur cor value */}
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <AnimatedText
              text="Our Core Values"
              className="text-4xl  sm:text-5xl font-light text-gray-100 mb-4"
            />
            <p data-aos="fade-up" data-aos-delay="200" className="text-xl text-gray-400 max-w-2xl mx-auto font-light ">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteContent.coreValues.map((value, idx) => {
              const icons = [Heart, Target, Sparkles];
              const Icon = icons[idx] || Heart;

              return (
              <div
                key={value.title}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className={`group  bg-white/5 hover:bg-white/10 border border-gray-700 rounded p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
              >
                <div className="w-16 h-16 bg-gradient-to-br rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg bg-white/10">
                  <Icon className="w-8 h-8 text-white font-light" />
                </div>
                <h3 className="text-2xl  text-gray-100 mb-4 font-light">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed font-light">
                  {value.description}
                </p>
              </div>
            );
            })}
          </div>
        </div>
      </section>

{/* our mision */}
      <section className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
          <div className="text-center font-light mb-16">
            <AnimatedText
              text="Our Mission & Vision"
              className="text-4xl sm:text-5xl  text-gray-100 mb-4 font-light"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 overflow-hidden">
            <div data-aos="fade-right" data-aos-duration="1000" className=" rounded px-1 text-center text-white ">
              <div className="w-16 h-16  rounded-xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white hidden lg:block" />
              </div>
              <h3 className="text-3xl font-light mb-6">Our Mission</h3>
              <div className="space-y-5">
                {siteContent.mission.map((item) => (
                  <div key={item.title}>
                    <h4 className="text-xl text-white mb-2">{item.title}</h4>
                    <p className="text-gray-300 text-lg leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div data-aos="fade-left" data-aos-duration="1000" className=" rounded px-1 text-center text-white ">
              <div className="w-16 h-16  backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white hidden lg:block" />
              </div>
              <h3 className="text-3xl font-light mb-6">Our Vision</h3>
              <div className="space-y-5">
                {siteContent.vision.map((item) => (
                  <div key={item.title}>
                    <h4 className="text-xl text-white mb-2">{item.title}</h4>
                    <p className="text-amber-50 text-lg leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24  text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 data-aos="fade-up" className="text-4xl sm:text-5xl font-light mb-6">
              Why Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteContent.whyChooseUs.map((reason, idx) => {
              const icons = [Award, Users, Sparkles];
              const Icon = icons[idx] || Award;

              return (
              <div
                key={reason.title}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <Icon className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-light mb-3">{reason.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light">{reason.description}</p>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedText
            text={`${companyName} Future Goals`}
            className="text-4xl sm:text-5xl font-light text-gray-100 mb-8"
          />
          <p className="text-lg text-gray-300 leading-relaxed mb-10">
            {siteContent.futureGoals.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteContent.futureGoals.items.map((goal) => (
              <div key={goal} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <p className="text-xl font-light text-white">{goal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  
    </div>
  );
}
