import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [isNew, setIsNew] = useState(false);
  return (
    <main className="flex flex-1 items-center justify-center">
      {isNew ? (
        <Register setIsNew={setIsNew} />
      ) : user ? (
        <div className="flex flex-col text-lg">
          Hello {user.firstName} {user.lastName}
          <button
            className="bg-red-300 p-3 rounded-sm text-black"
            onClick={() => {
              setUser(false);
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Login setUser={setUser} setIsNew={setIsNew} />
      )}
      <ToastContainer />
    </main>
  );
};

export default App;
