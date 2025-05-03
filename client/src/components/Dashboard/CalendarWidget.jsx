// components/Dashboard/CalendarWidget.jsx
import { Calendar } from "@/components/ui/calendar";
import React, { useState } from "react";

const CalendarWidget = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
};

export default CalendarWidget;
