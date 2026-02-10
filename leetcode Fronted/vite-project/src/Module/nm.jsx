// import { useParams } from "react-router";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';


// function SolveQuestionPage() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { topic } = useParams();

//   useEffect(() => {
//     async function fetchQuiz() {
//       try {
//         setLoading(true);
//         const res = await axios.post("http://localhost:3000/Quiz/fetchContentData", {
//           topic: topic
//         });
//         setData(res.data);
//       } catch (err) {
//         setError(err.message);
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchQuiz();
//   }, [topic]);

//   // Mock related topics for sidebar
//   const relatedTopics = [
//     { name: "Binary Tree", path: "/topic/binary-tree" },
//     { name: "AVL Tree", path: "/topic/avl-tree" },
//     { name: "Red-Black Tree", path: "/topic/red-black-tree" },
//     { name: "Heap Data Structure", path: "/topic/heap" },
//     { name: "Graph Traversal", path: "/topic/graph-traversal" },
//     { name: "Dynamic Programming", path: "/topic/dp" },
//   ];

//   if (loading) {
//     return (
//       <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light">
//         <div className="text-center">
//           <div className="spinner-border text-primary" style={{width: '3rem', height: '3rem'}} role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-3 h5 text-secondary">Loading {topic} content...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-danger" role="alert">
//           <h4 className="alert-heading">Error Loading Content</h4>
//           <p>{error}</p>
//           <hr />
//           <button 
//             className="btn btn-danger"
//             onClick={() => window.location.reload()}
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="container mt-5">
//         <div className="alert alert-warning" role="alert">
//           <h4 className="alert-heading">No Content Available</h4>
//           <p>No data found for topic: {topic}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container-fluid px-0 bg-light">
//       {/* Top Navigation Bar */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom">
//         <div className="container">
//           <a className="navbar-brand fw-bold text-primary" href="#">
//             <span className="me-2">🌳</span>
//             DSA Learning Portal
//           </a>
//           <div className="d-flex align-items-center">
//             <button className="btn btn-outline-primary me-2">
//               Practice
//             </button>
//             <button className="btn btn-primary">
//               Take Quiz
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="container-fluid">
//         <div className="row">
//           {/* Left Sidebar */}
//           <div className="col-lg-2 d-none d-lg-block bg-white border-end min-vh-100 p-0">
//             <div className="sticky-top pt-3">
//               <div className="sidebar-header px-3 pb-3 border-bottom">
//                 <h6 className="text-uppercase text-muted fw-bold mb-3">Content</h6>
//                 <div className="list-group list-group-flush">
//                   {data.sections?.map((section, index) => (
//                     <a 
//                       key={index}
//                       href={`#section-${index}`}
//                       className="list-group-item list-group-item-action border-0 py-2"
//                     >
//                       <span className="me-2">📄</span>
//                       {section.title}
//                     </a>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="px-3 py-4">
//                 <h6 className="text-uppercase text-muted fw-bold mb-3">Related Topics</h6>
//                 <div className="list-group list-group-flush">
//                   {relatedTopics.map((topic, index) => (
//                     <a 
//                       key={index}
//                       href={topic.path}
//                       className="list-group-item list-group-item-action border-0 py-2"
//                     >
//                       <span className="badge bg-light text-primary me-2">{index + 1}</span>
//                       {topic.name}
//                     </a>
//                   ))}
//                 </div>
//               </div>

//               <div className="px-3 py-4 border-top">
//                 <h6 className="text-uppercase text-muted fw-bold mb-3">Complexity</h6>
//                 <div className="card border-0 bg-light">
//                   <div className="card-body p-3">
//                     <div className="d-flex justify-content-between mb-2">
//                       <span className="text-muted">Best Case:</span>
//                       <span className="badge bg-success">O(log n)</span>
//                     </div>
//                     <div className="d-flex justify-content-between">
//                       <span className="text-muted">Worst Case:</span>
//                       <span className="badge bg-danger">O(n)</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="col-lg-8 col-md-12 py-4">
//             <div className="container">
//               {/* Breadcrumb */}
//               <nav aria-label="breadcrumb" className="mb-4">
//                 <ol className="breadcrumb">
//                   <li className="breadcrumb-item"><a href="/" className="text-decoration-none">Home</a></li>
//                   <li className="breadcrumb-item"><a href="/topics" className="text-decoration-none">Data Structures</a></li>
//                   <li className="breadcrumb-item active" aria-current="page">{data.topic}</li>
//                 </ol>
//               </nav>

//               {/* Topic Header */}
//               <div className="card border-0 shadow-sm mb-4 bg-primary text-white">
//                 <div className="card-body">
//                   <h1 className="card-title display-6 fw-bold mb-3">
//                     <span className="me-3">🌳</span>
//                     {data.topic}
//                   </h1>
//                   <p className="card-text opacity-75">
//                     A comprehensive guide to Binary Search Trees with detailed explanations, operations, and complexity analysis.
//                   </p>
//                   <div className="d-flex gap-2 mt-3">
//                     <span className="badge bg-light text-dark">Intermediate</span>
//                     <span className="badge bg-light text-dark">15 min read</span>
//                     <span className="badge bg-light text-dark">Important</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Content Sections */}
//               {data.sections?.map((section, index) => (
//                 <div 
//                   key={index} 
//                   id={`section-${index}`}
//                   className="card border-0 shadow-sm mb-4"
//                 >
//                   <div className="card-header bg-white border-0 py-3">
//                     <h3 className="card-title mb-0 d-flex align-items-center">
//                       <span className="badge bg-primary me-3 p-2">{index + 1}</span>
//                       {section.title}
//                     </h3>
//                   </div>
//                   <div className="card-body">
//                     {section.title === "Operations" || section.title === "Time Complexity" ? (
//                       <div className="table-responsive">
//                         <table className="table table-hover">
//                           <tbody>
//                             {section.body.map((item, idx) => {
//                               if (item.includes(':')) {
//                                 const [key, value] = item.split(':');
//                                 return (
//                                   <tr key={idx}>
//                                     <td className="fw-bold" style={{width: '30%'}}>
//                                       {key.trim()}
//                                     </td>
//                                     <td>
//                                       {value.trim()}
//                                     </td>
//                                   </tr>
//                                 );
//                               }
//                               return (
//                                 <tr key={idx}>
//                                   <td colSpan="2" className="fw-bold text-primary pt-4">
//                                     {item}
//                                   </td>
//                                 </tr>
//                               );
//                             })}
//                           </tbody>
//                         </table>
//                       </div>
//                     ) : section.title === "Advantages" || section.title === "Disadvantages" ? (
//                       <div className="list-group list-group-flush">
//                         {section.body.map((item, idx) => (
//                           <div 
//                             key={idx}
//                             className={`list-group-item border-0 py-2 ${section.title === "Advantages" ? 'text-success' : 'text-danger'}`}
//                           >
//                             <div className="d-flex align-items-start">
//                               <span className={`me-3 ${section.title === "Advantages" ? 'text-success' : 'text-danger'}`}>
//                                 {section.title === "Advantages" ? '✓' : '✗'}
//                               </span>
//                               <span>{item}</span>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="content-text">
//                         {section.body.map((item, idx) => (
//                           <div key={idx} className="mb-3">
//                             <div className="d-flex align-items-start">
//                               <span className="badge bg-light text-dark me-3 mt-1">●</span>
//                               <p className="mb-0">{item}</p>
//                             </div>
//                             {idx < section.body.length - 1 && <hr className="my-3" />}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}

//               {/* Practice Section */}
//               <div className="card border-0 shadow-sm mb-4">
//                 <div className="card-header bg-white border-0">
//                   <h3 className="card-title mb-0">Practice Problems</h3>
//                 </div>
//                 <div className="card-body">
//                   <div className="row g-3">
//                     <div className="col-md-4">
//                       <div className="card border h-100">
//                         <div className="card-body">
//                           <h5 className="card-title">Search in BST</h5>
//                           <p className="card-text text-muted small">Implement search operation</p>
//                           <span className="badge bg-warning text-dark">Easy</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-4">
//                       <div className="card border h-100">
//                         <div className="card-body">
//                           <h5 className="card-title">Insert in BST</h5>
//                           <p className="card-text text-muted small">Implement insertion operation</p>
//                           <span className="badge bg-warning text-dark">Easy</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-4">
//                       <div className="card border h-100">
//                         <div className="card-body">
//                           <h5 className="card-title">Delete from BST</h5>
//                           <p className="card-text text-muted small">Implement deletion with all cases</p>
//                           <span className="badge bg-danger">Medium</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Sidebar for Mobile Menu */}
//           <div className="col-lg-2 d-none d-lg-block bg-white border-start min-vh-100 p-0">
//             <div className="sticky-top pt-3">
//               <div className="px-3 pb-3 border-bottom">
//                 <h6 className="text-uppercase text-muted fw-bold mb-3">Quick Links</h6>
//                 <div className="d-grid gap-2">
//                   <button className="btn btn-outline-primary">
//                     📊 View Complexity Chart
//                   </button>
//                   <button className="btn btn-outline-success">
//                     💾 Download Notes
//                   </button>
//                   <button className="btn btn-outline-info">
//                     🎯 Take Practice Test
//                   </button>
//                 </div>
//               </div>

//               <div className="px-3 py-4">
//                 <h6 className="text-uppercase text-muted fw-bold mb-3">Important Points</h6>
//                 <div className="list-group list-group-flush">
//                   <div className="list-group-item border-0 py-2">
//                     <small className="text-muted">Height Balanced</small>
//                     <div className="progress mt-1" style={{height: '5px'}}>
//                       <div className="progress-bar bg-success" style={{width: '85%'}}></div>
//                     </div>
//                   </div>
//                   <div className="list-group-item border-0 py-2">
//                     <small className="text-muted">Search Efficiency</small>
//                     <div className="progress mt-1" style={{height: '5px'}}>
//                       <div className="progress-bar bg-primary" style={{width: '90%'}}></div>
//                     </div>
//                   </div>
//                   <div className="list-group-item border-0 py-2">
//                     <small className="text-muted">Memory Usage</small>
//                     <div className="progress mt-1" style={{height: '5px'}}>
//                       <div className="progress-bar bg-info" style={{width: '70%'}}></div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="px-3 py-4 border-top">
//                 <h6 className="text-uppercase text-muted fw-bold mb-3">Rate This Content</h6>
//                 <div className="text-center">
//                   <div className="h2 mb-2">
//                     <span className="text-warning">★</span>
//                     <span className="text-warning">★</span>
//                     <span className="text-warning">★</span>
//                     <span className="text-warning">★</span>
//                     <span className="text-muted">★</span>
//                   </div>
//                   <small className="text-muted">4.0 out of 5</small>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Navigation */}
//       <div className="d-lg-none fixed-bottom bg-white border-top shadow-lg">
//         <div className="container">
//           <div className="row py-2">
//             <div className="col-4 text-center">
//               <button className="btn btn-link text-decoration-none">
//                 <span className="d-block">📚</span>
//                 <small>Content</small>
//               </button>
//             </div>
//             <div className="col-4 text-center">
//               <button className="btn btn-link text-decoration-none">
//                 <span className="d-block">📊</span>
//                 <small>Practice</small>
//               </button>
//             </div>
//             <div className="col-4 text-center">
//               <button className="btn btn-link text-decoration-none">
//                 <span className="d-block">🎯</span>
//                 <small>Quiz</small>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-dark text-white py-4 mt-5">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-6">
//               <h5>DSA Learning Portal</h5>
//               <p className="text-muted">
//                 Learn Data Structures and Algorithms with detailed explanations and examples.
//               </p>
//             </div>
//             <div className="col-md-3">
//               <h6>Quick Links</h6>
//               <ul className="list-unstyled">
//                 <li><a href="#" className="text-decoration-none text-muted">Topics</a></li>
//                 <li><a href="#" className="text-decoration-none text-muted">Practice</a></li>
//                 <li><a href="#" className="text-decoration-none text-muted">Contests</a></li>
//               </ul>
//             </div>
//             <div className="col-md-3">
//               <h6>Resources</h6>
//               <ul className="list-unstyled">
//                 <li><a href="#" className="text-decoration-none text-muted">Articles</a></li>
//                 <li><a href="#" className="text-decoration-none text-muted">Videos</a></li>
//                 <li><a href="#" className="text-decoration-none text-muted">Cheatsheets</a></li>
//               </ul>
//             </div>
//           </div>
//           <hr className="bg-secondary" />
//           <div className="text-center text-muted">
//             <small>© 2024 DSA Learning Portal. All rights reserved.</small>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default SolveQuestionPage;