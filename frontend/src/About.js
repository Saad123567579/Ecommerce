import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold mb-4">About Us</h1>
        <p className="text-lg leading-relaxed mb-8">
          Welcome to our open-source e-commerce website! We are thrilled to have you here. Let us introduce ourselves.
        </p>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            
            <h2 className="text-xl font-semibold mb-2">Muhammad Saad</h2>
            <p className="text-gray-700">Founder & Developer</p>
            <p className="text-gray-600">
              Muhammad Saad is a passionate developer with expertise in building e-commerce websites. He believes in the power of open-source software and aims to create accessible solutions for businesses of all sizes.
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
           
            <h2 className="text-xl font-semibold mb-2">John Doe</h2>
            <p className="text-gray-700">Designer</p>
            <p className="text-gray-600">
              John Doe is a talented designer who brings creativity and aesthetics to our website. His designs help us create a visually appealing and user-friendly experience for our customers.
            </p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
           
            <h2 className="text-xl font-semibold mb-2">Jane Smith</h2>
            <p className="text-gray-700">Marketing Specialist</p>
            <p className="text-gray-600">
              Jane Smith is our marketing guru who ensures our products reach the right audience. She strategizes and executes marketing campaigns to increase brand visibility and drive sales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
