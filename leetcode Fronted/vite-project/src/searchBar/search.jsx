// searchBar/search.jsx
import { useEffect, useRef, useState } from "react";
import Homepage from "../Page/homepage";
import { Trie } from "./tri";
import { useNavigate } from "react-router";
import axiosClient from "../utils/axiosClient";

export default function ProblemSearchContainer() {
  const navigate = useNavigate();
  
  const [problems, setProblems] = useState([]); 
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const trieRef = useRef(null);

  // Fetch problems from API and build Trie
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setIsLoading(true);
        const { data } = await axiosClient.get('/problem/getAllProblem');
        setProblems(data);
        
        // Build Trie using problem titles
        const trie = new Trie();
        data.forEach((p) => {
          if (p.title) {
            trie.insert(p.title);
          }
        });
        trieRef.current = trie;
      } catch (error) {
        console.error('Error fetching problems:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblems();
  }, []);

  // Handle search input from Homepage
  const handleSearchFromHomepage = (value) => {
    setSearchValue(value);
    
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Search using Trie
    if (trieRef.current) {
      const matches = trieRef.current.search(value);
      
      // Match full problem objects
      const matchedProblems = problems.filter(problem => 
        problem.title && matches.some(match => 
          match.toLowerCase() === problem.title.toLowerCase()
        )
      );
      
      setSearchResults(matchedProblems);
    }
  };

  // Navigate to problem page
  const handleProblemClick = (problemId) => {
    navigate(`/problem/${problemId}`);
  };

  return (
    <div className="relative">
      {/* Homepage search input */}
      <Homepage onSearch={handleSearchFromHomepage} />
      
      {/* Loading state */}
      {isLoading && searchValue.trim() && (
        <div
          className="
            fixed 
            top-24 sm:top-16 
            left-1/2 transform -translate-x-1/2 
            w-[95%] sm:w-full max-w-xl 
            bg-white shadow-lg rounded-md border z-50
          "
        >
          <div className="p-3 text-center">
            <div className="inline-block animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-sm text-gray-600">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Search Results */}
      {!isLoading && searchValue.trim() && (
        <div
          className="
            fixed 
            top-24 sm:top-16 
            left-1/2 transform -translate-x-1/2 
            w-[95%] sm:w-full max-w-xl 
            max-h-[60vh]
            bg-white shadow-lg rounded-md border z-50
          "
        >
          <div className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-sm text-gray-900">
                {searchResults.length > 0 
                  ? `Results (${searchResults.length})` 
                  : 'No Results'}
              </h3>
              <span className="text-xs text-gray-500">
                {problems.length} total
              </span>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="space-y-1 overflow-y-auto max-h-[50vh]">
                {searchResults.map(problem => (
                  <div 
                    key={problem._id}
                    className="p-2 hover:bg-blue-50 rounded border border-gray-100 cursor-pointer transition-colors"
                    onClick={() => handleProblemClick(problem._id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">
                          {problem.title}
                        </h4>
                        {problem.description && (
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {problem.description}
                          </p>
                        )}
                      </div>
                      <span className={`px-2 py-0.5 text-xs rounded-full ml-2 ${
                        problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                        problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {problem.difficulty || 'N/A'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-2">
                <p className="text-sm text-gray-500">
                  No problems found for "{searchValue}"
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
