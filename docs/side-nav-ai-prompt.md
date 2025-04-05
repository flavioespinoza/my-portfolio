### Project Requirements: "Responsive Side Nav"

#### Project Setup

- Create a Next.js 14 project using TypeScript and Tailwind CSS.
- All icons are to be lucide-react icons from https://lucide.dev/icons/ (example: import { House } from 'lucide-react')

#### Layout Structure

- Design a layout with two main sections:
  - A collapsible side navigation bar (side nav) on the left.
  - A main content area on the right.
- Side nav styling:
  - Background color: Light gray.
- Main content area styling:
  - Background color: White.
  - Text color: Black.
- Add an `<h1>` element in the main content area with the text "Dashboard".

#### Side Nav Content

- **Top Links**: Position the following links at the top of the side nav:
  - Home
  - My Nodes
  - Staking
  - Airdrops
  - Orchestration Nodes
- **Bottom Links**: Position the following links at the bottom of the side nav:
  - Settings
  - Referrals
  - Documentation
  - Logout
- Link Implementation:
  - Use `next/link` for all links.
  - Set the `href` attribute for each link to a lowercase, hyphenated version of its label (e.g., `/home`, `/my-nodes`, `/orchestration-nodes`).
  - Each link must include an icon to the left of the label. Use lucide-react icons (e.g., `<li><House /><Link href="/home">Home</Link></li>`).

#### Side Nav Behavior and Styling

- Add a hamburger menu icon button in the side nav header to toggle its collapsed/expanded state.
- **Collapsed State**:
  - Width: 40px.
- **Expanded State**:
  - Width: 200px.
- On **Tablet (e.g., iPad Pro)** and **Laptop (e.g., MacBook Pro)**:
  - The main content area should dynamically resize to fill the space between the right edge of the side nav and the left edge of the browser window, whether the side nav is collapsed or expanded.

#### Responsive Design

##### Mobile (e.g., iPhone Pro Max)

- When the screen width matches a mobile device:
  - The side nav is hidden by default (width: 0px).
  - Display a `mobile-header.tsx` component at the top of the screen with:
    - The same height and padding as the side nav header.
    - A `LogoIcon` on the left and a `MenuIcon` on the right.
    - Full width of the mobile device in both portrait (vertical) and landscape (horizontal) orientations.
  - **MenuIcon Behavior**:
    - In portrait mode: Expands the side nav to the full width of the screen.
    - In landscape mode: Expands the side nav to a width of 260px.
  - In landscape mode:
    - Add a background overlay behind the side nav.
    - Allow the user to collapse the side nav by clicking outside the menu.

##### Tablet (e.g., iPad Pro)

- Default state:
  - Side nav is collapsed to a width of 72px, with the `MenuIcon` visible.
- `MenuIcon` Behavior:
  - Toggles the side nav between a collapsed width of 72px and an expanded width of 260px.
- No other changes to the current toggle behavior, only the default collapsed state differs.

##### Desktop/Laptop and Above (e.g., MacBook Pro)

- Default state:
  - Side nav is expanded to a width of 260px.
- `MenuIcon` Behavior:
  - Toggles the side nav between a collapsed width of 72px and an expanded width of 260px.
- No additional changes to the side nav behavior or styling.
