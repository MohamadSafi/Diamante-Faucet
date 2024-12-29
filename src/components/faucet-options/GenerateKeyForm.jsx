import React, { useState } from "react";
import { Button } from "../ui/Button";
import { IconCopy, IconCopyCheckFilled } from "@tabler/icons-react";
import { Keypair } from "diamnet-sdk";
import axios from "axios";

export const GenerateKeyForm = () => {
  const [keys, setKeys] = useState(null);
  const [copyPNotification, setCopyPNotification] = useState(false);
  const [copySNotification, setCopySNotification] = useState(false);
  const [notification, setNotification] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = () => {
    const keypair = Keypair.random();
    setKeys({ publicKey: keypair.publicKey(), secretKey: keypair.secret() });
  };

  const handleCopy = (text, type) => {
    if (type === "public") {
      navigator.clipboard.writeText(text).then(() => {
        setCopyPNotification(true);
        setTimeout(() => setCopyPNotification(false), 2000); // Clear notification after 2 seconds
      });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopySNotification(true);
        setTimeout(() => setCopySNotification(false), 2000); // Clear notification after 2 seconds
      });
    }
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification("");
    try {
      // Call the DiamCircle API
      const response = await axios.get(
        `https://friendbot.diamcircle.io/?addr=${keys.publicKey}`
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
    <div className="space-y-6">
      {!keys ? (
        <Button onClick={handleGenerate} variant="secondary">
          Generate New Keypair
        </Button>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-[#bfe3e9]">
                  Public Key
                </label>
                {copyPNotification ? (
                  <IconCopyCheckFilled
                    className="cursor-pointer text-[#bfe3e9]/70 hover:text-[#bfe3e9] transition-colors duration-200"
                    size={18}
                    onClick={() => handleCopy(keys.publicKey, "public")}
                  />
                ) : (
                  <IconCopy
                    className="cursor-pointer text-[#bfe3e9]/70 hover:text-[#bfe3e9] transition-colors duration-200"
                    size={18}
                    onClick={() => handleCopy(keys.publicKey, "public")}
                  />
                )}
              </div>

              <div className="p-3 rounded-lg bg-[#102e30]/30 text-[#bfe3e9]/80 break-all">
                {keys.publicKey}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-[#bfe3e9]">
                  Secret Key
                </label>
                {copySNotification ? (
                  <IconCopyCheckFilled
                    className="cursor-pointer text-[#bfe3e9]/70 hover:text-[#bfe3e9] transition-colors duration-200"
                    size={18}
                    onClick={() => handleCopy(keys.secretKey)}
                  />
                ) : (
                  <IconCopy
                    className="cursor-pointer text-[#bfe3e9]/70 hover:text-[#bfe3e9] transition-colors duration-200"
                    size={18}
                    onClick={() => handleCopy(keys.secretKey)}
                  />
                )}
              </div>

              <div className="p-3 rounded-lg bg-[#102e30]/30 text-[#bfe3e9]/80 break-all">
                {keys.secretKey}
              </div>
            </div>
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
