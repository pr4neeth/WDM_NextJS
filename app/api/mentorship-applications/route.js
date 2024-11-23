// POST /api/mentorship-applications
import { Mentorship, MentorshipApplication, User } from "@/models";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    // Destructure the incoming request data
    const { mentorshipId, applicantId, statementOfPurpose, status } = await req.json();

    // Validate the provided data
    if (!mentorshipId || !applicantId) {
      return NextResponse.json(
        { error: "Mentorship ID and Applicant ID are required." },
        { status: 400 }
      );
    }

    // Check for an existing mentorship application to prevent duplicates
    const existingApplication = await MentorshipApplication.findOne({
      where: { mentorshipId, applicantId },
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "An application for this mentorship already exists." },
        { status: 409 } // 409 Conflict
      );
    }

    // Create the mentorship application if it doesn't already exist
    const mentorshipApplication = await MentorshipApplication.create({
      mentorshipId,
      applicantId,
      statementOfPurpose,
      status,
    });

    // Return the created mentorship application with status 201
    return NextResponse.json(mentorshipApplication, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create mentorship application" },
      { status: 500 }
    );
  }
};



// GET /api/mentorship-applications

export const GET = async () => {
  try {
    // Fetch mentorship applications with associated applicant and mentorship details
    const mentorshipApplications = await MentorshipApplication.findAll({
      include: [
        {
          model: User,
          as: "applicant", // The alias used in associations
          attributes: ["id", "name", "email"],
        },
        {
          model: Mentorship,
          as: "mentorship", // The alias used in associations
          attributes: ["id", "title", "description"],
        },
      ],
    });

    return NextResponse.json(mentorshipApplications);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
