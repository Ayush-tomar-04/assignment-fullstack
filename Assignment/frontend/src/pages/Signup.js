import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      const res = await API.post("/signup", {
        name,
        email,
        password,
        role
      });

      console.log(res.data);

      navigate("/");
    } catch (err) {
      console.log(err.response);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl mb-4">Signup</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border w-full p-2 mb-2"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 mb-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 mb-2"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border w-full p-2 mb-3"
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2"
          disabled={loading}
        >
          {loading ? "Creating..." : "Signup"}
        </button>

        <p className="text-sm mt-2">
          Already have account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;