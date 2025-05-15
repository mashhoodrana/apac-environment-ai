import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function About() {
  const teamMembers = [
    {
      name: 'Mashhood Rana',
      role: 'Frontend Developer & UI/UX Designer',
      bio: 'Creates intuitive user interfaces with a focus on data visualization and user experience.',
      image: 'https://via.placeholder.com/300x300?text=Mashhood+Rana',
      social: {
        github: '#',
        linkedin: '#',
        email: 'mailto:themashhoodrana@gmail.com'
      }
    },
    {
      name: 'M. Usman',
      role: 'Data Scientist & ML Engineer',
      bio: 'Specializes in satellite imagery analysis and environmental data processing.',
      image: 'https://via.placeholder.com/300x300?text=M.+Usman',
      social: {
        github: '#',
        linkedin: '#',
        email: 'mailto:usman@example.com'
      }
    },
    {
      name: 'Tabish Almas',
      role: 'Backend Developer',
      bio: 'Experienced in AI and machine learning with a focus on environmental applications.',
      image: 'https://via.placeholder.com/300x300?text=Tabish+Almas',
      social: {
        github: '#',
        linkedin: '#',
        email: 'mailto:tabish@example.com'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            About Our Project
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
            Learn about our team and the APAC Solution Challenge project.
          </p>
        </div>

        {/* Project Information */}
        <div className="mt-12 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">APAC Solution Challenge</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our project is part of the Google APAC Solution Challenge, which encourages students to develop solutions addressing local community problems using Google technologies.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We've developed an AI-powered environmental monitoring solution that leverages Google Earth Engine, TensorFlow, and Firebase to analyze satellite imagery and provide insights on vegetation health (NDVI), surface temperature, and albedo (surface reflectivity).
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Technologies Used:</h3>
              <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-300">
                <li>React.js with Tailwind CSS for frontend</li>
                <li>Firebase for authentication and hosting</li>
                <li>Google Earth Engine for satellite imagery</li>
                <li>TensorFlow for machine learning models</li>
                <li>Google Cloud Platform for backend services</li>
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Affiliation:</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Proudly affiliated with GDGOC-IST (Google Developer Group Open Community - Institute of Space Technology)
              </p>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex flex-col items-center">
                    <img 
                      className="h-40 w-40 rounded-full object-cover mb-4" 
                      src={member.image} 
                      alt={member.name} 
                    />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-sm text-primary-light font-medium">{member.role}</p>
                    <p className="mt-3 text-gray-600 dark:text-gray-300 text-center">{member.bio}</p>
                    <div className="mt-4 flex space-x-4">
                      <a href={member.social.github} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                        <FiGithub className="h-5 w-5" />
                      </a>
                      <a href={member.social.linkedin} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                        <FiLinkedin className="h-5 w-5" />
                      </a>
                      <a href={member.social.email} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
                        <FiMail className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Goals */}
        <div className="mt-12 bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We aim to provide accessible environmental monitoring tools that help communities, researchers, and policymakers understand and respond to environmental changes.
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Key Goals:</h3>
              <ul className="mt-2 space-y-3">
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="ml-2 text-gray-600 dark:text-gray-300">
                    Democratize access to environmental data analysis
                  </p>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="ml-2 text-gray-600 dark:text-gray-300">
                    Support sustainable development and conservation efforts
                  </p>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="ml-2 text-gray-600 dark:text-gray-300">
                    Provide early warning systems for environmental changes
                  </p>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-5 w-5 text-primary-light" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="ml-2 text-gray-600 dark:text-gray-300">
                    Empower communities to make data-driven decisions
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}