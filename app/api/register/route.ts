import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req: Request) {
  //retrive the name, email and password from client
  const body = await req.json();
  const { name, email, password } = await body.data;

  //check if one of them is null
  if (!name || !email || !password)
    return new NextResponse("Missing name, email or password data", {
      status: 400,
    });

  //check if there is already a user registred in database
  const user = await prisma?.user.findFirst({
    where: {
      OR: [
        {
          name: name,
        },
        {
          email: email,
        },
      ],
    },
  });
  console.log("User is: ");
  console.log(user);
  // console.log(user);
  if (user) {
    console.log("use already exists");
    return NextResponse.json({
      message: "User already registred",
      status: 400,
      registrationSuccess: false,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userSaved = await prisma?.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
    },
  });

  return NextResponse.json(userSaved, { status: 200 });
}
