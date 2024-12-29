import React, { useState } from "react";
import axios from "axios";

export const ManualKeyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification("");

    try {
      // Call the DiamCircle API
      const response = await axios.get(
        `https://friendbot.diamcircle.io/?addr=${publicKey}`
      );
      if (response.status === 200) {
        setNotification(`Account is funded successfully!`);
      }
    } catch (error) {
      if (
        error.response?.status === 400 &&
        error.response?.data?.detail?.startsWith("createAccountAlreadyExist")
      ) {
        setNotification(`This account has already been Funded.`);
      } else {
        setNotification(
          `Error: ${error.response?.data?.detail || error.message}`
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="public-key"
          className="block text-sm font-medium text-[#bfe3e9]"
        >
          Your Public Key
        </label>
        <div className="relative group">
          <input
            type="text"
            id="public-key"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            required
            className="input-field w-full px-4 py-3 rounded-xl focus:outline-none"
            placeholder="Enter your public key"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#4dbece] to-[#26585f] opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="relative w-full group overflow-hidden rounded-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#4dbece] to-[#26585f] group-hover:opacity-90 transition-opacity duration-300" />
        <div className="relative px-6 py-3 text-[#bfe3e9] font-semibold">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Processing...</span>
            </div>
          ) : (
            "Request Tokens"
          )}
        </div>
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700" />
      </button>

      {notification && (
        <div
          id="notification"
          className="mt-4 p-4 text-center text-white rounded bg-gradient-to-r from-green-400 to-blue-500"
        >
          {notification}
        </div>
      )}
    </form>
  );
};
