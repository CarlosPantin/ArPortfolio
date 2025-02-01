"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url(/images/bg4.png)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8">
          Thank You for Playing!
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-12">
          You have completed all the levels. Hope you enjoyed my game!!!!!
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Main Menu
          </Link>

          <Link
            href="/contact"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
          >
            Contact Me
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
