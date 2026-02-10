import { useParams } from "react-router";
import { quizData } from "./questionData";
import { useState } from "react";
SolveQuestionPage
function SolveQuestionPagejj() {
    const { topic } = useParams();
    const questions = quizData[topic];  // Array of 5 questions

    const [current, setCurrent] = useState(0);

    const q = questions[current]; // current question

    return (
        <div className="p-5 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-5">Topic: {topic}</h1>

            <div className="bg-white shadow-xl rounded-2xl p-5">
                <h2 className="text-xl font-semibold mb-4">
                    Q{current + 1}. {q.question}
                </h2>

                <div className="space-y-3">
                    {q.options.map((opt, index) => (
                        <button 
                            key={index}
                            className="w-full p-3 bg-blue-100 rounded-xl hover:bg-blue-200 transition"
                        >
                            {opt}
                        </button>
                    ))}
                </div>

                <div className="flex justify-between mt-6">
                    <button 
                        onClick={() => current > 0 && setCurrent(current - 1)}
                        className="px-4 py-2 bg-gray-200 rounded-xl"
                    >
                        Previous
                    </button>

                    <button 
                        onClick={() => current < questions.length - 1 && setCurrent(current + 1)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-xl"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SolveQuestionPagejj;



import { useParams } from "react-router";
import { quizData } from "./questionData";
import { useState } from "react";
function SolveQuestionPage() {
    const { topic } = useParams();
    const question= quizData[topic];

    const[current,setCurrent]=useState(0);

    // current question
    const q=question[current]; 
    return (
        <div className="p-5 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-5">Topic: {topic}</h1>
            
            <div className="bg-white shadow-xl rounded-2xl p-5">
                <h2 className="text-xl font-semibold mb-4">
                    Q{current + 1}.{q.question}
                </h2>

                <div className="space-y-3">
                    {q.options.map((opt,index)=>(
                        <button></button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SolveQuestionPage;








router.get("/verify/:code", async (req, res) => {
  const cert = await Certificate.findOne({ verifyCode: req.params.code });

  if (!cert)
    return res.status(404).json({ valid: false, message: "Invalid certificate" });

  res.json({
    valid: true,
    userId: cert.userId,
    certificateType: cert.certificateType,
    dateIssued: cert.dateIssued
  });
});
