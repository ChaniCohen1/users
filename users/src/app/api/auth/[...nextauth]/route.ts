import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connect from "@/app/lib/DB/connect";
import User from "@/app/lib/models/user"; // מודל המשתמש שלך

console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // שם משתנה תואם ל-.env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'select_account', // מאפשר בחירת חשבון Google כל פעם
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // סוד לאימות

  callbacks: {
    async signIn({ user }) {
      await connect(); // חיבור למסד הנתונים
      try {
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            password: "", // משתמש Google לא צריך סיסמה
            isGoogleUser: true, // מזהה שמדובר במשתמש Google
          });
          console.log("New user created:", user);
        } else {
          console.log("User already exists:", user);
        }
        return true; // הצלחה בהתחברות
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // כשלון בהתחברות
      }
    },

    async session({ session, token }) {
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
