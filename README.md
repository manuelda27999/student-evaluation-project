# Student Evaluation Project

![](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXRhdHZpeWM5YTJhbHRlNGh0czN1NWVkenF5bmN2ZDhwamZ6MGdydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gKNRbXNnXWoPaXAKnF/giphy.gif)

A Next.js application for managing student evaluations, grades, and feedback. This project enables students to view and evaluate their performance across modules, allows teachers to grade and comment on student work, and provides administrators with tools to manage courses and modules.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [UI Design](#ui-design)
- [Running the App](#running-the-app)
- [Data Model](#data-model)
- [Testing](#testing)

## Features

- **Student Portal**:

  - List enrolled modules
  - View grades and overall average
  - Self-evaluate by module
  - View teacher comments

- **Teacher Portal**: (in process)

  - List students and modules
  - Grade students per module and aspect
  - Provide text feedback to students
  - View student evaluations of teachers

- **Administrator Portal**: (in process)
  - Create and manage courses
  - Create and manage modules and aspects
  - Generate login links for new users

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- A Firebase project with Firestore enabled

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/student-evaluation-project.git
   cd student-evaluation-project
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

### Configuration

1. Copy the example environment file and fill in your Firebase credentials:
   ```bash
   cp .env.example .env.local
   ```
2. Edit `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   # etc.
   ```

## Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## UI Design

link to [Figma](https://www.figma.com/design/Xto9rwGVgNFYiX65gXrPnD/Student-evaluation-project?node-id=0-1&p=f&t=yWrBfc4NAXPB11Zl-0)

## Data Model

_Note: fields typed as `DocumentReference<T>` are Firestore references._

**User**

- `id` (`string`, unique, required)
- `name` (`string`, required)
- `password` (`string`, required)
- `role` (`"student" | "teacher" | "administrator"`, required)
- `courses` (`DocumentReference<Course>[]`, required) — enrolled course references.
- `comments` (`DocumentReference<Comment>[]`, required) — comment references.

**Course**

- `id` (`string`, unique, required)
- `name` (`string`, required)
- `modules` (`CourseModule[]`, required) — embedded modules, each with:
  - `name` (`string`, required)
- `aspects` (`CourseAspect[]`, required) — embedded aspects, each with:
  - `name` (`string`, required)
- `students` (`DocumentReference<User>[]`, required) — enrolled student references.
- `teachers` (`DocumentReference<User>[]`, required) — assigned teacher references.

**Module**

- `id` (`number`, unique, require)
- `name` (string, require)

**Aspect**

- `id` (`number`, unique, require)
- `name` (string, require)

**Mark**

- `id` (`number`, unique, required)
- `from` (`DocumentReference<User>`, required)
- `to` (`DocumentReference<User>`, required)
- `course` (`DocumentReference<Course>`, required)
- `module` (`DocumentReference<Module>`, required)
- `text` (`string`, required)

**Comment**

- `id` (`number`, unique, require)
- `from` (`DocumentReference<User>`, required)
- `to` (`DocumentReference<User>`, required)
- `course` (`DocumentReference<Course>`, required)
- `module` (`DocumentReference<Module>`, required)
- `text` (`string`, require)

## Testing

- **Unit Tests** (in progress)  
  The unit test suite is currently under development. You can run existing tests as they become available:

  ```bash
  npm test
  ```
