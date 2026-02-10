import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router";
import { loginUser } from "../authSlice";
import { useEffect, useState } from "react";
import Footer from "../footerr/footer";
import { Code2, Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  emailId: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f1117]">
      
      {/* Centered Login Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#0B0F19] border border-[#1F2937] rounded-2xl p-8 shadow-2xl">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Code2 className="text-white w-6 h-6" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-white text-center">
            Sign in to CodePlay
          </h1>
          <p className="text-gray-400 text-center text-sm mt-2 mb-8">
            Practice coding, get AI feedback, and grow faster.
          </p>

          {/* Server Error */}
          {/* {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )} */}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("emailId")}
                className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#1F2937] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.emailId && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.emailId.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#1F2937] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-gray-400 text-sm mt-6">
            Don’t have an account?{" "}
            <NavLink to="/signup" className="text-blue-400 hover:underline">
              Create one
            </NavLink>
          </p>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Login;
