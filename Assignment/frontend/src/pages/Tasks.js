import { useState, useEffect } from "react";
import API from "../services/api";

const STATUS_STYLES = {
  pending: { badge: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-400" },
  "in-progress": { badge: "bg-blue-100 text-blue-700", dot: "bg-blue-400" },
  completed: { badge: "bg-green-100 text-green-700", dot: "bg-green-400" },
};

function Tasks() {
  const [title, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  const isAdmin = user.role === "admin";

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch {}
  };

  const createTask = async () => {
    if (!title.trim()) return setError("Task title required");
    setCreating(true);
    try {
      await API.post("/tasks", { title, assignedTo });
      setTitle("");
      setAssignedTo("");
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating task");
    } finally {
      setCreating(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch {
      setError("Error updating task");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch {
      setError("Error deleting task");
    }
  };

  useEffect(() => {
    fetchTasks();
    if (isAdmin) fetchUsers();
  }, []);

  const filtered =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
          <p className="text-gray-500 mt-1">
            Create, assign and track your tasks
          </p>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {isAdmin && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Add New Task
            </h3>

            <div className="grid sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Task title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50"
              />

              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-3 text-sm bg-gray-50"
              >
                <option value="">Assign user</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name}
                  </option>
                ))}
              </select>

              <button
                onClick={createTask}
                disabled={creating}
                className="bg-blue-600 text-white rounded-xl py-3 text-sm font-semibold"
              >
                {creating ? "Adding..." : "Add Task"}
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-2 mb-6">
          {["all", "pending", "in-progress", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-white border text-gray-500"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border">
            <p className="text-gray-500">No tasks found</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border">
            {filtered.map((t, i) => {
              const style = STATUS_STYLES[t.status] || STATUS_STYLES.pending;
              return (
                <div
                  key={t._id}
                  className={`flex items-center gap-4 px-6 py-4 ${
                    i !== 0 ? "border-t" : ""
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${style.dot}`}></div>

                  <span className="flex-1 text-sm">{t.title}</span>

                  <span className="text-xs text-gray-400 hidden sm:block">
                    {t.assignedTo?.name || "Unassigned"}
                  </span>

                  <span className={`text-xs px-3 py-1 rounded-full ${style.badge}`}>
                    {t.status}
                  </span>

                  <select
                    value={t.status}
                    onChange={(e) =>
                      updateStatus(t._id, e.target.value)
                    }
                    disabled={!isAdmin}
                    className="text-xs border rounded-lg px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>

                  {isAdmin && (
                    <button
                      onClick={() => deleteTask(t._id)}
                      className="text-red-400"
                    >
                      ×
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;