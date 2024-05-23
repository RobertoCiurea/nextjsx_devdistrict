## Introduction

DevDistrict is an open-source dev community powered by [NextJS 14](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/).

Here you can post blog articles, report problems and bugs, and share experiences and positive thoughts.

## Installation

### Prerequisites

1. **Node.js and npm (or yarn)**: Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).
2. **Git**: Ensure Git is installed. You can download it from [git-scm.com](https://git-scm.com/).

### Steps to Clone, Install, and Run this Next.js App

1. **Clone the repository**

   ```sh
   git clone https://github.com/RobertoCiurea/nextjsx_devdistrict
   ```

2. **Navigate into the project directory**

   ```sh
   cd nextjs-example
   ```

3. **Install dependencies**

   ```sh
   npm install
   ```

   **or**

   ```sh
   yarn install
   ```

4. **Run the development server**

   ```sh
   npm run dev
   ```

   **or**

   ```sh
   yarn dev
   ```

## Authentication

Authentication is provided by [NextAuth.js](https://next-auth.js.org/) with the following providers:

- [Credentials Provider](https://next-auth.js.org/providers/credentials)
- [GitHub](https://next-auth.js.org/providers/github)

## Database

DevDistrict is using a PostgreSQL database in combination with [Prisma ORM](https://www.prisma.io/). The database is hosted by [Neon](https://neon.tech/).

## Application Styling

The application's styles are provided by [TailwindCSS](https://tailwindcss.com/) with some additional UI libraries like:

- [HeadlessUI](https://headlessui.com/)

## Images and Icons

All images and icons that DevDistrict is using are provided by:

- [Bing Image Creator](https://www.bing.com/images/create?FORM=GENILP)
- [IconFinder](https://www.iconfinder.com/)

User avatars for those using the traditional sign-up method are from [DiceBear](https://www.dicebear.com/).

Additionally, DevDistrict is also using GIFs from [GIPHY](https://giphy.com/).

## Version 1.0

### Features

- **Authentication system** with user credentials, _GitHub_, or _Google_.
- **My account page** that displays user account info, the posts created by the user, favorite posts, followers, and reports.
- **Follow system** that allows users to follow other people.
- **Edit profile** where users can edit their profile (username, email, or password).
- **Create blog post** where users can type the post title, content, and some tags for better context.
- **Create question**. Here you can ask a question about your code and fix some bugs.
- **Solution system** where other users can help you with resolving methods for your problems.
- **Comment and reply system** for both blog posts and solutions.
- **Report system** where users can report problems with the website and give feedback.
- **Admin panel** where admins can check and remove inappropriate accounts, posts, or comments and respond to reports.

### Home page: [DevDistrict](https://devdistrict.vercel.app/)
