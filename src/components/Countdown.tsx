import { useEffect } from "react";
import { usePomodoroContext } from "@/context/PomodoroContext";
import useSound from "use-sound";

export default function Countdown() {
  const [playHypeBoy] = useSound("/hypeboy.mp3", { volume: 0.1 });
  const [playOMG] = useSound("/omg.mp3", { volume: 0.1 });
  const [playDitto] = useSound("/ditto.mp3", { volume: 0.1 });

  const {
    currentTime,
    setCurrentTime,
    isActive,
    setIsActive,
    setStartTimeSeconds,
    mode,
    setMode,
    pomodoroCount,
    setPomodoroCount,
    percentage,
  } = usePomodoroContext();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive) {
      intervalId = setInterval(() => {
        const { minutes, seconds } = currentTime;

        if ((minutes === "00" || minutes === "0") && seconds === "00") {
          clearInterval(intervalId);
          if (mode === "pomodoro" && pomodoroCount === 2) {
            setMode("long break");
            setPomodoroCount(0);
            playOMG();
            setCurrentTime({ minutes: "15", seconds: "00" });
            setStartTimeSeconds(900);
          } else if (mode === "pomodoro") {
            setMode("short break");
            setPomodoroCount(pomodoroCount + 1);
            playHypeBoy();
            setCurrentTime({ minutes: "05", seconds: "00" });
            setStartTimeSeconds(300);
          } else {
            setMode("pomodoro");
            playDitto();
            setCurrentTime({ minutes: "25", seconds: "00" });
            setStartTimeSeconds(1500);
          }
          setIsActive(false);
        } else if (seconds === "00") {
          setCurrentTime({
            minutes: `${parseInt(minutes) - 1}`,
            seconds: "59",
          });
        } else {
          setCurrentTime({
            minutes,
            seconds: `${parseInt(seconds) - 1 < 10 ? "0" : ""}${
              parseInt(seconds) - 1
            }`,
          });
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, currentTime, setCurrentTime, setIsActive]);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="h-52 w-52 aspect-square">
          <div
            className="shadow-2xl max-w-full max-h-full relative aspect-square rounded-full hover:cursor-pointer transform transition duration-1000 hover:scale-105 transition-all ease-in-out duration-300"
            style={{
              background: `conic-gradient(#60a5fa 0% ${percentage}%, transparent ${percentage}% 100%)`,
              width: "100%",
              height: "100%",
            }}
            onClick={() => setIsActive(isActive ? false : true)}
          >
            <div className="absolute bg-[#09163A] p-24 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full aspect-square">
              <div className="absolute bg-[#101D42] p-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full aspect-square">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="text-white text-4xl select-none tracking-wider">
                    {currentTime.minutes}:{currentTime.seconds}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
