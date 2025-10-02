import { useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import {
  useGetEntriesQuery,
  useSearchEntryQuery,
} from "../redux/api/entriesApiSlice";
import EntryCard from "../components/entry/EntryCard";
import AddEntryOptions from "../components/entry/AddEntryOptions"; // 👈 1. IMPORT THE NEW COMPONENT
import Loader from "../components/Loader";

const Entries = () => {
  const user = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const { data: getEntries, isLoading: isLoadingEntries } = useGetEntriesQuery(
    undefined,
    { skip: searchQuery.length > 0 }
  );

  const { data: searchResult, isLoading: isLoadingSearch } =
    useSearchEntryQuery(searchQuery, {
      skip: searchQuery.length === 0,
    });

  if (isLoadingEntries || isLoadingSearch) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100dvh-64px-52px)]">
        <Loader />
      </div>
    );
  }

  const entries =
    searchQuery.length > 0 ? searchResult?.data || [] : getEntries?.data || [];

  return (
    <div className="relative min-h-[calc(100dvh-64px-52px)]">
      {/* 👇 2. RENDER THE NEW FLOATING BUTTON COMPONENT */}
      <AddEntryOptions />

      {entries.length === 0 ? (
        // This part handles the display when there are no entries
        <div className="text-center mt-10 mx-7">
          {searchQuery ? (
            <>
              <p className="text-2xl font-semibold mb-2">
                Sorry {user.data.firstName}, no entries found!
              </p>
              <p className="text-lg">
                It looks like there are no entries that match your search.
                Try different keywords!
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl font-semibold mb-2">
                Welcome, {user.data.firstName}
              </p>
              <p className="text-lg mb-2">
                It looks like you haven't added any entries yet.
              </p>
              <p className="text-lg">
                Start your journey by clicking the bottom '+' button!
              </p>
            </>
          )}
        </div>
      ) : (
        // This part displays the grid of entries
        <div className="flex flex-wrap gap-10 justify-center my-10 min-h-[calc(100dvh-64px-52px-80px)] mx-7">
          {entries.map((entry) => (
            <EntryCard
              key={entry._id}
              id={entry._id}
              date={entry.date}
              title={entry.title}
              mood={entry.mood}
              content={entry.content}
              updatedAt={entry.updatedAt}
              highlightText={searchQuery}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default Entries;
