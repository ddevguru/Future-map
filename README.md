FutureMap - AI-Powered Career Architect
Welcome to FutureMap, an intelligent career guidance platform designed to help students, mentors, and institutions forge personalized career paths with confidence. Powered by AI, FutureMap matches users with tailored career roadmaps, facilitates learning, connects users with expert mentors, and provides tools to track progress and achieve goals.
Table of Contents

Features
Tech Stack
Installation
Prerequisites
Backend Setup
Frontend Setup
Database Setup
Running the Application


Project Structure
Usage
Contributing
Team
License
Contact

Features
FutureMap offers a robust suite of tools to empower career planning and professional growth:

Career Path Builder:

Drag-and-drop interface to design career paths with courses, exams, skills, institutions, and internships.
Compare multiple career paths side-by-side.
Add custom blocks for new courses or degrees.
AI-powered chatbot (Architect) for real-time guidance.
Connect with mentors and peer groups for community support.


Mentor & Community Hub:

Connect with mentors based on specialization, experience, and language.
Join live sessions (e.g., "Cracking Tech Interviews") for real-time advice.
Participate in peer groups like "Engineering Aspirants 2025" for collaboration.


Schedule Manager:

Organize career events, deadlines, and sessions in a calendar view.
Quick actions to join live sessions, set reminders, or find study groups.


Settings Page:

Customize personal/academic info, notifications, privacy, language, and appearance.


Institute Control Center:

Manage courses, applications, and student data.
Real-time stats on students, courses, applications, graduation, and placements.


Mentor Dashboard:

Track mentorship sessions, student interactions, ratings, and earnings.
Schedule sessions, message students, and create content.



Tech Stack

Frontend: React (18.x) with Vite (build tool), TypeScript, Tailwind CSS, Radix UI, Framer Motion, and Lucide React for icons.
Backend: PHP (8.1+) with custom APIs for handling flashcards, user authentication, and data management.
Database: MySQL (8.0+) for storing user data, career paths, mentor sessions, and institutional records.
Other Libraries:
react-draggable for drag-and-drop functionality.
html2canvas for downloading career path snapshots.
Sound effects for interactive UX (drag, drop, save, etc.).



Installation
Prerequisites
Ensure you have the following installed on your system:

Node.js (v18.x or higher) and npm (v9.x or higher) for the frontend.
PHP (v8.1 or higher) for the backend.
MySQL (v8.0 or higher) for the database.
Composer (PHP dependency manager).
Git for cloning the repository.
A web server like Apache or Nginx (e.g., via XAMPP, MAMP, or a local PHP server).
A code editor like VS Code.

Backend Setup

Clone the Repository:
git clone https://github.com/your-username/futuremap.git
cd futuremap


Navigate to the Backend Directory:
cd backend


Install PHP Dependencies:
composer install


Configure Environment:

Copy the example environment file:cp .env.example .env


Edit .env to configure database credentials and other settings:DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=futuremap
DB_USERNAME=your_username
DB_PASSWORD=your_password
APP_URL=http://localhost




Set Up Apache/Nginx:

Place the backend folder in your web server's root directory (e.g., htdocs for XAMPP).
Ensure the server is configured to point to the backend folder.
For Apache, enable mod_rewrite and configure .htaccess if needed.



Database Setup

Create a MySQL Database:
CREATE DATABASE futuremap;


Import the Database Schema:

Locate the database.sql file in the backend directory (create one if not provided, based on your schema).
Import it into MySQL:mysql -u your_username -p futuremap < backend/database.sql




Verify Database Connection:

Ensure the .env credentials match your MySQL setup.
Test the connection by running a PHP script or checking API endpoints.



Frontend Setup

Navigate to the Frontend Directory:
cd ../frontend


Install Node.js Dependencies:
npm install


Configure Environment:

Create a .env file in the frontend directory:cp .env.example .env


Update .env with the backend API URL:VITE_API_BASE_URL=http://localhost/Futuremap-backend




Build the Frontend:
npm run build



Running the Application

Start the Backend Server:

If using XAMPP, start Apache and MySQL.
Alternatively, use PHP's built-in server:cd backend
php -S localhost:8000




Start the Frontend Development Server:
cd frontend
npm run dev


Open your browser and navigate to http://localhost:5173 (or the port shown in the terminal).


Access the Application:

Sign in as a student, mentor, or institute.
Use the Career Path Builder to create paths, connect with mentors, or manage schedules.



Project Structure
futuremap/
├── backend/                  # PHP backend
│   ├── flashcards_api.php    # API for flashcards and career paths
│   ├── get_peers.php         # API for peer group data
│   ├── .env.example          # Example environment file
│   ├── composer.json         # PHP dependencies
│   └── database.sql          # MySQL schema (create if needed)
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components (e.g., UserInputPanel, DragDropCanvas)
│   │   ├── pages/            # Page components (e.g., CareerPathBuilder)
│   │   ├── assets/           # Images, sounds, and styles
│   │   └── App.tsx           # Main app component
│   ├── public/               # Static assets
│   ├── .env.example          # Example environment file
│   ├── vite.config.ts        # Vite configuration
│   ├── package.json          # Node.js dependencies
│   └── tailwind.config.js    # Tailwind CSS configuration
├── README.md                 # This file
└── LICENSE                   # License file

Usage

Sign In:
Choose your role (Student, Mentor, Institute) and log in with your email and password.


Career Path Builder:
Drag courses, exams, or internships from the right panel to build your path.
Use the AI Architect for guidance or connect with mentors.
Save or download your paths as PNGs.


Mentor & Community Hub:
Filter mentors, join live sessions, or participate in peer groups.


Schedule Manager:
Add events, set reminders, and track deadlines.


Institute/Mentor Dashboards:
Manage courses, applications, sessions, or earnings.



Contributing
We welcome contributions to FutureMap! To contribute:

Fork the repository.
Create a feature branch:git checkout -b feature/your-feature


Commit your changes:git commit -m "Add your feature"


Push to your branch:git push origin feature/your-feature


Open a pull request with a clear description of your changes.

Please follow our code of conduct and ensure your code adheres to the project's style guidelines.
Team
Meet the team behind FutureMap:

Deepak Mishra - Full Stack Developer - [LinkedIn Profile](https://www.linkedin.com/in/ddevguru)
Vrushali Nanavati - Product Designer×Frontend Developer - [LinkedIn Profile](https://www.linkedin.com/in/vrushali-nanavati-3ba606208)
Amulya Ambre - Full Stack Developer - [LinkedIn Profile](http://www.linkedin.com/in/amulya-ambre)
Sargam Sharma - UI/UX Designer - [LinkedIn Profile](http://www.linkedin.com/in/sargam-sharma-9664b1301)

Note: Please update the team section with actual names and LinkedIn URLs for your team members.
License
This project is licensed under the MIT License.
Contact
For questions, feedback, or support, reach out to:

Email: deepakm7778@gmail.com
GitHub Issues: Create an issue

Start your journey with FutureMap today and build your dream career!
