import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState(""); // ✅ FIXED
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // 🔍 validation
    if (!email || !password) {
      return setError("Please fill all fields");
    }

    setLoading(true);

    try {
      // ✅ CORRECT API ROUTE
      const res = await API.post("/login", {
        email,
        password
      });

      // 🔐 store data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");

    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Login</h1>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow">

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 mb-3 rounded"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 mb-4 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm mt-4 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;