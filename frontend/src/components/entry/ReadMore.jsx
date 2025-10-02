import { useState } from "react";
import ModalLayout from "../ModalLayout"; // Your existing ModalLayout component

const ReadMore = ({
  formattedDate,
  title,
  mood,
  content,
  formattedUpdateAt,
}) => {
  const [open, setOpen] = useState(false);

  // This new function intelligently decides how to display the content
  const renderContent = () => {
    // First, we check if the content looks like a chat transcript
    const isChatLog = content.includes("DayBook:") && content.includes("You:");

    if (!isChatLog) {
      // If it's a normal entry, we return it as a simple paragraph
      // We use whitespace-pre-wrap to respect any line breaks the user made
      return <p className="break-words whitespace-pre-wrap">{content}</p>;
    }

    // If it IS a chat log, we parse it and display it as chat bubbles
    const messages = content.split('\n\n'); // Split the transcript into individual messages

    return (
      <div className="space-y-3 py-2">
        {messages.map((message, index) => {
          // Determine if the message is from the user or the AI
          const isUser = message.startsWith("You:");
          // Get the actual text after "You:" or "DayBook:"
          const text = message.substring(message.indexOf(":") + 1).trim();

          return (
            <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`rounded-lg px-4 py-2 max-w-md ${
                  isUser ? "bg-primary text-white" : "bg-base-300" // Different colors for user vs. AI
                }`}
              >
                {text}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <button
        className="btn btn-sm btn-outline btn-primary"
        onClick={() => setOpen(true)}
      >
        Read More
      </button>

      <ModalLayout isOpen={open} close={() => setOpen(false)}>
        <div>
          <div className="block text-center card-title pb-2">
            <span>{mood} </span>
            <span>{title} </span>
            <span>{mood} </span>
          </div>

          <div className="text-left text-sm p-2 pb-1">
            Date: {formattedDate}
          </div>

          <div className="card-body p-2 pb-0">
            {/* We now call our new render function here! */}
            {renderContent()}
          </div>

          <div className="text-right text-sm p-2 pb-0">
            Last edit: {formattedUpdateAt}
          </div>
        </div>
      </ModalLayout>
    </>
  );
};
export default ReadMore;