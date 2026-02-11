import { Code2, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0B0F19] border-t border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Code2 className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">CodePlay</span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            Practice real coding problems, get AI feedback, and prepare for top tech companies.
          </p>

          <div className="flex gap-4 mt-6 text-gray-400">
            <a href="https://github.com/ayush78970" target="_blank" className="hover:text-white transition">
              <Github />
            </a>
            <a href="https://x.com/home" target="_blank" className="hover:text-white transition">
              <Twitter />
            </a>
            <a href="https://www.linkedin.com/in/ayush7839/" target="_blank" className="hover:text-white transition">
              <Linkedin />
            </a>
          </div>
        </div>

        {/* Platform */}
        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li ><Link to="" className="hover:!text-white !no-underline">Challenges</Link></li>
            <li><Link to="" className="hover:!text-white !no-underline">Dashboard</Link></li>
            <li><Link to="" className="hover:!text-white !no-underline">Leaderboard</Link></li>
            <li><Link to="" className="hover:!text-white !no-underline">AI Review</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-white font-semibold mb-4">Resources</h4>
          <ul className="space-y-3 text-gray-400 text-sm list-none">
            <li><Link to="" className="hover:!text-white !no-underline">Interview Prep</Link></li>
            <li><Link to="" className="hover:!text-white !no-underline">Contribute</Link></li>
            <li><Link to="" className="hover:!text-white !no-underline">About</Link></li>
            <li><Link to="" className="hover:!text-white !no-underline">Contact</Link></li>
          </ul>
        </div>
             
        {/* CTA */}
        <div>
          <h4 className="text-white font-semibold mb-4">Get Started</h4>
          <p className="text-gray-400 text-sm mb-4">
            Join thousands of developers leveling up on CodePlay.
          </p>

          <Link
            to="/login"
            className="block w-full text-center px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition !no-underline"
          >
            Start Coding Free
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1F2937] py-6 text-center text-gray-500 text-sm">
        © {currentYear} CodePlay. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
