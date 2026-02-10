import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Mic, Send, MessageSquare, Terminal, ChevronLeft, Cpu } from "lucide-react"; // Helpful icons
import SpeechToText from "./SpeechToText";
import TextToSpeech from "./TextToSpeech";
import Footer from "../footerr/footer";


const socket = io("http://localhost:3000");

function Interview() {
    const languages = [
        { name: "C++", icon: "C⁺⁺", color: "from-blue-500 to-cyan-500" },
        { name: "JavaScript", icon: "JS", color: "from-yellow-400 to-orange-500" },
        { name: "Java", icon: "☕", color: "from-red-500 to-red-700" },
        { name: "Node.js", icon: "JS", color: "from-green-500 to-emerald-700" },
        { name: "Python", icon: "Py", color: "from-blue-600 to-yellow-500" },
    ];

    const [selectedLang, setSelectedLang] = useState(null);
    const [messages, setMessages] = useState([]);
    const [aiReply, setAiReply] = useState("");
    const conversationRef = useRef(null);

    useEffect(() => {
        if (conversationRef.current) {
            conversationRef.current.scrollTo({
                top: conversationRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages, aiReply]);

    useEffect(() => {
        socket.on("aiText", (reply) => {
            setMessages((prev) => [...prev, { role: "ai", text: reply.trim() }]);
            setAiReply(reply.trim());
        });
        return () => socket.off("aiText");
    }, []);

    const startInterview = (lang) => {
        setSelectedLang(lang);
        setMessages([]);
        setAiReply("");
        socket.emit("startInterview", { language: lang });
    };

    const handleUserSpeech = (text) => {
        if (!text?.trim()) return;
        const userMessage = { role: "user", text: text.trim() };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setAiReply("");
        socket.emit("userText", { messages: updatedMessages, lang: selectedLang });
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900">
            {/* --- Navigation Bar --- */}
            <nav className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-2 rounded-lg">
                        <Cpu className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">AI Interviewer</span>
                </div>
                {selectedLang && (
                    <button
                        onClick={() => setSelectedLang(null)}
                        className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" /> Switch Language
                    </button>
                )}
            </nav>

            <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-8">
                {!selectedLang ? (
                    /* --- Language Selection Grid --- */
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-extrabold text-slate-900">Select your domain</h2>
                            <p className="text-slate-500">Choose a technology to begin your technical assessment.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {languages.map((lang) => (
                                <button
                                    key={lang.name}
                                    onClick={() => startInterview(lang.name)}
                                    className="group relative p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-indigo-500 transition-all duration-300 text-left"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lang.color} mb-4 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-110 transition-transform`}>
                                        {lang.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">{lang.name}</h3>
                                    <p className="text-sm text-slate-500 mt-1">Practice system design and syntax.</p>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* --- Interview View --- */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-160px)]">

                        {/* Left Col: Interviewer Status */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <Terminal className="text-indigo-600 w-8 h-8" />
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-none">Senior Engineer</h3>
                                        <p className="text-sm text-slate-500 mt-1">AI Interviewer</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Current Topic</p>
                                        <p className="text-sm font-medium text-slate-700">{selectedLang} Fundamentals</p>
                                    </div>
                                </div>
                            </div>

                            {/* Speech Button Container */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col items-center gap-4">
                                <p className="text-sm font-medium text-slate-500">Tap to respond</p>
                                <SpeechToText onResult={handleUserSpeech} />
                            </div>
                        </div>

                        {/* Right Col: Conversation Thread */}
                        <div className="lg:col-span-2 flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                <span className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" /> Live Transcript
                                </span>
                                <span className="text-xs text-slate-400">{messages.length} messages</span>
                            </div>

                            <div
                                ref={conversationRef}
                                className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200"
                            >
                                {messages.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                                        <MessageSquare className="w-12 h-12 opacity-20" />
                                        <p className="italic">Start the conversation by speaking...</p>
                                    </div>
                                ) : (
                                    messages.map((msg, i) => (
                                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm transition-all ${msg.role === "user"
                                                    ? "bg-indigo-600 text-white rounded-tr-none"
                                                    : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200"
                                                }`}>
                                                {/* <ReactMarkdown className="prose prose-slate max-w-none"> */}
                                                  <p className="whitespace-pre-wrap">{msg.text}</p>
                                                {/* </ReactMarkdown> */}
                                            
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                )}
            </main>

            {/* Hidden TTS Engine */}
            <div className="hidden">
                <TextToSpeech text={aiReply} />
            </div>
            <Footer/>
        </div>
    );
}

export default Interview;