# Smart Bookmark App

A simple real-time bookmark manager built using **Next.js App Router**, **Supabase**, and **Tailwind CSS**.  
Users can sign in using **Google OAuth**, add and delete bookmarks, and see updates in real time across multiple tabs.

---

## 🚀 Live Demo

🔗 Live URL: https://your-vercel-app-url.vercel.app

---

## 📦 Tech Stack

- **Next.js** (App Router)
- **Supabase**
  - Authentication (Google OAuth)
  - PostgreSQL Database
  - Realtime subscriptions
- **Tailwind CSS**
- **Vercel** (Deployment)

---

## ✨ Features

- Google OAuth login (no email/password)
- Add bookmarks (URL + title)
- Bookmarks are private to each user
- Real-time updates without page refresh
- Delete own bookmarks
- Deployed and accessible via live URL

---

## 🗄️ Database Schema

**Table: `bookmarks`**

| Column      | Type      |
|------------|-----------|
| id         | uuid (PK) |
| user_id    | uuid (FK → auth.users.id) |
| title      | text      |
| url        | text      |
| created_at| timestamp |

---

## 🔐 Security (Row Level Security)

Row Level Security (RLS) is enabled to ensure:
- Users can only read their own bookmarks
- Users can only insert bookmarks for themselves
- Users can only delete their own bookmarks

This ensures complete data privacy between users.

---

## ⚡ Realtime Functionality

Supabase Realtime is enabled on the `bookmarks` table.  
The app subscribes to `INSERT` and `DELETE` events so changes appear instantly across multiple tabs without refreshing.

---

## 🧪 How to Run Locally

1. Clone the repository
```bash
git clone https://github.com/your-username/smart-bookmark-app.git
cd smart-bookmark-app
