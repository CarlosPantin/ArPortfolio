"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function LevelPage() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black text-center"
      style={{
        backgroundImage: "url(/images/bg4.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="text-4xl sm:text-6xl font-[Press Start 2P] text-pink-400"
      >
        LEVEL 1
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="mt-4 text-lg sm:text-xl text-white"
      >
        Know About Me
      </motion.p>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "backOut", delay: 1 }}
        className="mt-8 px-8 sm:px-10 py-3 sm:py-4 text-lg sm:text-xl font-bold text-white bg-purple-700 border-4 border-pink-400 rounded-lg shadow-lg hover:scale-110 transition-transform"
        onClick={() => router.push("/about")}
      >
        Start
      </motion.button>
    </div>
  );
}
