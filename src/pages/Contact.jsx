import { useEffect } from 'react';
import useContactsStore from '../store/contacts';
import { companyName } from '../data/siteData';

export default function Contact() {
  const { items, fetchAll } = useContactsStore();

  useEffect(() => {
    if (!items || items.length === 0) fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contact = items && items.length > 0 ? items[0] : null;

  return (
    <div>
      <section className="relative hidden lg:block py-[30rem]  overflow-hidden ">
        <div   className="absolute aspect-auto lg:aspect-[5/4] inset-0 bg-[url('/images/aboutabg.JPG')] bg-cover bg-center  opacity-40"></div>
      </section>
      <section className="relative overflow-hidden ">
        <div className=" aspect-square lg:hidden lg:aspect-[5.5/3] inset-0 bg-[url('/images/aboutabg.JPG')] bg-cover bg-center  opacity-40"></div>
      </section>
       <div className="h-14 w-full bg-gradient-to-t from-[#121212] via-[#0e0e0e] to-transparent -translate-y-8"></div>
  
      <section className="py-24  font-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between gap-16 items-start px-6">
            <div data-aos="fade-left" data-aos-duration="1000">
              <div className="text-left">
                <h1 className="text-6xl  font-light text-white mb-8 tracking-wider">
                  CONTACT
                </h1>
                
                <div className="space-y-6 text-left">
                  <div>
                    <p className="text-gray-400 text-lg mb-2">{companyName}</p>
                    <p className="text-white text-lg">{contact?.email || 'info@cubecarved.com'}</p>
                  </div>
                  
                  <div className="mt-8">
                    <p className="text-gray-400 text-lg mb-2">{contact?.address || 'Erbil, Iraq'}</p>
                    <p className="text-white text-lg">{contact?.phone || '+964 750 000 0000'}</p>
                  </div>
                  
                  <div className="mt-12">
                    <p className="text-gray-400 text-sm mb-4">{contact?.schedule || 'Meetings by prior arrangement'}</p>
                    <p className="text-gray-400 text-sm">{contact?.hours || 'Opening hours: Sun-Thu from 09:00 to 17:00'}</p>
                  </div>
                </div>
                
                <div className="mt-16">
                  <a
                    href={contact?.email ? `mailto:${contact.email}` : 'mailto:info@cubecarved.com'}
                    className="inline-block bg-transparent border border-white text-white px-8 py-2 text-lg font-light hover:bg-white hover:text-black transition-all duration-300"
                  >
                    {contact?.cta || 'Send A Request'}
                  </a>
                </div>
              </div>

            </div>
            <div data-aos="zoom-in" data-aos-delay="200" className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 max-w-3xl w-full  mx-auto border border-white/10">
              <div className="aspect-video bg-gray-700 rounded-2xl overflow-hidden brightness-50">
                <iframe
                  src={contact?.mapEmbedUrl || 'https://www.google.com/maps?q=Erbil%2C%20Iraq&z=12&output=embed'}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${companyName} Location`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
