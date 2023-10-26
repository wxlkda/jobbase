# JobBase
## Overview

JobBase is a comprehensive application designed to help users speed up their job application process. Built using a powerful tech stack of PostgreSQL, Express, React, Node.js, and hosted on an Azure VM, it provides a centralized system for tracking and managing job applications.

## Features

- **Centralized Management:** Easily input, update, and manage all your job applications in one place.
- **Data Visualization:** Generate insightful heatmaps and statistics to gain a deeper understanding of your job application trends.
- **Optimized Performance:** Utilizes React for faster frontend development and PostgreSQL for efficient data handling.
- **Azure VM Hosting:** Cost-effective and reliable hosting solution, ensuring high availability and performance.
- **Adding jobs** - Add job details to your profile such as Job Title, Job Link, Current Status, etc.
- **Removing/Editing Jobs** - Received the offer or made a mistake? Edit the job you uploaded or remove it from the database if you wish

## Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/wxlkda/job-tracker.git
   ```
   or 
   **Download the Zip**
  
2. **Extract the folder anywhere you want**
3. **Open terminal and go to the root directory of the extracted folder:**
	```bash
   cd <repository>
   ```
4. **Run the command:**
	```bash
   npm run start
   ```
   or
   ```bash
   concurrently "cd backend && node server.js" "cd frontend && npm start"
   ```
   (preferable first one)
5. **The application should be running at:**   
   ```bash
   localhost:3000
   ```
