'use client';

import { useState, useEffect, useRef } from 'react';

export default function StartInterviewPopUp({ startInterview }) {
  const [isOpen, setIsOpen] = useState(false);
  const [micStatus, setMicStatus] = useState('idle'); // 'idle', 'testing', 'recording', 'playing', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const audioPlaybackRef = useRef(null);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const timeoutRef = useRef(null);

  // Open popup when component mounts
  useEffect(() => {
    setIsOpen(true);
    return () => {
      // Clean up resources when component unmounts
      stopMicTest();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (recordedAudioUrl) {
        URL.revokeObjectURL(recordedAudioUrl);
      }
    };
  }, []);

  const startMicTest = async () => {
    try {
      setMicStatus('testing');
      setErrorMessage('');
      audioChunksRef.current = [];
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      // Check if we're actually getting audio data
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      source.connect(analyser);
      
      // Set up media recorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        
        // Verify the recording actually contains audio
        if (audioBlob.size < 1000) { // Very small file likely contains no audio
          throw new Error('No audio detected');
        }
        
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);
        setMicStatus('playing');
        
        // Play the recorded audio
        audioPlaybackRef.current = new Audio(audioUrl);
        audioPlaybackRef.current.play();
        audioPlaybackRef.current.onended = () => {
          setMicStatus('success');
        };
        audioPlaybackRef.current.onerror = () => {
          throw new Error('Playback failed');
        };
      };
      
      // Start recording for 3 seconds
      mediaRecorderRef.current.start();
      setMicStatus('recording');
      
      timeoutRef.current = setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
        }
      }, 3000);
      
    } catch (error) {
      console.error('Microphone error:', error);
      setMicStatus('error');
      
      // Specific error messages for different scenarios
      if (error.name === 'NotAllowedError') {
        setErrorMessage('Microphone access was denied. Please allow microphone permissions in your browser settings.');
      } else if (error.name === 'NotFoundError' || error.name === 'OverconstrainedError') {
        setErrorMessage('No microphone found. Please ensure a microphone is connected and try again.');
      } else if (error.message === 'No audio detected') {
        setErrorMessage('No audio was detected. Please speak louder or check your microphone connection.');
      } else {
        setErrorMessage('Microphone test failed. Please check your microphone and try again.');
      }
      
      stopMicTest();
    }
  };

  const stopMicTest = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (audioPlaybackRef.current) {
      audioPlaybackRef.current.pause();
      audioPlaybackRef.current = null;
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const retryMicTest = () => {
    if (recordedAudioUrl) {
      URL.revokeObjectURL(recordedAudioUrl);
      setRecordedAudioUrl(null);
    }
    setErrorMessage('');
    startMicTest();
  };

  const closePopup = () => {
    stopMicTest();
    setIsOpen(false);
    startInterview();
  };

  return (
    <div>
      {/* Popup/modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div 
            className="bg-[#151515] text-white p-8 rounded-lg w-[800px] h-[600px] flex flex-col"
            style={{ boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)' }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Interview Instructions</h2>
            
            <div className="flex-1 text-left space-y-4">
              <p className='text-gray-300'>To ensure the best experience and performance, please follow these guidelines:</p>

              <p className='text-gray-300'>1. Choose a calm and noise-free place where you can focus without interruptions.</p>
              <p className='text-gray-300'>2. Make sure your microphone is connected and functioning correctly. Test your audio before starting.</p>
              <p className='text-gray-300'>3. A strong and uninterrupted internet connection is essential for a smooth interview.</p>
              <p className='text-gray-300'>4. Answer the questions sincerely and professionally, as you would in a real-life interview setting.</p>
              <p className='text-gray-300'>5. For the best experience, we recommend using a laptop or PC instead of a mobile device.</p>
              
              <div className="mt-6 p-4 bg-[#252525] rounded-lg">
                <h3 className="font-medium mb-2">Microphone Test</h3>
                
                {micStatus === 'idle' && !errorMessage && (
                  <button
                    onClick={startMicTest}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Test My Microphone
                  </button>
                )}
                
                {micStatus === 'testing' && (
                  <p className="text-yellow-400">Checking microphone access...</p>
                )}
                
                {micStatus === 'recording' && (
                  <div className="flex items-center space-x-4">
                    <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse"></div>
                    <p className="text-yellow-400">Speak into your microphone now (3 seconds)...</p>
                  </div>
                )}
                
                {micStatus === 'playing' && (
                  <p className="text-blue-400">Playing back your recording...</p>
                )}
                
                {micStatus === 'success' && (
                  <div className="space-y-2">
                    <p className="text-400">Microphone test successful!</p>
                    <button
                      onClick={retryMicTest}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm mt-2"
                    >
                      Test Again
                    </button>
                  </div>
                )}
                
                {(micStatus === 'error' || errorMessage) && (
                  <div className="space-y-2">
                    <p className="text-red-400">Microphone test failed</p>
                    <div className="bg-red-900/50 p-3 rounded">
                      <p className="text-gray-200 text-sm">{errorMessage}</p>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={retryMicTest}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm mt-2"
                      >
                        Try Again
                      </button>
                      <button
                        onClick={() => setErrorMessage('')}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm mt-2"
                      >
                        Close Message
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <p className="text-gray-300">When you're ready, click the "Start Interview" button to begin the interview</p>
            </div>
            
            <div className="flex justify-center mt-6">
              <button 
                onClick={closePopup}
                className={`px-8 py-3 text-white rounded-md transition-colors text-lg font-medium ${
                  (micStatus !== 'idle' && micStatus !== 'success') 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                disabled={micStatus !== 'idle' && micStatus !== 'success'}
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