"use client";

import { useState, useEffect, useMemo } from "react";
import ReactCardFlip from "react-card-flip";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const initialProjects = [
  {
    id: 1,
    name: "ToDo App",
    description:
      "Simple ToDo app. The user can add, delete, edit and mark as done tasks of their choice!",
    frontImage: "/images/card1.png",
    backImage: "/images/card-back1.png",
    stacks: "React, CSS, HTML",
    github: "https://github.com/CarlosPantin/todoproject",
    liveSite: "https://todoproject-coral.vercel.app/",
  },
  {
    id: 2,
    name: "Weather App",
    description:
      "It happens to me that when I want to check the weather on my phone, the apps take a bit to load and have ads, so I decided to make my own!",
    frontImage: "/images/card4.png",
    backImage: "/images/card-back2.png",
    stacks: "React, Node, CSS",
    github: "https://github.com/CarlosPantin/my-weather-app",
    liveSite: "https://weatherapp-self-two.vercel.app/",
  },
  {
    id: 3,
    name: "TicTacToe",
    description:
      "My girlfriend suggested that I make a TicTacToe game that we can use together, so I made one! It's a simple local TicTacToe game.",
    frontImage: "/images/card3.png",
    backImage: "/images/card-back3.png",
    stacks: "React, CSS",
    github: "https://github.com/CarlosPantin/tic-tac-toe",
    liveSite: "https://tic-tac-toe-cp.vercel.app/",
  },
  {
    id: 4,
    name: "Spotify Info",
    description:
      "I created an app in which the user can see their top artists, top songs and some data of their profile info all year long using spotify API.",
    frontImage: "/images/card1.png",
    backImage: "/images/card-back1.png",
    stacks: "React, Node, CSS",
    github: "https://github.com/CarlosPantin/spotify-app",
    liveSite: "https://www.youtube.com/watch?v=xsWV8AcXar8",
  },
  {
    id: 5,
    name: "CatCare",
    description:
      "A platform in which the user can manage all the needs of their cats.",
    frontImage: "/images/card4.png",
    backImage: "/images/card-back2.png",
    stacks: "In development",
    github: "",
    liveSite: "",
  },
  {
    id: 6,
    name: "My Portfolio",
    description: "A unique portfolio to show my skills and relevant material.",
    frontImage: "/images/card3.png",
    backImage: "/images/card-back3.png",
    stacks: "TypeScript, TailwindCSS",
    github: "https://github.com/CarlosPantin/ArPortfolio",
    liveSite: "https://carlospantinportfolio.vercel.app/",
  },
  {
    id: 7,
    name: "Client's Portfolio",
    description: "Freelanced a finnish customer a website portfolio.",
    frontImage: "/images/card1.png",
    backImage: "/images/card-back1.png",
    stacks: "TypeScript, TailwindCSS",
    github: "https://github.com/CarlosPantin/jessika-tyni-website",
    liveSite: "https://jessika-tyni-portfolio.vercel.app/",
  },
];

export default function RPGFlippableCards() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isShuffling, setIsShuffling] = useState(true);

  const projects = useMemo(() => {
    return [...initialProjects].sort(() => Math.random() - 0.5);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsShuffling(false);
    }, 1500);
  }, []);

  const handleFlip = (id: number) => {
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/spaceback.jpg')" }}
    >
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white my-8 text-center">
        Character&apos;s Starting Inventory
      </h1>

      <div className="flex flex-wrap justify-center items-center gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{
              x: isShuffling ? (Math.random() > 0.5 ? -200 : 200) : 0,
              y: isShuffling ? (Math.random() > 0.5 ? -200 : 200) : 0,
              opacity: 0,
            }}
            animate={{
              x: 0,
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            <ReactCardFlip
              isFlipped={flippedCards.includes(project.id)}
              flipDirection="horizontal"
            >
              {/* Front Side */}
              <div
                onClick={() => handleFlip(project.id)}
                className="w-64 h-96 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform relative overflow-hidden"
                style={{
                  backgroundImage: `url('${project.frontImage}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-2">
                  <h2 className="text-xs font-semibold leading-tight">
                    {project.name}
                  </h2>
                </div>
              </div>

              {/* Back Side */}
              <div
                onClick={() => handleFlip(project.id)}
                className="w-64 h-96 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform relative overflow-hidden bg-gray-900 text-white p-4"
                style={{
                  backgroundImage: project.backImage
                    ? `url('${project.backImage}')`
                    : undefined,
                  backgroundSize: project.backImage ? "cover" : undefined,
                  backgroundPosition: project.backImage ? "center" : undefined,
                }}
              >
                <h2 className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-2 mt-20 text-s">
                  {project.name}
                </h2>

                <p className="absolute top-4 left-10 right-10 text-xs text-center p-2">
                  {project.description}
                </p>

                <p className="absolute bottom-9 left-0 right-0 text-s text-center p-2">
                  {project.stacks}
                </p>

                <div className="absolute bottom-16 left-0 right-0 flex justify-around space-x-4 p-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white py-2 px-4 rounded-full text-sm flex items-center justify-center space-x-2 transition-all duration-200"
                  >
                    <FaGithub className="h-5 w-5 translate-x-3.5 -translate-y-4" />
                  </a>
                  <a
                    href={project.liveSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white py-2 px-4 rounded-full text-sm flex items-center justify-center space-x-2 transition-all duration-200"
                  >
                    <FaExternalLinkAlt className="h-5 w-5 -translate-x-2.5 -translate-y-4" />
                  </a>
                </div>
              </div>
            </ReactCardFlip>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
