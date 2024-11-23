import { Op } from 'sequelize';
import { NextResponse } from "next/server";
import { Event } from '@/models';

export const POST = async (req) => {
  try {
    const { title, description, date, location, imageURL, organizerId } = await req.json();

    // Validate input
    if (!title || !description || !date || !location || !organizerId) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Check if an event with the same title or location exists
    const existingEvent = await Event.findOne({
      where: {
        [Op.or]: [
          { title },
        ]
      }
    });

    if (existingEvent) {
      return NextResponse.json({ message: 'Event with the same title or location already exists.' }, { status: 409 });
    }

    // Create the new event
    const event = await Event.create({
      title,
      description,
      date,
      location,
      imageURL,
      organizerId,
    });

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating event.' }, { status: 500 });
  }
}

export const GET = async () => {
  try {
    // Fetch all events
    const events = await Event.findAll();
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching events." }, { status: 500 });
  }
}
