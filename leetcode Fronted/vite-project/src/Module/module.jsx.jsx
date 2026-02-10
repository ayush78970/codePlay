import React from "react"; // 1. Added React import
import { Link } from "react-router";
import { 
  LayoutGrid, GitCommitVertical, Network, 
  TreeDeciduous, Zap, Binary, Layers, CircleDot 
} from "lucide-react";
import Footer from "../footerr/footer";

function Module() {
  const topics = [
    { name: 'Array', icon: <LayoutGrid />, color: "from-blue-500 to-indigo-600" },
    { name: 'Linked List', icon: <GitCommitVertical />, color: "from-emerald-500 to-teal-600" },
    { name: 'Graph', icon: <Network />, color: "from-purple-500 to-purple-700" },
    { name: 'Tree', icon: <TreeDeciduous />, color: "from-amber-500 to-orange-600" },
    { name: 'Dp', icon: <Zap />, color: "from-rose-500 to-pink-600" },
    { name: 'BST', icon: <Binary />, color: "from-cyan-500 to-blue-600" },
    { name: 'Greedy', icon: <Layers />, color: "from-indigo-500 to-violet-600" },
    { name: 'Queue', icon: <CircleDot />, color: "from-slate-600 to-slate-800" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 px-6 py-12 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Technical <span className="text-indigo-600">Modules</span>
          </h1>
          <p className="text-lg text-slate-500">
            Select a data structure to begin your specialized AI-driven technical interview.
          </p>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <Link key={index} to={`/mindmap/SolveQuestionPage/${topic.name}`} className="group !no-underline">
              <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 text-center transition-all duration-300 
                            hover:shadow-xl hover:border-indigo-500 hover:-translate-y-2 flex flex-col items-center justify-center gap-4">
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topic.color} 
                                flex items-center justify-center text-white shadow-lg 
                                group-hover:scale-110 transition-transform duration-300`}>
                  {/* FIX: Use React.cloneElement instead of Object.cloneElement */}
                  {React.cloneElement(topic.icon, { size: 32, strokeWidth: 1.5 })}
                </div>

                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors ">
                    {topic.name}
                  </h2>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
                    Practice Mode
                  </p>
                </div>
                <div className="mt-2 w-8 h-1 bg-slate-100 rounded-full group-hover:w-16 group-hover:bg-indigo-400 transition-all duration-500"></div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    <Footer/>
    </div>
  );
}

export default Module;