import { useState, useEffect } from "react";
import API from "../services/api";

function Projects() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);
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

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async () => {
    if (!name.trim()) return setError("Project name required");

    setCreating(true);
    try {
      await API.post("/projects", { name, description });
      setName("");
      setDescription("");
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || "Error creating project");
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h2 className="text-2xl font-bold">Projects</h2>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {isAdmin && (
          <div className="bg-white p-6 rounded-2xl mb-6">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
              className="border p-2 mr-2"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="border p-2 mr-2"
            />
            <button onClick={createProject}>
              {creating ? "Creating..." : "Create"}
            </button>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          projects.map((p) => (
            <div key={p._id} className="bg-white p-4 mb-3 rounded">
              <h4>{p.projectName}</h4>
              <p>{p.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Projects;