import React from 'react';
import Navbar from '../components/Navbar';
import Svg from '../components/Svg';
import Copyright from '../components/Copyright';
import Footer from '../components/Footer';

const Help = () => {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center bg-[#f8f8f8]">
        <Svg />
        <div className="relative max-w-7xl w-full mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold mb-4 text-[#191919]">Help & Support</h1>
            <p className="text-lg text-gray-600">
              Find answers, explore guides, and get technical assistance.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full max-w-lg px-4 py-3 rounded-lg shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#191919] bg-white text-gray-800"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[
              { title: "Getting Started", desc: "Learn how to use our platform efficiently.", link: "/getting-started" },
              { title: "FAQs", desc: "Common questions and answers.", link: "/faqs" },
              { title: "Technical Support", desc: "Facing issues? Get troubleshooting steps here.", link: "/tech-support" },
              { title: "Contact Support", desc: "Need help? Talk to our team.", link: "/contact-support" },
              { title: "Security & Privacy", desc: "Learn how we protect your data.", link: "/security" },
              { title: "Community Forum", desc: "Connect with other users, share ideas, and discuss.", link: "/forum" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
              >
                <h2 className="text-xl font-bold text-[#191919]">{item.title}</h2>
                <p className="text-gray-600 mt-2">{item.desc}</p>
                <a href={item.link} className="text-[#191919] mt-4 inline-block hover:underline font-medium">
                  Learn More →
                </a>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-8 mt-12 shadow-md">
            <h2 className="text-2xl font-semibold text-[#191919] mb-4">Submit a Ticket</h2>
            <p className="text-gray-600 mb-4">
              Describe your issue, and our team will assist you as soon as possible.
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#191919]"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#191919]"
                required
              />
              <textarea
                placeholder="Describe your issue..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#191919] h-32"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-[#191919] text-white py-3 rounded-lg hover:bg-[#111] transition"
              >
                Submit Ticket
              </button>
            </form>
          </div>

          <div className="mt-10">
            <Copyright />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Help;
