# OAK Foundation Event Attendance Platform

A full-stack event registration and attendance management platform developed for the **OAK Zimbabwe Foundation Partner Gathering**.

The platform is designed to simplify participant registration, QR-code check-in, daily attendance tracking, event programme access, and partner information management.

## Event Information

**Event:** OAK Zimbabwe Foundation Partner Gathering
**Date:** 9–11 November 2026
**Venue:** Cresta Lodge, Msasa, Harare, Zimbabwe
**Expected Attendees:** Approximately 110 participants

## Project Overview

The OAK Foundation Event Attendance Platform provides a centralized system for managing event participants before and during the gathering.

The platform supports:

* Participant registration
* Registration confirmation
* QR code generation
* QR code download
* QR code-based event check-in
* Daily attendance tracking
* Live attendance/headcount
* Programme and session information
* Partner directory
* Partner profiles
* Event documentation
* Accommodation and travel information
* Administrative management

The platform is designed to be responsive and usable on desktop, tablet, and mobile devices, including mid-range Android devices used by event staff.

## Key Features

### Participant Registration

Participants can register by providing:

* First Name
* Last Name
* Organization
* Sub Partner Program Area
* Role
* Email
* Phone
* Dietary Requirements
* Accessibility Requirements
* Travel Requirements
* Accommodation Requirements
* Registration Consent

Available participant roles:

* Partner
* OAK Staff
* Coordination Team
* Presenter
* Observer

### QR Code Registration

Eligible participants receive a unique QR code after registration.

The QR code is used for event check-in and does not contain sensitive participant information.

Participants can:

* View their registration details
* View their QR code
* Download their QR code

### Event Check-In

Coordination Team members can use the QR scanner to check participants in.

The system records:

* Participant
* Organization
* Role
* Attendance date
* Check-in time
* Attendance status

The system prevents the same participant from being counted more than once per day.

### Daily Attendance

Attendance is tracked separately for:

* 9 November 2026
* 10 November 2026
* 11 November 2026

The dashboard provides:

* Total registered participants
* Total attendees
* Current daily headcount
* Attendance percentage
* Role breakdown
* Participant attendance status
* Check-in time

### Programme

The public programme provides information about:

* Event days
* Session times
* Session titles
* Speakers
* Venues
* Session descriptions
* Speaker information

### Partner Directory

The platform provides a public partner directory containing approved partner information such as:

* Partner logo
* Partner name
* Description
* Areas of work
* Website
* Approved contact information

### Event Documentation

Event documentation can include:

* Daily notes
* Session documentation
* Curated event photographs

## User Roles

| Role              | Main Access                                           |
| ----------------- | ----------------------------------------------------- |
| Partner           | Registration and QR confirmation                      |
| OAK Staff         | Registration and event information                    |
| Presenter         | Registration and programme information                |
| Observer          | Registration and event information                    |
| Coordination Team | Registration, check-in, attendance and administration |

Only authorized coordination/admin users can access private participant and attendance management features.

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend and Database

* Supabase
* PostgreSQL
* Supabase Auth
* Supabase Storage
* Row Level Security (RLS)

### QR Code

* `qrcode.react`
* `html5-qrcode`

### Deployment

* Vercel

### Development

* Git
* GitHub
* npm

## Project Architecture

The project uses the Next.js App Router and a component-based architecture.

A typical structure is:

```text
oak-foundation/
├── app/
│   ├── admin/
│   ├── attendance/
│   ├── check-in/
│   ├── programme/
│   ├── partners/
│   └── register/
├── components/
│   ├── ui/
│   ├── registration/
│   ├── qr/
│   ├── scanner/
│   ├── attendance/
│   ├── programme/
│   └── partners/
├── lib/
│   └── supabase/
├── types/
├── utils/
├── public/
├── supabase/
│   └── migrations/
├── .env.local
├── .gitignore
├── package.json
└── README.md
```

The exact structure may evolve as the project develops.

## Database

The application uses Supabase PostgreSQL.

Core data entities include:

* Participants
* Registrations
* QR Codes
* Attendance
* Programme Days
* Programme Sessions
* Speakers
* Partners
* Partner Contacts
* Documentation Posts
* Documentation Photos
* Admin Profiles

Attendance uses a unique participant/date relationship to prevent duplicate check-ins for the same day.

## Security

Security and privacy are key requirements of the platform.

Sensitive participant information includes:

* Email
* Phone
* Dietary requirements
* Accessibility requirements
* Travel requirements
* Accommodation requirements

This information must only be accessible to authorized users.

The application uses:

* Supabase Row Level Security
* Protected admin routes
* Supabase authentication
* Environment variables
* Server-side authorization
* Database constraints

Sensitive information must never be:

* Displayed on public pages
* Included in QR codes
* Exposed through public API responses
* Hard-coded into the application
* Committed to GitHub

The Supabase service-role key must never be exposed to the client.

## Environment Variables

Create a `.env.local` file in the project root.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Never commit `.env.local` or other secret credentials to GitHub.

## Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project:

```bash
cd oak-foundation
```

Install dependencies:

```bash
npm install
```

### Configure Environment Variables

Create:

```text
.env.local
```

Add the required Supabase environment variables.

### Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Database Setup

The project uses Supabase for the database and authentication.

Database migrations should be stored in:

```text
supabase/migrations/
```

Apply the migrations to the appropriate Supabase project before running the complete application.

## Production Build

Before deployment, run:

```bash
npm run build
```

Then verify that there are no build or TypeScript errors.

To start the production build locally:

```bash
npm run start
```

## Deployment

The application is designed to be deployed using Vercel.

Deployment steps:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Configure the required environment variables.
4. Connect the production Supabase project.
5. Deploy.
6. Test registration.
7. Test authentication.
8. Test QR generation.
9. Test QR scanning.
10. Test daily attendance.
11. Test public programme and partner pages.

## Design

The user interface follows the approved Figma design.

**Figma Design:**

https://www.figma.com/design/WYl8DlQlJJwWQoI6uKRQdD/OAK-FOUNDATION?node-id=26-1166

The Figma design should be treated as the visual source of truth for:

* Layout
* Typography
* Colours
* Components
* Spacing
* Navigation
* Forms
* Dashboard
* Responsive layouts

## Testing Checklist

Before the event, verify:

### Registration

* [ ] Registration form works
* [ ] Required fields validate
* [ ] Consent is required
* [ ] Registration is saved
* [ ] QR code is generated
* [ ] QR code can be downloaded

### Check-In

* [ ] QR scanner works
* [ ] Valid QR codes are recognized
* [ ] Invalid QR codes are handled
* [ ] Participant information is displayed correctly
* [ ] Check-in timestamp is recorded
* [ ] Duplicate check-ins are prevented

### Attendance

* [ ] 9 November attendance works
* [ ] 10 November attendance works
* [ ] 11 November attendance works
* [ ] Headcount is accurate
* [ ] Attendance percentage is accurate
* [ ] Filters work
* [ ] CSV export works

### Programme

* [ ] Programme loads
* [ ] Day navigation works
* [ ] Session details work
* [ ] Mobile layout works

### Partners

* [ ] Partner directory loads
* [ ] Partner logos display correctly
* [ ] Partner profiles work
* [ ] Website links work

### Security

* [ ] Admin authentication works
* [ ] Unauthorized users cannot access admin pages
* [ ] Sensitive participant information is protected
* [ ] RLS policies are active
* [ ] Service-role credentials are not exposed
* [ ] `.env.local` is not committed

## Development Workflow

Development should follow small, focused changes.

Example commit messages:

```text
feat: create participant registration
feat: add QR code generation
feat: add admin authentication
feat: implement daily attendance
feat: add QR scanner
feat: add programme pages
feat: add partner directory
fix: prevent duplicate attendance
security: restrict private participant data
```

Before committing:

```bash
git status
```

Then:

```bash
git add .
git commit -m "your commit message"
git push
```

## Project Goals

The platform aims to provide OAK Foundation and the event coordination team with a reliable system that:

1. Simplifies participant registration.
2. Reduces manual event check-in.
3. Provides accurate daily attendance information.
4. Makes event programme information easily accessible.
5. Provides a centralized partner directory.
6. Protects sensitive participant information.
7. Works reliably on mobile devices during the event.

## Status

**Development**

The platform is currently under development for the November 2026 OAK Zimbabwe Foundation Partner Gathering.

## License

This project is developed for the OAK Zimbabwe Foundation Partner Gathering and should not be redistributed or reused without appropriate authorization.
