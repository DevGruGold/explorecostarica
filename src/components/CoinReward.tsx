
import { useEffect, useRef } from "react";

interface CoinRewardProps {
  visible: boolean;
  onDone: () => void;
  amount?: number;
}

const CoinReward = ({ visible, onDone, amount = 50 }: CoinRewardProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (visible && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setTimeout(onDone, 1400);
    }
  }, [visible, onDone]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[110] pointer-events-none">
      <audio ref={audioRef} src="/coin-reward.mp3" preload="auto" />
      <div className="relative flex flex-col items-center animate-fade-in animate-scale-in">
        <div className="w-32 h-32 flex items-center justify-center">
          <span
            className="absolute inline-block text-yellow-400 animate-bounce"
            style={{
              fontSize: "5rem",
              filter: "drop-shadow(0 0 15px #fef7cd)",
              animation: "scale-in 0.55s cubic-bezier(0.4,0.2,0.5,1) both",
            }}
          >
            🪙
          </span>
          <span
            className="absolute top-20 left-2 font-extrabold text-soft-yellow text-4xl animate-pulse"
            style={{
              textShadow: "0 0 8px #fef7cd, 0 2px 6px #feca7a",
            }}
          >
            +{amount}
          </span>
        </div>
        <span className="bg-costa-green font-bold px-4 py-2 rounded-full shadow-xl text-white mt-6">
          Reward Collected!
        </span>
      </div>
    </div>
  );
};

export default CoinReward;
