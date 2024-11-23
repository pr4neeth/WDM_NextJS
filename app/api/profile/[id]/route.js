import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
  try {
    const { id } = params;

    // Fetch the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error fetching user.' },
      { status: 500 }
    );
  }
};


export const PUT = async (req, context) => {
  try {
    const { params } = context; // Access params from the context
    const { id } = params; // Safely access the id property
    const { name, email, password, emailNotifications, smsNotifications } = await req.json();
    console.log(name, email, password, emailNotifications, smsNotifications);
    
    // Check if the user ID is provided
    if (!id) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    // Fetch the existing user
    const user = await User.findByPk(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Check if the email is being updated and if the new email already exists
    if (email && email !== user.email) {
      const existingEmailUser = await User.findOne({ where: { email } });
      if (existingEmailUser) {
        return NextResponse.json({ message: 'Email is already in use' }, { status: 400 });
      }
    }

    // Hash the password if it is being updated
    let hashedPassword = user.password; // Retain old password if not updated
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user fields
    const updatedUser = await user.update({
      name: name || user.name,
      email: email || user.email,
      password: hashedPassword,
      role: user.role,
      emailNotifications: emailNotifications ?? user.emailNotifications,
      smsNotifications: smsNotifications ?? user.smsNotifications,
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
};


export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;

    // Find the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    // Delete the user
    await user.destroy();

    return NextResponse.json({ message: 'User deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error deleting user.' },
      { status: 500 }
    );
  }
};
