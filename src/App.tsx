import { FormEvent, useEffect, useState } from "react";
import Custom from "@/components/Custom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {setBadge} from "../public/service_worker";

function App() {
  const currentDate = new Date();
  const storedDate = localStorage.getItem("date");
  const storedTask = localStorage.getItem("task");
  const storedInclude = localStorage.getItem("include");

  const [task, setTask] = useState<string>(storedTask || "");
  const [date, setDate] = useState<string>(
    storedDate || currentDate.toISOString().split("T")[0]
  );
  const [differenceInDays, setDifferenceInDays] = useState<number | null>(null);
  const [include, setInclude] = useState<string[]>(
    storedInclude ? JSON.parse(storedInclude) : []
  );

  const handleSubmit = (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const selectedDate = new Date(date);
    const timeDifference = selectedDate.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const excludedCount = countExcludedDays(currentDate, selectedDate, include);
    const adjustedDifference = daysDifference - excludedCount;

    setDifferenceInDays(adjustedDifference);

    localStorage.setItem("task", task);
    localStorage.setItem("date", date.split("T")[0]);
    localStorage.setItem("include", JSON.stringify(include || []));
    setBadge(differenceInDays);
  };

  useEffect(() => {
    handleSubmit();
  }, [include]);

  const countExcludedDays = (
    startDate: Date,
    endDate: Date,
    selectedDays: string[]
  ): number => {
    const allDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // Add this line
    let excludedCount = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const currentDay = allDays[currentDate.getDay()];
      if (!selectedDays.includes(currentDay)) {
        excludedCount++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return excludedCount;
  };

  const handleIncludeChange = (selectedDays: string[]) => {
    setInclude(selectedDays);
  };

  return (
    <div className=" py-12 grid place-items-center font-mono bg-card text-popover-foreground">
      <div>
        {differenceInDays !== null && (
          <>
            <h1 className="font-semibold text-primary row-span-2 text-3xl text-center">
              <p>{Math.abs(differenceInDays)}</p>
            </h1>
            <div>
              <p className="text-center font-medium text-secondary-foreground">
                {differenceInDays > 0 ? "Days left until" : "Days since"}
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
          <h1 className="text-center font-medium text-sm text-foreground opacity-70 mb-2 mt-2 ">
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
          <h1 className="text-center font-medium text-sm text-foreground opacity-70 mb-2 mt-2 ">
            Include:
          </h1>
          <Custom onChange={handleIncludeChange} selectedDays={include} />
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
