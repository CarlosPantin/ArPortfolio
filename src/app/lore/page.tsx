"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CharacterLorePage() {
  const [activeLore, setActiveLore] =
    useState<keyof typeof lores>("Educational");
  const [fadeClass, setFadeClass] = useState("opacity-100");

  const router = useRouter();

  const lores = {
    Educational: [
      {
        year: "2016 - 2019",
        title: "High School: UDEM - MEXICO",
        description:
          "Focused on science, mathematics, and computer programming as part of the IB programme.",
        icon: "🎓",
      },
      {
        year: "2020 - 2024",
        title: "Bachelors Degree - Häme University of Applied Sciences",
        description: "Earned a degree in Software Engineering.",
        icon: "🏫",
      },
      {
        year: "2025 - Present",
        title: "Masters Degree - Oulu University",
        description:
          "Pursuing advanced studies in software engineering and web development.",
        icon: "📚",
      },
    ],
    Professional: [
      {
        year: "2023-2024",
        title: "Software Developer Intern",
        company: "UnfairAdvantage Oy.",
        description:
          "Worked on creating responsive web applications using React, Node.js and plenty more!",
        icon: "💻",
      },
      {
        year: "2024 - 2025",
        title: "Full Stack Developer",
        company: "UnfairAdvantage Oy",
        description:
          "Worked on a large-scale platform application with a focus on a fullstack approach.",
        icon: "🚀",
      },
      {
        year: "Unlimited",
        title: "FreeLancer",
        company: "Me, Myself, and I",
        description:
          "Worked alongside five different clients to create and deliver 5 website portfolios",
        icon: "🚀",
      },
    ],
  };

  const handleTabChange = (loreType: keyof typeof lores) => {
    setFadeClass("opacity-0");
    setTimeout(() => {
      setActiveLore(loreType);
      setFadeClass("opacity-100");
    }, 300);
  };

  const handleGoToLevel4 = () => {
    router.push("/level4");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-900 to-teal-700 text-white text-center px-4">
      <h1 className="text-4xl sm:text-6xl font-[Press Start 2P] mb-8">
        Character Lore
      </h1>

      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {Object.keys(lores).map((loreType) => (
          <button
            key={loreType}
            onClick={() => handleTabChange(loreType as keyof typeof lores)}
            className={`px-6 py-2 rounded-lg font-bold text-sm sm:text-lg ${
              activeLore === loreType
                ? "bg-teal-500 text-white"
                : "bg-gray-500 text-gray-200 hover:bg-gray-600"
            }`}
          >
            {loreType}
          </button>
        ))}
      </div>

      <div
        className={`relative w-full sm:w-3/4 md:w-1/2 transition-opacity duration-300 ${fadeClass}`}
      >
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/50"></div>

        {lores[activeLore].map((item, index) => (
          <div
            key={index}
            className={`relative mb-12 flex flex-col sm:flex-row items-center ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-700 border-4 border-white rounded-full flex items-center justify-center text-xl">
              {item.icon}
            </div>

            <div
              className={`bg-white text-black p-6 rounded-lg shadow-lg max-w-full sm:max-w-sm ${
                index % 2 === 0 ? "ml-10" : "mr-10"
              } hover:scale-105 transform transition-transform`}
            >
              <h2 className="text-xl font-bold text-green-900">{item.year}</h2>

              {"company" in item && (
                <h3 className="text-md font-semibold text-gray-700">
                  {item.company}
                </h3>
              )}

              <h3 className="text-lg font-semibold text-teal-700">
                {item.title}
              </h3>
              <p className="text-sm text-gray-800 mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={handleGoToLevel4}
          className="px-6 py-3 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-teal-500 to-green-500 border-2 border-teal-700 rounded-lg shadow-lg hover:scale-110 transform transition-transform"
        >
          Next Level
        </button>
      </div>
    </div>
  );
}
