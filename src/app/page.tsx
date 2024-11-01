// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

export default function Page() {
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('');

  // Fetch the initial score from the server
  useEffect(() => {
    fetch('/api/score') // Fetch score from Next.js API route
      .then((response) => response.json())
      .then((data) => setScore(data.score))
      .catch((error) => console.error('Error fetching score:', error));
  }, []);

  // Define the type for the request body
  interface RequestBody {
    username: string;
    score: number;
    binaryCheck?: string; // Optional binaryCheck property
  }

  // Function to update the score
  const updateScore = async (newScore: number) => {
    const requestBody: RequestBody = { username, score: newScore };

    // Only include binaryCheck if newScore is a multiple of 10
    if (newScore % 10 === 0) {
      requestBody.binaryCheck = newScore.toString(2);
    }

    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      // Update the score cumulatively
      setScore((prevScore) => prevScore + newScore);

      if (data.flag) {
        alert(`Flag: ${data.flag}`);
      }
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100"> {/* Centering with Tailwind */}
      <div className="bg-stone-500-400 p-8 rounded-lg shadow-md text-center"> {/* Card styling */}
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Virat Kohli Score Tracker</h1>
        <p className="text-xl mb-4 text-gray-800">Current Score: {score}</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-600 p-2 rounded mb-4" // Input styling
        />
        <div className="space-x-2"> {/* Spacing between buttons */}
          <button 
            onClick={() => updateScore(1)} 
            className="bg-gray-800 text-white p-2 rounded">
            Increment by 1
          </button>
          <button 
            onClick={() => updateScore(10)} 
            className="bg-gray-800 text-white p-2 rounded">
            Increment by 10
          </button>
          <button 
            onClick={() => updateScore(15)} 
            className="bg-gray-800 text-white p-2 rounded">
            Increment by 15
          </button>
        </div>
      </div>
    </div>
  );
}
