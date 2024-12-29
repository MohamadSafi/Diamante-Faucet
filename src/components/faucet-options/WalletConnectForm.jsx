import React, { useState } from "react";
import { Button } from "../ui/Button";
import axios from "axios";

export const WalletConnectForm = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userPublicKey, setUserPublicKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState("");

  const handleConnect = async () => {
    if (!window.diam) {
      alert("Diam wallet is not installed. Please install it to proceed.");
      return;
    }
    setNotification("");
    try {
      const result = await window.diam.connect();
      const publicKey = result.message.data[0];
      const publicKeyS = publicKey.diamPublicKey;
      setUserPublicKey(publicKeyS);
      setIsConnected(true);
    } catch (error) {
      setNotification("Failed to connect to Diam wallet. Please try again.");
      console.error("Error connecting to Diam wallet:", error);
    }
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification("");
    try {
      // Call the DiamCircle API
      const response = await axios.get(
        `https://friendbot.diamcircle.io/?addr=${userPublicKey}`
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

  const formatPublicKey = (key) => {
    if (!key) return "";
    return `${key.slice(0, 6)}...${key.slice(-6)}`; // Show first 6 and last 6 characters
  };

  return (
    <div className="space-y-6">
      {!isConnected ? (
        <Button onClick={handleConnect} variant="secondary">
          Connect Wallet
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-[#102e30]/30 text-[#bfe3e9]/80">
            Wallet Connected: {formatPublicKey(userPublicKey)}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full group overflow-hidden rounded-xl"
            onClick={handleRequest}
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
        </div>
      )}
      {notification && (
        <div
          id="notification"
          className="mt-4 p-4 text-center text-white rounded bg-gradient-to-r from-green-400 to-blue-500"
        >
          {notification}
        </div>
      )}
    </div>
  );
};
