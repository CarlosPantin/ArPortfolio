"use client";

import { useEffect, useState } from "react";
import RetroGameNavigation from "../components/RetroGameNavigation";

export default function AboutPage() {
  const [animationState, setAnimationState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationState((prev) => (prev + 1) % 2);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-center relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#00f 1px, transparent 1px), linear-gradient(90deg, #00f 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 z-0">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `2px`,
              height: `2px`,
              top: `${i * 10}%`,
              left: `${(i * 10) % 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start pt-10 px-4">
        <RetroGameNavigation />
        <div className="relative mb-8">
          <h1 className="text-5xl sm:text-6xl font-[Press Start 2P] text-white mb-2">
            CARLOS PANTIN
          </h1>
          <div
            className={`text-xl font-[Press Start 2P] text-yellow-300 mt-2 ${
              animationState === 1 ? "opacity-80" : "opacity-100"
            }`}
          >
            PLAYER 1
          </div>
        </div>

        <div className="relative flex flex-col items-center my-6">
          <div className="bg-purple-800 border-4 border-purple-600 rounded-xl p-6 relative">
            <div className="absolute top-0 left-0 w-full flex justify-between px-2 py-1">
              <div className="text-xs text-white font-[Press Start 2P]">
                SCORE: 9999
              </div>
              <div className="text-xs text-white font-[Press Start 2P]">
                LIVES: 3
              </div>
            </div>

            <div
              className="relative"
              style={{ transform: `translateX(${animationState * 5}px)` }}
            >
              <img
                src="/images/avatar.png"
                alt="Carlos Avatar"
                className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-4 border-cyan-400 shadow-lg shadow-cyan-500/50"
              />

              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-1">
                  <div className="w-3 h-10 bg-yellow-400 rounded-b-lg"></div>
                  <div className="w-4 h-14 bg-orange-500 rounded-b-lg"></div>
                  <div className="w-3 h-12 bg-red-500 rounded-b-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-blue-900 border-4 border-blue-400 p-6 rounded-lg relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 px-6 py-1 rounded-lg border-2 border-white">
              <span className="text-white font-[Press Start 2P] text-sm">
                ABOUT ME
              </span>
            </div>

            <p className="text-white font-mono mb-4 leading-relaxed text-left">
              <span className="text-yellow-300">[SYSTEM]</span> Initializing
              developer profile...
            </p>

            <p className="text-white font-mono mb-4 leading-relaxed text-left">
              Hello, I am <span className="text-green-400">Carlos Pantin</span>!
              I am a passionate developer with a love for creating interactive
              and user-friendly web applications.
            </p>

            <p className="text-white font-mono mb-4 leading-relaxed text-left">
              I enjoy working with technologies like{" "}
              <span className="text-cyan-300">React</span>,
              <span className="text-cyan-300"> Python</span>,{" "}
              <span className="text-cyan-300">C++</span>,
              <span className="text-cyan-300"> JavaScript</span> among others to
              build beautiful and responsive software applications.
            </p>

            <p className="text-white font-mono leading-relaxed text-left">
              When I am not coding, I love to learn more about new coding
              practices and I stay in
              <span className="text-green-400"> MAXIMUM HEALTH</span> mode by
              working out regularly. Feel free to explore my portfolio to see
              some of my recent projects!
            </p>

            <div className="mt-6 flex justify-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
