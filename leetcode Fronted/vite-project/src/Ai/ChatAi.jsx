import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function ChatAi() {
  const [messages, setMessages] = useState([
    { role: "model", text: "Hi Ayush 👋 Paste your DSA doubt and I’ll help you." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  // Scroll to bottom whenever messages update
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Format messages to send to backend
  const formatMessages = () => [
    ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
    { role: "user", parts: [{ text: input }] }
  ];

  // Send user message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Two Sum",
          description: "Find two numbers that add up to target",
          testCases: "[2,7,11,15], target = 9",
          startCode: "function twoSum(nums, target) {}",
          messages: formatMessages()
        })
      });

      const data = await res.json();

      setMessages(prev => [...prev, { role: "model", text: data.message }]);
    } catch {
      setMessages(prev => [...prev, { role: "model", text: "⚠️ AI server not responding" }]);
    }

    setLoading(false);
  };

  // Render Markdown with code highlighting
  const renderMarkdown = (text) => (
    <ReactMarkdown
      children={text}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
              customStyle={{
                borderRadius: "12px",
                padding: "12px",
                margin: "12px 0",
                fontSize: "14px",
                lineHeight: "1.5",
                backgroundColor: "#1e293b"
              }}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              style={{
                background: "#f3f4f6",
                padding: "2px 6px",
                borderRadius: "6px",
                fontSize: "13px"
              }}
              {...props}
            >
              {children}
            </code>
          );
        }
      }}
    />
  );

  // Message bubble style
  const getMessageStyle = (role) => ({
    ...styles.message,
    alignSelf: role === "user" ? "flex-end" : "flex-start",
    background: role === "user" ? "#4f46e5" : "#f3f4f6",
    color: role === "user" ? "white" : "#1f2937",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🧠 DSA AI Tutor</h2>

      <div ref={chatRef} style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div key={i} style={getMessageStyle(msg.role)}>
            {renderMarkdown(msg.text)}
          </div>
        ))}
        {loading && <div style={styles.typing}>🤖 AI is thinking...</div>}
      </div>

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask your DSA doubt..."
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button style={styles.button} onClick={sendMessage} disabled={loading}>
          {loading ? "⏳" : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatAi;

/* ---------------- STYLES ---------------- */
const styles = {
  container: {
    width: "100%",
    maxWidth: "700px",
    margin: "40px auto",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
    height: "80vh",
    background: "#ffffff"
  },
  header: {
    padding: "14px",
    background: "#111827",
    color: "white",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "600",
    letterSpacing: "0.5px"
  },
  chatBox: {
    flex: 1,
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    overflowY: "auto",
    background: "#f9fafb"
  },
  message: {
    maxWidth: "75%",
    padding: "12px 18px",
    borderRadius: "16px",
    fontSize: "15px",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    transition: "background 0.3s"
  },
  typing: {
    fontSize: "13px",
    color: "#6b7280",
    padding: "6px 10px",
    fontStyle: "italic"
  },
  inputBox: {
    display: "flex",
    borderTop: "1px solid #e5e7eb",
    background: "#ffffff",
    padding: "8px 12px",
    gap: "8px"
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    outline: "none",
    fontSize: "14px",
    background: "transparent"
  },
  button: {
    padding: "0 24px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    borderRadius: "12px",
    transition: "background 0.3s",
    height: "40px"
  }
};
