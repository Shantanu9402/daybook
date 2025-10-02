import { useState } from "react";
import { useAddEntryMutation } from "../../redux/api/entriesApiSlice";

// A small, reusable component for our new mood buttons
const MoodButton = ({ emoji, selectedMood, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(emoji)}
    className={`btn btn-ghost text-3xl transition-transform duration-200 ease-in-out hover:scale-110 ${
      selectedMood === emoji ? "ring-2 ring-primary scale-110" : ""
    }`}
  >
    {emoji}
  </button>
);

const AddEntry = ({ isOpen, close }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("🙂");
  const [content, setContent] = useState("");

  const [addEntry, { isLoading }] = useAddEntryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEntry({ date, title, mood, content }).unwrap();
      close();
      // Reset form state after successful submission
      setDate(new Date().toISOString().split("T")[0]);
      setTitle("");
      setMood("🙂");
      setContent("");
    } catch (error) {
      console.error("Failed to add entry:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <dialog open className="modal modal-open modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={close}>✕</button>
        </form>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="font-bold text-xl text-center">Create a New Entry</h3>
          
          <div className="form-control items-center">
             <label className="label"><span className="label-text font-semibold">How are you feeling?</span></label>
             <div className="flex justify-center items-center gap-4 bg-base-200 p-2 rounded-box">
                <MoodButton emoji="🙂" selectedMood={mood} onClick={setMood} />
                <MoodButton emoji="😔" selectedMood={mood} onClick={setMood} />
                <MoodButton emoji="😡" selectedMood={mood} onClick={setMood} />
             </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Title</span></label>
            {/* 👇 THE FIX IS HERE 👇 */}
            <label className="input-group mt-1"> 
                <span className="bg-base-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </span>
                <input type="text" placeholder="A title for your entry" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full" required />
            </label>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Content</span></label>
<br></br>

            {/* 👇 AND THE FIX IS HERE 👇 */}
            <textarea className="textarea textarea-bordered h-32 mt-1" placeholder="Write about your day..." value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
          </div>
          
          <div className="form-control">
            <label className="label"><span className="label-text">Date</span></label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input input-bordered w-full mt-1" required />
          </div>

          <div className="modal-action pt-4">
            <button type="button" className="btn btn-ghost" onClick={close}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Entry"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddEntry;