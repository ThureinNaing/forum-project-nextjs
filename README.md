# Forum Project (Next.js)

A modern forum / Q&A application built with Next.js, Tailwind CSS, Mongoose and NextAuth. It includes question and answer threads, tagging, voting, bookmarks, user profiles, and a rich-text editor. The project also contains AI-assisted features for generating answers.

## Features

- Authentication with NextAuth providers
- Ask, answer, edit, and delete questions and answers
- Rich text editor powered by Tiptap
- Tags, searching, and pagination
- Voting and bookmarking
- User profiles and activity pages
- AI-generated answers (optional integration)
- Server-side APIs and Mongoose models for MongoDB

## Tech stack

- Next.js (app router)
- React 19
- Tailwind CSS
- Mongoose (MongoDB)
- NextAuth (authentication)
- Tiptap (rich text editor)
- TypeScript

## Quick Start

Prerequisites:

- Node 18+ recommended
- pnpm (preferred), npm or yarn
- A MongoDB database (Atlas or self-hosted)

Install dependencies:

```bash
pnpm install
# or
npm install
```

Create a local environment file `.env.local` at the project root with the variables below (example):

```env
# MongoDB connection string
MONGODB_URI=your-mongodb-connection-string

# NextAuth config
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-a-secure-random-value

# Optional: OAuth provider credentials
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...

# Optional: AI provider key for AI-generated answers
AI_API_KEY=...
```

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open http://localhost:3000 in your browser.

## Available scripts

- `dev` - run Next.js in development mode
- `build` - build the production app
- `start` - start the production server
- `lint` - run the linter

These are defined in `package.json`.

## Project layout

- `app/` - Next.js app routes and layouts
- `components/` - React components and UI primitives
- `lib/` - helpers, API client wrappers, and DB connection (`lib/dbConnect.ts`)
- `models/` - Mongoose models (User, Question, Answer, Tag, Vote, etc.)
- `api/` - server actions and API route handlers
- `types/` - TypeScript types

## Environment and configuration notes

- The app uses Mongoose to connect to MongoDB via `MONGODB_URI`.
- NextAuth configuration and provider settings are located in the auth files at the project root (e.g. `auth.ts`, `auth.config.ts`).
- AI features require an API key (set `AI_API_KEY`), and the integration can be found under `lib/actions/GenerateAiAnswer.action.ts`.

## Deployment

This project is compatible with Vercel. For environment variables and build configuration, set the same `.env` variables in your Vercel project settings.
