'use client';

import { useState, useEffect } from 'react';

export default function StartInterviewPopUp({ startInterview }) {
  const [isOpen, setIsOpen] = useState(false);

  // Open popup when component mounts
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    startInterview();
  };

  return (
    <div>
      {/* Popup/modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div 
            className="bg-[#151515] text-white p-8 rounded-lg w-[600px] h-[500px] flex flex-col"
            style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Interview Instructions</h2>
            
            <div className="flex-1 text-left space-y-4">
              <p className="text-gray-300">1. Make sure you're in a quiet environment</p>
              <p className="text-gray-300">2. Make sure your microphone works properly</p>
              <p className="text-gray-300">3. Ensure your internet connection is stable</p>
              <p className="text-gray-300">4. Treat it like a real interview and answer questions accordingly</p>
              <p className="text-gray-300">5. It is preferable to take the interview on laptop or PC instead of a mobile phone</p>
              <p className="text-gray-300">Click start when you are ready</p>
            </div>
            
            <div className="flex justify-center mt-6">
              <button 
                onClick={closePopup}
                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                Start Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}