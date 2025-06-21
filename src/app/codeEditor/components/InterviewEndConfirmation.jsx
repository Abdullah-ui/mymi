import { redirect } from 'next/navigation';
import React, { useState } from 'react';

const InterviewEndConfirmation = ({isOpen, setIsOpen}) => {
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleConfirm = () => {
    closeModal();
    redirect("/dashboard");
  };

  const handleCancel = () => {
    closeModal();
    setIsOpen(false);
  };

  return (
    <>
      {/* Popup modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#151515] p-8 rounded-lg max-w-md w-full mx-4 border border-gray-700">
            <h3 className="text-xl font-medium text-white mb-4">
              Confirm Action
            </h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to end the interview?
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
              >
                No
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InterviewEndConfirmation;