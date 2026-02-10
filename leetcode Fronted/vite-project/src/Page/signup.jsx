import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { registerUser } from "../authSlice";
import { useEffect } from "react";
import Footer from "../footerr/footer";
import { Code2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const signupSchema = z.object({
  firstName: z.string().min(3, "Minimum 3 characters"),
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex flex-col">
      {/* Center Card */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md bg-[#0B0F19] border border-[#1F2937] rounded-2xl p-8 shadow-xl">

          {/* Logo */}
          {/* <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Code2 className="text-white w-6 h-6" />
            </div>
          </div> */}

{/* text-xl font-bold text-white text-center */}
          <h2 className=" text-xl-center font-bold text-white  ">
            Create your CodePlay account
          </h2>
          <p className="text-gray-400 text-center text-sm mt-2 mb-8">
            Start practicing and build real coding skills.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName")}
                className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#1F2937] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("emailId")}
                className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#1F2937] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.emailId && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.emailId.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full px-4 py-3 rounded-lg bg-[#111827] border border-[#1F2937] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 !no-underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Signup;
