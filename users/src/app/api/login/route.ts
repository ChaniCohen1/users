import { NextResponse } from "next/server";
import connect from "@/app/lib/DB/connect"; // עדכן את הנתיב בהתאם למבנה הפרויקט שלך
import User from "@/app/lib/models/user"; // עדכן את הנתיב בהתאם למבנה הפרויקט שלך
import bcrypt from "bcrypt"; // ודא שהתקנת את bcrypt עם `npm install bcrypt`

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connect();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // בדיקת הסיסמה
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // הצלחה - אפשר להחזיר מידע משתמש או טוקן
    return NextResponse.json(
      { message: "Login successful", user: { id: user._id, email: user.email } },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
