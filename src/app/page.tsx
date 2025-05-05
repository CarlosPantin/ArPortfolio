"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
}

interface BinaryColumn {
  id: number;
  left: number;
  duration: number;
  delay: number;
  binary: string;
}

interface PowerUpEffect {
  id: number;
  delay: number;
  repeatDelay: number;
}

interface MenuOption {
  label: string;
  path: string;
}

const ClientOnlyContent = dynamic(
  () => Promise.resolve(RetroGamingPortfolioContent),
  {
    ssr: false,
  }
);

export default function RetroGamingPortfolio() {
  return <ClientOnlyContent />;
}

function RetroGamingPortfolioContent() {
  const router = useRouter();
  const [currentState, setCurrentState] = useState<"intro" | "main">("intro");
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [glitchText, setGlitchText] = useState<boolean>(false);

  const particlesRef = useRef<Particle[]>([]);
  const binaryColumnsRef = useRef<BinaryColumn[]>([]);
  const powerUpEffectsRef = useRef<PowerUpEffect[]>([]);

  const menuOptions: MenuOption[] = [
    { label: "PROJECTS", path: "/myprojects" },
    { label: "SKILLS", path: "/skills" },
    { label: "ABOUT ME", path: "/about" },
    { label: "BACKGROUND & EXPERIENCE", path: "/lore" },
    { label: "CONTACT ME", path: "/contact" },
  ];

  useEffect(() => {
    particlesRef.current = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));

    binaryColumnsRef.current = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
      binary: Array.from({ length: 20 }, () => Math.round(Math.random())).join(
        ""
      ),
    }));

    powerUpEffectsRef.current = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2 + i * 0.2,
      repeatDelay: Math.random() * 3 + 2,
    }));

    setLoaded(true);
  }, []);

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

  useEffect(() => {
    if (loaded) {
      const glitchInterval = setInterval(() => {
        setGlitchText(true);
        setTimeout(() => setGlitchText(false), 150);
      }, 3000);
      return () => clearInterval(glitchInterval);
    }
  }, [loaded]);

  const handleStart = () => {
    setCurrentState("main");
  };

  const handleOptionClick = (index: number) => {
    router.push(menuOptions[index].path);
  };

  if (!loaded) {
    return <div className="min-h-screen bg-black"></div>;
  }

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

      <motion.div
        className="fixed inset-0 z-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, #4b0082 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, #4b0082 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, #4b0082 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, #4b0082 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {particlesRef.current.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed rounded-full bg-cyan-500 opacity-70 z-10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -300],
            opacity: [0, 0.7, 0],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}

      <AnimatePresence>
        {currentState === "intro" && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
              {binaryColumnsRef.current.map((column) => (
                <motion.div
                  key={column.id}
                  className="absolute text-green-500 font-mono text-sm"
                  style={{
                    left: `${column.left}%`,
                    top: -100,
                  }}
                  animate={{
                    y: ["0vh", "100vh"],
                  }}
                  transition={{
                    duration: column.duration,
                    repeat: Infinity,
                    delay: column.delay,
                    ease: "linear",
                  }}
                >
                  {column.binary}
                </motion.div>
              ))}
            </div>

            <div className="w-full max-w-2xl px-6 md:px-0 relative">
              <svg
                className="absolute top-0 left-0 w-full h-full -z-10 opacity-20"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M10,30 Q30,10 50,30 T90,30"
                  fill="none"
                  stroke="#39FF14"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                <motion.path
                  d="M10,70 Q30,90 50,70 T90,70"
                  fill="none"
                  stroke="#39FF14"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.8 }}
                />
                <motion.path
                  d="M30,10 Q50,30 50,50 T70,90"
                  fill="none"
                  stroke="#39FF14"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 1.1 }}
                />
              </svg>

              <div className="relative mb-16">
                <motion.div
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-center relative"
                >
                  <motion.div
                    className="absolute -left-4 sm:-left-16 top-1/2 h-0.5 bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: "25%" }}
                    transition={{ delay: 1, duration: 0.6 }}
                  />
                  <motion.div
                    className="absolute -right-4 sm:-right-16 top-1/2 h-0.5 bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: "25%" }}
                    transition={{ delay: 1, duration: 0.6 }}
                  />

                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                      className="absolute w-full h-0.5 bg-cyan-400 opacity-60"
                      animate={{ top: ["-10%", "110%"] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 3,
                      }}
                    />
                  </div>

                  <div className="relative">
                    <h1
                      className={`text-5xl md:text-7xl font-bold mb-3 relative ${
                        glitchText ? "glitch" : ""
                      }`}
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        color: "#39FF14",
                        textShadow:
                          "0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.5)",
                      }}
                    >
                      CARLOS
                      {glitchText && (
                        <>
                          <span className="absolute inset-0 text-red-500 glitch-1">
                            CARLOS
                          </span>
                          <span className="absolute inset-0 text-blue-500 glitch-2">
                            CARLOS
                          </span>
                        </>
                      )}
                    </h1>
                    <h1
                      className={`text-5xl md:text-7xl font-bold mb-6 relative ${
                        glitchText ? "glitch" : ""
                      }`}
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        color: "#39FF14",
                        textShadow:
                          "0 0 10px rgba(57, 255, 20, 0.7), 0 0 20px rgba(57, 255, 20, 0.5)",
                      }}
                    >
                      PANTIN
                      {glitchText && (
                        <>
                          <span className="absolute inset-0 text-red-500 glitch-1">
                            PANTIN
                          </span>
                          <span className="absolute inset-0 text-blue-500 glitch-2">
                            PANTIN
                          </span>
                        </>
                      )}
                    </h1>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  >
                    <h2
                      className="text-xl md:text-2xl font-bold text-blue-400 mb-4"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        textShadow: "0 0 8px rgba(59, 130, 246, 0.7)",
                      }}
                    >
                      <TypewriterText
                        text="SOFTWARE DEVELOPER"
                        delay={80}
                        startDelay={1600}
                      />
                    </h2>
                    <h2
                      className="text-xl md:text-xl font-bold text-yellow-400"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        textShadow: "0 0 8px rgba(59, 130, 246, 0.7)",
                      }}
                    >
                      <TypewriterText
                        text="Take a look and discover what makes me a skilful Software Developer"
                        delay={50}
                        startDelay={3000}
                      />
                    </h2>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-md bg-green-500 opacity-0"
                    animate={{
                      opacity: [0, 0.4, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />

                  <div className="absolute -top-8 -left-2 -right-2 flex justify-center overflow-hidden h-8">
                    {powerUpEffectsRef.current.map((effect) => (
                      <motion.div
                        key={effect.id}
                        className="h-2 w-2 rounded-full bg-green-400 mx-1"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{
                          y: [20, -10],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1,
                          delay: effect.delay,
                          repeat: Infinity,
                          repeatDelay: effect.repeatDelay,
                        }}
                      />
                    ))}
                  </div>

                  <motion.button
                    className="bg-transparent border-4 border-green-500 text-green-400 py-4 px-12 rounded-md text-xl md:text-2xl relative overflow-hidden group z-10"
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
                    <div className="relative z-20 flex items-center justify-center">
                      <span className="relative">START</span>
                      <motion.div
                        className="absolute -right-6 w-0.5 h-full bg-green-500"
                        animate={{
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                    </div>

                    <motion.div
                      className="absolute inset-0 bg-green-500 z-10 opacity-0"
                      whileHover={{ opacity: 0.2 }}
                    />

                    <motion.div
                      className="absolute inset-0 bg-green-500 z-0"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: "left" }}
                    />

                    <div className="absolute top-0 left-0 w-2 h-2 bg-green-500 opacity-80" />
                    <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 opacity-80" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 bg-green-500 opacity-80" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 opacity-80" />
                  </motion.button>
                </div>
              </motion.div>
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

        /* Glitch effect styles */
        .glitch {
          position: relative;
        }

        .glitch-1 {
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
          transform: translate(-2px, 2px);
        }

        .glitch-2 {
          clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%);
          transform: translate(2px, -2px);
        }
      `}</style>
    </div>
  );
}

interface TypewriterTextProps {
  text: string;
  delay?: number;
  startDelay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  delay = 100,
  startDelay = 0,
}) => {
  const [displayText, setDisplayText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [index, text, delay, started]);

  return (
    <span>
      {displayText}
      {index < text.length && (
        <span className="border-r-2 border-yellow-400 animate-blink">
          &nbsp;
        </span>
      )}
    </span>
  );
};
