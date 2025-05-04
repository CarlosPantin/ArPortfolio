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
}

export default function SkillsPage() {
  const router = useRouter();
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);
  const [blinkState, setBlinkState] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkState((prev) => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-center px-4 py-8"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <RetroGameNavigation />
      <div className="bg-black bg-opacity-50 p-4 rounded-lg mb-8">
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
            className={`cursor-pointer ${
              selectedSkill === index ? "ring-4 ring-yellow-400" : ""
            }`}
            onClick={() => setSelectedSkill(index)}
          >
            <div className="flex flex-col items-center bg-indigo-900 border-2 border-indigo-600 text-white rounded-lg p-4 hover:bg-indigo-800 transition-colors">
              <div className="text-4xl mb-2">{skill.icon}</div>
              <h2 className="text-xl font-bold mb-2 font-[Press Start 2P]">
                {skill.name}
              </h2>

              <div className="w-full bg-gray-700 h-4 rounded-full mb-3">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${skill.level * 20}%` }}
                ></div>
              </div>

              <p className="text-sm">{skill.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedSkill !== null && (
        <div className="mt-8 w-full max-w-2xl bg-gray-900 border-2 border-blue-500 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-[Press Start 2P] text-white">
              {skills[selectedSkill].name}
            </h3>
            <span
              className="text-gray-400 cursor-pointer hover:text-white"
              onClick={() => setSelectedSkill(null)}
            >
              [X]
            </span>
          </div>

          <div className="flex items-center mb-4">
            <div className="text-5xl mr-4">{skills[selectedSkill].icon}</div>
            <div className="flex-1">
              <div className="text-sm text-gray-300 mb-1">
                PROFICIENCY LVL {skills[selectedSkill].level}/5
              </div>
              <div className="w-full bg-gray-700 h-6 rounded-full">
                <div
                  className="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${skills[selectedSkill].level * 20}%` }}
                >
                  <span className="text-xs font-bold">
                    {skills[selectedSkill].level * 20}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-white mb-4">{skills[selectedSkill].description}</p>

          <div className="bg-black bg-opacity-50 p-3 rounded border border-gray-700">
            <p className="text-green-400 font-mono text-sm">
              {" "}
              {skills[selectedSkill].importance}
            </p>
          </div>
        </div>
      )}

      <div className="mt-12 mb-4">
        <button
          onClick={() => router.push("/level3")}
          className="px-8 py-4 bg-blue-600 text-white font-[Press Start 2P] rounded-lg border-b-4 border-blue-800 hover:bg-blue-500 active:border-b-0 active:mt-1 transition-all"
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
  },
  {
    icon: "🛡️",
    name: "JavaScript",
    description: "ES6+, TypeScript, and modern framework implementation",
    importance:
      "// JavaScript was the foundation of my journey into web development. I started with the basics and gradually built up through hands-on practice, online courses, , bachelor's level studies, and solving real coding challenges in a professional environment.",
    level: 5,
  },
  {
    icon: "💾",
    name: "Databases",
    description: "SQL, MongoDB, and other data storage solutions",
    importance:
      "// I learned to work with both SQL and NoSQL databases through full-stack projects where managing and structuring data was key. These experiences taught me how to design schemas, write queries, and optimize data handling.",
    level: 4,
  },
  {
    icon: "🐍",
    name: "Python",
    description: "Data processing, scripting, and automation",
    importance:
      "// Python was my entry point into programming and then, enhanced my skills in my Master level studies and professional work. I used it in various projects, including scripting, data manipulation, and backend development, which helped me understand its flexibility and power.",
    level: 3,
  },
  {
    icon: "🔄",
    name: "Agile",
    description:
      "Sprint planning, team coordination, and iterative development",
    importance:
      "// I became familiar with Agile methodologies while collaborating on group projects, mainly, in my previous full-stack position. Working in sprints, using tools like Jira, and doing standups helped me experience Agile in a practical setting.",
    level: 4,
  },
  {
    icon: "🔧",
    name: "Git",
    description: "Version control, branching strategies, and collaboration",
    importance:
      "// Version control became familiar with me when I first started my full-stack developer position and personal projects. There, I learned to manage branches, resolve merge conflicts, and maintain a clean commit history, as well as perform code reviews as I gained more experience.",
    level: 5,
  },
  {
    icon: "⚙️",
    name: "Node.js",
    description: "Server-side JavaScript and API development",
    importance:
      "// I started using Node.js to build backend APIs and real-time features for my applications. This helped me understand JavaScript beyond the frontend and how to structure scalable server-side code.",
    level: 4,
  },
  {
    icon: "🎨",
    name: "Tailwind",
    description: "Utility-first CSS framework for rapid UI development",
    importance:
      "// I got into Tailwind CSS while looking for a utility-first approach to styling. Its speed and flexibility quickly became a favorite, and I now use it to build clean, responsive designs faster.",
    level: 5,
  },
  {
    icon: "🏗️",
    name: "Full-Stack",
    description: "End-to-end application architecture and implementation",
    importance:
      "// My full-stack skills evolved naturally as I tackled end-to-end projects—from designing the frontend to setting up servers and databases. These projects taught me how the entire web development puzzle fits together.",
    level: 4,
  },
];
