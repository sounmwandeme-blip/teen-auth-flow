# Plan: Teen Invite/Uninvite App (Instagram Style)

Build a mobile-first web application that mimics the Instagram interface, allowing "teens" (users) to communicate and manage invitations.

## Scope & Non-Goals
- **Scope**: Profile viewing, a feed of "invites/events", the ability to "invite" (follow/add) and "uninvite" (remove/unfollow) users, and a mock messaging interface.
- **Persistence**: All data will be handled via client-side `localStorage`. No real backend or Supabase.
- **Authentication**: A simple mock login (enter username) to identify the current "teen" user.
- **Non-Goals**: Real-time notifications, actual image uploading to a server, complex security, or legal age verification.

## Assumptions
- The app will be built using React, Vite, and Tailwind CSS (already in the sandbox).
- "Invite" and "Uninvite" are semantic equivalents to "Follow" and "Unfollow" or "Add to Party" in this context. We will treat them as a "Connection" system.

## Affected Areas
- **Frontend**: New components for the Instagram-like layout (Bottom Nav, Top Bar, Feed, Profile).
- **Data Layer**: A `localStorage` based store for users, invitations, and posts.

## Phases

### Phase 1: Foundation & Layout (frontend_engineer)
- Set up React Router for navigation (`/`, `/explore`, `/activity`, `/profile`, `/direct`).
- Create a `Layout` component with the Instagram bottom navigation bar and top header.
- Implement the "Mock Auth" screen (choose a user/profile).

### Phase 2: User & Data Mocking (frontend_engineer)
- Create a set of initial mock "teens" with names and profile pictures.
- Establish a `useStore` or similar hook to manage global state (users, followers/invites, mock posts) with `localStorage` persistence.

### Phase 3: Profile & Social Logic (frontend_engineer)
- Build the `Profile` page showing "Invites" (followers) and "Invited" (following).
- Implement the "Invite" (Follow) and "Uninvite" (Unfollow) buttons.
- Create a `UserList` component to display these relationships.

### Phase 4: Feed & Activity (frontend_engineer)
- Build the Home Feed where users see "Events" or "Posts" from people they have invited.
- Build an Activity/Notification tab showing who "invited" the current user.

### Phase 5: Polishing & Instagram Aesthetic (quick_fix_engineer)
- Refine CSS to match Instagram's look (border-radius, typography, iconography using Lucide-react).
- Add "Invite" buttons to the explore/user search view.
- Final bug fixes and mobile responsiveness checks.

## Downstream Assignments
- **frontend_engineer**: Primary implementation of components, routing, and state logic.
- **quick_fix_engineer**: Final UI styling refinements and consistency checks.
