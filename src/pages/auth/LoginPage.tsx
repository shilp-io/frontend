import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useUser();
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to login");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Login</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Demo credentials:
        <br />
        Email: demo@example.com
        <br />
        Password: demo123
      </p>
    </div>
  );
}
