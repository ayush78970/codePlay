import { useParams,useNavigate } from "react-router";
import {dsa} from '../contest/Data/dsa'
import { ReactData } from "../contest/Data/react";
import { useState, useEffect } from "react";

function SloveQuiz() {
  const { topic2 } = useParams();
  const topic = decodeURIComponent(topic2);
  const navigate = useNavigate();

  let decide;
  if(topic=="DSA"){
    decide=dsa
  }else if(topic=="React"){
    decide=ReactData
  }

  const PASSING_SCORE = 1;


  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 min
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qid, optionId) => {
    if (submitted) return;
    setAnswers({ ...answers, [qid]: optionId });
  };

  // ⏱ TIMER
  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(); // auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  const handleSubmit = () => {
    let result = 0;

    decide.forEach((q) => {
      if (answers[q.id] === q.correctOption) {
        result++;
      }
    });

    setScore(result);
    setSubmitted(true);

    // optional storage
    localStorage.setItem(
      "quizResult",
      JSON.stringify({
        topic,
        score: result,
        total: decide.length,
        answers,
      })
    );
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow border-0">
            <div className="card-body p-4">

              {/* HEADER */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">{topic} Quiz</h4>
                <span className="badge bg-danger fs-6">
                  ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
                </span>
              </div>

              {decide.map((q, index) => (
                <div key={q.id} className="mb-4">

                  <h6 className="fw-semibold mb-3">
                    {index + 1}. {q.question}
                  </h6>

                  {q.options.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      className={`quiz-option p-3 mb-2 rounded border
                        ${answers[q.id] === opt.id ? "selected" : ""}
                      `}
                    >
                      <strong>{opt.id}.</strong> {opt.text}
                    </div>
                  ))}
                </div>
              ))}

              <button
                onClick={handleSubmit}
                disabled={submitted}
                className="btn btn-primary w-100 py-2 fw-semibold"
              >
                Submit Quiz
              </button>

              {submitted && (
                <div className="alert alert-success text-center mt-4">
                  🎉 Score: <strong>{score}</strong> / {decide.length}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>


{submitted && score >= PASSING_SCORE && (
  <div className="text-center mt-3">
    <button
      className="btn btn-success px-4 py-2 fw-semibold"
      onClick={() => navigate(`/contest/GenerateCertificate/${topic}`)}
    >
      🎓 Generate Certificate
    </button>
  </div>
)}


    </div>
  );
}

export default SloveQuiz;
