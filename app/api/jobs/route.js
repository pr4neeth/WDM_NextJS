import { Job, User } from '@/models';
import { NextResponse } from 'next/server';


export const POST = async (req) => {
  try {
    const { title, company,url, description, requirements, postedById } = await req.json();

    const job = await Job.create({ title,url, company, description, requirements, postedById });

    return NextResponse.json(job);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating job." }, { status: 500 });
  }
};

export const GET = async () => {
    try {
      const jobs = await Job.findAll({
        include: [{ model: User, as: 'jobPoster', attributes: ['id', 'name', 'email'] }],
      });
      return NextResponse.json(jobs);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Error fetching jobs' }, { status: 500 });
    }
  };
  
