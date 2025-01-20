'use client';

export default function CharacterLorePage() {
  const educationalBackground = [
    {
      year: '2016 - 2019',
      title: 'High School: UDEM   - MEXICO',
      description: 'Focused on science, mathematics, and computer programming as part of the IB programme',
      icon: '🎓',
    },
    {
      year: '2020 - 2024',
      title: 'Bachelors Degree',
      description: 'Earned a degree in Software Engineering from Häme University of Applied Sciences',
      icon: '🏫',
    },
    {
      year: '2024 - Present',
      title: 'Masters Degree',
      description: 'Pursuing advanced studies in software engineering and web development.',
      icon: '📚',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-900 to-teal-700 text-white text-center">
      <h1 className="text-6xl font-[Press Start 2P] mb-12">Character Lore</h1>
      <p className="text-lg mb-10 max-w-3xl">
        My educational journey is a reflection of my commitment to growth and learning. Here is how it unfolded:
      </p>
      <div className="relative w-3/4 md:w-1/2">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/50"></div>

        {educationalBackground.map((item, index) => (
          <div
            key={index}
            className={`relative mb-12 flex items-center ${
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-700 border-4 border-white rounded-full flex items-center justify-center text-xl">
              {item.icon}
            </div>

            <div
              className={`bg-white text-black p-6 rounded-lg shadow-lg max-w-sm ${
                index % 2 === 0 ? 'ml-10' : 'mr-10'
              } hover:scale-105 transform transition-transform`}
            >
              <h2 className="text-xl font-bold text-green-900">{item.year}</h2>
              <h3 className="text-lg font-semibold text-teal-700">{item.title}</h3>
              <p className="text-sm text-gray-800 mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
