'use client';

import React, { useState, useEffect } from 'react';

export default function Page() {
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('');
  const [flag, setFlag] = useState<string | null>(null); // State to hold the flag

  // Fetch the initial score from the server
  useEffect(() => {
    fetch('/api/score') // Fetch score from Next.js API route
      .then((response) => response.json())
      .then((data) => {
        setScore(data.score);
        // Check if the score is 10000 and set the flag if it is
        if (data.score === 10000) {
          setFlag("FLAG{your_flag_here}"); // Replace with actual flag
        }
      })
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

      // Check if the updated score is 10000 and set the flag if it is
      if (data.score === 10000) {
        setFlag("FLAG{your_flag_here}"); // Replace with actual flag
      } else {
        setFlag(null); // Clear the flag if score is not 10000
      }
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Virat Kohli Score Tracker</h1>
      <p className="text-lg mt-4">Current Score: {score}</p>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mt-4"
      />
      <div className="mt-4">
        <button onClick={() => updateScore(1)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Increment by 1
        </button>
        <button onClick={() => updateScore(10)} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          Increment by 10
        </button>
        <button onClick={() => updateScore(15)} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          Increment by 15
        </button>
      </div>
      {flag && <p className="mt-4 text-green-600 font-bold">{flag}</p>} {/* Display flag if it exists */}
    </div>
  );
}
