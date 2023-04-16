import { usePomodoroContext } from "@/context/PomodoroContext";

export default function ModeSelector() {
  const { setCurrentTime, setStartTimeSeconds, mode, setMode, setIsActive } =
    usePomodoroContext();

  return (
    <>
      <div className="flex flex-row gap-x-2 select-none">
        <div
          className={`px-2 py-1 ${
            mode === "pomodoro"
              ? "bg-yellow-400 font-semibold text-black"
              : "bg-blue-900 font-normal text-gray-100"
          } shadow-2xl rounded-xl hover:cursor-pointer`}
          onClick={() => {
            setMode("pomodoro");
            setCurrentTime({ minutes: "25", seconds: "00" });
            setStartTimeSeconds(1500);
            setIsActive(false);
          }}
        >
          pomodoro
        </div>
        <div
          className={`px-2 py-1 ${
            mode === "short break"
              ? "bg-yellow-400 font-semibold text-black"
              : "bg-blue-900 font-normal text-gray-100"
          } shadow-2xl rounded-xl hover:cursor-pointer`}
          onClick={() => {
            setMode("short break");
            setCurrentTime({ minutes: "5", seconds: "00" });
            setIsActive(false);
            setStartTimeSeconds(300);
          }}
        >
          short break
        </div>
        <div
          className={`px-2 py-1 ${
            mode === "long break"
              ? "bg-yellow-400 font-semibold text-black"
              : "bg-blue-900 font-normal text-gray-100"
          } shadow-2xl rounded-xl hover:cursor-pointer`}
          onClick={() => {
            setMode("long break");
            setCurrentTime({ minutes: "15", seconds: "00" });
            setStartTimeSeconds(900);
            setIsActive(false);
          }}
        >
          long break
        </div>
      </div>
    </>
  );
}
