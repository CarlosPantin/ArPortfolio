"use client";

import { useRouter } from "next/navigation";

export default function SkillsPage() {
  const router = useRouter();
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-center px-4"
      style={{
        backgroundImage: "url(/images/skills-background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl sm:text-6xl font-[Press Start 2P] text-white mb-12">
        Character Skills
      </h1>

      <div className="flex flex-wrap gap-6 sm:gap-8 justify-center max-w-5xl mx-auto">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center w-72 sm:w-80 bg-indigo-800 text-white rounded-lg shadow-lg p-6 hover:scale-105 transform transition-transform"
          >
            <div className="text-4xl sm:text-5xl mb-4">{skill.icon}</div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">{skill.name}</h2>
            <p className="text-sm sm:text-base">{skill.description}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push("/level3")}
        className="mt-8 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:scale-105 transform transition-transform"
      >
        Next Level
      </button>
    </div>
  );
}

const skills = [
  { icon: "⭐", name: "React", description: "Modern UI/UX development." },
  {
    icon: "🗡️",
    name: "JavaScript Frameworks",
    description: "Proficiency with libraries like Next.js.",
  },
  {
    icon: "❤️",
    name: "Database Management",
    description: "SQL, MongoDB, etc.",
  },
  { icon: "⏳", name: "Python", description: "Data manipulation & scripting." },
  { icon: "🏅", name: "Agile", description: "Team collaboration workflows." },
  {
    icon: "🔧",
    name: "Git Version Control",
    description: "Versioning and collaboration.",
  },
  { icon: "🔮", name: "Node.js", description: "Backend APIs and services." },
  {
    icon: "🧪",
    name: "Tailwind CSS",
    description: "Expertise in utility-first styling.",
  },
  {
    icon: "🪷",
    name: "Full-Stack Development",
    description: "Building front-to-back solutions.",
  },
];
