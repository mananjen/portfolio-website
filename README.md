# Portfolio Website

This is the personal portfolio website of Manan Jain, a Software Engineer and AI enthusiast. It showcases his skills and projects in Deep Learning, Computer Vision, NLP, and Web technologies.

**Live Site:** https://mananjen.github.io/portfolio-website

**(Optional) Add a Screenshot**

Consider adding a screenshot of your portfolio's homepage here to give a quick visual overview!

```
<!-- ![Portfolio Screenshot](path/to/your/screenshot.png) -->
```

## Key Features

*   **About Me:** Introduces Manan Jain, his expertise, and interests.
*   **Projects Showcase:** Displays various projects with descriptions, technologies used, and links to GitHub repositories and live demos where available.
*   **Education & Experience:** Details Manan's educational background and professional experience.
*   **Contact:** Provides ways to get in touch.
*   **Responsive Design:** Adapts to different screen sizes for optimal viewing on desktop and mobile devices.
*   **Dynamic Project Loading:** Projects are loaded from a Firebase backend.

## Technologies Used

*   **Frontend:** React, JavaScript, HTML, CSS
*   **Styling:** Styled-components
*   **Routing:** React Router
*   **Data Management:** Firebase (for project information)
*   **Deployment:** GitHub Pages
*   **Development:** Create React App

## Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

*   Node.js and npm (Node Package Manager) installed on your machine. You can download them from [https://nodejs.org/](https://nodejs.org/).

### Installation

1.  **Clone the repo:**
    ```sh
    git clone https://github.com/mananjen/portfolio-website.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd portfolio-website
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Running the Application

To run the app in development mode:
```sh
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload if you make edits. You will also see any lint errors in the console.

## Available Scripts

In the project directory, you can run the following scripts:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page reloads on edits, and lint errors are shown in the console.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified, and filenames include hashes.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**
Removes the single build dependency and copies all configuration files (webpack, Babel, ESLint, etc.) and transitive dependencies into your project, giving you full control.

### `npm run predeploy`
This script automatically runs before `npm run deploy` to ensure the project is built with the latest changes. (Note: `cross-env NODE_OPTIONS=--openssl-legacy-provider` is used for compatibility).

### `npm run deploy`
Deploys the application to GitHub Pages by pushing the contents of the `build` folder to the `gh-pages` branch.

### `npm run updateProjects`
This script is used to update the project information in the Firebase Firestore database. It executes `scripts/updateProjects.js`.

## Project Structure

The project follows a standard React application structure:

```
portfolio-website/
├── public/             # Contains static assets like index.html, favicon, manifest.json
├── src/                # Contains the main source code for the React application
│   ├── assets/         # Images, fonts, and other static assets used by components
│   ├── components/     # Reusable UI components (e.g., Header, Footer, ProjectCard)
│   ├── constants/      # Global constants like screen sizes for responsive design
│   ├── hooks/          # Custom React hooks (e.g., useProjects for fetching project data)
│   ├── pages/          # Top-level page components (e.g., About, Projects, Contact)
│   ├── routes/         # Routing configuration for the application
│   ├── App.jsx         # Main application component, sets up routing and theme
│   ├── firebase.js     # Firebase configuration and initialization
│   ├── index.js        # Entry point for the React application
│   ├── theme.js        # Theme configuration for styled-components
│   └── ...             # Other JavaScript and CSS files
├── scripts/            # Contains utility scripts, like updateProjects.js for Firebase
├── .gitignore          # Specifies intentionally untracked files that Git should ignore
├── package.json        # Lists project dependencies and scripts
└── README.md           # This file, providing information about the project
```

### Key Directories:

*   **`public/`**: Contains the `index.html` file which is the entry point for the web app, along with other static assets like favicons and the manifest file.
*   **`src/`**: The heart of the application, containing all the React components, pages, hooks, styles, and business logic.
    *   **`src/assets/`**: Static assets like images that are imported directly into components.
    *   **`src/components/`**: Reusable UI pieces that are used across different parts of the application (e.g., buttons, cards, navigation elements).
    *   **`src/constants/`**: Holds shared constant values, such as breakpoints for responsive design.
    *   **`src/hooks/`**: Custom React Hooks that encapsulate reusable stateful logic (e.g., fetching project data from Firebase).
    *   **`src/pages/`**: Components that represent entire pages or views within the application (e.g., About page, Projects page).
    *   **`src/routes/`**: Manages the application's routing structure, defining which components render for which URL paths.
*   **`scripts/`**: Node.js scripts for utility tasks, such as `updateProjects.js` which is used to update project data in Firebase.

## Contact

Manan Jain is open to connecting and discussing opportunities or projects.

*   **Portfolio Contact Page:** [Contact Me](https://mananjen.github.io/portfolio-website/#/contact)
*   **LinkedIn:** (You can add your LinkedIn profile URL here if you wish)
*   **GitHub:** [mananjen](https://github.com/mananjen)

Feel free to reach out!
