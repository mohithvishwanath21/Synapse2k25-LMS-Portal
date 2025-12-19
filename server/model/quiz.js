// server/model/quiz.js
import mongoose from "mongoose";
import { nanoid } from "nanoid";

const optionSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid(12) },
  text: { type: String, required: true },
  isCorrect: { type: Boolean, default: false }
});

const questionSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid(12) },
  questionText: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["single", "multiple", "text"], 
    default: "single" 
  },
  options: [optionSchema],
  correctTextAnswers: [{ type: String, trim: true }],
  points: { type: Number, default: 1 },
  explanation: { type: String, default: "" }
});

const studentResultSchema = new mongoose.Schema({
  _id: { type: String, default: () => nanoid(12) },
  student: { type: String, ref: "User", required: true },
  answers: [{
    question: { type: String, required: true },
    selectedOptions: [{ type: String }],
    textAnswer: { type: String, trim: true },
    isCorrect: { type: Boolean, default: false }
  }],
  score: { type: Number, default: 0 },
  totalPossibleScore: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
  timeTaken: { type: Number, default: null }
});

const quizSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => nanoid(12) },
    
    title: { 
      type: String, 
      required: [true, "Quiz title is required"],
      trim: true 
    },
    
    description: { 
      type: String, 
      required: [true, "Quiz description is required"] 
    },
    
    course: { 
      type: String, 
      ref: "Course", 
      required: true 
    },
    
    module: { 
      type: String, 
      ref: "Module", // Reference to module if needed
      default: null 
    },
    
    tutor: { 
      type: String, 
      ref: "Tutor", 
      required: true 
    },
    
    timeLimit: { 
      type: Number, // In minutes
      default: null 
    },
    
    availableFrom: { 
      type: Date, 
      default: Date.now 
    },
    
    availableTo: { 
      type: Date, 
      default: null 
    },
    
    questions: [questionSchema],
    
    results: [studentResultSchema],
    
    isPublished: { 
      type: Boolean, 
      default: false 
    },
    
    status: { 
      type: String, 
      enum: ["draft", "pending", "approved", "rejected"], 
      default: "draft" 
    },
    
    draft: { 
      type: Boolean, 
      default: true 
    },
    
    reason: { 
      type: String 
    }
  },
  { timestamps: true }
);

// Add to course's module as a lesson-type item
quizSchema.post("save", async function (doc) {
  try {
    // If quiz is approved and published, you can link it to course modules
    if (doc.isPublished && doc.status === "approved") {
      // Optional: Add quiz reference to course modules if needed
    }
  } catch (error) {
    console.error("Error in quiz post-save:", error);
  }
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;