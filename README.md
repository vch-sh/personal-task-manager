# Personal Task Manager

Personal Task Manager is a comprehensive web application designed to help users organize, prioritize, and manage their tasks effectively. Built with Next.js and React, it offers a user-friendly interface for managing personal and professional tasks.

## Project Status

As of December 24, 2024 - `in development`

## Features

- **User Authentication**:
  - Secure login and registration system.
  - OAuth integration with Google and GitHub for easy sign-in.
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices.

- **User Menu** (in development):
  - Access profile settings and manage your account via a dropdown menu.
- **Dashboard**:
  - View task statistics, including total tasks, completed tasks, tasks in progress, and to-do tasks.
  - Progress tracking to see how much work has been completed.
  - Tasks By Category: Visual breakdown of tasks organized by categories with color-coded labels.
- **Task Management**:
  - Create, edit, and delete tasks with ease.
  - Filter and sort tasks by status, priority, or due date.
  - Organize tasks into categories for better management and filtering.
  - Hide Completed Tasks: Easily toggle visibility of completed tasks for a cleaner and more focused interface.
  - Toggle Filter & Sorting Section: Collapse or expand the filtering and sorting options to make the task management interface cleaner and more focused.
- **Task Categories**:
  - Add, update, and delete custom categories.
  - Assign tasks to specific categories.
  - Filter tasks by selected category.
- **Profile Settings Page**:
  - Update profile details, including name, email, and profile picture (updating name and email is in development).

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
  - `contexts/`: Contains React Contexts for managing global state across the application.
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

**Authentication**:

- Register for a new account or log in using:
  - Email and password.
  - Google or GitHub account via OAuth.

**Task Management**:

- **Adding Tasks**:
  - Click the "Add Task" button.
  - Provide details like title, priority, status, category, and due date.
- **Editing Tasks**:
  - Click on the edit icon.
  - Make changes and save.
- **Deleting Tasks**:
  - Select a task and click the delete button.
- **Filtering Tasks**:
  - By status: To Do, In Progress, Done.
  - By category.
- **Sorting Tasks**:
  - By due date (default sorting).
  - By priority: High, Medium, Low.
- **Hide Completed Tasks**:
  - Enable the "Hide completed" checkbox to hide all tasks marked as "done."

**Managing Categories**:

- Add new categories in the **Categories** section.
- Edit or update existing categories to better organize tasks.
- Use categories to filter tasks on the **Tasks** page.

**Profile Image Upload**

- Go to the **Profile Settings** page.
- Click the **Upload Photo** button to select an image.
- A **preview** of the selected image will be displayed.
- Click **Submit** to upload the image to your profile.
- To **remove the selected image** before submission, click **Remove Photo**.

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
