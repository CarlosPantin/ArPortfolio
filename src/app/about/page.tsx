"use client";

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-purple-900 text-center"
      style={{
        backgroundImage: "url(/images/about-background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl sm:text-6xl font-[Press Start 2P] text-white mb-6 sm:mb-8">
        CARLOS PANTIN!!!
      </h1>

      <div className="relative flex flex-col items-center">
        <div className="absolute bottom-[-80px] sm:bottom-[-100px] flex flex-col items-center">
          <div className="bg-pink-600 w-12 h-32 rounded-t-lg flex flex-col justify-center items-center relative">
            <div className="w-4 h-4 bg-white rounded-full absolute top-4"></div>
            <div className="w-3 h-3 bg-white rounded-full absolute top-10"></div>
          </div>

          <div className="flex gap-1 mt-2">
            <div className="w-3 h-6 bg-yellow-400 animate-flame"></div>
            <div className="w-3 h-8 bg-orange-500 animate-flame"></div>
            <div className="w-3 h-6 bg-yellow-400 animate-flame"></div>
          </div>
        </div>

        <img
          src="/images/avatar.png"
          alt="Your Avatar"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white z-10"
        />
      </div>

      <div className="bg-black bg-opacity-50 p-6 sm:p-8 mt-10 sm:mt-28 max-w-lg text-white rounded-lg">
        <p className="text-sm sm:text-base">
          Hello, I&apos;m Carlos Pantin. I&apos;m a passionate developer with a love for
          creating interactive and user-friendly web applications. I enjoy
          working with technologies like React, HTML, CSS, Javascript among
          others to build beautiful and responsive websites. When I&apos;m not
          coding, I love to learn more about new coding practices and I love to
          keep a healthy body with working out. Feel free to explore my
          portfolio to see some of my recent projects.
        </p>
      </div>

      <button
        onClick={() => router.push("/level2")}
        className="mt-8 px-6 py-3 sm:px-8 sm:py-4 bg-blue-500 text-white font-bold rounded-lg hover:scale-105 transform transition-transform"
      >
        Click Me to Enter Next Level
      </button>
    </div>
  );
}
