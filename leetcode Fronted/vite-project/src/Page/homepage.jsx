import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import { logoutUser } from '../authSlice';
import Footer from '../footerr/footer';

import { 
  Menu, 
  X, 
  ChevronDown, 
  CheckCircle, 
  Circle, 
  Filter,
  User,
  LogOut,
  Settings,
  TrendingUp,
  Calendar,
  Brain,
  Briefcase,
  Search,
  LayoutDashboard
} from 'lucide-react';

export default function Homepage({ onSearch = () => {} }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  
  // Filters state -  filter options  store 
  const [filters, setFilters] = useState({
    difficulty: 'all',
    tag: 'all',
    status: 'all',
    search: ''
  });

  // Search handler function - y onSearch prop को call करेगा
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    console.log("Search value from input:", searchValue);
    
    // Local filters update करो
    setFilters(prev => ({ ...prev, search: searchValue }));
    
    // Parent component (ProblemSearchContainer) ko search value pass karo
    onSearch(searchValue);
  };

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    solved: 0,
    easy: 0,
    medium: 0,
    hard: 0
  });

  // Fetch problems and solved problems on component mount
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
        
        // Calculate stats - easy, medium, hard problems count karo
        const easyCount = data.filter(p => p.difficulty === 'easy').length;
        const mediumCount = data.filter(p => p.difficulty === 'medium').length;
        const hardCount = data.filter(p => p.difficulty === 'hard').length;
        
        setStats(prev => ({
          ...prev,
          total: data.length,
          easy: easyCount,
          medium: mediumCount,
          hard: hardCount
        }));
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    const fetchSolvedProblems = async () => {
      if (!user) return;
      try {
        const { data } = await axiosClient.get('/problem/ProblemSlovedByUser');
        setSolvedProblems(data.solvedProblems || []);
        setStats(prev => ({
          ...prev,
          solved: data.solvedProblems?.length || 0
        }));
      } catch (error) {
        console.error('Error fetching solved problems:', error);
      }
    };

    fetchProblems();
    fetchSolvedProblems();
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
    setShowProfileDropdown(false);
    navigate('/login');
  };

  const handleAdminClick = () => {
    if (user?.role === 'admin') {
      navigate('/admin');
    }
    setShowProfileDropdown(false);
  };

  // Filter problems based on selected filters
  const filteredProblems = problems.filter(problem => {
    const difficultyMatch = filters.difficulty === 'all' || problem.difficulty === filters.difficulty;
    const tagMatch = filters.tag === 'all' || problem.tags === filters.tag;
    const statusMatch =
      filters.status === 'all' ||
      (filters.status === 'solved' && solvedProblems.some(sp => sp._id === problem._id)) ||
      (filters.status === 'unsolved' && !solvedProblems.some(sp => sp._id === problem._id));
    const searchMatch = !filters.search || 
      problem.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      problem.description?.toLowerCase().includes(filters.search.toLowerCase());
    
    return difficultyMatch && tagMatch && statusMatch && searchMatch;
  });

  // Helper functions for UI
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '';
    }
  };

  // Navigation items
  const navigationItems = [
    { name: 'Problems', path: '/', icon: null },
    // { name: 'Contest', path: '/contest', icon: <Calendar className="w-4 h-4" /> },
    { name: 'Practice', path: '/mindmap', icon: <Brain className="w-4 h-4" /> },
    { name: 'Interview', path: '/interview', icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 mr-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <NavLink to="/" className="flex items-center space-x-2 !no-underline">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">C</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  CodePlay
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all !no-underline
                    ${isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            {/* User Actions Section */}
            <div className="flex items-center space-x-4">
              {/* Desktop Search Bar - */}
              <div className="hidden md:block relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={filters.search} // value bind 
                    onChange={handleSearch} // handleSearch function use 
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  />
                </div>
              </div>

              {/* User Profile Section */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.firstName?.[0]?.toUpperCase()}
                      </div>
                      {user.role === 'admin' && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                          <LayoutDashboard className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="hidden md:block text-left">
                      <div className="font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                      <div className="text-sm text-gray-500">@{user.username}</div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                            {user.firstName?.[0]?.toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{user.firstName} {user.lastName}</div>
                            <div className="text-sm text-gray-500">@{user.username}</div>
                            <div className="flex items-center mt-1">
                              <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                {user.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm text-blue-600 font-semibold">
                            {stats.solved}/{stats.total} solved
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" 
                            style={{ width: `${(stats.solved / stats.total) * 100 || 0}%` }}
                          />
                        </div>
                      </div>

                      <div className="py-2">
                        {user.role === 'admin' && (
                          <button
                            onClick={handleAdminClick}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <LayoutDashboard className="w-5 h-5 text-purple-500" />
                            <span>Admin Dashboard</span>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setShowProfileDropdown(false);
                            navigate('/profile');
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User className="w-5 h-5 text-gray-500" />
                          <span>My Profile</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LogOut className="w-5 h-5 text-gray-500" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <NavLink 
                    to="/login" 
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg transition-colors"
                  >
                    Sign In
                  </NavLink>
                  <NavLink 
                    to="/register" 
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all hover:scale-105"
                  >
                    Get Started
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Bar - */}
          <div className="md:hidden px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search problems..."
                value={filters.search} // value bind करो
                onChange={handleSearch} // same handleSearch function use करो
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-3 space-y-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors
                    ${isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  {item.icon && <span>{item.icon}</span>}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Close dropdown when clicking outside */}
      {showProfileDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowProfileDropdown(false)}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        {user && (
          <div className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, {user.firstName}! 
            </h1>
            <p className="text-blue-100 mb-4">
              Continue your coding journey. You've solved {stats.solved} of {stats.total} problems.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">
                  {Math.round((stats.solved / stats.total) * 100 || 0)}% Complete
                </span>
              </div>
              <div className="h-4 w-px bg-blue-400"></div>
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Easy: {stats.easy}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span>Medium: {stats.medium}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span>Hard: {stats.hard}</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Problems</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📚</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Solved</p>
                <p className="text-2xl font-bold text-green-600">{stats.solved}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Accuracy</p>
                <p className="text-2xl font-bold text-purple-600">
                  {stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">🎯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-blue-500" />
                Filter Problems
              </h2>
              <button
                onClick={() => setFilters({
                  difficulty: 'all',
                  tag: 'all',
                  status: 'all',
                  search: ''
                })}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear filters
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5"
                >
                  <option value="all">All Problems</option>
                  <option value="solved">Solved</option>
                  <option value="unsolved">Unsolved</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5"
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={filters.tag}
                  onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 px-4 py-2.5"
                >
                  <option value="all">All Categories</option>
                  <option value="array">Array</option>
                  <option value="linkedList">Linked List</option>
                  <option value="graph">Graph</option>
                  <option value="dp">Dynamic Programming</option>
                  <option value="tree">Tree</option>
                  <option value="string">String</option>
                </select>
              </div>

              <div className="md:flex md:items-end">
                <button
                  onClick={() => setFilters({ ...filters })}
                  className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2.5 px-6 rounded-lg hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Problems List with Vertical Scroll */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Coding Problems</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredProblems.length} of {problems.length} problems
                </p>
              </div>
              <div className="mt-2 sm:mt-0 text-sm text-gray-600">
                <span className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                    <span>Easy</span>
                  </span>
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                    <span>Medium</span>
                  </span>
                  <span className="flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                    <span>Hard</span>
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Problems Container with Fixed Height for Scroll */}
          {filteredProblems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                <Search className="w-full h-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No problems found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="overflow-y-auto" style={{ maxHeight: '500px' }}>
              {/* Table Headers - Sticky */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 sticky top-0 z-10 border-b border-gray-200">
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-6">Title</div>
                <div className="col-span-2">Difficulty</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-1"></div>
              </div>

              {/* Problems List */}
              <div className="divide-y divide-gray-100">
                {filteredProblems.map(problem => (
                  <div 
                    key={problem._id} 
                    className="px-4 md:px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4">
                      {/* Status */}
                      <div className="flex items-center mb-2 md:mb-0 md:col-span-1">
                        <div className="flex items-center justify-center">
                          {solvedProblems.some(sp => sp._id === problem._id) ? (
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                          ) : (
                            <Circle className="w-5 h-5 text-gray-300" />
                          )}
                        </div>
                      </div>

                      {/* Problem Info */}
                      <div className="md:col-span-6 mb-3 md:mb-0">
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <NavLink 
                              to={`/problem/${problem._id}`}
                              className=" !no-underline font-medium text-gray-900 hover:text-blue-600 transition-colors"
                            >
                              {problem.title}
                            </NavLink>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {problem.description || 'No description available'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Difficulty */}
                      <div className="md:col-span-2 mb-2 md:mb-0">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                          <span className="mr-1">{getDifficultyIcon(problem.difficulty)}</span>
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </span>
                      </div>

                      {/* Category */}
                      <div className="md:col-span-2 mb-3 md:mb-0">
                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                          {problem.tags || 'Uncategorized'}
                        </span>
                      </div>

                      {/* Action Button */}
                      <div className="md:col-span-1 flex md:justify-end">
                        <NavLink 
                          to={`/problem/${problem._id}`}
                          className=" !no-underline w-full md:w-auto bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 hover:from-blue-100 hover:to-blue-200 font-medium py-2 px-4 rounded-lg transition-all hover:shadow-sm text-center"
                        >
                          <span className="hidden md:inline">Solve</span>
                          <span className="md:hidden">View →</span>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                Showing <span className="font-semibold">{filteredProblems.length}</span> problems
              </div>
              <div className="flex items-center space-x-2">
                <button
                  disabled
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-400 bg-gray-50"
                >
                  ← Previous
                </button>
                <button
                  disabled
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-400 bg-gray-50"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-3">Quick Tips</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-blue-600 text-xs">1</span>
                </div>
                <span className="text-sm text-gray-600">Start with easy problems to build confidence</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-blue-600 text-xs">2</span>
                </div>
                <span className="text-sm text-gray-600">Practice daily to maintain consistency</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
            <h3 className="font-semibold text-gray-900 mb-3">Today's Goal</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">2 problems</p>
                <p className="text-sm text-gray-600 mt-1">Recommended for today</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xl">🎯</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
            <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Stuck on a problem? Join our community discussion.
            </p>
            <button className="w-full bg-white text-purple-600 font-medium py-2 px-4 rounded-lg border border-purple-200 hover:bg-purple-50 transition-colors">
              Visit Community
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}