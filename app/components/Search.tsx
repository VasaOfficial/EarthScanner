"use client";

import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { z } from 'zod';

const dataSchema = z.object({
  descriptions: z.array(z.string()),
  // Add more properties to the schema if needed
});

const SearchBar = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [predictions, setPredictions] = useState<string[]>([]);
  const [text] = useDebounce(inputValue, 500);

  const handleFetchPredictions = useCallback(async () => {
    if (text.trim().length > 0) {
      const response = await fetch(`/api/autocomplete?query=${text.trim()}`);
      const data = await response.json() as { descriptions: string[] };

      // Validate the response using Zod
      const validatedData = dataSchema.parse(data);

      setPredictions(validatedData.descriptions);
    } else {
      setPredictions([]);
    }
  }, [text]);

  useEffect(() => {
   void handleFetchPredictions();
  }, [handleFetchPredictions]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <div>
      <input
        aria-label="enter the name of your city"
        type="text"
        placeholder="Enter Location"
        className="rounded-lg px-4 py-2 text-black"
        value={inputValue}
        onChange={handleInputChange}
      />

      {predictions.length > 0 && (
        <ul>
          {predictions.map((prediction) => (
            <li key={prediction}>{prediction}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
