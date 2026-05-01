import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const StatCard = ({ label, value, color, icon }) => (
  <div className={`rounded-2xl p-6 shadow-sm ${color}`}>
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-semibold opacity-80">{label}</p>
      <span className="text-2xl">{icon}</span>
    </div>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);

function Dashboard() {
  const [data, setData] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    API.get("/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-sm text-blue-600 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const completion =
    data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome back, {user.name || "User"} 👋
            </h2>
            <p className="text-gray-500 mt-1">
              Here's your task overview for today
            </p>
          </div>
          {user.role && (
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                user.role === "admin"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {user.role === "admin" ? "Admin" : "Member"}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard label="Total Tasks" value={data.total} color="bg-blue-100 text-blue-800" icon="📋" />
          <StatCard label="Completed" value={data.completed} color="bg-green-100 text-green-800" icon="✅" />
          <StatCard label="Pending" value={data.pending} color="bg-yellow-100 text-yellow-800" icon="⏳" />
          <StatCard label="Overdue" value={data.overdue} color="bg-red-100 text-red-800" icon="🚨" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700">Overall Progress</h3>
            <span className="text-sm font-bold text-blue-600">
              {completion}%
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completion}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {data.completed} of {data.total} tasks completed
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/projects"
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl p-5 flex items-center gap-3 font-semibold transition shadow-sm"
          >
            <span className="text-2xl">📁</span>
            View Projects
          </Link>

          <Link
            to="/tasks"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-5 flex items-center gap-3 font-semibold transition shadow-sm"
          >
            <span className="text-2xl">✏️</span>
            Manage Tasks
          </Link>

          <Link
            to="/projects"
            className="bg-teal-600 hover:bg-teal-700 text-white rounded-2xl p-5 flex items-center gap-3 font-semibold transition shadow-sm"
          >
            <span className="text-2xl">👥</span>
            Team Overview
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;