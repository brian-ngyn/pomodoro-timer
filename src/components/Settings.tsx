import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { usePomodoroContext } from "@/context/PomodoroContext";

export default function Settings() {
  const {
    mode,
    setCurrentTime,
    setIsActive,
    setStartTimeSeconds,
    setDialogOpen,
    dialogOpen,
  } = usePomodoroContext();

  return (
    <div className="flex flex-row gap-x-6 justify-center">
      <RestartAltIcon
        sx={{ color: "white" }}
        className="shadow-xl hover:cursor-pointer transform transition duration-1000 hover:scale-125"
        onClick={() => {
          if (mode === "pomodoro") {
            setCurrentTime({ minutes: "25", seconds: "00" });
            setIsActive(false);
            setStartTimeSeconds(1500);
          } else if (mode === "short break") {
            setCurrentTime({ minutes: "05", seconds: "00" });
            setStartTimeSeconds(300);
            setIsActive(false);
          } else {
            setCurrentTime({ minutes: "15", seconds: "00" });
            setStartTimeSeconds(900);
            setIsActive(false);
          }
        }}
      />
      <SettingsIcon
        sx={{ color: "white" }}
        className="shadow-xl hover:cursor-pointer transform transition duration-1000 hover:scale-125"
        onClick={() => setDialogOpen(dialogOpen ? false : true)}
      />
    </div>
  );
}
