"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const addNewsletterEmail = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const email = formData.get("email");

    const isNewsletter = await prisma.newsletter.findUnique({
      where: {
        email: email as string,
      },
    });
    console.log(isNewsletter);
    if (isNewsletter) {
      return {
        status: 500,
        message: "Email already registered to our newsletter.",
      };
    }
    const addedNewsletter = await prisma.newsletter.create({
      data: {
        email: email as string,
      },
    });
    console.log(addedNewsletter);
    return {
      status: 200,
      message:
        "You are now subscribed to our newsletter. You will receive all the news!",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "A error occurred while subscribing to newsletter.",
    };
  }
};
