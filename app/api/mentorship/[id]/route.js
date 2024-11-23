import { Mentorship } from "@/models";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    const mentorship = await Mentorship.findOne({ where: { id } });

    if (!mentorship) {
      return NextResponse.json(
        { message: `Mentorship with ID ${id} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({ mentorship }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching mentorship." },
      { status: 500 }
    );
  }
};

export const PUT = async (req, { params }) => {
  try {
    const { id } = await params; // Await params before accessing its properties
    const { title, description, duration, mentorId } = await req.json();

    const mentorship = await Mentorship.findOne({ where: { id } });

    if (!mentorship) {
      return NextResponse.json(
        { message: "Mentorship not found." },
        { status: 404 }
      );
    }

    // Ensure the mentor exists
    const mentor = await User.findOne({ where: { id: mentorId } });
    if (!mentor) {
      return NextResponse.json(
        { message: `Mentor with ID ${mentorId} does not exist.` },
        { status: 404 }
      );
    }

    mentorship.title = title || mentorship.title;
    mentorship.description = description || mentorship.description;
    mentorship.duration = duration || mentorship.duration;
    mentorship.mentorId = mentorId || mentorship.mentorId;

    await mentorship.save();

    return NextResponse.json(mentorship);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating mentorship." },
      { status: 500 }
    );
  }
};


export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    const mentorship = await Mentorship.findOne({ where: { id } });

    if (!mentorship) {
      return NextResponse.json(
        { message: `Mentorship with ID ${id} not found.` },
        { status: 404 }
      );
    }

    await mentorship.destroy();
    return NextResponse.json(
      { message: "Mentorship deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting mentorship." },
      { status: 500 }
    );
  }
};
