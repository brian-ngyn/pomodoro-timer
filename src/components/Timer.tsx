import Countdown from "@/components/Countdown";
import Dialog from "@/components/Dialog";
import ModeSelector from "@/components/ModeSelector";
import Settings from "@/components/Settings";

export default function Timer() {
  return (
    <>
      <div className="flex flex-col space-y-12 justify-center items-center">
        <ModeSelector />
        <Dialog />
        <Countdown />
        <Settings />
      </div>
    </>
  );
}
