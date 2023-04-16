import { usePomodoroContext } from "@/context/PomodoroContext";

export default function Dialog() {
  const {
    dialogOpen,
    setDialogOpen,
    newTime,
    handleTimeChange,
    handleTimeBlur,
    submitNewTime,
  } = usePomodoroContext();

  return (
    <>
      {dialogOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
              aria-hidden="true"
              onClick={() => setDialogOpen(dialogOpen ? false : true)}
            ></div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-[400px] h-[230px]">
              <div className="flex flex-col h-full w-full p-6 gap-y-6">
                <div className="text-xl font-bold">Settings</div>
                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-row gap-x-2">
                    <div>
                      <label
                        htmlFor="minutes"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Minutes
                      </label>

                      <input
                        type="text"
                        id="minutes"
                        placeholder="25"
                        value={newTime.minutes}
                        className="p-2 mt-1 w-full rounded-md border-gray-200 shadow-md sm:text-sm"
                        onChange={handleTimeChange}
                        onBlur={handleTimeBlur}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="seconds"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Seconds
                      </label>

                      <input
                        type="text"
                        id="seconds"
                        placeholder="00"
                        value={newTime.seconds}
                        className="p-2 mt-1 w-full rounded-md border-gray-200 shadow-md sm:text-sm"
                        onChange={handleTimeChange}
                        onBlur={handleTimeBlur}
                      />
                    </div>
                  </div>
                  <div
                    className="hover:cursor-pointer inline-block rounded bg-yellow-400 px-8 py-3 text-sm font-medium text-black text-center transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring"
                    onClick={submitNewTime}
                  >
                    Done
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
