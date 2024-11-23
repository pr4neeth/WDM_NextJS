import bcrypt from 'bcryptjs';
import {User} from "../../../../models/index";
import { NextResponse } from 'next/server';


export const POST = async (req,res)=>{
    const { name, email, password, role } =await req.json();

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return NextResponse.json({ message: 'User already exists' },{status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    return NextResponse.json({ user },{status: 201});
  } catch (error) {
    return NextResponse.json({ message: 'Server error' },{status: 500});
  }
}