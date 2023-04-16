import { Inter } from "next/font/google";
import Timer from "@/components/Timer";
import { PomodoroContextProvider } from "@/context/PomodoroContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <PomodoroContextProvider>
        <div
          className="min-h-screen min-w-screen"
          style={{
            backgroundSize: "36px 36px",
            backgroundImage:
              "linear-gradient(-45deg, rgba(221, 221, 221, 0.15) 1px, transparent 1px), linear-gradient(45deg, rgba(221, 221, 221, 0.15) 1px, transparent 1px)",
            backgroundColor: "#0F234E",
            backgroundPosition: "0 0, 12px 12px",
          }}
        >
          <div className="flex flex-col justify-center items-center gap-y-12 pt-[20%] md:pt-[7%]">
            <div className="text-gray-100 text-5xl text-center select-none">
              {"brian's pomodoro"}
            </div>
            <Timer />
          </div>
        </div>
      </PomodoroContextProvider>
    </>
  );
}
