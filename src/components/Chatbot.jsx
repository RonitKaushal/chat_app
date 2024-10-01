import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, RotateCcw, Copy, Volume2 } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Welcome to our Hotel Booking Chatbot!", user: false },
    { text: "How can I assist you today? You can start a booking by saying 'I want to book a hotel'.", user: false }
  ]);
  const [input, setInput] = useState('');
  const [bookingState, setBookingState] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copyAlert, setCopyAlert] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, user: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulating API call
    setTimeout(() => {
      const botMessage = { 
        text: "This is a sample response. In a real implementation, this would come from your backend API.",
        user: false 
      };
      setMessages(prev => [...prev, botMessage]);
      setLoading(false);
    }, 1000);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopyAlert(true);
    setTimeout(() => setCopyAlert(false), 2000);
  };

  const handleSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-indigo-100 to-purple-100">
      <div className="flex items-center justify-center p-4 bg-white shadow-md">
        <MessageSquare className="w-6 h-6 text-indigo-600 mr-2" />
        <h1 className="text-xl font-semibold text-gray-800">AI Hotel Booking Assistant</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.user ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex flex-col ${message.user ? 'items-end' : 'items-start'}`}>
              <div className={`px-4 py-2 rounded-lg ${
                message.user 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white shadow-lg border border-gray-100'
              } max-w-xs lg:max-w-md`}>
                {message.text}
              </div>
              
              {!message.user && (
                <div className="flex mt-2 space-x-2">
                  <button onClick={() => handleSpeak(message.text)} className="p-1 hover:bg-gray-100 rounded">
                    <Volume2 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button onClick={() => handleCopy(message.text)} className="p-1 hover:bg-gray-100 rounded">
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ThumbsUp className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <ThumbsDown className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <RotateCcw className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-4 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-full px-8 py-3 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors duration-200"
            disabled={!input.trim() || loading}
          >
            Send
          </button>
        </div>
      </form>
      
      {copyAlert && (
        <div className="fixed bottom-20 right-4">
          <Alert>
            <AlertDescription>
              Text copied to clipboard!
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}