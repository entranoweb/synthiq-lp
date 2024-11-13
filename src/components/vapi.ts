import { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';

const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    const vapiInstance = new Vapi("b0b97882-3a3b-4c91-b0f2-593aed6f4c9e"); // Your Vapi Public Key
    setVapi(vapiInstance);

    // Event listeners
    vapiInstance.on("call-start", () => {
      setIsSessionActive(true);
      setSession(null);  // Store active session
    });

    vapiInstance.on("call-end", () => {
      setIsSessionActive(false);
      setSession(null);  // Clear session on call end
    });

    vapiInstance.on("volume-level", (level) => setVolumeLevel(level));
    vapiInstance.on("error", (error) => console.error("Vapi error:", error));

    // Cleanup function
    return () => {
      if (session && typeof session.stop === "function") {
        session.stop();  // Stop the session if it exists and has stop method
      }
      vapiInstance.stop();  // Stop the vapi instance itself
    };
  }, [session]);

  const startCall = () => {
    const newSession = vapi?.start("68735401-3eb9-463c-bee1-7cb08ae74792"); // Your Assistant ID
    setSession(newSession);
  };

  const stopCall = () => {
    if (session && typeof session.stop === "function") {
      session.stop();
    }
    setSession(null);
  };

  const toggleCall = () => {
    if (isSessionActive) {
      stopCall();
    } else {
      startCall();
    }
  };

  return { isSessionActive, startCall, stopCall, toggleCall, volumeLevel };
};

export default useVapi;
