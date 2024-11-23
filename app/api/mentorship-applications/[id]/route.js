import { NextResponse } from 'next/server';
import MentorshipApplication from '@/models/MentorshipApplication'; // Adjust based on your file structure
import { Mentorship, User } from '@/models';

export const PUT = async (req, { params }) => {
  try {
    const { id } = params; // Mentorship Application ID from URL
    const { status } = await req.json(); // Status from request body

    // Validate the status
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return NextResponse.json({ message: 'Invalid status value.' }, { status: 400 });
    }

    // Find the mentorship application by ID
    const application = await MentorshipApplication.findByPk(id);

    if (!application) {
      return NextResponse.json({ message: 'Mentorship application not found.' }, { status: 404 });
    }

    // Update the status
    application.status = status;
    await application.save(); // Save changes to the database

    return NextResponse.json(application, { status: 200 }); // Return the updated application
  } catch (error) {
    console.error('Error updating mentorship application status:', error);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params; // Mentorship Application ID from URL

    // Find the mentorship application by ID
    const application = await MentorshipApplication.findByPk(id);

    if (!application) {
      return NextResponse.json({ message: 'Mentorship application not found.' }, { status: 404 });
    }

    // Delete the application
    await application.destroy();

    return NextResponse.json({ message: 'Mentorship application deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting mentorship application:', error);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  const { id } = params; // Extract mentorId from request parameters
  const mentorId=id;
  try {
    // Fetch all mentorship applications for a specific mentor
    const mentorshipApplications = await MentorshipApplication.findAll({
      include: [
        {
          model: User,
          as: 'applicant', // The alias used in associations
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Mentorship,
          as: 'mentorship', // The alias used in associations
          where: { mentorId }, // Filter mentorships by mentorId
          attributes: ['id', 'title', 'description'],
        },
      ],
    });

    if (!mentorshipApplications || mentorshipApplications.length === 0) {
      return NextResponse.json(
        { error: 'No mentorship applications found for this mentor' },
        { status: 404 }
      );
    }

    return NextResponse.json(mentorshipApplications);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
