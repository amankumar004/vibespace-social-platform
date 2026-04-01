import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/auth/AuthLayout";
import { signupUser } from "../services/authService";
import useAuthStore from "../store/authStore";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const data = await signupUser({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      // data = { id, username, email, token }
      if (data && data.token) {
        setAuth({
          token: data.token,
          user: { id: data.id, username: data.username, email: data.email },
        });
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div
        className="w-full max-w-md p-8 rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Get started on VibeSpace
        </h2>

        <h3 className="text-sm text-gray-400 mb-8 text-center">
          Create an account to catch the vibe and connect with others.
        </h3>

        <div className="space-y-5">
          <Input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button
            text={loading ? "Signing up..." : "Sign Up"}
            onClick={handleSignup}
          />
        </div>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-purple-400 hover:text-pink-400 transition"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;
