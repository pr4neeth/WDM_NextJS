import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../../../../models/index'
import { NextResponse } from 'next/server';
// import { runCors } from '@/app/middleware';

export const POST = async (req) => {
  
  try {

    // await runCors(req, res);

    const { email, password } = await req.json();
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}


