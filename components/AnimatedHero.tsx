"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const animatedWords = [
  "organic soda",
  "soda equipment",
  "sustainable tableware",
  "eco-friendly cups",
  "bamboo straws",
];

// Using four video files hosted on Dropbox (direct download links)
// Order: 11760024, 6792650, 11760007, 13960987
// Prefer Dropbox direct links; if a remote fails at runtime we fall back to local public assets.
const remoteVideoSources = [
  "https://www.dropbox.com/scl/fi/bghb84f82ul6h35ma5e07/11760024-uhd_4096_2160_30fps.mp4?dl=1",
  "https://www.dropbox.com/scl/fi/e2yocnkycud2eikoqrswq/6792650-hd_1920_1080_24fps.mp4?dl=1",
  "https://www.dropbox.com/scl/fi/g0gy4u38k6i6y33wolecy/11760007-uhd_4096_2160_30fps.mp4?dl=1",
  "https://www.dropbox.com/scl/fi/4bixveyv85niwvb3tovac/13960987_3840_2160_30fps.mp4?dl=1",
];

const localFallbackSources = ["/hero-video-1.mp4", "/hero-video-2.mp4", "/hero-video-3.mp4", "/hero-video-4.mp4"];

export default function AnimatedHero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [resolvedSources, setResolvedSources] = useState<string[]>(remoteVideoSources);
  // Keep a reference name to avoid stale references in hot-reload
  const videoSources = resolvedSources;
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
  ];
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Animated words effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Initialize and preload all videos
  useEffect(() => {
    let mounted = true;

    const initializeVideos = async () => {
      // Set up all videos
      const setupPromises = videoRefs.map(async (ref, index) => {
        const video = ref.current;
        if (!video) return false;

        return new Promise<boolean>((resolve) => {
          const handleLoadedData = () => {
            video.removeEventListener("loadeddata", handleLoadedData);
            if (mounted) resolve(true);
          };

          const handleError = () => {
            video.removeEventListener("error", handleError);
            if (mounted) resolve(false);
          };

          video.muted = true;
          video.playsInline = true;
          // Lighter preload to reduce 416/range issues with remote hosts
          video.preload = "metadata";
          video.loop = false;
          video.currentTime = 0;

          video.addEventListener("loadeddata", handleLoadedData);
          video.addEventListener("error", handleError);
          video.load();
        });
      });

      const results = await Promise.all(setupPromises);
      const allReady = results.every((ready) => ready);

      if (mounted && allReady) {
        // Start playing the first video
        const firstVideo = videoRefs[0].current;
        if (firstVideo) {
          try {
            firstVideo.currentTime = 0;
            await firstVideo.play();
            if (mounted) {
              setVideoLoaded(true);
              setCurrentVideoIndex(0);
            }
          } catch (err) {
            console.log("Autoplay prevented:", err);
          }
        }
      }
    };

    initializeVideos();

    return () => {
      mounted = false;
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Handle video end - transition to next video with smooth crossfade
  const handleVideoEnd = async (videoIndex: number) => {
    // Clear any pending transitions
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    const nextIndex = (videoIndex + 1) % videoSources.length;
    const currentVideo = videoRefs[videoIndex].current;
    const nextVideo = videoRefs[nextIndex].current;

    if (!nextVideo || !currentVideo) return;

    try {
      setIsTransitioning(true);

      // Ensure next video is ready and reset to start
      if (nextVideo.readyState < 2) {
        await new Promise<void>((resolve) => {
          const handleCanPlay = () => {
            nextVideo.removeEventListener("canplay", handleCanPlay);
            resolve();
          };
          nextVideo.addEventListener("canplay", handleCanPlay);
          nextVideo.load();
        });
      }

      nextVideo.currentTime = 0;

      // Start the crossfade by changing the active index
      setCurrentVideoIndex(nextIndex);

      // Small delay to allow opacity transition to start
      await new Promise((resolve) => {
        transitionTimeoutRef.current = setTimeout(resolve, 100);
      });

      // Play next video
      try {
        await nextVideo.play();
      } catch (err) {
        console.error("Error playing next video:", err);
      }

      // Pause and reset current video after transition completes
      transitionTimeoutRef.current = setTimeout(() => {
        if (currentVideo) {
          currentVideo.pause();
          currentVideo.currentTime = 0;
        }
        setIsTransitioning(false);
      }, 1000); // Match transition duration
    } catch (err) {
      console.error("Error transitioning video:", err);
      setIsTransitioning(false);
    }
  };

  // Handle video errors
  const handleVideoError = (e: any, index: number) => {
    console.error("Video error:", e, "index:", index, "src:", resolvedSources[index]);
    // fallback to local asset for this index
    setResolvedSources((prev) => {
      const next = [...prev];
      next[index] = localFallbackSources[index] || prev[index];
      return next;
    });
    // Keep rendering videos to allow fallback to load
    setVideoError(false);
  };

  // Ensure videos stay in sync when index changes
  useEffect(() => {
    const currentVideo = videoRefs[currentVideoIndex].current;
    if (currentVideo && videoLoaded) {
      // Ensure the current video is playing
      if (currentVideo.paused && currentVideo.readyState >= 2) {
        currentVideo.play().catch((err) => {
          console.log("Play error:", err);
        });
      }
    }
  }, [currentVideoIndex, videoLoaded]);

  return (
    <div className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden bg-gray-100">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <>
            {resolvedSources.map((src, index) => (
              <video
                key={`${index}-${src}`}
                ref={videoRefs[index]}
                crossOrigin="anonymous"
                muted
                autoPlay
                controls={false}
                playsInline
                preload="metadata"
                loop={false}
                onEnded={() => handleVideoEnd(index)}
                onError={(e) => handleVideoError(e, index)}
                onLoadedData={() => {
                  // Ensure video is ready
                  const video = videoRefs[index].current;
                  if (video && index === 0 && !videoLoaded) {
                    setVideoLoaded(true);
                  }
                }}
                className={`absolute inset-0 w-full h-full object-cover ${
                  currentVideoIndex === index 
                    ? 'opacity-100 z-10' 
                    : 'opacity-0 z-0 pointer-events-none'
                } ${isTransitioning ? 'transition-opacity duration-1000 ease-in-out' : ''}`}
                style={{
                  filter: "brightness(0.7) contrast(1.1)",
                  willChange: currentVideoIndex === index || isTransitioning ? 'opacity' : 'auto',
                }}
              >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
          </>
        ) : (
          // Fallback gradient background if video fails
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400"></div>
        )}
        
        {/* Loading state */}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"></div>
        )}
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content - Positioned on the left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Main Headline */}
          <div className="builder-block builder-has-component">
            <span className="builder-text">
              <p className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-lg text-left" style={{ fontFamily: 'nantes, georgia, serif', fontWeight: 300 }}>
                Find your next bestseller
              </p>
            </span>
          </div>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-white mb-8 drop-shadow-md text-left" style={{ fontFamily: 'nantes, georgia, serif', fontWeight: 300 }}>
            Sign up to unlock wholesale pricing with over 100,000 brands.
          </p>

          {/* Call to Action Button */}
          <div className="mb-4">
            <Link
              href="/login"
              className="inline-block bg-white text-black px-6 py-3 rounded text-base font-medium hover:bg-gray-50 transition-colors"
              style={{
                borderRadius: '4px',
                textDecoration: 'none',
              }}
            >
              Sign up to buy
            </Link>
          </div>

          {/* Secondary Call to Action */}
          <div className="text-left">
            <Link
              href="/vendor/login"
              className="text-white hover:text-gray-200 text-base md:text-lg font-normal transition-colors drop-shadow-md"
            >
              Are you a brand?{" "}
              <span className="underline text-white">Sell on OSP</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
