# Myanmar Traditional Wedding Invitation

A cinematic digital wedding invitation website inspired by Myanmar traditional visual culture, combining event information, storytelling, motion design, music, and interactive details in one responsive web experience.

## Live Demo

🌐 [View the live website](https://myanmar-traditional-invitati-git-fd775a-soe-min-khants-projects.vercel.app/)

## Overview

This project reimagines a traditional wedding invitation as an interactive digital experience.

Visitors begin by opening an animated envelope before entering the main invitation page. The website then guides them through the couple’s story, wedding event details, venue information, RSVP section, gallery, and contact details.

The design uses Myanmar-inspired visual styling, decorative textures, floating petals, background music, and cinematic page transitions to create a more memorable invitation experience than a standard event webpage.

## Features

* Animated envelope-opening introduction
* Responsive layout for desktop, tablet, and mobile
* Myanmar-inspired visual styling and paper-texture background
* Language toggle support
* Wedding event details section
* Venue information section
* RSVP section
* Storytelling section
* Image gallery
* Contact section
* Background music player
* Floating petal visual effects
* Desktop mouse-glow interaction
* Scroll-based cinematic section reveals
* Smooth page transitions
* Reduced-motion support for users who prefer less animation
* Reusable React component structure

## Main Sections

* **Envelope Opening** — Interactive entrance to the invitation
* **Hero Invitation** — Main wedding introduction
* **Event Details** — Ceremony date, time, and event information
* **Venue** — Location and venue details
* **RSVP** — Guest response section
* **Story** — Celebration-focused storytelling content
* **Gallery** — Visual memories and invitation imagery
* **Contact** — Contact details and guest communication

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* React Router
* TanStack React Query
* React Hook Form
* Zod
* Lucide React
* Remotion
* Vitest
* Vercel

## Project Structure

```text
src/
  components/
    wedding/             # Invitation-specific sections and interactions
    ui/                  # Reusable UI components

  context/
    LanguageContext.tsx  # Language state and translation support

  pages/
    Index.tsx            # Main wedding invitation experience
    NotFound.tsx         # Fallback route

  App.tsx                # Application routing and providers
  main.tsx               # Application entry point

public/
  images/                # Invitation and gallery assets
  audio/                 # Music assets, if included

remotion/
  # Video and motion-rendering assets or compositions
```

## Local Setup

Clone the repository:

```bash
git clone https://github.com/Arrjack8847/myanmar-traditional-invitation-card.git
cd myanmar-traditional-invitation-card
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the project locally:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev              # Start the Vite development server
npm run build            # Create a production build
npm run build:dev        # Create a development-mode build
npm run lint             # Run ESLint
npm run preview          # Preview the production build locally
npm run test             # Run the Vitest test suite
npm run test:watch       # Run tests in watch mode
npm run remotion:studio  # Open the Remotion studio
```

## Deployment

The project is deployed with Vercel.

🌐 [Open the live website](https://myanmar-traditional-invitati-git-fd775a-soe-min-khants-projects.vercel.app/)

## Screenshots

Add screenshots of these areas when available:

* Envelope-opening introduction
* Main wedding invitation hero
* Event details and venue section
* RSVP section
* Story section
* Gallery section
* Mobile layout

Example:

```md
![Myanmar Traditional Wedding Invitation Homepage](./public/screenshots/homepage.png)
```

## What I Learned

* Building a multi-section interactive website with React and TypeScript
* Creating cinematic motion and scroll-reveal effects with Framer Motion
* Designing responsive layouts for desktop and mobile users
* Managing language-based UI content with React context
* Creating an event-focused digital experience with reusable components
* Combining media, animation, layout, and visual storytelling in a frontend project
* Using linting, testing, and production builds in a Vite workflow

## Future Improvements

* Add a real RSVP submission backend
* Add a map integration for venue directions
* Add guest confirmation and attendance tracking
* Add more language options
* Improve keyboard navigation and accessibility checks
* Optimise images and media for faster loading
* Add automated tests for key interactions

## Author

**Soe Min Khant**

* GitHub: [github.com/Arrjack8847](https://github.com/Arrjack8847)
* Portfolio: [JackNex Studio](https://jack-nex-studio.vercel.app/)
* Creative Portfolio: [JackNex Creative](https://jacknex-creative.vercel.app/)

---

This project is part of my frontend development and interactive web-design portfolio.
