# Personal Task Manager

Personal Task Manager is a comprehensive web application designed to help users organize, prioritize, and manage their tasks effectively. Built with Next.js and React, it offers a user-friendly interface for managing personal and professional tasks.

## Project Status

As of December 6, 2024 - `in development`

## Features

- **User Authentication**:
  - Secure login and registration system.
  - OAuth integration with Google and GitHub for easy sign-in.
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices.
- **Dashboard**: View task statistics, including total tasks, completed tasks, tasks in progress, and to-do tasks, along with progress tracking.
- **Task Management**: Create, edit, and delete tasks with ease.
- **Task Sorting**: Filter tasks by status, priority, or date.

**Note: This project is actively being developed. Many more exciting features are planned and will be added in future updates!**

## Technologies Used

- Next.js
- React
- Next Auth (Auth.js)
- TypeScript
- Tailwind CSS
- MongoDB
- shadcn/ui
- React Hook Form

## Project Structure

Here's an overview of the main directories and files:

- `Root level files`

  - Configuration:

    - `.prettierrc`: Configuration for Prettier code formatting.
    - `next.config.js`: Next.js configuration.
    - `tailwind.config.ts`: Configuration for Tailwind CSS.
    - `tsconfig.json`: TypeScript configuration.

  - Environment Variables:

    - `.env.example`: Example environment variables.
    - `.env.local`: Local environment variables (not committed to version control).

  - Dependencies:
    - `package.json`: Project dependencies and scripts.

- `src/`: A main folder of the application.
  - `actions/`: Server actions.
  - `app/`: Contains the main application code using the Next.js App Router.
    - `api/`: API routes, including authentication.
    - `dashboard/`, `login/`, `tasks/` : Page components for different routes.
    - `layout.tsx`: The root layout component.
    - `page.tsx`: The home page component.
    - `auth.config.ts`: Configuration for NextAuth authentication providers.
  - `assets/`: Static assets.
  - `components/`: Reusable React components.
    - `ui/`: UI components from shadcn/ui.
  - `data/`: Contains utility functions for retrieving and processing task data.
  - `hooks/`: Custom React hooks.
  - `lib/`: Utility functions and helpers.
  - `types/`: TypeScript type definitions.
  - `auth.ts`: Contains logic for handling authentication processes.
  - `middleware.ts`: Implements route protection and redirects based on user authentication status, ensuring access control for specific pages.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB database (these links might be helpful: [link 1](https://www.geeksforgeeks.org/how-to-integrate-mongodb-in-next-js/), [link2](https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/#example-3--next-js-static-generation-with-mongodb))

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/vch-sh/personal-task-manager.git
   ```

2. Navigate to the project directory:

   ```
   cd personal-task-manager
   ```

3. Install dependencies:

   ```
   npm install
   # or
   yarn install
   ```

4. Create a `.env.local` file in the root directory and add all the necessary environment variables (which you can find in `.env.example`).

5. Run the development server:

   ```
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Register for a new account or log in if you already have one. You can use your email and password, Google account, or GitHub account for authentication.
2. Use the navigation bar to access different sections of the app:

   - `Dashboard`: View task statistics and overall progress
   - `Tasks`: Manage your tasks (add, edit, delete)

3. On the `Tasks` page, you can:
   - Add a new task by clicking the "Add Task" button.
   - Edit or delete existing tasks.
   - Sort tasks by:
     - `Status`: Done, to do, or in progress.
     - `Date`: By task completion date.
     - `Priority`: High, medium, or low.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Ensure code is formatted using Prettier before submitting a PR.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Added some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Next Auth (Auth.js)](https://authjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://www.react-hook-form.com/)

## Contact

For any inquiries, please open an issue on the GitHub repository.

Project Link: [https://github.com/vch-sh/personal-task-manager](https://github.com/vch-sh/personal-task-manager)
