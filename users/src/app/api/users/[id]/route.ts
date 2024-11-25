import { NextResponse } from 'next/server';
import User from '@/app/lib/models/user';
import connect from '@/app/lib/DB/connect';



export async function GET( request: Request,{ params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connect();
    const user = await User.findById(id);
    return NextResponse.json({ user: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}