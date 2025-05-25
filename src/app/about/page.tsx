"use client";

import { useEffect, useState, useRef } from "react";
import RetroGameNavigation from "../components/RetroGameNavigation";

interface MatrixChar {
  char: string;
  y: number;
  speed: number;
}

interface MatrixColumn {
  x: number;
  chars: MatrixChar[];
}

export default function AboutPage() {
  const [animationState, setAnimationState] = useState(0);
  const [scanlinePos, setScanlinePos] = useState(0);
  const [cursorBlink, setCursorBlink] = useState(true);
  const [terminalText, setTerminalText] = useState("");
  const [bootSequence, setBootSequence] = useState(0);
  const fullText = "C:\\> LOADING DEVELOPER PROFILE... COMPLETE";
  const terminalRef = useRef<HTMLDivElement>(null);

  const [matrixRows, setMatrixRows] = useState<MatrixColumn[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (terminalText.length < fullText.length) {
      const timer = setTimeout(() => {
        setTerminalText(fullText.substring(0, terminalText.length + 1));
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [terminalText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState((prev) => (prev + 1) % 2);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanlinePos((prev) => (prev + 1) % 100);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bootSequence < 100) {
      const timer = setTimeout(() => {
        setBootSequence((prev) => Math.min(prev + 5, 100));
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [bootSequence]);

  useEffect(() => {
    if (isClient) {
      const matrixColumns = window.innerWidth < 640 ? 10 : 20;
      const newMatrixRows = Array.from({ length: matrixColumns }, (_, i) => ({
        x: (i * 100) / matrixColumns,
        chars: Array.from({ length: 5 }, () => ({
          char: String.fromCharCode(33 + Math.floor(Math.random() * 93)),
          y: Math.random() * 100,
          speed: 0.2 + Math.random() * 0.3,
        })),
      }));
      setMatrixRows(newMatrixRows);

      const handleResize = () => {
        const columns = window.innerWidth < 640 ? 10 : 20;
        setMatrixRows((prevRows) => {
          if (prevRows.length === columns) return prevRows;

          return Array.from({ length: columns }, (_, i) => ({
            x: (i * 100) / columns,
            chars: Array.from({ length: 5 }, () => ({
              char: String.fromCharCode(33 + Math.floor(Math.random() * 93)),
              y: Math.random() * 100,
              speed: 0.2 + Math.random() * 0.3,
            })),
          }));
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isClient]);

  return (
    <div className="min-h-screen bg-black text-center relative overflow-hidden">
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-transparent opacity-10"
          style={{
            backgroundSize: "100% 4px",
            backgroundRepeat: "repeat",
          }}
        />
        <div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30"
          style={{ top: `${scanlinePos}%` }}
        />
        <div className="absolute inset-0 rounded-3xl shadow-[inset_0_0_100px_rgba(0,0,0,0.9)]" />
        <div className="absolute inset-0 bg-cyan-900 opacity-5 animate-[flicker_30s_infinite]" />
      </div>

      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#0af 1px, transparent 1px), linear-gradient(90deg, #0af 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "center",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "center center",
        }}
      />

      {isClient && (
        <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
          {matrixRows.map((column, i) => (
            <div
              key={i}
              className="absolute top-0 text-green-500"
              style={{ left: `${column.x}%` }}
            >
              {column.chars.map((char, j) => (
                <div
                  key={j}
                  className="absolute text-sm font-mono"
                  style={{
                    top: `${char.y}%`,
                    opacity: 0.6,
                    color: j === 0 ? "#7ffa7f" : "#00ff00",
                    animation: `fall ${10 / char.speed}s linear infinite`,
                    animationDelay: `-${j}s`,
                  }}
                >
                  {char.char}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-start pt-6 px-4 w-full max-w-full mx-auto">
        <RetroGameNavigation />

        <div
          className="fixed inset-0 z-30 bg-black flex flex-col items-center justify-center transition-opacity duration-1000"
          style={{
            opacity: bootSequence >= 100 ? 0 : 1,
            pointerEvents: bootSequence >= 100 ? "none" : "auto",
          }}
        >
          <div className="w-64 h-4 bg-gray-800 border border-green-500 mb-4">
            <div
              className="h-full bg-green-500 transition-all duration-100 ease-linear"
              style={{ width: `${bootSequence}%` }}
            />
          </div>
          <div className="font-mono text-green-500">
            SYSTEM BOOT: {bootSequence}%
          </div>
          <div className="mt-4 font-mono text-xs text-green-500">
            INITIALIZING CARLOS.EXE
          </div>
        </div>

        <div className="relative mb-6">
          <div className="glitch-container">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-[monospace] text-cyan-400 mb-2 glitch-text tracking-tight">
              CARLOS PANTIN
            </h1>
          </div>
          <div
            className={`text-sm sm:text-xl font-mono text-green-400 mt-2 flex justify-center items-center flex-wrap ${
              cursorBlink ? "opacity-100" : "opacity-80"
            }`}
          >
            <span className="mr-1 text-cyan-300">SYS&gt;</span>
            <span className="typing-animation">{terminalText}</span>
            <span
              className={`ml-1 ${cursorBlink ? "opacity-100" : "opacity-0"}`}
            >
              _
            </span>
          </div>
        </div>

        <div className="relative flex flex-col items-center my-4 sm:my-6">
          <div className="bg-gray-900 border-2 sm:border-4 border-cyan-600 rounded-xl p-3 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-cyan-800 flex justify-between px-2 py-1">
              <div className="text-xs text-black font-mono font-bold">
                CARLOS.EXE
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
              </div>
            </div>

            <div
              className="relative mt-6"
              style={{
                transform: `translateY(${animationState * 3}px)`,
                filter: `hue-rotate(${
                  animationState * 5
                }deg) drop-shadow(0 0 5px #0ff)`,
              }}
            >
              <img
                src="/images/avatar.png"
                alt="Carlos Avatar"
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full border-2 sm:border-4 border-cyan-400 shadow-lg"
              />

              <div
                className="absolute inset-0 w-full h-full rounded-full border border-blue-400 opacity-50"
                style={{
                  animation: "orbit 8s linear infinite",
                  transformOrigin: "center center",
                }}
              />
              <div
                className="absolute inset-0 w-full h-full rounded-full border border-green-400 opacity-50"
                style={{
                  animation: "orbit 12s linear infinite reverse",
                  transformOrigin: "center center",
                  width: "110%",
                  height: "110%",
                  top: "-5%",
                  left: "-5%",
                }}
              />

              <div className="absolute -top-3 -right-3 flex space-x-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    animationState === 0 ? "bg-green-500" : "bg-green-800"
                  }`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    animationState === 1 ? "bg-red-500" : "bg-red-800"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full max-w-4xl mx-auto">
          <div className="bg-gray-900 border-2 border-cyan-500 p-3 sm:p-6 rounded-lg relative shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <div className="absolute top-0 left-0 w-full bg-gray-800 flex justify-between px-2 py-1 border-b border-cyan-500">
              <div className="text-xs text-cyan-400 font-mono">profile.dat</div>
              <div className="flex space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    animationState === 0 ? "bg-green-500" : "bg-green-800"
                  }`}
                  title="System active"
                ></div>
                <div className="text-xs text-cyan-400 font-mono">
                  {isClient ? new Date().toLocaleDateString() : "Loading..."}
                </div>
              </div>
            </div>

            <div className="pt-4" ref={terminalRef}>
              <p className="text-green-400 font-mono mb-4 leading-relaxed text-left text-sm sm:text-base">
                <span className="text-cyan-300">SYSTEM&gt;</span> Initializing
                developer profile...
              </p>

              <div className="flex flex-col gap-4">
                <div className="w-full">
                  <p className="text-white font-mono mb-4 leading-relaxed text-left opacity-90 text-sm sm:text-base">
                    <span className="text-yellow-300">$</span> Hello, I am{" "}
                    <span className="text-green-400">Carlos Pantin</span>! I am
                    a passionate developer with a love for creating interactive
                    and user-friendly web applications.
                  </p>

                  <p className="text-white font-mono mb-4 leading-relaxed text-left opacity-90 text-sm sm:text-base">
                    <span className="text-yellow-300">$</span> I enjoy working
                    with technologies like{" "}
                    <span className="text-cyan-300">React</span>,
                    <span className="text-cyan-300"> Python</span>,{" "}
                    <span className="text-cyan-300">C++</span>,
                    <span className="text-cyan-300"> JavaScript</span> among
                    others to build beautiful and responsive software
                    applications.
                  </p>

                  <p className="text-white font-mono mb-4 leading-relaxed text-left opacity-90 text-sm sm:text-base">
                    <span className="text-yellow-300">$</span> When I am not
                    coding, I love to learn more about new coding practices and
                    I stay in
                    <span className="text-green-400">
                      {" "}
                      PEAK_PERFORMANCE
                    </span>{" "}
                    mode by working out regularly. Feel free to explore my
                    portfolio to see some of my recent projects!
                  </p>
                </div>

                <div className="w-full border-t md:border-l md:border-t-0 border-cyan-800 pt-4 md:pt-0 md:pl-4">
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-cyan-500 mr-2"></div>
                      <h3 className="text-cyan-300 font-mono uppercase text-sm">
                        Achievement Database
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          id: 6,
                          year: "2025",
                          title:
                            "Software Engineering Master Degree - University of Oulu",
                          status: "IN PROGRESS",
                          color: "yellow",
                        },
                        {
                          id: 1,
                          year: "2025",
                          title:
                            "Admitted into a Software Engineering Master's Degree",
                          status: "COMPLETE",
                          color: "green",
                        },
                        {
                          id: 2,
                          year: "2024",
                          title: "Bachelors in Computer Science",
                          status: "COMPLETE",
                          color: "green",
                        },
                        {
                          id: 3,
                          year: "2022",
                          title: "Frontend Certification",
                          status: "COMPLETE",
                          color: "green",
                        },
                        {
                          id: 4,
                          year: "2021",
                          title: "Participated in a 2 day Hackathon",
                          status: "COMPLETE",
                          color: "green",
                        },
                      ].map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`border border-${achievement.color}-500 bg-gray-800 bg-opacity-60 p-2 text-left`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-mono text-yellow-400">
                              {achievement.year}
                            </span>
                            <span
                              className={`text-xs font-mono text-${achievement.color}-400`}
                            >
                              {achievement.status}
                            </span>
                          </div>
                          <div className="text-xs sm:text-sm font-mono text-white mt-1">
                            {achievement.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <div className="w-3 h-3 bg-purple-500 mr-2"></div>
                      <h3 className="text-purple-300 font-mono uppercase text-sm">
                        Skills Preview
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {[
                        { name: "Frontend Development", level: 90 },
                        { name: "Backend Development", level: 90 },
                        { name: "Data Structures", level: 80 },
                        { name: "UI/UX Design", level: 70 },
                        { name: "Agile", level: 90 },
                        { name: "DevOps", level: 60 },
                      ].map((skill, index) => (
                        <div key={index} className="text-left">
                          <div className="flex justify-between text-xs font-mono mb-1">
                            <span className="text-white">{skill.name}</span>
                            <span className="text-cyan-400">
                              {skill.level}/100
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 h-2 rounded-sm overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
                              style={{
                                width: `${skill.level}%`,
                                animation: cursorBlink
                                  ? "pulse 2s infinite"
                                  : "none",
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-cyan-800 pt-4">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-green-500 mr-2"></div>
                  <h3 className="text-green-300 font-mono uppercase text-sm">
                    Current Projects
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    {
                      name: "Whiskr Platform",
                      description: "Platform to manage all of your pet's needs",
                      status: "IN_PROGRESS",
                    },
                    {
                      name: "Tech StartUp",
                      description:
                        "Co-Founding my own Startup focused on building applications to help out on your day to day life!",
                      status: "IN_PROGRESS",
                    },
                  ].map((project, index) => (
                    <div
                      key={index}
                      className="border border-gray-700 p-2 text-left bg-gray-800 bg-opacity-40"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-cyan-400 font-mono text-xs sm:text-sm">
                          {project.name}
                        </span>
                        <span
                          className={`text-xs px-1 font-mono ${
                            project.status === "IN_PROGRESS"
                              ? "text-yellow-400"
                              : project.status === "ONGOING"
                              ? "text-green-400"
                              : project.status === "PLANNING"
                              ? "text-blue-400"
                              : "text-purple-400"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="text-white text-xs font-mono mt-1 opacity-80">
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-cyan-800 pt-4">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-red-500 mr-2"></div>
                  <h3 className="text-red-300 font-mono uppercase text-sm">
                    Contact Protocols
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 justify-start">
                  {[
                    { icon: "📧", label: "EMAIL", value: "cpantin00@gmail.com" },
                    {
                      icon: "🌐",
                      label: "WEBSITE",
                      value: "carlospantinportfolio.vercel.app",
                    },
                    {
                      icon: "💼",
                      label: "LINKEDIN",
                      value: "linkedin.com/in/carlospantinp",
                    },
                    {
                      icon: "🐙",
                      label: "GITHUB",
                      value: "github.com/CarlosPantin",
                    },
                  ].map((contact, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 px-2 py-1 rounded border border-gray-700 flex items-center text-xs sm:text-sm"
                    >
                      <span className="mr-1">{contact.icon}</span>
                      <div className="text-left">
                        <div className="text-xs text-gray-400 font-mono">
                          {contact.label}
                        </div>
                        <div className="text-xs sm:text-sm text-cyan-300 font-mono truncate max-w-32 sm:max-w-full">
                          {contact.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-white font-mono mt-6 text-left flex items-center">
                <span className="text-cyan-300">C:\CARLOS&gt;</span>
                <span
                  className={`ml-1 inline-block w-2 h-4 bg-white ${
                    cursorBlink ? "opacity-100" : "opacity-0"
                  }`}
                ></span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes orbit {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes flicker {
          0%,
          19.999%,
          22%,
          62.999%,
          64%,
          64.999%,
          70%,
          100% {
            opacity: 0.05;
          }
          20%,
          21.999%,
          63%,
          63.999%,
          65%,
          69.999% {
            opacity: 0.2;
          }
        }

        @keyframes fall {
          0% {
            transform: translateY(-100px);
          }
          100% {
            transform: translateY(2000px);
          }
        }

        @keyframes glitch {
          0%,
          91% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-2px, -2px);
          }
          20% {
            transform: translate(2px, 2px);
          }
          30%,
          70% {
            transform: translate(0, 0);
          }
          40% {
            transform: translate(2px, -2px);
          }
          50% {
            transform: translate(-2px, 2px);
          }
          60% {
            transform: translate(0, 0);
          }
          80% {
            transform: translate(-2px, 2px);
          }
          90% {
            transform: translate(2px, -2px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        .typing-animation {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid transparent;
        }

        /* Mobile responsive adjustments */
        @media (max-width: 640px) {
          .glitch-text {
            font-size: 1.75rem;
            line-height: 1.2;
          }

          .typing-animation {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}
