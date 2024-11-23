import ContactMessage from '@/models/ContactMessage';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Name, email, and message fields are required.' },
        { status: 400 }
      );
    }

    const newContactMessage = await ContactMessage.create({ name, email, message });

    return NextResponse.json(newContactMessage, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error creating contact message.' },
      { status: 500 }
    );
  }
};


export const GET = async () => {
  try {
    // Fetch all contact messages from the database
    const contactMessages = await ContactMessage.findAll();

    // Return the retrieved contact messages
    return NextResponse.json(contactMessages, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error fetching contact messages.' },
      { status: 500 }
    );
  }
};

