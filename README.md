## Introduction

---

DevDistrict is an open-source dev comunity powerd by [NextJS 14](https://nextjs.org/) with [Typescritp](https://www.typescriptlang.org/).
Here you cand post blog articles, report provlems and bug and share experiences and positive thoughts.

## Authentication

---

Authentication is provided by [NextAuth.js](https://next-auth.js.org/) with the next session providers:

- [Email Provider](https://next-auth.js.org/providers/email) uses email to send "magic links" that can be used to sign in. The API used for sending emails is provided by [Resend](https://resend.com/).
- [Github](https://next-auth.js.org/providers/github).
- [Google](https://next-auth.js.org/providers/google).

## Database

---

DevDistrict is using a PotsgrelSQL database in combo with [Prisma ORM](https://www.prisma.io/).
The database is hosted by [Neon](https://neon.tech/).

## Application styling

---

Aplication's styles are provided by [TailwindCSS](https://tailwindcss.com/) with some additional UI libraries like:

- [HeadlessUI](https://headlessui.com/).
