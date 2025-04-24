"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ArcadeLandingPage() {
  const router = useRouter();
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [insertCoin, setInsertCoin] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setInsertCoin(true);
    }, 2500);
  }, []);

  const handleInsertCoin = () => {
    setGlitchEffect(false);
    setTimeout(() => {
      setGlitchEffect(false);
      setInsertCoin(false);
    }, 500);
  };

  const handleSelectLevel = (level: number) => {
    router.push(`/level${level}`);
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${
        glitchEffect ? "animate-glitch" : ""
      }`}
      style={{
        background:
          "radial-gradient(circle at center, #2b1055 0%, #0f0930 100%)",
      }}
    >
      <div className="absolute inset-0 z-0">
        <div className="stars-container absolute inset-0" />
        <div
          className="grid-overlay absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(10,10,40,0.5) 1px, transparent 1px), linear-gradient(to right, rgba(10,10,40,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            transform: "perspective(500px) rotateX(60deg)",
          }}
        />
      </div>

      <div className="absolute inset-0 z-0 opacity-40">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/bgvideo.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
          }}
        />
      </div>

      {isLoading && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black">
          <h1
            className="text-4xl sm:text-6xl font-bold mb-8 text-cyan-400"
            style={{
              fontFamily: "'Press Start 2P', cursive",
              textShadow: "0 0 10px #00FFFF, 0 0 20px #00FFFF",
            }}
          >
            LOADING
          </h1>
          <div className="w-64 h-6 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 via-cyan-400 to-purple-600"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5 }}
            />
          </div>
        </div>
      )}
      {!isLoading && insertCoin && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center">
          <motion.div
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-yellow-300 leading-tight max-w-xs sm:max-w-md"
            style={{
              fontFamily: "'Press Start 2P', cursive",
              textShadow: "0 0 10px #FFD700, 0 0 20px #FFD700",
            }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            INSERT COIN
          </motion.div>
          <motion.button
            className="mt-8 sm:mt-12 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-yellow-500 text-black font-bold text-xl sm:text-2xl border-4 border-yellow-300 shadow-md"
            onClick={handleInsertCoin}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(255, 215, 0, 0.7)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            PLAY
          </motion.button>
        </div>
      )}

      {!isLoading && !insertCoin && (
        <div className="relative z-20 min-h-screen flex flex-col items-center justify-center">
          <div
            className="absolute inset-0 z-0 border-t-16 border-l-16 border-r-16 border-b-32 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 100px 20px rgba(0, 0, 0, 0.9)",
              borderImage: "linear-gradient(to bottom, #6b21a8, #3f007d) 1",
              borderWidth: "16px",
              borderBottomWidth: "64px",
            }}
          />

          <div className="absolute top-2 left-0 right-0 flex justify-center">
            <div className="flex space-x-8">
              <div
                className="w-8 h-8 rounded-full bg-red-600"
                style={{ boxShadow: "0 0 10px rgba(255, 0, 0, 0.7)" }}
              />
              <div
                className="w-8 h-8 rounded-full bg-blue-600"
                style={{ boxShadow: "0 0 10px rgba(0, 0, 255, 0.7)" }}
              />
              <div
                className="w-8 h-8 rounded-full bg-green-600"
                style={{ boxShadow: "0 0 10px rgba(0, 255, 0, 0.7)" }}
              />
            </div>
          </div>

          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1
              className="text-5xl sm:text-7xl font-bold mb-2"
              style={{
                fontFamily: "'Press Start 2P', cursive",
                background:
                  "linear-gradient(to right, #FF4500, #FFA500, #FFD700, #ADFF2F, #00FFFF, #0000FF, #9400D3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
              }}
            >
              CARLOS PANTIN
            </h1>
            <h2
              className="text-2xl sm:text-3xl font-bold text-pink-500 mt-4"
              style={{ textShadow: "0 0 10px rgba(255, 105, 180, 0.7)" }}
            >
              Welcome to my portfolio. Here, you can explore more about me and
              what makes me a great junior developer!
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-col space-y-6 mt-4 w-full max-w-xs"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.button
              className="py-4 px-12 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold text-xl rounded-lg border-4 border-green-300 shadow-lg"
              style={{ textShadow: "0 0 5px rgba(0, 0, 0, 0.5)" }}
              onClick={() => router.push("/level1")}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(0, 255, 128, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              START GAME
            </motion.button>

            <motion.button
              className="py-4 px-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl rounded-lg border-4 border-blue-300 shadow-lg"
              style={{ textShadow: "0 0 5px rgba(0, 0, 0, 0.5)" }}
              onClick={() => setShowLevelSelect(!showLevelSelect)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(0, 128, 255, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              SELECT LEVEL
            </motion.button>
          </motion.div>

          <div className="absolute bottom-6 flex justify-center w-full">
            <div className="flex items-center space-x-20"></div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showLevelSelect && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 border-4 border-indigo-600 rounded-xl p-8 w-11/12 max-w-md relative"
              style={{ boxShadow: "0 0 30px rgba(79, 70, 229, 0.6)" }}
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <div className="absolute -top-2 -right-2 -left-2 h-10 bg-indigo-700 rounded-t-lg flex items-center justify-between px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <button
                  onClick={() => setShowLevelSelect(false)}
                  className="text-white hover:text-red-300"
                >
                  ✕
                </button>
              </div>

              <h3
                className="text-2xl font-bold text-center mb-6 text-cyan-400 mt-6"
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  textShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
                }}
              >
                SELECT LEVEL
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((level) => (
                  <motion.button
                    key={level}
                    className="py-3 px-4 bg-indigo-900 hover:bg-indigo-700 text-white font-bold text-lg rounded border-2 border-indigo-500 flex flex-col items-center justify-center"
                    onClick={() => handleSelectLevel(level)}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 15px rgba(79, 70, 229, 0.6)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span style={{ fontFamily: "'Press Start 2P', cursive" }}>
                      LEVEL {level}
                    </span>
                    <div className="mt-2 text-xs text-cyan-300">
                      {level === 1 && "INTRO"}
                      {level === 2 && "SKILLS"}
                      {level === 3 && "PROJECTS"}
                      {level === 4 && "PROJECTS"}
                    </div>
                  </motion.button>
                ))}
              </div>

              <motion.button
                className="w-full mt-6 py-3 px-4 bg-red-800 hover:bg-red-700 text-white font-bold text-lg rounded border-2 border-red-500"
                onClick={() => setShowLevelSelect(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontFamily: "'Press Start 2P', cursive" }}
              >
                CANCEL
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");

        /* Star background effect */
        .stars-container {
          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.8) 1px,
            transparent 1px
          );
          background-size: 50px 50px;
          animation: stars-scroll 60s linear infinite;
        }

        @keyframes stars-scroll {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 1000px;
          }
        }

        /* Glitch animation */
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-5px, 5px);
          }
          40% {
            transform: translate(-5px, -5px);
          }
          60% {
            transform: translate(5px, 5px);
          }
          80% {
            transform: translate(5px, -5px);
          }
          100% {
            transform: translate(0);
          }
        }

        .animate-glitch {
          animation: glitch 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
