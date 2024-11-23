import { Mentorship, User } from "@/models";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { title, mentorId, description, duration } = await req.json();

    // Validate input
    if (!title || !mentorId || !description || !duration) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Check if the mentor exists
    const mentor = await User.findOne({ where: { id: mentorId } });
    if (!mentor) {
      return NextResponse.json({ message: `Mentor with ID ${mentorId} does not exist.` }, { status: 404 });
    }

    // Create the mentorship
    const mentorship = await Mentorship.create({
      title,
      mentorId,
      description,
      duration,
    });

    return NextResponse.json({ mentorship }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating mentorship.' }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const mentorships = await Mentorship.findAll();
    return NextResponse.json({ mentorships }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching mentorships.' }, { status: 500 });
  }
};

