import { Resource } from "@/models";
import { NextResponse } from "next/server";
 

export const POST = async (req) => {
  try {
    const { title, description, fileURL, uploadedById } = await req.json();

    // Validate input
    if (!title || !fileURL || !uploadedById) {
      return NextResponse.json({ message: 'Title, fileURL, and uploadedById are required.' }, { status: 400 });
    }

    // Create the resource
    const resource = await Resource.create({
      title,
      description,
      fileURL,
      uploadedById,
    });

    return NextResponse.json({ resource }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating resource.' }, { status: 500 });
  }
}

export const GET = async () => {
  try {
    // Fetch all resources
    const resources = await Resource.findAll();

    return NextResponse.json({ resources }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching resources." }, { status: 500 });
  }
}
