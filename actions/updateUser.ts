"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const updateUser = async (prevState: any, formData: FormData) => {
  try {
    const username = formData.get("username")?.toString();
    const currentUsername = formData.get("currentUsername")?.toString();
    const email = formData.get("email")?.toString();
    const userId = formData.get("userId")?.toString();
    if (username === "" && email === "") {
      return {
        message: "You must fill one of the fields properly to update user info",
        status: 400,
      };
    }
    //find by username (if user doesn't want to update the email too )
    if (email === "") {
      const user = await prisma.user.findUnique({
        where: {
          name: username,
        },
      });
      //if there is an user with this username already return
      if (user) {
        return {
          message: "User with this name already exists",
          status: 406,
        };
      } else {
        //update the username
        const userNameUpdated = await prisma.user.update({
          where: { id: userId },
          data: {
            name: username,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${username}`,
          },
        });
        //update also the posts, comments and replies of user with the currentUsername
        const usernameBlogPostUpdated = await prisma.blogPost.updateMany({
          where: {
            username: currentUsername,
          },
          data: {
            username: username,
          },
        });
        const auhtorCommentUpdated = await prisma.comment.updateMany({
          where: {
            author: currentUsername,
          },
          data: {
            author: username,
          },
        });
        const authorReplyUpdated = await prisma.reply.updateMany({
          where: {
            author: currentUsername,
          },
          data: {
            author: username,
          },
        });
        //return success message if everything went good
        return {
          message: "Username updated successfully",
          status: 200,
        };
      }
      //if the username is empty then user wants to update only the email
    } else if (username === "") {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      //if there is a user with this email already return
      if (user) {
        return {
          message: "User with this email already exists",
          status: 406,
        };
        //if not update user email
      } else {
        const emailUpdated = await prisma.user.update({
          where: { id: userId },
          data: { email: email },
        });
        //return success message
        return {
          message: "Email updated successfully",
          status: 200,
        };
      }
      //if both of username and email are filled then update both details
    } else {
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ name: username }, { email: email }],
        },
      });
      //check if there is a user with both username and email
      if (user) {
        return {
          message: "User with this username or email already exists",
          status: 406,
        };
      } else {
        //if not update the user detals
        const updatedUser = await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            name: username,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${username}`,
            email: email,
          },
        });
        //also the posts, comments and replies
        const usernameBlogPostUpdated = await prisma.blogPost.updateMany({
          where: {
            username: currentUsername,
          },
          data: {
            username: username,
          },
        });
        const auhtorCommentUpdated = await prisma.comment.updateMany({
          where: {
            author: currentUsername,
          },
          data: {
            author: username,
          },
        });
        const authorReplyUpdated = await prisma.reply.updateMany({
          where: {
            author: currentUsername,
          },
          data: {
            author: username,
          },
        });

        console.log(updateUser);
        return {
          message: "User updated successfully",
          status: 200,
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Oops... Something went wrong!",
      status: 500,
    };
  }
};
