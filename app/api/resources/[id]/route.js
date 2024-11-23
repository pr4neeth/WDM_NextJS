import { Resource } from "@/models";
import { NextResponse } from "next/server"; 

export const GET = async (req,{params}) => {
  try {
    const { id } = params;

    // Fetch the resource by ID
    const resource = await Resource.findOne({
      where: { id }
    });

    if (!resource) {
      return NextResponse.json({ message: "Resource not found." }, { status: 404 });
    }

    return NextResponse.json({ resource }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching resource." }, { status: 500 });
  }
}

export const PUT = async (req,{params}) => {
  try {
    const { id } = params;
    const { title, description, fileURL, uploadedById } = await req.json();

    // Validate input
    if (!title || !fileURL || !uploadedById) {
      return NextResponse.json({ message: 'Title, fileURL, and uploadedById are required.' }, { status: 400 });
    }

    // Find resource by ID
    const resource = await Resource.findOne({
      where: { id }
    });

    if (!resource) {
      return NextResponse.json({ message: "Resource not found." }, { status: 404 });
    }

    // Update resource details
    resource.title = title;
    resource.description = description;
    resource.fileURL = fileURL;
    resource.uploadedById = uploadedById;

    await resource.save();

    return NextResponse.json({ resource }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating resource." }, { status: 500 });
  }
}


export const DELETE = async (req,{params}) => {
  try {
    const { id } = params;

    // Find resource by ID
    const resource = await Resource.findOne({
      where: { id }
    });

    if (!resource) {
      return NextResponse.json({ message: "Resource not found." }, { status: 404 });
    }

    // Delete the resource
    await resource.destroy();

    return NextResponse.json({ message: "Resource deleted successfully." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error deleting resource." }, { status: 500 });
  }
}
