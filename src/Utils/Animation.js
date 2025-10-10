import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function UseFadeUp() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth > 0) {
      const ctx = gsap.context(() => {
        const contents = document.querySelectorAll(".fadeup");
        contents.forEach((content) => {
          gsap.from(content, {
            scrollTrigger: {
              trigger: content,
              start: "top 90%",
              // markers:true
            },
            opacity: 0.5,
            y: 200,
            ease: "power3.out",
            duration: 2,
          });
        });
      });
      return () => ctx.revert();
    }
  }, []);
}