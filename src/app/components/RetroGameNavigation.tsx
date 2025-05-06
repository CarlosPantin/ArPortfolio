import { useState, useEffect, SetStateAction } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RetroGameNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [blinking, setBlinking] = useState(false);

  const navItems = [
    { path: "/", label: "HOME", icon: "🏠" },
    { path: "/about", label: "ABOUT", icon: "📊" },
    { path: "/skills", label: "SKILLS", icon: "⚔️" },
    { path: "/lore", label: "BACKGROUND", icon: "📜" },
    { path: "/myprojects", label: "PROJECTS", icon: "🛡️" },
    { path: "/contact", label: "CONTACT", icon: "✉️" },
  ];

  useEffect(() => {
    const currentIndex = navItems.findIndex((item) => item.path === pathname);
    if (currentIndex >= 0) {
      setSelectedItem(currentIndex);
    }

    const interval = setInterval(() => {
      setBlinking((prev) => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, [pathname]);

  const navigateTo = (path: string, index: SetStateAction<number>) => {
    setSelectedItem(index);
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-95 border-t-2 border-cyan-600 md:hidden">
        <div className="flex justify-around items-center">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigateTo(item.path, index)}
              className={`flex flex-col items-center py-3 px-2 w-1/6 relative transition-all ${
                selectedItem === index ? "text-cyan-300" : "text-gray-400"
              }`}
            >
              {selectedItem === index && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full"></div>
              )}

              <span className="text-lg mb-1">{item.icon}</span>

              {selectedItem === index && (
                <span className="text-[8px] font-['Press Start 2P'] text-yellow-300 mt-1">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5"
              style={{
                left: `${i * 5}%`,
                width: "4%",
                backgroundColor:
                  i % 2 === 0 ? "rgb(8, 145, 178)" : "rgb(6, 182, 212)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="fixed top-0 left-0 right-0 z-40 hidden md:block">
        <div className="bg-gray-900 bg-opacity-90 border-b-2 border-cyan-600 px-6 py-3 flex justify-center items-center shadow-lg shadow-cyan-900/20">
          <div className="absolute left-4 font-['Press Start 2P'] text-xs text-cyan-300 flex items-center">
            <div
              className={`w-2 h-2 mr-2 rounded-full ${
                blinking ? "bg-cyan-400" : "bg-cyan-800"
              }`}
            ></div>
            <span>DEV_QUEST</span>
          </div>

          <div className="flex space-x-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => navigateTo(item.path, index)}
                className={`px-5 py-2 relative group transition-all duration-200 ${
                  selectedItem === index
                    ? "text-yellow-300"
                    : "text-cyan-100 hover:text-white"
                }`}
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-cyan-500 transform origin-left transition-transform duration-300 ${
                    selectedItem === index
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></div>

                <div className="flex flex-col items-center">
                  <span className="text-lg mb-1">{item.icon}</span>
                  <span className="font-['Press Start 2P'] text-xs whitespace-nowrap">
                    {item.label}
                  </span>

                  {selectedItem === index && (
                    <span
                      className={`absolute -bottom-1 text-yellow-400 text-xs ${
                        blinking ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      ▲
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="absolute right-4 bg-gray-800 px-3 py-1 rounded border border-cyan-700">
            <div className="text-[10px] font-['Press Start 2P'] text-cyan-400">
              <span className="mr-1">LVL:</span>
              <span className="text-yellow-300">{selectedItem + 1}</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="fixed inset-0 pointer-events-none z-50 bg-blue-900 opacity-0 transition-opacity duration-500"
        style={{ opacity: 0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        ></div>
      </div>

      <div className="block md:hidden h-16"></div>
      <div className="hidden md:block h-20"></div>
    </>
  );
}
