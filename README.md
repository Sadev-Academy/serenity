# 🌿 Serenity Spa

A premium, modern Single-Page Application (SPA) and online booking portal for a luxury wellness sanctuary. Built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM** connected to a PostgreSQL database.

This project is fully responsive, SEO-optimized, and styled to convey a sense of calm, tranquility, and high-end luxury.

---

## ✨ Features

- **Luxury Hero Sanctuary**: A visually immersive, high-resolution header featuring subtle zoom transitions, responsive call-to-action buttons, and clear brand identity.
- **Dynamic & Responsive Service Menu**:
  - **On Desktop/Tablet**: Displays the complete catalog of treatments (Swedish Massages, Radiance Facials, Organic Body Scrubs) side-by-side in an editorial grid.
  - **On Mobile**: Displays an intuitive tab switcher at the top, showing one treatment category at a time to optimize screen space.
- **Psychologically Optimized Pricing**: Price indicators styled following retail psychology concepts (scaled-down currency symbols, luxury gold/bronze color palettes, and value-framing tags such as `incl. spa access`) to elevate perceived value.
- **Interactive Booking System**: A modal reservation flow using Radix Dialogs where clients can select their desired treatment, choose a professional practitioner, specify dates/times, and enter contact details.
- **Modern Architecture**: Styled with a dark-mode ready, glassmorphic palette, and custom variables based on tailwind v4.
- **Robust Database Setup**: Uses Prisma Schema to model relationships between **Services**, **Staff**, and **Appointments**.

---

## 🛠️ Technology Stack

* **Frontend**: Next.js 15 (App Router), React 19, TypeScript
* **Styling**: Tailwind CSS (v4), Vanilla CSS variables, Radix UI primitives
* **Database & ORM**: Prisma, PostgreSQL (designed for Supabase Connection Pooler)
* **Icons & Animation**: Lucide React, Tailwind-animate

---

## 📂 Project Structure

```text
├── app/
│   ├── layout.tsx         # Root layout with Montserrat & Playfair font optimization
│   ├── page.tsx           # Main homepage rendering sections and server data fetching
│   └── globals.css        # Global CSS, styling variables & custom tailwind-v4 theme
├── components/
│   ├── ui/                # Core Shadcn UI primitives (Button, Card, Dialog, Input, etc.)
│   ├── Navbar.tsx         # Sticky navigation with mobile menu and active section tracking
│   ├── Hero.tsx           # Editorial landing cover section
│   ├── ServiceMenu.tsx    # Responsive service grid and category filter
│   ├── BookingModal.tsx   # Appointment booking form modal with staff selector
│   └── Footer.tsx         # Comprehensive multi-column footer
├── prisma/
│   ├── schema.prisma      # Prisma schema for PostgreSQL database models
│   └── seed.ts            # Seeding script for services and staff members
└── lib/
    ├── prisma.ts          # Single-instance Prisma client configuration
    └── utils.ts           # CSS merge and helper functions (cn)
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

* Node.js (version 18 or later)
* A PostgreSQL database (e.g., Supabase, local PostgreSQL, or Docker)

### 1. Setup the Repository
Clone the repository to your local directory:
```bash
git clone https://github.com/your-username/serenity-spa.git
cd serenity-spa
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root of the project by copying the example file:
```bash
cp .env.example .env
```
Open `.env` and fill in your connection strings:
- **`DATABASE_URL`**: Your pooled connection string (using port 6543 / PgBouncer if deploying on Supabase).
- **`DIRECT_URL`**: Your direct connection string (using port 5432, required for running migrations).

### 4. Run Database Migrations & Seed Data
Initialize the database tables and populate them with the spa services and staff therapists:
```bash
# Apply migration schema
npx prisma migrate dev

# Run the seeding script
npx prisma db seed
```

### 5. Launch the Development Server
```bash
npm run dev
```
Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the live app.

---

## 📦 Deployment

This project is configured to run out-of-the-box on **Vercel**:

1. Connect your GitHub repository to Vercel.
2. In the project settings, add the environment variables:
   - `DATABASE_URL` (using connection pooling parameters)
   - `DIRECT_URL` (direct database access)
3. Vercel will automatically build and deploy your main branch. During the build, Prisma Client is automatically generated.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
# serenity
