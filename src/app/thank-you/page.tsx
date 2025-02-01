"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white px-4 sm:px-6 md:px-8"
      style={{ backgroundImage: "url(/images/bg4.png)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8">
          Thank You for Playing!
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12">
          You have completed all the levels. Hope you enjoyed my game!
        </p>

        <div className="flex flex-col gap-4 sm:gap-6">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 w-full sm:w-auto max-w-xs mx-auto rounded-lg transition-all duration-300"
          >
            Main Menu
          </Link>

          <Link
            href="/contact"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 w-full sm:w-auto max-w-xs mx-auto rounded-lg transition-all duration-300"
          >
            Contact Me
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
