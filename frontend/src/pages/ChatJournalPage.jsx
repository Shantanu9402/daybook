import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAddEntryMutation } from "../redux/api/entriesApiSlice"; // 👈 1. Import the mutation hook

// A single chat bubble component
const ChatBubble = ({ message, isUser }) => (
  <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
    <div
      className={`rounded-lg px-4 py-2 max-w-sm ${
        isUser ? "bg-primary text-white" : "bg-base-200"
      }`}
    >
      {message}
    </div>
  </div>
);

const ChatJournalPage = () => {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  // 👇 2. Initialize the hook. It gives us the function to save, and a loading state.
  const [addEntry, { isLoading: isSaving }] = useAddEntryMutation();

  // useEffect to start the conversation with a greeting
  useEffect(() => {
    setHistory([{ role: 'model', parts: [{ text: "How was your day?" }] }]);
  }, []);

  // useEffect to scroll to the bottom of the chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Handles sending a message to the AI (This part is unchanged and correct)
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || isSaving) return;
    const userMessage = { role: 'user', parts: [{ text: input }] };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    setInput("");
    setIsLoading(true);
    try {
      const response = await fetch('/api/ai/chat-journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: newHistory }),
        credentials: 'include',
      });
      const data = await response.json();
      const modelMessage = { role: 'model', parts: [{ text: data.reply }] };
      setHistory([...newHistory, modelMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 👇 3. The updated save handler using the Redux mutation
  const handleSaveConversation = async () => {
    if (history.filter(m => m.role === 'user').length === 0) {
      alert("Please have a conversation before saving.");
      return;
    }
    try {
      const formattedContent = history
        .map(msg => `${msg.role === 'user' ? 'You' : 'DayBook'}: ${msg.parts[0].text}`)
        .join('\n\n');

      // Call the `addEntry` mutation from our hook
      await addEntry({
        date: new Date().toISOString(),
        title: "Chat Journal Entry",
        mood: "🙂",
        content: formattedContent,
      }).unwrap(); // .unwrap() will throw an error if the mutation fails
      
      // On success, navigate to the entries page. The page will auto-refresh.
      navigate('/entries');

    } catch (error) {
      console.error("Error saving conversation:", error);
      alert(`Error: ${error.data?.message || 'Failed to save entry.'}`);
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100svh-80px)] max-w-xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4">
        {history.map((msg, index) => (
          <ChatBubble key={index} message={msg.parts[0].text} isUser={msg.role === 'user'} />
        ))}
        {isLoading && <ChatBubble message="..." isUser={false} />}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSend} className="p-4 flex items-center border-t">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="input input-bordered flex-1 mr-2"
          disabled={isLoading || isSaving}
        />
        <button type="submit" className="btn btn-primary" disabled={isLoading || isSaving}>
          Send
        </button>
        <button 
          type="button" 
          onClick={handleSaveConversation} 
          className="btn btn-success ml-2" 
          disabled={isLoading || isSaving || history.filter(m => m.role === 'user').length === 0}
        >
          {isSaving ? "Saving..." : "Save Conversation"}
        </button>
      </form>
    </div>
  );
};

export default ChatJournalPage;