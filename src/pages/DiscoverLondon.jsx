import React from 'react';
import Navbar from '../components/Navbar';
import Svg from '../components/Svg';
import Copyright from '../components/Copyright';
import Footer from '../components/Footer';

const DiscoverLondon = () => {
  const imageSources = [
    'https://imgs.search.brave.com/zj2YJUEG_qGnS3QqemaiFGKCJt89nHGTbDWwcqk00Xw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I0L0xvbmRvbl9F/eWVfVHdpbGlnaHRf/QXByaWxfMjAwNi5q/cGc', // London Eye
    'https://media.gettyimages.com/id/1488669253/photo/london-tower-bridge-over-the-river-thames-in-london-england.jpg?s=612x612&w=0&k=20&c=Ze3JreP8rjT04SJMmr0UENdC54G1jY04Z53cYnjPBtM=',     // Tower Bridge
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/British_Museum_from_NE_2.JPG/1200px-British_Museum_from_NE_2.JPG',         // British Museum
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/St_James%27s_Park_Lake_%E2%80%93_East_from_the_Blue_Bridge_-_2012-10-06.jpg/1920px-St_James%27s_Park_Lake_%E2%80%93_East_from_the_Blue_Bridge_-_2012-10-06.jpg' // St James's Park
  ];

  const londonSections = [
    {
      title: 'Marvel at Iconic Landmarks',
      desc: 'London is home to some of the world’s most iconic landmarks. From the majestic Big Ben and the historic Tower Bridge to the panoramic views from the London Eye, each site tells a story of the city’s rich past and dynamic present.',
    },
    {
      title: 'Explore History at the British Museum',
      desc: 'Step into the British Museum and journey through human history, art, and culture. With artifacts ranging from Egyptian mummies to the Rosetta Stone, it’s a treasure trove of knowledge and discovery.',
    },
    {
      title: 'Savor the City’s Culinary Scene',
      desc: 'From afternoon tea to global street eats, London’s food scene is diverse and exciting. Explore Borough Market, enjoy fish and chips, or dine at Michelin-starred restaurants for a true taste of the capital.',
    },
    {
      title: 'Relax in Scenic Parks and Gardens',
      desc: 'London’s green spaces are perfect for a peaceful escape. Stroll through Hyde Park, enjoy a picnic in Regent’s Park, or marvel at seasonal blooms in the Royal Botanic Gardens at Kew.',
    },
    {
      title: 'Experience London’s Cultural Vibe',
      desc: 'Catch a West End show, browse galleries like the Tate Modern, or listen to live music at local pubs. London’s cultural offerings are vast and vibrant, appealing to every kind of traveler.',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center" style={{ backgroundColor: '#191919' }}>
        <Svg />
        <div className="relative max-w-7xl w-full mx-auto px-6 py-12">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Discover London</h1>
            <p className="text-lg opacity-80">A Global City of Heritage, Culture, and Charm.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {imageSources.map((src, index) => (
              <div key={index} className="aspect-[16/9] max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg">
                <img
                  src={src}
                  alt={`London Landmark ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">
            {londonSections.map((item, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-90 backdrop-blur-lg shadow-xl rounded-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105"
              >
                <h2 className="text-xl font-semibold text-indigo-700">{item.title}</h2>
                <p className="text-gray-800 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>

          <Copyright />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DiscoverLondon;
