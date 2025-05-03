"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type LoreType = "Educational" | "Professional";

interface BaseLoreItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}
type EducationalLoreItem = BaseLoreItem;

interface ProfessionalLoreItem extends BaseLoreItem {
  company: string;
}

type LoreItem = EducationalLoreItem | ProfessionalLoreItem;

type Lores = {
  Educational: EducationalLoreItem[];
  Professional: ProfessionalLoreItem[];
};

export default function CharacterLorePage() {
  const [activeLore, setActiveLore] = useState<LoreType>("Educational");
  const [fadeClass, setFadeClass] = useState("opacity-100");
  const [blinkingState, setBlinkingState] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkingState((prev) => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const lores: Lores = {
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
          "Pursuing a master's degree in Software Engineering and Information Systems.",
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
        year: "2025 - Present",
        title: "Lead Software Engineer",
        company: "Lumiery Oy",
        description:
          "Lead developer for a startup. I am tasked to bring Lumiery's ideas to life using a wide range of technologies",
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

  const handleTabChange = (loreType: LoreType) => {
    setFadeClass("opacity-0");
    setTimeout(() => {
      setActiveLore(loreType);
      setSelectedItemIndex(null);
      setFadeClass("opacity-100");
    }, 300);
  };

  const handleSelectItem = (index: number) => {
    setSelectedItemIndex(selectedItemIndex === index ? null : index);
  };

  const handleGoToLevel4 = () => {
    router.push("/level4");
  };

  const isProfessionalItem = (item: LoreItem): item is ProfessionalLoreItem => {
    return "company" in item;
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white text-center px-4 py-8"
      style={{
        backgroundImage: "radial-gradient(circle, #003366 0%, #001133 100%)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "center",
        }}
      />

      <div className="relative mb-8 z-10">
        <h1 className="text-4xl sm:text-6xl font-[Press Start 2P] text-cyan-300 mb-2">
          CHARACTER LORE
        </h1>
        <div
          className={`text-sm font-[Press Start 2P] text-yellow-300 ${
            blinkingState ? "opacity-0" : "opacity-100"
          }`}
        >
          SELECT QUEST TYPE
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-10 z-10">
        {Object.keys(lores).map((loreType) => (
          <button
            key={loreType}
            onClick={() => handleTabChange(loreType as LoreType)}
            className={`px-8 py-3 rounded-lg font-[Press Start 2P] text-sm sm:text-base border-4 transform transition-all ${
              activeLore === loreType
                ? "bg-blue-600 text-white border-blue-400 scale-105"
                : "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600"
            }`}
          >
            {loreType}
          </button>
        ))}
      </div>

      <div
        className={`relative w-full sm:w-3/4 md:w-2/3 transition-opacity duration-300 z-10 ${fadeClass}`}
      >
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-2 bg-cyan-500">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-4"
              style={{
                backgroundColor:
                  i % 2 === 0 ? "rgb(6, 182, 212)" : "rgb(8, 145, 178)",
                top: `${i * 5}%`,
              }}
            />
          ))}
        </div>

        {lores[activeLore].map((item, index) => (
          <div
            key={index}
            className={`relative mb-16 flex flex-col sm:flex-row items-center cursor-pointer ${
              index % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
            }`}
            onClick={() => handleSelectItem(index)}
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-800 border-4 border-cyan-400 rounded-lg flex items-center justify-center text-2xl z-20">
              {item.icon}
            </div>

            <div
              className={`bg-gray-900 border-4 ${
                selectedItemIndex === index
                  ? "border-yellow-400"
                  : "border-cyan-600"
              } text-white p-6 rounded-lg shadow-lg max-w-full sm:max-w-sm ${
                index % 2 === 0 ? "sm:mr-auto sm:ml-14" : "sm:ml-auto sm:mr-14"
              } hover:border-yellow-400 transform transition-all ${
                selectedItemIndex === index ? "scale-105" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-3 pb-2 border-b-2 border-cyan-800">
                <h2 className="text-lg font-[Press Start 2P] text-yellow-300">
                  {item.year}
                </h2>
                <div className="flex">
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={i}
                      className={`inline-block w-3 h-3 rounded-full ml-1 ${
                        i < 3 - (index % 3) ? "bg-green-500" : "bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {isProfessionalItem(item) && (
                <h3 className="text-md font-mono font-bold text-blue-400 mb-1">
                  {item.company}
                </h3>
              )}

              <h3 className="text-lg font-mono font-bold text-cyan-300 mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-cyan-100 mt-2 font-mono">
                {item.description}
              </p>

              <div className="mt-3 pt-2 border-t border-cyan-800 flex justify-between items-center">
                <span className="text-xs text-cyan-400 font-mono">
                  EXP +{(index + 1) * 250}
                </span>
                <span className="text-xs text-yellow-400 font-mono">
                  LVL {index + 1}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 mb-8 z-10">
        <button
          onClick={handleGoToLevel4}
          className="px-10 py-4 text-lg font-[Press Start 2P] text-white bg-purple-700 border-4 border-purple-500 rounded-lg shadow-lg hover:bg-purple-600 active:translate-y-1 transition-all relative"
        >
          <div
            className={`absolute -top-2 -right-2 w-4 h-4 rounded-full bg-yellow-400 ${
              blinkingState ? "opacity-70" : "opacity-100"
            }`}
          ></div>
          NEXT LEVEL
        </button>
      </div>
    </div>
  );
}
