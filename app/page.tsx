import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Entry from "@/models/Entry";

export default async function Home() {
  // 1. Connect to the DB
  await connectDB();

  // 2. Fetch all entries (sorted by newest date first)
  // .lean() makes the data lighter/faster (Plain JavaScript Objects)
  const entries = await Entry.find({}).sort({ date: -1 }).lean();

  return (
    <main className="max-w-2xl mx-auto py-8">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Diary</h1>
        <Link 
          href="/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          + Add Entry
        </Link>
      </div>

      {/* Empty State */}
      {entries.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500 mb-4">No entries yet.</p>
          <Link href="/new" className="text-blue-500 hover:underline">
            Write your first memory!
          </Link>
        </div>
      )}

      {/* List of Entries */}
      <div className="flex flex-col gap-4">
        {entries.map((entry: any) => (
          <div key={entry._id} className="border p-6 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
            
            <div className="flex justify-between items-start mb-2">
              {/* Date Formatting */}
              <h2 className="text-xl font-bold text-gray-800">
                {new Date(entry.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h2>
              
              {/* Mood Badge */}
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize
                ${entry.mood === 'happy' || entry.mood === 'excited' ? 'bg-green-100 text-green-700' : ''}
                ${entry.mood === 'sad' || entry.mood === 'tired' ? 'bg-blue-100 text-blue-700' : ''}
                ${entry.mood === 'neutral' ? 'bg-gray-100 text-gray-700' : ''}
              `}>
                {entry.mood}
              </span>
            </div>

            <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
              {entry.content}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}