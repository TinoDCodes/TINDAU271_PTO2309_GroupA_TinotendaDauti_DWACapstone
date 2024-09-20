# **Castify Podcast App - Capstone Project**

## **Description**

This project is the final capstone in the CodeSpace Software Development Program. It is a feature-rich podcast streaming platform where users can browse podcast shows, play episodes, and track their favorite episodes. The app is built with modern web technologies, following the best practices of frontend development.

Users can explore various podcasts, manage a list of favorites, share favorite episodes, and enjoy an immersive audio playback experience with a persistent player interface that stays active while browsing.

Live site: [Castify App](https://castify-streaming.netlify.app/)

![Screenshot 2024-09-20 141503](https://github.com/user-attachments/assets/b2f1a429-2f24-4e0e-869d-10916cf083a2)


## **Features**

- **Authentication**: Secure user sign-up and login using Supabase authentication.
- **Favorite Episodes**: Users can mark podcast episodes as favorites, view their favorite episodes, and share them via a public URL.
- **Persistent Audio Player**: The audio player remains visible and functional while users browse other parts of the app.
- **Dark Mode Toggle**: Seamless switching between light and dark mode for improved accessibility.
- **Fuzzy Search**: Fast and efficient search powered by Fuse.js for quick access to episodes and shows.
- **Responsive Design**: Fully responsive layout that adjusts to different screen sizes for an optimal user experience on any device.
- **Sharing Functionality**: Ability to share a list of favorite episodes via a public link, allowing others to view the shared content.

## **Technologies Used**

- **Next.js 14**: A powerful framework for server-side rendering and static site generation, providing a robust foundation for the app.
- **Supabase**: Used for both user authentication and storing data in the backend, such as user favorites and podcast information.
- **Zustand**: A small, fast state management library for managing global application state.
- **ShadCN UI Library**: A customizable UI component library used to style the app.
- **Fuse.js**: A lightweight fuzzy-search library for implementing the search functionality.
- **Tailwind CSS**: A utility-first CSS framework used to build responsive and modern UI components.

## **Project Setup**

### **Installation**

Clone the repository:

```bash
git clone https://github.com/TinoDCodes/TINDAU271_PTO2309_GroupA_TinotendaDauti_DWACapstone.git
cd castify

```

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_SITE_BASE_URL=<your-site-url>
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Run the development server:

```bash
npm run dev
```

Open your browser and navigate to:

```bash
http://localhost:3000
```

### **Environment Variables**

- `NEXT_PUBLIC_SITE_BASE_URL`: Base URL of your app (e.g., http://localhost:3000).
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase API URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous API key.

## **Key Features**

1. **Protected Routes**: The app has protected routes, preventing unauthorized access to certain views, such as the favorites list.

2. **Favorites Management**: Users can add or remove podcast episodes from their list of favorites. These changes are reflected in real-time on the UI without the need to refresh the page.

3. **Share Favorite Episodes**: Users can generate a public, shareable URL containing their favorite podcast episodes.

4. **Dark/Light Mode**: Users can switch between dark and light themes, which is preserved across sessions.

5. **Persistent Audio Player**: The audio player stays accessible as users navigate throughout the app, maintaining the current playing episode and position.

## **Folder Structure**

```
├── app               # Main application folder (App Router)
├── components        # Shared, Reusable UI components
  ├── ui              # Shadcn UI components
├── hooks             # Custom React hooks
├── lib               # Libraries or helper functions
├── node_modules      # Dependencies
├── providers         # Context providers for app-wide state management
├── public            # Public assets (images, fonts, etc.)
├── store             # Zustand store for state management
├── utils             # Utility functions, helpers and constants
  ├── supabase        # Supabase utilities (e.g. clients and middleware setup)
  └── types           # TypeScript type definitions
```


