import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Hyperspeed from '../components/Hyperspeed';

const HomePage = () => {
  const [showBlurText, setShowBlurText] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null); 
  useEffect(() => {
    // Start Hyperspeed and audio playback
    if (!showBlurText && audioRef.current) {
      audioRef.current.muted = false; 
      audioRef.current.play().catch((error) => console.error("Audio playback failed:", error));
    }

    // Stop audio playback and show text when Hyperspeed ends
    const timer = setTimeout(() => {
      setShowBlurText(true);
      if (audioRef.current) {
        audioRef.current.pause(); 
        audioRef.current.currentTime = 0; 
      }
    }, 5500);
    console.log(audioRef.current);

    return () => clearTimeout(timer);
  }, [showBlurText]);

  useEffect(() => {
    // Navigate to movies page after text is displayed
    if (showBlurText) {
      const navigateTimer = setTimeout(() => {
        navigate('/movies'); 
      }, 3000);

      return () => clearTimeout(navigateTimer);
    }
  }, [showBlurText, navigate]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/cinematic-background-5-293543.mp3"
        preload="auto"
        onCanPlay={() => console.log("Audio is ready to play")}
        muted
      />

      {!showBlurText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Hyperspeed
            effectOptions={{
              onSpeedUp: () => console.log("Speeding up..."),
              onSlowDown: () => console.log("Slowing down..."),
              distortion: 'turbulentDistortion',
              length: 200,
              roadWidth: 10,
              islandWidth: 2,
              lanesPerRoad: 4,
              fov: 90,
              fovSpeedUp: 150,
              speedUp: 2,
              carLightsFade: 0.4,
              totalSideLightSticks: 20,
              lightPairsPerRoadWay: 40,
              shoulderLinesWidthPercentage: 0.05,
              brokenLinesWidthPercentage: 0.1,
              brokenLinesLengthPercentage: 0.5,
              lightStickWidth: [0.12, 0.5],
              lightStickHeight: [1.3, 1.7],
              movingAwaySpeed: [60, 80],
              movingCloserSpeed: [-120, -160],
              carLightsLength: [200 * 0.03, 200 * 0.2],
              carLightsRadius: [0.05, 0.14],
              carWidthPercentage: [0.3, 0.5],
              carShiftX: [-0.8, 0.8],
              carFloorSeparation: [0, 5],
              colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0x000000,
                shoulderLines: 0xffffff,
                brokenLines: 0xffffff,
                leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
                rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
                sticks: 0x03b3c3,
              }
            }}
          />
        </div>
      )}
      {showBlurText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            {/* Logo */}
            <div className="w-20 h-20 bg-indigo-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-4xl">CS</span>
            </div>
            {/* App Name */}
            <span className="text-white text-6xl font-extrabold text-center">
              CINESCOPE
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;