import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      {/* --- This top section is unchanged --- */}
      <div className="flex justify-center items-center min-h-[calc(100svh-64px-40px)] relative">
        <div className="text-center py-10 max-w-3xl mx-4">
          {user ? (
            <>
              <h1 className="text-3xl xl:text-5xl font-bold text-primary">
                Welcome Back, {user.data.firstName}
              </h1>
              <p className="text-lg mt-4">
                Hey! Great to have you back 😊 Your entries are safe, private,
                and always within reach. No rules just your thoughts, your way.
                Keep writing, keep growing! 🚀✨
              </p>
              <div className="mt-6 space-x-4">
                 <Link to="/entries" className="btn btn-primary">
                    Go to Your Entries
                 </Link>
                 <Link to="/chat-journal" className="btn btn-secondary">
                    + New AI Entry
                 </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl xl:text-5xl font-bold text-primary">
                Welcome to DayBook
              </h1>
              <p className="text-lg mt-4">
                Hey! Great to have you here 😊 Log in to keep your entries safe,
                private, and always within reach. Write freely, your thoughts
                your way! 🚀✨
              </p>
              <Link to="/entries" className="btn btn-primary mt-6">
                Get Started
              </Link>
            </>
          )}
        </div>
        <div className="absolute bottom-10 animate-bounce">
          <span className="text-gray-500 text-sm">
            Scroll down to discover more ↓
          </span>
        </div>
      </div>

      {/* --- THIS IS THE UPDATED SECTION --- */}
      <div className="flex justify-center items-center min-h-[calc(100svh-64px-40px)]">
        <div className="mt-16 max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center pb-2">
            Features Designed For You
          </h2>
          <p className="text-center text-gray-500 max-w-2xl mx-auto">
            Everything you need to build a consistent and insightful journaling habit, all in one place.
          </p>

          {/* A single, unified grid for all features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
            
            {/* Feature 1: AI Assistant */}
            <div className="p-6 bg-base-100 shadow-lg rounded-lg ">
              <h4 className="text-lg font-semibold">AI Conversational Assistant</h4>
              <p className="text-gray-500 mt-2">
                Chat with our friendly AI to explore your thoughts. It asks gentle questions and turns your conversation into a perfectly formatted journal entry.
              </p>
            </div>

            {/* Feature 2: Daily Journaling */}
            <div className="p-6 bg-base-100 shadow-lg rounded-lg">
              <h4 className="text-lg font-semibold">Daily Journaling</h4>
              <p className="text-gray-500 mt-2">
                Develop a daily habit of writing and reflecting. The more
                you write, the more you understand yourself.
              </p>
            </div>

            {/* Feature 3: Entry Management */}
            <div className="p-6 bg-base-100 shadow-lg rounded-lg">
              <h4 className="text-lg font-semibold">Entry Management</h4>
              <p className="text-gray-500 mt-2">
                Easily add, edit, and delete entries while keeping your
                thoughts organized and accessible anytime.
              </p>
            </div>

            {/* Feature 4: Secure & Private */}
            <div className="p-6 bg-base-100 shadow-lg rounded-lg">
              <h4 className="text-lg font-semibold">Secure & Private</h4>
              <p className="text-gray-500 mt-2">
                Your entries are stored securely on the cloud, ensuring that
                your private thoughts remain personal and your data is never lost.
              </p>
            </div>
            
            {/* Feature 5: Sign Up */}
            <div className="p-6 bg-base-100 shadow-lg rounded-lg">
              <h4 className="text-lg font-semibold">Simple Sign Up</h4>
              <p className="text-gray-500 mt-2">
                Create a free account in seconds to start your journey. All your
                entries are automatically synced and saved.
              </p>
            </div>

            {/* Feature 6: Profile Management */}
            <div className="p-6 bg-base-100 shadow-lg rounded-lg">
              <h4 className="text-lg font-semibold">Profile Management</h4>
              <p className="text-gray-500 mt-2">
                Keep your account secure and personalized by easily updating your name or changing your password.
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;