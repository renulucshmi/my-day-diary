import mongoose, { Schema, Document } from 'mongoose';

// 1. Define the TypeScript Interface (For your code to know the types)
export interface IEntry extends Document {
  date: Date;
  mood: string;
  content: string;
  createdAt: Date;
}

// 2. Define the Mongoose Schema (For the database to know the rules)
const EntrySchema = new Schema<IEntry>(
  {
    date: { 
      type: Date, 
      required: true 
    },
    mood: { 
      type: String, 
      required: true,
      enum: ['happy', 'neutral', 'sad', 'excited', 'tired'], // Only allow these values
    },
    content: { 
      type: String, 
      required: true 
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// 3. Export the Model
// (Note: We use "mongoose.models.Entry" to prevent overwriting the model during hot reloads)
export default mongoose.models.Entry || mongoose.model<IEntry>('Entry', EntrySchema);