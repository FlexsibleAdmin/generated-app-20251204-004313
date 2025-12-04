# TaskFlow: A Visually Stunning To-Do List Application

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/FlexsibleAdmin/generated-app-20251204-004313)

A visually stunning and minimalist to-do list application designed for clarity, focus, and a delightful user experience.

TaskFlow is an elegant and minimalist to-do list application designed for clarity and focus. It provides a seamless and visually delightful experience for managing daily tasks. The application features a clean, single-view interface where users can add, edit, complete, and delete tasks. The entire application is built on Cloudflare's serverless platform, ensuring high performance and reliability.

## Key Features

-   **Effortless Task Management:** Quickly add, complete, and delete tasks with an intuitive interface.
-   **Smart Filtering:** Easily filter your tasks by their status: All, Active, or Completed.
-   **Persistent Storage:** Your tasks are securely saved using Cloudflare Durable Objects, so you'll never lose your progress.
-   **Elegant & Minimalist UI:** A clean, focused design that helps you concentrate on what matters.
-   **Smooth Animations & Micro-interactions:** Delightful animations provide satisfying feedback for every action.
-   **High-Performance Serverless Backend:** Built on Cloudflare Workers for a fast, scalable, and reliable experience.

## Technology Stack

-   **Frontend:** React, TypeScript, Vite
-   **Backend:** Hono on Cloudflare Workers
-   **State Management:** Zustand
-   **Styling:** Tailwind CSS
-   **UI Components:** shadcn/ui
-   **Animation:** Framer Motion
-   **Icons:** Lucide React
-   **Storage:** Cloudflare Durable Objects

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

-   Node.js (v18 or later)
-   [Bun](https://bun.sh/) package manager
-   A [Cloudflare account](https://dash.cloudflare.com/sign-up)
-   Wrangler CLI, authenticated with your Cloudflare account. Install with `bun install -g wrangler` and then run `wrangler login`.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/taskflow.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd taskflow
    ```
3.  **Install dependencies:**
    ```sh
    bun install
    ```

## Development

To start the local development server for both the frontend and the backend worker, run:

```sh
bun dev
```

This command will start the Vite development server (typically on `http://localhost:3000`) and the Wrangler development server for the Cloudflare Worker. The frontend is configured to proxy API requests to the local worker instance.

## Project Structure

-   `src/`: Contains the frontend React application.
    -   `pages/`: Main application pages.
    -   `components/`: Reusable UI components.
    -   `lib/`: Utility functions and API client.
-   `worker/`: Contains the backend Cloudflare Worker code built with Hono.
    -   `index.ts`: The main worker entry point.
    -   `user-routes.ts`: API route definitions.
    -   `entities.ts`: Durable Object entity definitions.
-   `shared/`: Contains types and data shared between the frontend and backend.

## Deployment

This project is designed for easy deployment to the Cloudflare network.

1.  **Build the project:**
    ```sh
    bun build
    ```
2.  **Deploy to Cloudflare:**
    ```sh
    bun deploy
    ```

This command will build the React application, bundle the worker code, and deploy everything to your Cloudflare account.

Alternatively, you can deploy directly from your GitHub repository using the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/FlexsibleAdmin/generated-app-20251204-004313)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.