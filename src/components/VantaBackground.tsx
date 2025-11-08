"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Initialize Vanta.js BIRDS effect with subtle settings
    if (vantaRef.current && typeof window !== "undefined") {
      try {
        // @ts-ignore - Vanta is loaded via CDN
        if (window.VANTA) {
          // Destroy existing effect if theme changes
          if (vantaEffect.current) {
            vantaEffect.current.destroy();
          }

          const isDark = theme === "dark";

          vantaEffect.current = window.VANTA.BIRDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            // More vibrant background colors based on theme
            backgroundColor: isDark ? 0x1a0f2e : 0xfffcfa, // Dark purple or warm white
            color1: isDark ? 0xff6b6b : 0xff7b89, // Vibrant coral/red - more saturated in both modes
            color2: isDark ? 0x4ecdc4 : 0x5ed9d1, // Vibrant teal/cyan - colorful in both modes
            colorMode: "variance", // Use variance for rainbow effect with more color variety
            birdSize: 0.9, // Slightly larger for better visibility
            wingSpan: 20.0, // More prominent wingspan
            speedLimit: 3.0, // Bit faster for more life
            separation: 40.0, // Balanced spacing
            alignment: 32.0,
            cohesion: 32.0,
            quantity: 4.0, // 4 birds for more color variety
          });
        }
      } catch (error) {
        console.error("Error initializing Vanta background:", error);
      }
    }

    // Cleanup
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, [theme]); // Re-initialize when theme changes

  return (
    <div
      ref={vantaRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        opacity: 0.5, // Slightly more visible - 50% opacity for better color visibility
      }}
    >
      {/* Additional subtle overlay for better content visibility */}
      <div className="via-white/3 dark:via-black/3 absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />
    </div>
  );
}
