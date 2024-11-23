import { Job, User } from '@/models';
import { NextResponse } from 'next/server';

export const GET = async (req, { params }) => {
    try {
      const { id } = params;
      const job = await Job.findOne({
        where: { id },
        include: [{ model: User, as: 'jobPoster', attributes: ['id', 'name', 'email'] }],
      });
  
      if (!job) {
        return NextResponse.json({ message: 'Job not found' }, { status: 404 });
      }
      return NextResponse.json(job);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Error fetching job' }, { status: 500 });
    }
  };
  


export const PUT = async (req, { params }) => {
  try {
    const { id } = params;
    const { title, company,url, description, requirements, postedById } = await req.json();

    const job = await Job.findOne({ where: { id } });

    if (!job) {
      return NextResponse.json({ message: "Job not found." }, { status: 404 });
    }

    job.title = title || job.title;
    job.company = company || job.company;
    job.description = description || job.description;
    job.requirements = requirements || job.requirements;
    job.postedById = postedById || job.postedById;
    job.url=url || job.url;

    await job.save();

    return NextResponse.json(job);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error updating job." }, { status: 500 });
  }
};


export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;

    const job = await Job.findOne({ where: { id } });

    if (!job) {
      return NextResponse.json({ message: "Job not found." }, { status: 404 });
    }

    await job.destroy();

    return NextResponse.json({ message: "Job deleted successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error deleting job." }, { status: 500 });
  }
};
