"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function RetroGamingPortfolio() {
  const router = useRouter();
  const [currentState, setCurrentState] = useState("intro");
  const [selectedOption, setSelectedOption] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const menuOptions = [
    { label: "PROJECTS", path: "/myprojects" },
    { label: "SKILLS", path: "/skills" },
    { label: "ABOUT ME", path: "/about" },
    { label: "BACKGROUND & EXPERIENCE", path: "/lore" },
    { label: "CONTACT ME", path: "/contact" },
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentState !== "main") return;

      switch (e.key) {
        case "ArrowUp":
          setSelectedOption((prev) =>
            prev > 0 ? prev - 1 : menuOptions.length - 1
          );
          break;
        case "ArrowDown":
          setSelectedOption((prev) =>
            prev < menuOptions.length - 1 ? prev + 1 : 0
          );
          break;
        case "Enter":
          router.push(menuOptions[selectedOption].path);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentState, selectedOption, menuOptions, router]);

  const handleStart = () => {
    setCurrentState("main");
  };

  const handleOptionClick = (index: number) => {
    router.push(menuOptions[index].path);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(20, 20, 80, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 20, 80, 0.15) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          backgroundColor: "#000",
          backgroundPosition: "-1px -1px",
        }}
      />

      <AnimatePresence>
        {currentState === "intro" && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <div className="w-full max-w-2xl px-6 md:px-0">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center mb-16"
              >
                <h1
                  className="text-5xl md:text-7xl font-bold mb-3"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    color: "#39FF14",
                    textShadow:
                      "0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.5)",
                  }}
                >
                  CARLOS
                </h1>
                <h1
                  className="text-5xl md:text-7xl font-bold mb-6"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    color: "#39FF14",
                    textShadow:
                      "0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.5)",
                  }}
                >
                  PANTIN
                </h1>
                <h2
                  className="text-xl md:text-2xl font-bold text-blue-400"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    textShadow: "0 0 8px rgba(59, 130, 246, 0.7)",
                  }}
                >
                  SOFTWARE DEVELOPER
                </h2>
                <br />
                <h2
                  className="text-xl md:text-xl font-bold text-yellow-400"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    textShadow: "0 0 8px rgba(59, 130, 246, 0.7)",
                  }}
                >
                  My Portfolio
                </h2>
              </motion.div>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <motion.button
                  className="bg-transparent border-4 border-green-500 text-green-400 py-4 px-12 rounded-md text-xl md:text-2xl relative overflow-hidden group"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                  onClick={handleStart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(57, 255, 20, 0)",
                      "0 0 20px rgba(57, 255, 20, 0.7)",
                      "0 0 0px rgba(57, 255, 20, 0)",
                    ],
                  }}
                  transition={{
                    boxShadow: { repeat: Infinity, duration: 2 },
                  }}
                >
                  <span className="relative z-10">START</span>
                  <motion.div
                    className="absolute inset-0 bg-green-500 z-0"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: "left" }}
                  />
                </motion.button>
              </motion.div>

              <motion.div
                className="absolute top-1/4 left-8 md:left-16 w-4 h-4 bg-blue-500"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <motion.div
                className="absolute bottom-1/4 right-8 md:right-16 w-6 h-6 bg-purple-500"
                animate={{
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentState === "main" && (
          <motion.div
            className="fixed inset-0 z-20 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row w-full h-full">
              <motion.div
                className="w-full md:w-1/2 h-full flex flex-col justify-center items-center p-6 relative"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="w-full max-w-sm">
                  <h2
                    className="text-2xl md:text-3xl mb-8 text-center md:text-left"
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      color: "#39FF14",
                      textShadow: "0 0 5px rgba(57, 255, 20, 0.7)",
                    }}
                  >
                    SELECT OPTION
                  </h2>

                  <div className="space-y-4">
                    {menuOptions.map((option, index) => (
                      <motion.button
                        key={index}
                        className={`w-full text-left py-4 px-6 rounded-lg border-2 flex items-center transition-colors ${
                          selectedOption === index
                            ? "bg-green-900/30 border-green-500 text-green-400"
                            : "border-gray-700 text-gray-300 hover:border-green-500"
                        }`}
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setSelectedOption(index)}
                        onClick={() => handleOptionClick(index)}
                      >
                        {selectedOption === index && (
                          <span className="mr-3 text-green-400">&gt;</span>
                        )}
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-6 relative"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div
                  className="w-full h-full rounded-lg border-2 border-gray-700 bg-black/80 p-4 md:p-6 overflow-hidden"
                  style={{
                    boxShadow:
                      "0 0 15px rgba(0, 0, 0, 0.5), inset 0 0 2px rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-4" />
                    <div className="text-gray-400 text-xs">terminal</div>
                  </div>

                  <div className="font-mono text-green-500 text-sm md:text-base space-y-2">
                    <p>$ whoami</p>
                    <p className="text-white">
                      Carlos Pantin - Passionate and SkilFul Software Engineer
                    </p>
                    <p>$ skills</p>
                    <p className="text-white">
                      JavaScript, React, NextJS, TailwindCSS, Python, Database
                      Management, Cloud Platforms, DevOps...
                    </p>
                    <p>$ experience</p>
                    <p className="text-white">
                      Junior developer with passion for Software Engineering
                    </p>
                    <p>$ Traits</p>
                    <p className="text-white">
                      Creative problem-solver, fast learner, team player
                    </p>
                    <p className="flex">
                      ${" "}
                      <span className="text-white ml-1">
                        Ready to know more about me?
                      </span>
                      {showCursor && (
                        <span className="ml-1 border-r-2 border-green-500 animate-blink">
                          &nbsp;
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-3 left-3 text-gray-600 text-xs z-10">
        v1.0
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

        body {
          margin: 0;
          padding: 0;
          background-color: #000;
          font-family: "Inter", sans-serif;
          overflow-x: hidden;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
}
