"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import RetroGameNavigation from "../components/RetroGameNavigation";

interface Skill {
  icon: string;
  name: string;
  description: string;
  importance: string;
  level: number;
  color: string;
}

export default function SkillsPage() {
  const router = useRouter();
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const [blinkState, setBlinkState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkState((prev) => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedSkill !== null) {
      setShowModal(true);
      setTimeout(() => setAnimateIn(true), 50);
    } else {
      setAnimateIn(false);
      setTimeout(() => setShowModal(false), 300);
    }
  }, [selectedSkill]);

  const handleCardClick = (index: number) => {
    setSelectedSkill(selectedSkill === index ? null : index);
  };

  const handleCloseModal = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setSelectedSkill(null);
    }, 300);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-center px-4 py-8"
      style={{
        backgroundImage: "url('/images/retro-grid-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <RetroGameNavigation />

      <div className="bg-black bg-opacity-50 p-4 rounded-lg mb-8 border-4 border-cyan-400 shadow-lg shadow-cyan-500/50">
        <h1 className="text-4xl sm:text-6xl font-[Press Start 2P] text-white">
          MY SKILLS
        </h1>
        <p
          className={`text-yellow-300 font-[Press Start 2P] text-sm mt-2 ${
            blinkState ? "opacity-0" : "opacity-100"
          }`}
        >
          SELECT A SKILL TO VIEW DETAILS
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`cursor-pointer transform transition-all duration-300 hover:scale-105 ${
              selectedSkill === index ? "ring-4 ring-yellow-400 scale-105" : ""
            }`}
            onClick={() => {
              handleCardClick(index);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleCardClick(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed={selectedSkill === index}
          >
            <div
              className={`flex flex-col items-center border-2 text-white rounded-lg p-4 transition-colors ${skill.color} relative overflow-hidden`}
            >
              <div className="absolute top-0 left-0 w-4 h-4 bg-white opacity-50"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-white opacity-50"></div>

              <div className="text-4xl mb-2">{skill.icon}</div>
              <h2 className="text-xl font-bold mb-2 font-[Press Start 2P]">
                {skill.name}
              </h2>

              <div className="w-full bg-gray-700 h-4 rounded-full mb-3 relative overflow-hidden">
                <div
                  className="bg-green-500 h-4 rounded-full relative"
                  style={{ width: `${skill.level * 20}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-10 animate-pulse"></div>
                </div>
              </div>

              <p className="text-sm">{skill.description}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 p-4"
          onClick={() => handleCloseModal()}
        >
          <div
            className={`w-full max-w-2xl transform transition-all duration-300 ${
              animateIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {selectedSkill !== null && (
              <div className="bg-gray-900 border-4 border-cyan-500 rounded-lg p-6 shadow-lg shadow-cyan-500/50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-[Press Start 2P] text-white">
                    {skills[selectedSkill].name}
                  </h3>
                  <span
                    className="text-gray-400 cursor-pointer hover:text-white px-2 py-1 border border-gray-700 rounded hover:bg-gray-800 transition"
                    onClick={() => handleCloseModal()}
                  >
                    [X]
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="text-5xl mr-4">
                    {skills[selectedSkill].icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-300 mb-1">
                      PROFICIENCY LVL {skills[selectedSkill].level}/5
                    </div>
                    <div className="w-full bg-gray-700 h-6 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2 relative"
                        style={{
                          width: `${skills[selectedSkill].level * 20}%`,
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-20 animate-pulse"></div>
                        <span className="text-xs font-bold relative">
                          {skills[selectedSkill].level * 20}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-white mb-4">
                  {skills[selectedSkill].description}
                </p>

                <div className="bg-black bg-opacity-50 p-3 rounded border border-gray-700">
                  <p className="text-green-400 font-mono text-sm">
                    {skills[selectedSkill].importance}
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-red-700 text-white font-[Press Start 2P] text-sm rounded border-b-2 border-red-900 hover:bg-red-600 transition-colors"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-12 mb-4">
        <button
          onClick={() => {
            router.push("/level3");
          }}
          className="px-8 py-4 bg-blue-600 text-white font-[Press Start 2P] rounded-lg border-b-4 border-blue-800 hover:bg-blue-500 active:border-b-0 active:translate-y-1 transition-all hover:shadow-lg hover:shadow-blue-500/50"
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}

const skills: Skill[] = [
  {
    icon: "⚡",
    name: "React",
    description: "Building modern UI components and managing application state",
    importance:
      "// I picked up React while building personal projects that needed interactive user interfaces. Over time, I deepened my knowledge through real-world applications, professional environments, and staying updated with the React ecosystem.",
    level: 5,
    color: "bg-indigo-900 hover:bg-indigo-800 border-indigo-600",
  },
  {
    icon: "🛡️",
    name: "JavaScript",
    description: "ES6+, TypeScript, and modern framework implementation",
    importance:
      "// JavaScript was the foundation of my journey into web development. I started with the basics and gradually built up through hands-on practice, online courses, , bachelor's level studies, and solving real coding challenges in a professional environment.",
    level: 5,
    color: "bg-yellow-800 hover:bg-yellow-700 border-yellow-600",
  },
  {
    icon: "💾",
    name: "Databases",
    description: "SQL, MongoDB, and other data storage solutions",
    importance:
      "// I learned to work with both SQL and NoSQL databases through full-stack projects where managing and structuring data was key. These experiences taught me how to design schemas, write queries, and optimize data handling.",
    level: 4,
    color: "bg-blue-900 hover:bg-blue-800 border-blue-600",
  },
  {
    icon: "🐍",
    name: "Python",
    description: "Data processing, scripting, and automation",
    importance:
      "// Python was my entry point into programming and then, enhanced my skills in my Master level studies and professional work. I used it in various projects, including scripting, data manipulation, and backend development, which helped me understand its flexibility and power.",
    level: 3,
    color: "bg-green-900 hover:bg-green-800 border-green-600",
  },
  {
    icon: "🔄",
    name: "Agile",
    description:
      "Sprint planning, team coordination, and iterative development",
    importance:
      "// I became familiar with Agile methodologies while collaborating on group projects, mainly, in my previous full-stack position. Working in sprints, using tools like Jira, and doing standups helped me experience Agile in a practical setting.",
    level: 4,
    color: "bg-purple-900 hover:bg-purple-800 border-purple-600",
  },
  {
    icon: "🔧",
    name: "Git",
    description: "Version control, branching strategies, and collaboration",
    importance:
      "// Version control became familiar with me when I first started my full-stack developer position and personal projects. There, I learned to manage branches, resolve merge conflicts, and maintain a clean commit history, as well as perform code reviews as I gained more experience.",
    level: 5,
    color: "bg-red-900 hover:bg-red-800 border-red-600",
  },
  {
    icon: "⚙️",
    name: "Node.js",
    description: "Server-side JavaScript and API development",
    importance:
      "// I started using Node.js to build backend APIs and real-time features for my applications. This helped me understand JavaScript beyond the frontend and how to structure scalable server-side code.",
    level: 4,
    color: "bg-emerald-900 hover:bg-emerald-800 border-emerald-600",
  },
  {
    icon: "🎨",
    name: "Tailwind",
    description: "Utility-first CSS framework for rapid UI development",
    importance:
      "// I got into Tailwind CSS while looking for a utility-first approach to styling. Its speed and flexibility quickly became a favorite, and I now use it to build clean, responsive designs faster.",
    level: 5,
    color: "bg-cyan-900 hover:bg-cyan-800 border-cyan-600",
  },
  {
    icon: "🏗️",
    name: "Full-Stack",
    description: "End-to-end application architecture and implementation",
    importance:
      "// My full-stack skills evolved naturally as I tackled end-to-end projects—from designing the frontend to setting up servers and databases. These projects taught me how the entire web development puzzle fits together.",
    level: 4,
    color: "bg-fuchsia-900 hover:bg-fuchsia-800 border-fuchsia-600",
  },
];
