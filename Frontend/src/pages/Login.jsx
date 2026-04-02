import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { loginUser } from "../services/authService";
import useAuthStore from "../store/authStore";

const Login = () => {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await loginUser({
        identifier: form.identifier,
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
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4 font-sans">
      {/* Main Outer Container */}
      <div className="w-full max-w-5xl h-[600px] flex rounded-[40px] overflow-hidden shadow-2xl border border-white/5 bg-[#0a0a0a]">
        {/* LEFT SIDE: Branding with Background Image */}
        <div className="relative hidden md:flex flex-col justify-center items-center w-1/2 p-12 overflow-hidden">
          {/* Replace with your actual background image URL */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/60" />

          <div className="relative z-10 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-blue-400 rounded-2xl rotate-45 flex items-center justify-center shadow-lg shadow-purple-500/50">
                <span className="text-4xl font-bold text-white -rotate-45">
                  V
                </span>
              </div>
            </div>
            <h1 className="text-5xl font-black tracking-tighter text-white mb-2">
              VIBESPACE
            </h1>
            <p className="text-gray-300 text-lg font-light tracking-wide">
              Catch the Vibe. <br /> Share the Space.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE: Form Container */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-black p-6 md:p-12">
          {/* Glass Card for Login */}
          <div className="w-full max-w-md p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-8">Login</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2 ml-1">
                  Email or Username
                </label>
                <Input
                  placeholder="Email or Username"
                  value={form.identifier}
                  onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                />
              </div>

              <div className="relative">
                <label className="block text-gray-400 text-sm mb-2 ml-1">
                  Password
                </label>
                <div className="relative group">
                  {/* Gradient Border Glow Effect for Password */}
                  {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-focus-within:opacity-100 transition duration-500"></div> */}
                  <Input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>
                <div className="text-right mt-2">
                  <button className="text-xs text-gray-500 hover:text-white transition-colors">
                    Forget Password?
                  </button>
                </div>
              </div>

              <Button
                text={loading ? "Logging in..." : "Login"}
                onClick={handleLogin}
              />

              <p className="text-gray-500 text-sm text-center">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-white font-medium hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
