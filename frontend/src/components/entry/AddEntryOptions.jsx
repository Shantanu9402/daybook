import { useState } from "react";
import { Link } from "react-router-dom";
import AddEntry from "./AddEntry"; // Your newly updated AddEntry component

const AddEntryOptions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // This function handles opening the manual entry modal and closing the options menu
  const openManualEntry = () => {
    setIsModalOpen(true);
    setIsOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-10 right-8 z-50">
        <div className="relative flex flex-col items-center gap-4">
          
          {/* AI Assistant Button */}
          <Link
            to="/chat-journal"
            className={`transition-all duration-300 flex items-center gap-3 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <span className="bg-base-100 p-2 rounded-md shadow-md text-sm">AI Assistant</span>
            <div className="btn btn-secondary btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
            </div>
          </Link>

          {/* Manual Entry Button */}
          <button
            onClick={openManualEntry}
            className={`transition-all duration-300 flex items-center gap-3 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
          >
            <span className="bg-base-100 p-2 rounded-md shadow-md text-sm">Manual Entry</span>
            <div className="btn btn-primary btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
            </div>
          </button>
          
          {/* Main Toggle Button (+) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`btn btn-accent btn-circle btn-lg transition-transform duration-300 ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </div>

      {/* The modal for manual entry, now correctly controlled by this component */}
      <AddEntry isOpen={isModalOpen} close={() => setIsModalOpen(false)} />
    </>
  );
};

export default AddEntryOptions;