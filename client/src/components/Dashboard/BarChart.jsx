import React, { useEffect, useState } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getProjects } from "../../services/projectService";
import { getTasks } from "../../services/taskService";
import { ChartNoAxesGantt } from "lucide-react";

const BarChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProjects();
        const projects = response.data.projects;
        

        const dataPromises = projects.map(async (project) => {
          const tasksResponse = await getTasks(project._id);
          const tasks = tasksResponse.data.tasks || tasksResponse.data;

          if (Array.isArray(tasks)) {
            const normalize = (s) => s?.toLowerCase().replace(/\s|_/g, "");

            const completed = tasks.filter((t) => normalize(t.status) === "completed").length;
            const inProgress = tasks.filter((t) => normalize(t.status) === "inprogress" || normalize(t.status) === "in-progress").length;
            const pending = tasks.filter((t) => normalize(t.status) === "pending").length;

            return {
              name: project.name,
              completed,
              in_progress: inProgress,
              pending,
            };
          } else {
            return null;
          }
        });

        const results = await Promise.all(dataPromises);
        setChartData(results.filter((item) => item !== null));
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        📊 Task Progress by Project
      </h2>
      <div className="min-w-[600px] h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={chartData} barGap={8}>
            {/* Remove CartesianGrid to remove grid lines entirely */}
            <CartesianGrid stroke="none" /> {/* No grid lines in the background */}

            {/* X and Y Axes without lines */}
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              axisLine={false}   // Remove axis line
              tickLine={false}   // Remove tick line
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
              axisLine={false}   // Remove axis line
              tickLine={false}   // Remove tick line
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
            />
            <Legend
              iconType="circle"
              formatter={(value) => {
                if (value === "completed") return "✅ Completed";
                if (value === "in_progress") return "🛠 In Progress";
                if (value === "pending") return "🕒 Pending";
                return value;
              }}
            />
            <Bar dataKey="completed" fill="#4caf50" radius={[4, 4, 0, 0]} />
            <Bar dataKey="in_progress" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" fill="#9ca3af" radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
