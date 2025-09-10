import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans leading-relaxed text-gray-800 bg-gray-50 rounded-lg shadow-lg">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">About Wolf Athletics</h1>
        <p className="text-lg text-gray-600">Committed to Excellence on the Lacrosse Field</p>
      </header>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-1 mb-4">Our Mission</h2>
        <p className="text-gray-700">
          At Wolf Athletics, we believe that the right equipment can make all the difference. Our mission is to
          empower lacrosse players of all levels with the highest quality, most innovative gear on the market.
          We are passionate about the sport and dedicated to providing products that enhance performance,
          improve safety, and help athletes unleash their full potential.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-1 mb-4">About Our Ecommerce Platform</h2>
        <p className="text-gray-700">
          This website is designed to provide a seamless and engaging shopping experience for our community.
          We've built a platform that is not just a store, but a resource for dedicated athletes.
        </p>
        <ul className="list-none p-0 mt-4">
          <li className="bg-gray-200 p-4 mb-3 border-l-4 border-blue-500 rounded">
            <strong className="text-gray-900">Intuitive Navigation:</strong> Easily browse our catalog of shafts, heads, apparel, and accessories.
          </li>
          <li className="bg-gray-200 p-4 mb-3 border-l-4 border-blue-500 rounded">
            <strong className="text-gray-900">Detailed Product Information:</strong> Each product page includes comprehensive descriptions, specifications, and images.
          </li>
          <li className="bg-gray-200 p-4 mb-3 border-l-4 border-blue-500 rounded">
            <strong className="text-gray-900">Secure & Simple Checkout:</strong> Our streamlined checkout process is safe, secure, and easy to use.
          </li>
          <li className="bg-gray-200 p-4 mb-3 border-l-4 border-blue-500 rounded">
            <strong className="text-gray-900">Customer-Focused Experience:</strong> We are always here to help. Our team is committed to providing exceptional customer service.
          </li>
        </ul>
      </section>

      <footer className="text-center italic text-gray-600 mt-10 pt-5 border-t border-gray-400">
        <p>Thank you for being a part of the Wolf Athletics family. Let's grow it together.</p>
      </footer>
    </div>
  );
};

export default AboutPage;