"use server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export const updateUserPassword = async (
  prevState: any,
  formData: FormData
) => {
  try {
    //get user's data
    const userId = formData.get("userId")?.toString();
    const oldPassword = formData.get("oldPassword")?.toString();
    const newPassword = formData.get("newPassword")?.toString();
    //check if the fields are emptu
    if (oldPassword === "" || newPassword === "") {
      return {
        message: "You must fill both fields",
        status: 400,
      };
    }

    //find user details based on id
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log(user);
    if (user?.password === null) {
      return {
        message: "This account type does not have a password registred",
        status: 406,
      };
    }
    //check the if the password received from user match and the actual password match
    const userPassowrd = user?.password;

    const checkPassword = await bcrypt.compare(
      oldPassword as string,
      userPassowrd!
    );
    //check if the new password and the actual password are different
    const comparePassword = await bcrypt.compare(
      newPassword as string,
      userPassowrd!
    );
    //update passowrd
    if (checkPassword) {
      const hashedPassword = await bcrypt.hash(newPassword as string, 10);
      if (comparePassword == false) {
        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            password: hashedPassword,
          },
        });
        console.log(updatedUser);
        return {
          message: "Password updated successfully",
          status: 200,
        };
      } else {
        return {
          message: "You can't use the same password",
          status: 400,
        };
      }
    } else {
      return {
        message: "Incorrect password",
        status: 400,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Oops... Something went wrong!",
      status: 500,
    };
  }
};
