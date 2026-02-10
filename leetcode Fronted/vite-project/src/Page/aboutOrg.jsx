import React from "react";
import orgImage from "../assets/abut.jpeg";
import Footer from "../footerr/footer";
import { 
  Code2, 
  Users, 
  Zap, 
  Target, 
  Award,
  Play ,
  ArrowRight
} from "lucide-react";

function AboutOrganisation() {
  return (
    /* The outer wrapper handles the background and allows children to be full-width */
    <div className="min-h-screen bg-[#0f1117] bg-gradient-to-br from-[#0f1117] via-[#1a1a2e] to-[#16213e] relative overflow-hidden flex flex-col">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-20 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl animate-ping" />
      </div>

      {/* Content Container: This limits the width of the text/images but NOT the footer */}
      <div className="relative z-10 max-w-7xl mx-auto py-20 px-4 md:px-8 flex-grow">
        
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Zap className="w-5 h-5 mr-2 text-emerald-400" />
            <span className="text-blue-400 font-semibold text-lg">About CodePlay</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6">
            Our Mission
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transforming how developers learn through practice, not theory.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-3xl blur-xl group-hover:opacity-75 transition-opacity duration-500" />
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 lg:p-8 shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-4">
              <img
                src={orgImage}
                alt="CodePlay Team"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-t from-black/60 to-transparent p-6 rounded-2xl">
                <h3 className="text-2xl font-bold text-white mb-1">Our Team</h3>
                <p className="text-blue-400 font-semibold">Building the future of coding education</p>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:pl-12">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Master Coding. Build Real Skills.
              </h2>
              <p className="text-gray-300 text-xl leading-relaxed">
                CodePlay is your ultimate coding companion. We combine hands-on challenges, AI-powered feedback, 
                and real-world problem-solving to help you master programming, Data Structures & Algorithms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/10">
              <div className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <Users className="w-10 h-10 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">For Everyone</h4>
                  <p className="text-gray-400">Students, professionals, and coding enthusiasts.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <Target className="w-10 h-10 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Real Results</h4>
                  <p className="text-gray-400">Curated problems with instant feedback.</p>
                </div>
              </div>
            </div>

            {/* <div className="pt-8 border-t border-white/10">
              <a href="/login" className="group inline-flex items-center px-8 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 shadow-2xl transition-all duration-300 border border-white/20">
                <Play className="mr-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                Start Practicing
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </div> */}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center py-20">
          {[
            { icon: Users, number: "20+", label: "Active Learners", color: "text-emerald-400" },
            { icon: Award, number: "30+", label: "Challenges", color: "text-purple-400" },
            { icon: Code2, number: "2+", label: "Languages", color: "text-blue-400" },
            { icon: Target, number: "99.9%", label: "Success Rate", color: "text-rose-400" }
          ].map(({ icon: Icon, number, label, color }, idx) => (
            <div key={idx} className="group">
              <Icon className={`w-16 h-16 mx-auto mb-4 ${color} group-hover:scale-110 transition-transform duration-300`} />
              <div className="text-3xl lg:text-4xl font-black text-white mb-2">{number}</div>
              <div className="text-gray-400 text-lg font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer is now outside the padded container, so it can span 100% width */}
      <Footer />
    </div>
  );
}

export default AboutOrganisation;