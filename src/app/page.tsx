'use client';

export default function Home() {
  return (
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url(/images/bg3.jpg)' }}>
      <div className="text-center text-white space-y-8">
        <h1 className="text-4xl font-[Press Start 2P]">
          Welcome to My Arcade Portfolio
        </h1>
        <p className="text-lg">
          Click below to start exploring!
        </p>
        <div>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg text-2xl hover:bg-blue-700 transition duration-300">
            Start
          </button>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="https://www.linkedin.com/in/carlos-pantin" target="_blank" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-lg hover:bg-blue-800 transition duration-300">LinkedIn</a>
          <a href="/path/to/cv" className="bg-green-600 text-white px-4 py-2 rounded-lg text-lg hover:bg-green-800 transition duration-300">Download CV</a>
          <a href="https://github.com/carlos-pantin" target="_blank" className="bg-gray-800 text-white px-4 py-2 rounded-lg text-lg hover:bg-gray-600 transition duration-300">GitHub</a>
        </div>
      </div>
    </div>
  );
}
