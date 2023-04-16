import { createContext, useState, useContext } from "react";
import { useEffect } from "react";
import { Dispatch, SetStateAction } from "react";

type currentTime = {
  minutes: string;
  seconds: string;
  [key: string]: string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

type PomodoroContextReturnType = {
  currentTime: currentTime;
  setCurrentTime: Dispatch<SetStateAction<currentTime>>;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setStartTimeSeconds: Dispatch<SetStateAction<number>>;
  newTime: currentTime;
  setNewTime: Dispatch<SetStateAction<currentTime>>;
  percentage: number;
  handleTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTimeBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  submitNewTime: () => void;
  mode: "pomodoro" | "short break" | "long break";
  setMode: Dispatch<SetStateAction<"pomodoro" | "short break" | "long break">>;
  pomodoroCount: number;
  setPomodoroCount: Dispatch<SetStateAction<number>>;
};

const PomodoroContext = createContext<PomodoroContextReturnType>(
  {} as PomodoroContextReturnType
);

export function PomodoroContextProvider({ children }: Props) {
  const [percentage, setPercentage] = useState<number>(100);
  const [startTimeSeconds, setStartTimeSeconds] = useState<number>(1500);
  const [timeRemainingSeconds, setTimeRemainingSeconds] =
    useState<number>(1500);
  const [currentTime, setCurrentTime] = useState<currentTime>({
    minutes: "25",
    seconds: "00",
  });
  const [isActive, setIsActive] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newTime, setNewTime] = useState<currentTime>({
    minutes: "25",
    seconds: "00",
  });
  const [mode, setMode] = useState<"pomodoro" | "short break" | "long break">(
    "pomodoro"
  );
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.trim();
    const id = event.target.id;

    let newValue = "00";
    const parsed = parseInt(input);

    if (!isNaN(parsed) && parsed >= 0 && parsed < 60) {
      if (parsed < 10) {
        newValue = "0" + parsed;
      } else {
        newValue = parsed.toString();
      }
    }

    setNewTime({ ...newTime, [id]: newValue });
  };

  const handleTimeBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const id = event.target.id;
    if (newTime[id] === "") {
      setNewTime({ ...newTime, [id]: "00" });
    }
  };

  const submitNewTime = () => {
    setCurrentTime(newTime);
    setStartTimeSeconds(
      parseInt(newTime.minutes) * 60 + parseInt(newTime.seconds)
    );
    setIsActive(false);
    setDialogOpen(false);
  };

  useEffect(() => {
    setTimeRemainingSeconds(
      parseInt(currentTime.minutes) * 60 + parseInt(currentTime.seconds)
    );
  }, [currentTime]);

  useEffect(() => {
    let newPercentage = (timeRemainingSeconds / startTimeSeconds) * 100;
    setPercentage(newPercentage);
  }, [timeRemainingSeconds, startTimeSeconds]);

  return (
    <PomodoroContext.Provider
      value={{
        currentTime,
        setCurrentTime,
        isActive,
        setIsActive,
        dialogOpen,
        setDialogOpen,
        newTime,
        setStartTimeSeconds,
        percentage,
        setNewTime,
        handleTimeChange,
        handleTimeBlur,
        submitNewTime,
        mode,
        setMode,
        pomodoroCount,
        setPomodoroCount,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoroContext() {
  return useContext(PomodoroContext);
}
