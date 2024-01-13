import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function App() {
  const currentDate = new Date();
  const storedDate = localStorage.getItem("date");
  const storedTask = localStorage.getItem("task");

  const [task, setTask] = useState<string>(storedTask || "");
  const [date, setDate] = useState<string>(
    storedDate || currentDate.toISOString().split("T")[0]
  );
  const [differenceInDays, setDifferenceInDays] = useState<number | null>(null);

  const handleSubmit = (e?: FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const selectedDate = new Date(date);
    const timeDifference = selectedDate.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    setDifferenceInDays(daysDifference);

    // Save task and date to localStorage
    localStorage.setItem("task", task);
    localStorage.setItem("date", date.split("T")[0]);
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="h-[350px] dark w-[275px] grid place-items-center font-mono bg-card text-popover-foreground">
      <div>
        {differenceInDays !== null && (
          <>
            <h1 className="font-semibold text-primary text-3xl text-center">
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
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-y-5">
        <Input
          type="text"
          className="w-[230px] text bg-input fixed top-[15%]"
          placeholder="Enter event name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Separator className="bg-card-foreground opacity-30 fixed w-[230px] top-[23%] " />
        <div>
          <h1 className="text-center font-medium text-sm  text-foreground opacity-70 mb-2 mt-0">Deadline</h1>
          <Input
            type="date"
            className="w-[230px] text bg-input"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        
        <Button type="submit" variant={"default"} className="bg-primary text-primary-foreground">
          Save
        </Button>
      </form>
    </div>
  );
}

export default App;