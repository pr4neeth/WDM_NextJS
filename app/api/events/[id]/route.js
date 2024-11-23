import { Event } from "@/models";
import { NextResponse } from "next/server";


export const GET = async (req,{params}) => {
  try {
    const { id } = params;

    // Fetch event by ID
    const event = await Event.findOne({
      where: { id }
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found." }, { status: 404 });
    }

    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching event." }, { status: 500 });
  }
}

export const PUT = async (req,{params}) => {
  try {
    const { id } = params;
    const { title, description, date, location, imageURL, organizerId } = await req.json();

    // Validate input
    if (!title || !description || !date || !location || !organizerId) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Find event by ID
    const event = await Event.findOne({
      where: { id }
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found." }, { status: 404 });
    }

    // Update event details
    event.title = title;
    event.description = description;
    event.date = date;
    event.location = location;
    event.imageURL = imageURL;
    event.organizerId = organizerId;

    await event.save();

    return NextResponse.json({ event }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating event." }, { status: 500 });
  }
}

export const DELETE = async (req,{params}) => {
  try {
    const { id } = params;

    // Find event by ID
    const event = await Event.findOne({
      where: { id }
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found." }, { status: 404 });
    }

    // Delete event
    await event.destroy();

    return NextResponse.json({ message: "Event deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error deleting event." }, { status: 500 });
  }
}

