# Smart Bookmark App

A simple real-time bookmark manager built using **Next.js App Router**, **Supabase**, and **Tailwind CSS**.  
Users can sign in using **Google OAuth**, add and delete bookmarks, and see updates in real time across multiple tabs.

---

## 🚀 Live Demo

🔗 Live URL: https://smart-bookmark-app-4uuf.vercel.app/login

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
## Problems faced 
Problems Faced & How I Solved Them
1️⃣ Realtime Delete Not Syncing Across Tabs

Problem:
Deleting a bookmark in one tab did not update in the other tab.

Cause:
PostgreSQL does not send old row data for delete events by default.

Solution:
Enabled:

ALTER TABLE public.bookmarks REPLICA IDENTITY FULL;



2️⃣ Realtime Events Behaving Inconsistently

Problem:
Realtime updates were working in one tab but not consistently in the other.

Cause:
Supabase client was being instantiated multiple times, creating unstable WebSocket connections.

Solution:
Converted Supabase client into a singleton so each tab maintains one stable WebSocket connection.

3️⃣ OAuth Redirecting to Localhost in Production

Problem:
After deployment, Google login redirected to localhost.

Cause:
Supabase Auth URL configuration still pointed to local development URL.

Solution:
Updated Supabase → Authentication → URL Configuration:

Site URL

https://smart-bookmark-app-4uuf.vercel.app


Redirect URL

https://smart-bookmark-app-4uuf.vercel.app/auth/callback

4️⃣ Vercel Build TypeScript Error (Server Client Issue)

Problem:
Build failed with error:

Property 'auth' does not exist on type 'Promise<SupabaseClient>'


Cause:
Server-side Supabase client was async but used without await.

Solution:
Updated API routes to use:

const supabase = await createClient();

5️⃣ GitHub Push Authentication Failure

Problem:
GitHub rejected password authentication.

Cause:
GitHub no longer supports password authentication for Git operations.

Solution:
Used GitHub Personal Access Token (PAT) for secure push.

⚙️ Environment Variables (Vercel)

Set the following in Vercel:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key


After setting environment variables, redeploy the project.


## 🧪 How to Run Locally

1. Clone the repository
```bash
git clone https://github.com/your-username/smart-bookmark-app.git
cd smart-bookmark-app


