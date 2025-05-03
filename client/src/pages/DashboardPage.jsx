import React from 'react';
import BarChart from '../components/Dashboard/BarChart';
import PendingTasks from '../components/Dashboard/PendingTasks';
import InProgressTasks from '../components/Dashboard/InProgressTasks';
import CalendarWidget from '../components/Dashboard/CalendarWidget'; // Fixed typo: CalanderWidget => CalendarWidget

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-6">
        {/* Left side - BarChart and InProgressTasks */}
        <div className="flex-1 min-w-[300px] space-y-6 flex flex-col">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <BarChart />
          </div>

          {/* InProgressTasks - Take up remaining space */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex-grow">
            <InProgressTasks />
          </div>
        </div>

        {/* Right side - PendingTasks and Calendar */}
        <div className="w-full md:w-[400px] space-y-6 flex flex-col">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <PendingTasks />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <CalendarWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
