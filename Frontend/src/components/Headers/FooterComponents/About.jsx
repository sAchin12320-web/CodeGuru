import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="w-full bg-white shadow-lg rounded-lg p-6 md:p-8 mt-6 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-gray-800">
          About Us
        </h1>
        <p className="text-base md:text-lg leading-relaxed mb-4 text-gray-700 text-center">
          We provide top-notch online tech courses designed to develop your skills and prepare you for placements. Our courses cover a wide range of technical topics, ensuring that you gain the knowledge and expertise needed in today’s competitive job market.
        </p>
        <p className="text-base md:text-lg leading-relaxed mb-4 text-gray-700 text-center">
          Our experienced and knowledgeable instructors are here to guide you through every step of your learning journey. With their industry insights and practical knowledge, you’ll be well-equipped to tackle real-world challenges and excel in your career.
        </p>
        <p className="text-base md:text-lg leading-relaxed mb-4 text-gray-700 text-center">
          Join us to enhance your skills, gain confidence, and prepare for your future with our comprehensive tech courses.
        </p>

        <div className="mt-8 md:mt-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center text-gray-800">
            Key Features
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Experienced Instructors</h3>
              <p className="text-base text-gray-600">
                Learn from industry experts with years of experience and a passion for teaching.
              </p>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Comprehensive Curriculum</h3>
              <p className="text-base text-gray-600">
                Our courses cover everything from basic to advanced topics to ensure a well-rounded education.
              </p>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Flexible Learning</h3>
              <p className="text-base text-gray-600">
                Access our courses anytime, anywhere, and learn at your own pace.
              </p>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Placement Assistance</h3>
              <p className="text-base text-gray-600">
                Get support and guidance to help you secure a job in the tech industry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
