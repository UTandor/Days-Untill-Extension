import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  const currentDate = new Date();
  const storedDate = localStorage.getItem("date");
  const storedTask = localStorage.getItem("task");

  const [task, setTask] = useState<string>(storedTask || "");
  const [date, setDate] = useState<string>(
    storedDate || currentDate.toISOString().split("T")[0]
  );
  const [differenceInDays, setDifferenceInDays] = useState<number | null>(null);
  const [include, setInclude] = useState<string | null>(null); // New state for selected days

  const handleSubmit = (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const selectedDate = new Date(date);
    const timeDifference = selectedDate.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    setDifferenceInDays(daysDifference);

    // Save task, date, and include to localStorage
    localStorage.setItem("task", task);
    localStorage.setItem("date", date.split("T")[0]);
    localStorage.setItem("include", include || "");
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="h-[450px] dark w-[300px] py-12 grid place-items-center font-mono bg-card text-popover-foreground">
      <div>
        {differenceInDays !== null && (
          <>
            <h1 className="font-semibold text-primary row-span-2 text-3xl text-center">
              <p>{Math.abs(differenceInDays)}</p>
            </h1>
            <div>
              <p className="text-center font-medium text-secondary-foreground">
                {differenceInDays > 0 ? "Days until" : "Days since"}
              </p>
            </div>
          </>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid place-items-center gap-2 mt-10 relative mb-32"
      >
        <Input
          type="text"
          className="w-[230px] text bg-input"
          placeholder="Enter event name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <div>
          <h1 className="text-center font-medium text-sm  text-foreground opacity-70 mb-2 mt-2 ">
            Deadline
          </h1>
          <Input
            type="date"
            className="w-[230px] bg-input"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <h1 className="text-center font-medium text-sm  text-foreground opacity-70 mb-2 mt-2 ">
            Include:
          </h1>
          <Custom />
        </div>
        <Button
          type="submit"
          variant={"default"}
          className="bg-primary text-primary-foreground"
        >
          Save
        </Button>
      </form>
    </div>
  );
}

export default App;

const Custom = () => {
  const daysList = [
    { S: "S" },
    { M: "M" },
    { T: "T" },
    { W: "W" },
    { T: "Th" },
    { F: "F" },
    { S: "St" },
  ];
  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <div className="flex flex-row space-x-2">
      {daysList.map((day, id) => (
        <div key={Object.keys(day)[0]}>
          <div
            className={
              selectedDays.includes(day[Object.keys(day)[0]])
                ? "select-none text-primary-foreground bg-primary w-8 text-center items-center text-black flex justify-center h-8 rounded-full"
                : "select-none w-8 text-center items-center text-black flex justify-center h-8 rounded-full bg-blue-100"
            }
            onClick={() => {
              toggleDay(day[Object.keys(day)[0]]);
            }}
          >
            {day[Object.keys(day)[0]]}
          </div>
        </div>
      ))}
    </div>
  );
};
