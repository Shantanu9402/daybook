import { useState, useEffect } from "react"; // 👈 1. Import useEffect
import { useNavigate, useSearchParams } from "react-router-dom"; // 👈 2. Import useSearchParams

const SearchBox = ({ toggle }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // 👈 3. Get the search params from the URL

  // Initialize state from the URL's search query, or empty if none exists
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  // 👈 4. Add a useEffect to sync the input when the URL changes (e.g., using browser back/forward)
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/entries?search=${searchQuery.trim()}`);
      // We don't clear the query here anymore, so the box stays filled
    } else {
      // If the user submits an empty search, clear the search results
      navigate("/entries");
    }
    // This is for closing a mobile menu or search overlay, which is a great feature!
    toggle && toggle();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="join">
        <input
          name="search"
          className="input join-item bg-base-100"
          placeholder="Search Entries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className="btn join-item rounded-r-full bg-base-100"
        >
          Search
        </button>
      </div>
    </form>
  );
};
export default SearchBox;