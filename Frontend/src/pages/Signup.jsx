import { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import AuthLayout from "../components/auth/AuthLayout";
import { Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <AuthLayout>
      <div className="w-full max-w-md p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Account 🚀
        </h2>

        <div className="space-y-4">
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

          <Button text="Sign Up" />
        </div>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;
