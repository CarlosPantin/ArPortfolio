"use client";

import { JSX, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { MdGamepad } from "react-icons/md";
import {
  DiReact,
  DiHtml5,
  DiCss3,
  DiNodejsSmall,
  DiPython,
} from "react-icons/di";
import { SiJavascript, SiTailwindcss, SiTypescript } from "react-icons/si";
import RetroGameNavigation from "../components/RetroGameNavigation";

interface Project {
  id: number;
  name: string;
  description: string;
  stacks: string[];
  github: string;
  liveSite: string;
  color: string;
}

interface RetroArcadeCardProps {
  project: Project;
  onClick: () => void;
}

const projects: Project[] = [
  {
    id: 1,
    name: "ToDo App",
    description:
      "Simple ToDo app. The user can add, delete, edit and mark as done tasks of their choice! Gotta start somewhere!",
    stacks: ["React", "CSS", "HTML"],
    github: "https://github.com/CarlosPantin/todoproject",
    liveSite: "https://todoproject-coral.vercel.app/",
    color: "#FF5252",
  },
  {
    id: 2,
    name: "Weather App",
    description:
      "It happens to me that when I want to check the weather on my phone, the apps take a bit to load and have ads, so I decided to make my own!",
    stacks: ["React", "Node", "CSS"],
    github: "https://github.com/CarlosPantin/my-weather-app",
    liveSite: "https://weatherapp-self-two.vercel.app/",
    color: "#2196F3",
  },
  {
    id: 3,
    name: "CV Generator",
    description:
      "A dynamic CV creator that allows the user to create, edit, and download a CV with a specific template.",
    stacks: ["React", "Tailwind", "Python", "TypeScript"],
    github: "",
    liveSite: "",
    color: "#9C27B0",
  },
  {
    id: 4,
    name: "Spotify Info",
    description:
      "I created an app in which the user can see their top artists, top songs and some data of their profile info all year long using spotify API.",
    stacks: ["React", "Node", "CSS"],
    github: "https://github.com/CarlosPantin/spotify-app",
    liveSite: "https://www.youtube.com/watch?v=xsWV8AcXar8",
    color: "#1ED760",
  },
  {
    id: 5,
    name: "CatCare",
    description:
      "A platform in which the user can manage all the needs of their cats.",
    stacks: ["In development"],
    github: "https://github.com/CarlosPantin/CatCare",
    liveSite: "https://catcare-vert.vercel.app/",
    color: "#FF9800",
  },
  {
    id: 6,
    name: "My Portfolio",
    description: "A unique portfolio to show my skills and relevant material.",
    stacks: ["TypeScript", "TailwindCSS"],
    github: "https://github.com/CarlosPantin/ArPortfolio",
    liveSite: "https://carlospantinportfolio.vercel.app/",
    color: "#607D8B",
  },
  {
    id: 7,
    name: "Client's Portfolio",
    description: "Freelanced a finnish customer a website portfolio.",
    stacks: ["TypeScript", "TailwindCSS"],
    github: "https://github.com/CarlosPantin/jessika-tyni-website",
    liveSite: "https://jessika-tyni-portfolio.vercel.app/",
    color: "#E91E63",
  },
  {
    id: 8,
    name: "Landing Page: Lumiery Oy",
    description: "Developed and created a full landing page for Lumiery Oy.",
    stacks: ["JavaScript", "TailwindCSS", "React"],
    github: "",
    liveSite: "",
    color: "#f7f5f6",
  },
];

const stackIcons: { [key: string]: JSX.Element } = {
  React: <DiReact className="text-blue-400" />,
  CSS: <DiCss3 className="text-blue-500" />,
  HTML: <DiHtml5 className="text-orange-500" />,
  Node: <DiNodejsSmall className="text-green-500" />,
  Python: <DiPython className="text-yellow-500" />,
  Tailwind: <SiTailwindcss className="text-cyan-400" />,
  TailwindCSS: <SiTailwindcss className="text-cyan-400" />,
  TypeScript: <SiTypescript className="text-blue-600" />,
  JavaScript: <SiJavascript className="text-blue-600" />,
};

const RetroArcadeCard: React.FC<RetroArcadeCardProps> = ({
  project,
  onClick,
}) => {
  const generatePixelBorder = (color: string): React.CSSProperties => ({
    boxShadow: `
      0 0 0 2px ${color},
      0 0 0 4px #000,
      0 0 0 6px ${color},
      0 0 20px rgba(255, 255, 255, 0.3)
    `,
  });

  return (
    <motion.div
      className="relative w-full overflow-hidden transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      layoutId={`project-${project.id}`}
      onClick={onClick}
    >
      <div
        className="relative rounded-lg cursor-pointer bg-black"
        style={generatePixelBorder(project.color)}
      >
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div
            className="absolute inset-0 pattern-grid"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, ${project.color}, ${project.color} 1px, transparent 1px, transparent 20px),
                               repeating-linear-gradient(90deg, ${project.color}, ${project.color} 1px, transparent 1px, transparent 20px)`,
              animation: "gridMove 10s infinite linear",
            }}
          />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute h-1 bg-gradient-to-r from-transparent via-white to-transparent top-6 -left-40 w-40 opacity-50"
            style={{ animation: "slideRight 4s infinite linear" }}
          />
          <div
            className="absolute h-1 bg-gradient-to-r from-transparent via-white to-transparent top-20 -right-40 w-40 opacity-30"
            style={{ animation: "slideLeft 3s infinite linear" }}
          />
        </div>

        {[
          "top-2 left-2",
          "top-2 right-2",
          "bottom-2 left-2",
          "bottom-2 right-2",
        ].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-2 h-2 rounded-full`}
            style={{
              backgroundColor: project.color,
              boxShadow: `0 0 10px ${project.color}`,
            }}
          />
        ))}

        <div className="relative z-10 p-5">
          <div className="flex items-start justify-between">
            <h3
              className="text-xl md:text-2xl font-bold mb-3 tracking-wide font-arcade"
              style={{
                color: project.color,
                textShadow: `0 0 5px ${project.color}`,
              }}
            >
              {project.name}
            </h3>
            <div
              className="w-3 h-3 rounded-full animate-pulse"
              style={{
                backgroundColor: project.color,
                boxShadow: `0 0 8px ${project.color}`,
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="space-y-4"
          >
            <div className="bg-gray-900 rounded p-3 border border-gray-800">
              <div className="flex items-start space-x-2">
                <span className="text-green-400 font-mono">$&gt;</span>
                <p className="text-gray-300 text-sm">{project.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.stacks.map((stack, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 bg-gray-800 px-2 py-1 rounded text-xs border"
                  style={{ borderColor: project.color }}
                >
                  {stackIcons[stack] && <span>{stackIcons[stack]}</span>}
                  <span className="text-gray-200">{stack}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-start space-x-3 pt-2">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded flex items-center space-x-2 text-sm"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                    border: `2px solid ${project.color}`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 15px ${project.color}`,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub size={16} style={{ color: project.color }} />
                  <span className="text-white">Github</span>
                </motion.a>
              )}
              {project.liveSite && (
                <motion.a
                  href={project.liveSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded flex items-center space-x-2 text-sm"
                  style={{ backgroundColor: project.color }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 15px ${project.color}`,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaExternalLinkAlt size={14} className="text-black" />
                  <span className="text-black font-medium">Live Demo</span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ArcadeProjects() {
  const router = useRouter();
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const handleProjectClick = (id: number) => {
    setExpandedProject(id === expandedProject ? null : id);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(#0F0F2F 1px, transparent 1px), linear-gradient(90deg, #0F0F2F 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          perspective: "1000px",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ animation: "gridMove 20s infinite linear" }}
        />
      </div>
      <div className="relative z-10 min-h-screen container mx-auto px-4">
        <br />
        <br />
        <header className="pt-16 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-4 font-arcade"
              style={{ textShadow: "0 0 10px rgba(255,0,255,0.7)" }}
            >
              [MY PROJECTS]
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="inline-block relative">
              <p className="text-cyan-400 text-base md:text-lg font-arcade py-2 px-4 border-2 border-cyan-500 rounded">
                Take a look at my projects
              </p>
              <div className="absolute -inset-px border-2 border-cyan-400 rounded opacity-50 animate-pulse" />
            </div>
          </motion.div>
        </header>
        <RetroGameNavigation />
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
            >
              <RetroArcadeCard
                project={project}
                onClick={() => handleProjectClick(project.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center py-12">
          <motion.button
            onClick={() => router.push("/thank-you")}
            className="relative font-arcade bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold py-4 px-10 rounded overflow-hidden"
            style={{
              boxShadow:
                "0 0 15px rgba(148,0,255,0.5), inset 0 0 10px rgba(255,255,255,0.2)",
              textShadow: "0 0 5px rgba(255,255,255,0.7)",
            }}
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 0 25px rgba(148,0,255,0.7), inset 0 0 15px rgba(255,255,255,0.3)",
            }}
          >
            <div className="flex items-center space-x-2">
              <MdGamepad className="text-xl" />
              <span>CONTACT ME</span>
            </div>
            <div
              className="absolute -inset-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-20 blur"
              style={{ animation: "shimmer 2s infinite linear" }}
            />
          </motion.button>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

        .font-arcade {
          font-family: "Press Start 2P", cursive;
        }

        @keyframes gridMove {
          0% {
            transform: perspective(500px) rotateX(60deg) translateY(0);
          }
          100% {
            transform: perspective(500px) rotateX(60deg) translateY(40px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes slideRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(100vw + 40px));
          }
        }

        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100vw - 40px));
          }
        }
      `}</style>
    </div>
  );
}
