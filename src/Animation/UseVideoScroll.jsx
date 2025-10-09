import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function useVideoScroll({ video, container, scrub = 1, triggerValues = {} }) {
    if (!video || !container) return;

    let duration = 1;

    const handleLoadedMetadata = () => {
      duration = video.duration || 1;
      gsap.to(video, {
        currentTime: duration,
        
        scrollTrigger: {
          trigger: container,
          start: triggerValues.start || "top 50%",
          end: triggerValues.end || "90% bottom",
          scrub: scrub,
          markers: false,
        },
      });
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    // If metadata already loaded (cache), fire manually
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    // Return cleanup function
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      // Clean up all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
}