'use server'

import connectDB from '@/lib/mongodb';
import Entry from '@/models/Entry';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createEntry(prevState: any, formData: FormData) {
  // 1. Connect to the database
  await connectDB();

  // 2. Extract data
  const date = formData.get('date');
  const mood = formData.get('mood');
  const content = formData.get('content');

  try {
    // 3. Create the entry in MongoDB
    await Entry.create({
      date: new Date(date as string),
      mood,
      content,
    });

    console.log("✅ Saved to MongoDB!");

  } catch (error) {
    console.error("Error saving entry:", error);
    return { message: 'Failed to save entry. Please try again.' };
  }

  // 4. Redirect back to home page (or refresh)
  // This tells Next.js: "The home page data has changed, refresh it!"
  revalidatePath('/'); 
  redirect('/');
}