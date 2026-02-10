import { Link } from "react-router"; // must use react-router-dom

function TopicSelect() {
  const QuizTopic = ["DSA", "React", "Javascript", "C++", "Python", "Java"];

  return (
    <div>
      {QuizTopic.map((item, index) => (
        <div className="topic" key={index}>
          <h3>{item}</h3>
          <Link to={`/contest/SloveQuiz/${encodeURIComponent(item)}`}>
            <button>Start Quiz</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default TopicSelect;
