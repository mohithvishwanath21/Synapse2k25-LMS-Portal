import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './model/admin.js'; 
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_URL;

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    
    const email = "admin@example.com";
    const password = "Admin@1234";
    const hashedPassword = await bcrypt.hash(password, 10);

    // Delete existing admin if any
    const adminExist = await Admin.findOne({ email });
    if (adminExist) {
      await Admin.deleteOne({ email });
      console.log("Existing admin deleted");
    }

    // Create new admin
    const admin = await Admin.create({
      firstName: "Mohith",
      email,
      password: hashedPassword
    });

    console.log("Admin created successfully:", admin);
    process.exit();
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

seedAdmin();
