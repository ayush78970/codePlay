import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./Page/login";
import Signup from "./Page/signup";
import Homepage from "./Page/homepage";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./authSlice";
import { useEffect } from "react";
import AdminPanel from "./components/AdminPanel";
import Admin from "./Page/Admin";
import AdminDelete from "./components/AdminDelete";
import ProblemPage from "./problemPage/ProblemPage";
import ModuleDefault from "./Module/moduleDefault";
import Module from "./Module/module.jsx";
import SolveQuestionPage from "./Module/slovePage";
import GenerateCertificate from "./certificate/certificate";
import TopicSelect from "./contest/topicSelect.jsx";
import SloveQuiz from "./contest/sloveQuiz.jsx";
import CertificatePage from "./certificate/CertificatePage.jsx";
import FirstPage from "./Page/firstPage.jsx";
import AboutOrganisation from "./Page/aboutOrg.jsx";
import Profile from "./Profile/profile.jsx";
import Interviw from "./interview/interviw.jsx";
import ProblemSearchContainer from "./searchBar/search.jsx";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  
  useEffect(() => { 
    dispatch(checkAuth()); 
  }, [dispatch]);
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
  
  return (
    <Routes>
      {/* Homepage route - use ProblemSearchContainer instead of Homepage */}
      <Route 
        path="/" 
        element={isAuthenticated ? <ProblemSearchContainer /> : <Navigate to="/first" />} 
      />
      
      <Route 
        path="/first" 
        element={isAuthenticated ? <Navigate to="/"/> : <FirstPage/>}
      />
      
      <Route 
        path="/aboutOrganisation" 
        element={<AboutOrganisation/>}
      />
      
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
      />
      
      <Route 
        path="/signup" 
        element={isAuthenticated ? <Navigate to="/" /> : <Signup />} 
      />
      
      <Route 
        path="/problem/:problemId" 
        element={<ProblemPage />} 
      />
      
      <Route 
        path="/admin" 
        element={isAuthenticated && user?.role === "admin" ? <Admin /> : <Navigate to="/" />} 
      />
      
      <Route 
        path="/admin/create" 
        element={isAuthenticated && user?.role === "admin" ? <AdminPanel /> : <Navigate to="/" />} 
      />
      
      <Route 
        path="/admin/delete" 
        element={isAuthenticated && user?.role === "admin" ? <AdminDelete /> : <Navigate to="/" />} 
      />
      
      <Route path="/mindmap" element={<ModuleDefault />}>
        <Route index element={<Module />} />
        <Route path="SolveQuestionPage/:topic" element={<SolveQuestionPage />} />
      </Route>
      
      <Route path="/contest" element={<ModuleDefault />}>
        <Route index element={<TopicSelect />} />
        <Route path="SloveQuiz/:topic2" element={<SloveQuiz />} />
        <Route path="GenerateCertificate/:topic3" element={<GenerateCertificate />} />
      </Route>
      
      <Route 
        path="/certificate/:certId" 
        element={<CertificatePage />} 
      />

      <Route 
        path="/profile" 
        element={<Profile/>}
      />
      
      <Route 
        path="/interview" 
        element={<Interviw/>}
      />
      
      {/* REMOVED the duplicate /signup route */}
    </Routes>
  );
}

export default App;