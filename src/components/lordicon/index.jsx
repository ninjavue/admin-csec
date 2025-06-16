import { useEffect, useRef } from "react";
import { Player } from "@lordicon/react";

function LordIcon({ size = 40, src }) {
  const playerRef = useRef(null);

  if (!src) {
    console.error("LordIcon: 'src' prop is required");
    return null;
  }

  useEffect(() => {
    const loadAndPlayAnimation = async () => {
      try {
        if (playerRef.current) {
          playerRef.current.playFromBeginning();
        }
      } catch (error) {
        console.error("Error playing animation:", error);
      }
    };

    loadAndPlayAnimation();

    const intervalId = setInterval(() => {
      loadAndPlayAnimation();
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [src]);

  return (
    <Player
      ref={playerRef}
      icon={src}
      size={size}
      style={{ 
        width: size, 
        height: size,
        strokeWidth: "4px",
        fontWeight: "bold"
      }}
      onError={(error) => console.error("LordIcon error:", error)}
      stroke={45}
    />
  );
}

export default LordIcon;
