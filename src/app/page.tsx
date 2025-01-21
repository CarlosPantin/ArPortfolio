"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();
  const [showLevelList, setShowLevelList] = useState(false);

  const handleSelectLevel = (level: number) => {
    router.push(`/level${level}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black text-center"
      style={{
        backgroundImage: "url(/images/bg3.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl sm:text-6xl font-[Press Start 2P] text-white">
        WELCOME
      </h1>

      <p className="mt-4 text-lg sm:text-xl text-white">
        Press Start to Begin Or Select a Level
      </p>

      <div className="mt-8">
        <button
          className="px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-bold text-black bg-pink-400 border-4 border-pink-600 rounded-lg hover:scale-110 transition-transform"
          onClick={() => router.push("/level")}
        >
          Start
        </button>
      </div>

      <div className="mt-6">
        <button
          className="px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-bold text-black bg-blue-400 border-4 border-blue-600 rounded-lg hover:scale-110 transition-transform"
          onClick={() => setShowLevelList(!showLevelList)}
        >
          Select Level
        </button>
      </div>

      {showLevelList && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black p-6 rounded-lg shadow-lg z-10"
          style={{ width: "300px" }}
        >
          <h3 className="text-xl font-bold text-center mb-4">Select a Level</h3>
          <ul className="space-y-4">
            {[1, 2, 3, 4].map((level) => (
              <li key={level}>
                <button
                  onClick={() => handleSelectLevel(level)}
                  className="w-full text-center text-lg text-blue-600 border-2 border-blue-600 py-2 px-4 rounded-lg hover:bg-blue-600 hover:text-white transition-transform"
                >
                  Level {level}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowLevelList(false)}
            className="w-full mt-4 text-center text-lg text-red-600 border-2 border-red-600 py-2 px-4 rounded-lg hover:bg-red-600 hover:text-white transition-transform"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
