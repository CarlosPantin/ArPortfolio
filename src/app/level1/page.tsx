"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LevelPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [gameHints] = useState<string[]>([
    "Use arrow keys to navigate",
    "Press space to interact",
    "Collect all achievements",
    "Discover hidden easter eggs",
  ]);
  const [currentHint, setCurrentHint] = useState(0);

  useEffect(() => {
    if (isPlayerReady) {
      const hintInterval = setInterval(() => {
        setCurrentHint((prev) => (prev + 1) % gameHints.length);
      }, 3000);
      return () => clearInterval(hintInterval);
    }
  }, [isPlayerReady, gameHints]);

  useEffect(() => {
    if (isPlayerReady && countdown === null) {
      setCountdown(3);
    }

    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      const timer = setTimeout(() => {
        router.push("/about");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerReady, countdown, router]);

  const handleStartLevel = () => {
    setIsPlayerReady(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden relative bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at center, #200933 0%, #090418 100%)",
          overflow: "hidden",
        }}
      >
        <div
          className="absolute inset-0 grid-lines"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(137, 43, 226, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(137, 43, 226, 0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "center",
            animation: "grid-move 15s linear infinite",
          }}
        />
        <div className="absolute inset-0 opacity-10 pointer-events-none scanlines" />
        <div className="absolute top-10 right-10 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-b from-purple-700 to-purple-900 rounded-full opacity-50 glow-effect" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url(/images/bg4.png)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto px-4">
        <motion.div
          className="mb-8 md:mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative inline-block">
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
              style={{
                fontFamily: "'Press Start 2P', cursive",
                textShadow:
                  "0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(236, 72, 153, 0.5)",
              }}
            >
              LEVEL 1
            </h1>
            <div className="absolute -top-2 -right-2 w-3 h-3 md:w-4 md:h-4 bg-pink-500 rounded-full animate-pulse" />
            <div
              className="absolute -bottom-2 -left-2 w-3 h-3 md:w-4 md:h-4 bg-purple-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          <div className="flex items-center justify-center mt-4 md:mt-6">
            <h2
              className="text-lg sm:text-xl md:text-3xl font-bold text-cyan-400"
              style={{ textShadow: "0 0 10px rgba(34, 211, 238, 0.7)" }}
            >
              ᐅ KNOW ABOUT ME
            </h2>
            <div className="w-2 h-4 md:w-3 md:h-6 bg-cyan-400 ml-2 animate-blink" />
          </div>
        </motion.div>

        <motion.div
          className="w-full max-w-lg mb-8 md:mb-12 aspect-video relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-lg border-2 border-purple-800" />
          <div className="absolute inset-2 flex items-center justify-center overflow-hidden rounded">
            <div className="absolute inset-0 scan-effect" />
          </div>

          <div className="absolute -bottom-4 md:-bottom-5 left-4 right-4 md:left-10 md:right-10 bg-gradient-to-r from-purple-900/90 to-indigo-900/90 py-2 md:py-3 px-3 md:px-6 rounded-lg border border-purple-700 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs text-cyan-300">DIFFICULTY</span>
              <div className="flex mt-1">
                <div className="w-3 h-1.5 md:w-4 md:h-2 bg-green-500 mr-1 rounded-sm" />
                <div className="w-3 h-1.5 md:w-4 md:h-2 bg-green-500 mr-1 rounded-sm" />
                <div className="w-3 h-1.5 md:w-4 md:h-2 bg-gray-600 mr-1 rounded-sm" />
                <div className="w-3 h-1.5 md:w-4 md:h-2 bg-gray-600 mr-1 rounded-sm" />
                <div className="w-3 h-1.5 md:w-4 md:h-2 bg-gray-600 rounded-sm" />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xs text-cyan-300">EXP</span>
              <span className="text-base md:text-lg font-bold text-yellow-400">+500</span>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-xs text-cyan-300">TIME</span>
              <span className="text-base md:text-lg font-bold text-white">3:00</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center mb-6 md:mb-8 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-block bg-gradient-to-r from-purple-900/70 to-indigo-900/70 py-3 md:py-4 px-4 md:px-6 rounded-lg border border-purple-700">
            <p className="text-sm sm:text-base md:text-lg text-cyan-50">
              Discover the origins of{" "}
              <span className="text-pink-400 font-bold">Carlos Pantin</span>,
              their skills, experience, and what drives their passion for
              development. Complete this level to learn more!
            </p>
          </div>
        </motion.div>

        {!isPlayerReady ? (
          <motion.button
            className="relative group"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.9, type: "spring" }}
            onClick={handleStartLevel}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-300 group-hover:duration-200" />
            <div className="relative px-6 md:px-12 py-3 md:py-5 bg-black rounded-lg leading-none flex items-center">
              <span className="text-xl md:text-2xl font-bold text-white border-r border-pink-500 pr-3 md:pr-4">
                READY
              </span>
              <span className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 pl-3 md:pl-4">
                PLAYER 1
              </span>
            </div>
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {typeof countdown === "number" && countdown > 0 ? (
              <div
                className="text-6xl md:text-8xl font-bold text-pink-500"
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  textShadow: "0 0 15px rgba(236, 72, 153, 0.9)",
                }}
              >
                {countdown}
              </div>
            ) : (
              <div
                className="text-4xl md:text-5xl font-bold text-green-500"
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  textShadow: "0 0 15px rgba(34, 197, 94, 0.9)",
                }}
              >
                GO!
              </div>
            )}
          </motion.div>
        )}

        {isPlayerReady && (
          <div className="fixed bottom-4 md:bottom-6 left-0 right-0 flex justify-center pointer-events-none">
            <motion.div
              className="bg-black/70 border border-purple-700 px-4 md:px-8 py-2 md:py-3 rounded-full max-w-[90%]"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-cyan-300 text-xs sm:text-sm">
                <span className="text-pink-400 font-bold">TIP:</span>{" "}
                {gameHints[currentHint]}
              </p>
            </motion.div>
          </div>
        )}

        <div className="fixed top-3 md:top-6 left-3 md:left-6 flex items-center space-x-1 md:space-x-2 opacity-70">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-pink-500 rounded-full animate-pulse" />
          <span className="text-pink-400 text-xs uppercase">LIVE</span>
        </div>
        <div className="fixed top-3 md:top-6 right-3 md:right-6 flex items-center space-x-1 md:space-x-2 opacity-70">
          <span className="text-cyan-400 text-xs uppercase">HP</span>
          <div className="w-16 md:w-20 h-1.5 md:h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-green-500 to-cyan-400" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

        @keyframes grid-move {
          0% {
            background-position: 0px 0px;
          }
          100% {
            background-position: 0px 1000px;
          }
        }

        .scanlines {
          background: repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.05),
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 2px
          );
        }

        .scan-effect {
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(137, 43, 226, 0.2),
            transparent
          );
          background-size: 100% 30%;
          background-repeat: no-repeat;
          animation: scan 2s linear infinite;
        }

        @keyframes scan {
          0% {
            background-position: 0 -100%;
          }
          100% {
            background-position: 0 200%;
          }
        }

        .glow-effect {
          box-shadow: 0 0 40px 10px rgba(137, 43, 226, 0.4);
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
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </div>
  );
}