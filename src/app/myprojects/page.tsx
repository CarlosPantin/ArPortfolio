"use client";

import React, { useState, useRef } from "react";
import HTMLFlipBook from "react-pageflip"; 

// Project data
const projects = [
  { title: "Project 1", description: "This is Project 1." },
  { title: "Project 2", description: "This is Project 2." },
  { title: "Project 3", description: "This is Project 3." },
  { title: "Project 4", description: "This is Project 4." },
];

interface FlipEvent {
  data: number; 
}

export default function ProjectsBook() {
  const [currentPage, setCurrentPage] = useState(0);
  
  const bookRef = useRef<HTMLFlipBook>(null);

  const handleFlip = (e: FlipEvent) => {
    setCurrentPage(e.data); 
  };

  const goToNextPage = () => {
    if (bookRef.current) {
      const pageFlip = bookRef.current.pageFlip(); 
      pageFlip.flipNext(); 
    }
  };

  const goToPreviousPage = () => {
    if (bookRef.current) {
      const pageFlip = bookRef.current.pageFlip();
      pageFlip.flipPrev(); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="relative w-full max-w-4xl">
        <HTMLFlipBook
          ref={bookRef}
          width={window.innerWidth < 768 ? 300 : 600}  
          height={window.innerWidth < 768 ? 400 : 800} 
          className="shadow-2xl rounded-xl"
          showCover={true}
          flippingTime={1000}
          onFlip={handleFlip}
          startPage={0}
          size="fixed"
          minWidth={300}
          minHeight={400}
          maxWidth={1200}
          maxHeight={1600}
          drawShadow={true}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0.5}
          mobileScrollSupport={true}
          swipeDistance={30}
          clickEventForward={true}
          useMouseEvents={false} 
          style={{}}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {/* Front Cover */}
          <div className="flex bg-[url('/images/bookcover.jpg')] bg-cover bg-no-repeat items-center justify-center h-full rounded-xl">
            <h1 className="text-white text-4xl font-bold tracking-wide opacity-90">
              Welcome to My Projects
            </h1>
          </div>

          {/* Pages */}
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-[url('/images/paper.jpg')] bg-cover bg-no-repeat p-10 rounded-xl shadow-xl"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {project.title}
              </h2>
              <p className="text-lg text-gray-600">{project.description}</p>
            </div>
          ))}

          {/* Last Page */}
          <div
            className="flex items-center justify-center bg-[url('/images/bookcover.jpg')] bg-cover bg-no-repeat h-full rounded-xl"
            style={{
              display: currentPage === projects.length + 1 ? "flex" : "none", // Only show on last page
            }}
          >
            <h1 className="text-white text-4xl font-bold tracking-wide opacity-90">
              The End
            </h1>
          </div>
        </HTMLFlipBook>
      </div>

      <div className="flex space-x-4 mt-8">
        <button
          onClick={goToPreviousPage}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Previous Page
        </button>
        <button
          onClick={goToNextPage}
          className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 transition-colors duration-300"
        >
          Next Page
        </button>
      </div>

      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 text-white font-semibold text-xl">
        <p>Current Page: {currentPage}</p>
      </div>
    </div>
  );
}
