// 'use client'

// import { createContext, useContext, useEffect, useState } from "react";

// type ScrollContextType = {
//   scrollY: number;
//   scrolled: boolean;
// };

// const ScrollContext = createContext<ScrollContextType | null>(null);

// export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
//   const [scrollY, setScrollY] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollY(document.documentElement.scrollTop);
//     };

//     document.addEventListener("scroll", handleScroll, { passive: true });

//     handleScroll();

//     return () => {
//       document.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <ScrollContext.Provider
//       value={{
//         scrollY,
//         scrolled: scrollY > 50,
//       }}
//     >
//       {children}
//     </ScrollContext.Provider>
//   );
// };

// export const useScroll = () => {
//   const context = useContext(ScrollContext);
//   if (!context) throw new Error("useScroll must be used inside ScrollProvider");
//   return context;
// };

'use client'

import { createContext, useContext, useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down";

type ScrollContextType = {
  scrollY: number;
  scrolled: boolean;
  scrollDirection: ScrollDirection;
  isHeaderVisible: boolean;
};

const ScrollContext = createContext<ScrollContextType | null>(null);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("up");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Detect direction
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down");
        if (currentScrollY > 80) {
          setIsHeaderVisible(false);
        }
      } else {
        setScrollDirection("up");
        setIsHeaderVisible(true);
      }

      lastScrollY.current = currentScrollY;
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        scrollY,
        scrolled: scrollY > 50,
        scrollDirection,
        isHeaderVisible,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) throw new Error("useScroll must be used inside ScrollProvider");
  return context;
};