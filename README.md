# Noor-e-Muhammad ﷺ — 12 Rabi-ul-Awwal Platform

A comprehensive, premium digital Islamic platform dedicated to celebrating the blessed birth (12 Rabi-ul-Awwal), Seerah, Sunnah, and timeless teachings of Prophet Muhammad ﷺ.

## 🌟 Key Features

* **Interactive Countdown**: A live countdown timer to the blessed day of 12 Rabi-ul-Awwal.
* **Knowledge Hub**: Extensive sections dedicated to the Seerah (timeline of the Prophet's life), Sunnah (daily habits), authentic Ahadith, and the Noble Quran.
* **Media Library**: Curated collections of Naat Shareef, scholarly Bayans (lectures), and Islamic videos.
* **Digital Tools**: Interactive Tasbeeh and Salawat counters that save your progress.
* **Premium UI/UX**: A highly responsive, modern interface built with Tailwind CSS, featuring glassmorphism, dynamic gradients, and smooth Framer Motion animations.
* **Admin CMS Dashboard**: A secure, password-protected portal to manage all content (Hadith, Duas, Events, Media) without touching the code.

## 🛠️ Technology Stack

* **Frontend**: React 19, TypeScript, Vite
* **Styling**: Tailwind CSS v4, Framer Motion
* **State Management**: Zustand
* **Backend / Auth**: Firebase

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Ensure you have a `.env` file in the root directory with your Firebase configuration and Admin password:
   ```env
   VITE_FIREBASE_API_KEY="your_api_key"
   VITE_FIREBASE_AUTH_DOMAIN="your_auth_domain"
   VITE_FIREBASE_PROJECT_ID="your_project_id"
   VITE_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
   VITE_FIREBASE_APP_ID="your_app_id"
   VITE_ADMIN_PASSWORD="your_secure_password"
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## 🔒 Admin Access
To access the CMS dashboard, navigate to `/admin/login` and enter the password configured in your `.env` file.

## 📱 Responsiveness
The application is fully optimized for all devices, ensuring a seamless experience across mobile phones, tablets, and desktop computers.
