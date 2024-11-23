import { Mentorship, User } from '@/models';
import Discussion from '@/models/Discussion';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  try {
    const { id } = params;  // Extract id from URL parameters

    const discussions = await Discussion.findAll({
      where: { id },  // Filter discussions by id
      include: {
        model: User,
        as: 'user',  // Alias for user
        attributes: ['id', 'name', 'email'],  // Fetching user details
      },
    });

    if (discussions.length === 0) {
      return NextResponse.json({ message: 'No discussions found for this ID.' }, { status: 404 });
    }

    return NextResponse.json(discussions, { status: 200 });
  } catch (error) {
    console.error('Error fetching discussions by id with user details:', error);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
};

  


export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const { title, content } = await req.json();

    const discussion = await Discussion.findOne({ where: { id } });

    if (!discussion) {
      return NextResponse.json({ message: 'Discussion not found.' }, { status: 404 });
    }

    if (title) discussion.title = title;
    if (content) discussion.content = content;

    await discussion.save();

    return NextResponse.json(discussion, { status: 200 });
  } catch (error) {
    console.error('Error updating discussion:', error);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;

    const discussion = await Discussion.findOne({ where: { id } });

    if (!discussion) {
      return NextResponse.json({ message: 'Discussion not found.' }, { status: 404 });
    }

    await discussion.destroy();

    return NextResponse.json({ message: 'Discussion deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting discussion:', error);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
};

