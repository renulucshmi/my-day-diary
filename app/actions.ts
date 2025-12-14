'use server' // <--- The magic directive you looked for

export async function createEntry(prevState: any,formData: FormData) {
 await new Promise(resolve => setTimeout(resolve, 1000));
  // 1. Extract the data from the HTML form
  const date = formData.get('date');
  const mood = formData.get('mood');
  const content = formData.get('content');

 console.log("📝 New Entry:", { date, mood, content });

  // Return a success message to the page
  return { message: 'Entry saved successfully!' };
}