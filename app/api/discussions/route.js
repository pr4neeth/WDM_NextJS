import { User } from '@/models';
import Discussion from '@/models/Discussion';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const { title, userId, content } = await req.json();
    console.log(title, userId, content);
    
    if (!title || !userId || !content) {
      return NextResponse.json(
        { message: 'Title, userId, and content are required.' },
        { status: 400 }
      );
    }

    const discussion = await Discussion.create({ title, userId, content });

    return NextResponse.json(discussion, { status: 201 });
  } catch (error) {
    console.error('Error creating discussion:', error);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const discussions = await Discussion.findAll({
      include: {
        model: User,
        as: 'user',  // Alias defined for user
        attributes: ['id', 'name', 'email'],  // Fetching user details
      },
    });

    return NextResponse.json(discussions, { status: 200 });
  } catch (error) {
    console.error('Error fetching all discussions with user details:', error);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
};

  
  
  

