'use client'

import { useActionState } from 'react';
import { createEntry } from '../actions';
// Initial state for the form
const initialState = {
  message: '',
};
export default function NewEntryPage() {
  const [state, formAction, isPending] = useActionState(createEntry, initialState);
  return (
    <main className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Write a New Entry</h1>
      
      {/* Show success message if it exists */}
      {state.message && (
        <p className="bg-green-100 text-green-700 p-4 rounded-md mb-4">
          {state.message}
        </p>
      )}
      {/* 
      The Form Starts Here */}
    <form action={formAction} className="flex flex-col gap-4">
        
        {/* Date Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="font-medium text-gray-700">Date</label>
          <input 
            type="date" 
            name="date" 
            id="date" 
            required
            className="border p-2 rounded-md"
          />
        </div>

        {/* Mood Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="mood" className="font-medium text-gray-700">Mood</label>
          <select 
            name="mood" 
            id="mood" 
            className="border p-2 rounded-md bg-white"
          >
            <option value="happy">😊 Happy</option>
            <option value="neutral">😐 Neutral</option>
            <option value="sad">😔 Sad</option>
            <option value="excited">🤩 Excited</option>
            <option value="tired">😴 Tired</option>
          </select>
        </div>

        {/* Content Field */}
        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="font-medium text-gray-700">Dear Diary...</label>
          <textarea 
            name="content" 
            id="content" 
            rows={5}
            required
            placeholder="Today was..."
            className="border p-2 rounded-md"
          />
        </div>

      {/* The Smart Button */}
        <button 
          type="submit" 
          disabled={isPending}
          className={`py-3 rounded-md font-bold text-white transition-colors ${
            isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isPending ? 'Saving...' : 'Save Entry'}
        </button>

      </form>
    </main>
  );
}