import React, { useState } from "react";
import { IconBrandX } from "@tabler/icons-react";

export const Footer = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    const email = "the.mohammad.safi@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-card border-t border-[#4dbece]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-[#bfe3e9]/70 text-sm">
              © {new Date().getFullYear()} Safi. All rights reserved.
            </div>

            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a
                href="https://x.com/mohammad_safi14"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-[#bfe3e9]/70 hover:text-[#1da1f2] transition-colors duration-200"
                aria-label="Twitter"
              >
                <IconBrandX size={18} />
              </a>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
              <div className="flex items-center space-x-2">
                <FooterLink href="#" onClick={handleCopyEmail}>
                  Contact
                </FooterLink>
              </div>
            </div>
          </div>
        </div>
        {/* Notification */}
        {copied && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-500 text-white text-sm rounded shadow-md">
            Email copied to clipboard!
          </div>
        )}
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-[#bfe3e9]/70 hover:text-[#bfe3e9] text-sm transition-colors duration-200"
  >
    {children}
  </a>
);
