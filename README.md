# Portfolio Website

A simple, modern portfolio website built with Next.js and shadcn/ui.

## Features

- **Clean Design**: Modern, responsive design with a beautiful gradient background
- **Dark/Light Mode**: Toggle between dark and light themes with a beautiful theme switcher
- **Portfolio Card**: Single card layout showcasing:
  - Name and title
  - Professional description
  - Skills with badges
  - Social media links with icons
  - Project showcase with descriptions and technologies
- **Responsive**: Works perfectly on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Theme Persistence**: Remembers your theme preference across sessions

## Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **next-themes** - Theme management
- **NextAuth.js** - Authentication
- **MongoDB** - Database
- **Lucide React** - Icons
- **React** - Frontend library

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.local` and update the following variables:
   - `GOOGLE_CLIENT_ID`: Get from [Google Cloud Console](https://console.cloud.google.com/)
   - `GOOGLE_CLIENT_SECRET`: Get from [Google Cloud Console](https://console.cloud.google.com/)
   - `NEXTAUTH_SECRET`: Generate a random secret key
   - `MONGODB_URI`: Already configured with your MongoDB connection string
   - `ALLOWED_EMAILS`: Comma-separated list of authorized email addresses (e.g., "admin@example.com,user@company.com")

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the portfolio

## Admin Dashboard

The portfolio includes a full admin dashboard for managing content:

### Access Admin Dashboard
- Visit [http://localhost:3000/admin](http://localhost:3000/admin)
- Sign in with your Google account
- Manage your portfolio data through the intuitive interface

### Admin Features
- **Email-based Access Control**: Only authorized email addresses can access admin features
- **View Current Data**: See all your portfolio information
- **Edit Portfolio**: Update name, title, description, skills, social media, and projects
- **Add/Remove Skills**: Manage your skill badges
- **Social Media Management**: Add and manage social media links with automatic icon detection
- **Project Management**: Add, edit, or remove projects with descriptions and technologies
- **Real-time Updates**: Changes reflect immediately on your portfolio
- **Access Denied Page**: Clear messaging for unauthorized users

### Google Authentication Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs
6. Copy Client ID and Client Secret to your `.env.local` file

### Email Access Control
- Add authorized email addresses to `ALLOWED_EMAILS` in `.env.local`
- Separate multiple emails with commas: `"admin@example.com,user@company.com"`
- Only users with authorized emails can access admin features
- Unauthorized users will see an access denied page
- Access control is enforced at both frontend and API levels

## Customization

To customize the portfolio with your own information:

1. Edit `src/app/page.tsx`
2. Update the `portfolioData` object with your:
   - Name and title
   - Description
   - Skills array
   - Projects array

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # App layout and metadata
│   ├── page.tsx        # Main portfolio page
│   └── globals.css     # Global styles
├── components/
│   ├── ui/             # shadcn/ui components
│   └── portfolio-card.tsx  # Portfolio card component
└── lib/
    └── utils.ts        # Utility functions
```

## Deployment

This portfolio can be easily deployed to:
- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- Any static hosting service

Simply connect your GitHub repository and deploy!
