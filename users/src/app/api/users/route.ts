import { NextResponse } from 'next/server';
import User from '@/app/lib/models/user';
import connect from '@/app/lib/DB/connect';

export async function GET(request: Request) {
  try {

    const url = new URL(request.url);
    
    const email = url.searchParams.get('email');
    const password = url.searchParams.get('password');

    await connect();

    console.log("Connected to MongoDB");

    // בדיקה אם המשתמש קיים
    const user = await User.findOne({ email });

    // אם המשתמש לא נמצא או שהסיסמה שגויה
    if (!user || user.password !== password) {
      return NextResponse.json({ message: 'Incorrect email or password' }, { status: 401 });
    }

    // החזרה של תגובה עם הצלחת התחברות
    return NextResponse.json({ user: user}, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Failed to login' }, { status: 500 });
  }
};

export async function POST(request: Request) {
    console.log("server");
    
    try {
      await connect();
      console.log("connectDB");
      
      // קבלת נתונים מהבקשה
      const { username, email, password } = await request.json();
      console.log(username, email, password);
  
      // יצירת משתמש חדש
      const newUser = new User({ username, email, password });
      await newUser.save();
  
      console.log("connectttttttt");
      
      // תגובה עם מצב הצלחה והעברה לדף הבית
      return NextResponse.json({ message: 'User signed up successfully' }, { status: 200 });
    } catch (error) {
      console.error('Signup error:', error);
      return NextResponse.json({ message: 'Failed to sign up' }, { status: 500 });
    }
  };
  
