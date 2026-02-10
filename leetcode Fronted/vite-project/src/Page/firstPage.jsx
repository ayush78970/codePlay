import React from "react";
import { Link } from "react-router";
import { 
  Terminal, 
  Cpu, 
  Target, 
  ArrowRight, 
  Play, 
  Zap, 
  Shield, 
  BarChart3,
  Users 
} from "lucide-react";
import Footer from "../footerr/footer";

const FirstPage = () => {
  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-[#0f1117] via-[#1a1a2e] to-[#16213e]">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-ping" />
        </div>

        {/* 🔹 Enhanced Header */}
        <header className="relative z-10 w-full flex justify-end px-6 py-6 lg:py-8">
          <Link
            to="/login"
            className=" !no-underline group relative px-8 py-3 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600/90 to-blue-700/90 backdrop-blur-sm border border-white/10 hover:from-blue-500 hover:to-blue-600 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300"
          >
            <span className="flex items-center">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </header>

        {/* 🔹 Hero Section */}
        <main className="relative z-10 flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center space-y-12 max-w-4xl mx-auto">
            {/* Hero Badge */}
            <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium text-blue-400 animate-pulse">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Coding Platform
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight">
              Master Coding. <br />
              <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                Build Real Skills.
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Practice hand-picked coding challenges with <span className="font-semibold text-emerald-400">instant AI-driven feedback</span>.
              Track your progress and prepare for top tech companies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/aboutOrganisation"
                className=" !no-underline group relative inline-flex items-center px-10 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm border border-white/20"
              >
                <Play className="mr-3 w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                About Coding 
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>

              {/* <Link
                to=""
                className=" !no-underline inline-flex items-center px-8 py-4 rounded-2xl text-lg font-semibold text-white/80 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:text-white transition-all duration-300 hover:shadow-xl"
              >
                View Challenges
              </Link> */}
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 w-full px-8 max-w-4xl">
            {[
              { icon: Users, number: "5+", label: "Active Coders" },
              { icon: BarChart3, number: "20+", label: "Problems Solved" },
              { icon: Shield, number: "99.9%", label: "Uptime" },
              { icon: Target, number: "20+", label: "Challenges" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <stat.icon className="w-12 h-12 mx-auto mb-3 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">{stat.number}</div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </main>

        {/* 🔹 Enhanced Features Section */}
        <section className="relative z-10 py-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                Everything You Need to <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">Level Up</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Built for developers who want to master coding through practice, not theory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <FeatureCard
                icon={<Terminal className="text-emerald-400" size={40} />}
                title="In-Browser IDE"
                description="Write, run, and debug code instantly in our powerful web-based editor with 50+ languages support."
                gradient="from-emerald-500/10 to-emerald-600/10"
              />
              <FeatureCard
                icon={<Cpu className="text-purple-400" size={40} />}
                title="AI Judge"
                description="Get instant feedback on correctness, time/space complexity, and edge cases from our advanced AI."
                gradient="from-purple-500/10 to-purple-600/10"
              />
              <FeatureCard
                icon={<Target className="text-rose-400" size={40} />}
                title="Curated Problems"
                description="20+ carefully designed DSA problems categorized from Easy to Hard, interview-ready."
                gradient="from-rose-500/10 to-rose-600/10"
              />
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
};

const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className="group relative bg-gradient-to-br bg-white/5 backdrop-blur-xl border border-white/10 p-8 lg:p-10 rounded-3xl hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-emerald-500/20 transform hover:-translate-y-4 transition-all duration-500 overflow-hidden">
    {/* Card Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-40 group-hover:translate-x-40 transition-transform duration-[1200ms]" />
    
    <div className="relative z-10">
      <div className="mb-6 p-4 bg-gradient-to-br bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-2xl lg:text-3xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-lg text-gray-300 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default FirstPage;
