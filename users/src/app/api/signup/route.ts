import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/app/lib/models/user"; // וודא שהנתיב מתאים למיקום הקובץ
import connect from "@/app/lib/DB/connect"; // פונקציה שמחברת ל-MongoDB

export async function POST(request: Request) {
  try {
    console.log('Receiving signup request...');
    // קבלת הנתונים מהבקשה
    const { username, email, password } = await request.json();

    // בדיקה אם כל השדות הוזנו
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connect(); // התחברות ל-MongoDB

    // בדיקה אם האימייל כבר קיים במערכת
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 409 }
      );
    }

    // הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // יצירת משתמש חדש ושמירתו ב-DB
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      isGoogleUser: false,
    });

    return NextResponse.json(
      { message: "User created successfully", userId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in signUp:", error);
    const err = error as Error;
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request) {
  try {
    console.log('Deleting all users...');
    
    // מחיקת כל המשתמשים
    await User.deleteMany({});
    
    return NextResponse.json(
      { message: "All users deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting all users:", error);
    const err = error as Error;
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    console.log('Fetching all users...');
    
    // קבלת כל המשתמשים
    const users = await User.find({});

    return NextResponse.json(
      { users },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching all users:", error);
    const err = error as Error;
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
