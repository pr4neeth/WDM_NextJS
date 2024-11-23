import User from '@/models/User';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    // Fetch all users
    const users = await User.findAll();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error fetching users.' },
      { status: 500 }
    );
  }
};
