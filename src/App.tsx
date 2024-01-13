import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function App() {
  const currentDate = new Date();
  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<string>(
    currentDate.toISOString().split("T")[0]
  );
  const [differenceInDays, setDifferenceInDays] = useState<number | null>(null);

  const handleSubmit = (e?) => {
    if (e) {
      e.preventDefault();
    }

    const selectedDate = new Date(date);
    const timeDifference = selectedDate.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    setDifferenceInDays(daysDifference);
    if (localStorage.getItem("days") !== null) {
      localStorage.setItem("days", daysDifference.toString());
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="h-[350px] dark absolute w-[275px] grid place-items-center font-mono bg-card text-popover-foreground">
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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-y-5"
      >
        <Input
          type="text" // Fix: Corrected the type to "text" for the task input
          className="w-[200px] text bg-input fixed top-32"
          placeholder="Enter event name"
          value={task} // Fix: Added value prop for controlled input
          onChange={(e) => setTask(e.target.value)}
        />
        <Separator className=" bg-card-foreground opacity-30 " />
        <Input
          type="date"
          className="w-[200px] text bg-input "
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button
          type="submit"
          variant={"default"}
          className="bg-primary text-primary-foreground"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default App;
