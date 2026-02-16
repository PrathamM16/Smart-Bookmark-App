# 🔖 Smart Bookmark App

A modern, real-time bookmark manager built with **Next.js App Router**, **Supabase**, and **Tailwind CSS**.  
Users can securely sign in using **Google OAuth**, manage their bookmarks, and experience real-time updates across multiple browser tabs.

---

## 🚀 Live Demo

🔗 **Live Application:** [https://smart-bookmark-app-4uuf.vercel.app/login](https://smart-bookmark-app-4uuf.vercel.app/login)

---

## 📦 Tech Stack

- **Next.js 14** (App Router)
- **Supabase**
  - Authentication (Google OAuth)
  - Database
  - Realtime subscriptions
- **Tailwind CSS**
- **TypeScript**
- **Vercel** (Deployment)

---

## ✨ Features

- ✅ **Google OAuth Authentication** - Secure, passwordless login
- ✅ **Add Bookmarks** - Save URLs with custom titles
- ✅ **Private Bookmarks** - Each user's bookmarks are completely isolated
- ✅ **Real-time Sync** - Instant updates across all open tabs without refresh
- ✅ **Delete Bookmarks** - Remove unwanted bookmarks easily
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile
- ✅ **Production Ready** - Deployed on Vercel with proper security

---

## 🗄️ Database Schema

**Table: `bookmarks`**

| Column      | Type                        | Description                    |
|-------------|-----------------------------|--------------------------------|
| `id`        | `uuid` (Primary Key)        | Unique bookmark identifier     |
| `user_id`   | `uuid` (Foreign Key)        | References `auth.users.id`     |
| `title`     | `text`                      | Bookmark title                 |
| `url`       | `text`                      | Bookmark URL                   |
| `created_at`| `timestamp`                 | Timestamp of creation          |

---

## 🔐 Security (Row Level Security)

Row Level Security (RLS) is enabled on the `bookmarks` table to ensure complete data privacy:

```sql
-- Enable RLS
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Users can only read their own bookmarks
CREATE POLICY "Users can read own bookmarks"
ON public.bookmarks FOR SELECT
USING (auth.uid() = user_id);

-- Users can only insert bookmarks for themselves
CREATE POLICY "Users can insert own bookmarks"
ON public.bookmarks FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own bookmarks
CREATE POLICY "Users can delete own bookmarks"
ON public.bookmarks FOR DELETE
USING (auth.uid() = user_id);
```

---

## ⚡ Realtime Functionality

Supabase Realtime is enabled on the `bookmarks` table to provide instant synchronization:

```sql
-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookmarks;

-- Enable full replica identity for delete events
ALTER TABLE public.bookmarks REPLICA IDENTITY FULL;
```

The app subscribes to `INSERT` and `DELETE` events, ensuring changes appear instantly across all tabs without refreshing.

---

## 🛠️ Problems Faced & Solutions

### 1️⃣ Realtime Delete Not Syncing Across Tabs

**Problem:** Deleting a bookmark in one tab did not update in other tabs.

**Cause:** PostgreSQL doesn't send old row data for delete events by default.

**Solution:**
```sql
ALTER TABLE public.bookmarks REPLICA IDENTITY FULL;
```

### 2️⃣ Realtime Events Behaving Inconsistently

**Problem:** Realtime updates worked in one tab but not consistently in others.

**Cause:** Multiple Supabase client instances created unstable WebSocket connections.

**Solution:** Converted Supabase client into a singleton pattern to maintain one stable connection per tab.

### 3️⃣ OAuth Redirecting to Localhost in Production

**Problem:** Google login redirected to localhost after deployment.

**Cause:** Supabase Auth URL configuration pointed to local development URL.

**Solution:** Updated Supabase Authentication settings:
- **Site URL:** `https://smart-bookmark-app-4uuf.vercel.app`
- **Redirect URL:** `https://smart-bookmark-app-4uuf.vercel.app/auth/callback`

### 4️⃣ Vercel Build TypeScript Error

**Problem:** Build failed with: `Property 'auth' does not exist on type 'Promise<SupabaseClient>'`

**Cause:** Server-side Supabase client was async but used without `await`.

**Solution:** Updated API routes:
```typescript
const supabase = await createClient();
```

### 5️⃣ GitHub Push Authentication Failure

**Problem:** GitHub rejected password authentication.

**Cause:** GitHub no longer supports password authentication for Git operations.

**Solution:** Used GitHub Personal Access Token (PAT) for secure authentication.

---

## 🧪 Local Development Setup

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account
- Google OAuth credentials

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/PrathamM16/Smart-Bookmark-App.git
cd Smart-Bookmark-App
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Configure Supabase for local development**

In your Supabase project dashboard, go to **Authentication → URL Configuration**:
- **Site URL:** `http://localhost:3000`
- **Redirect URL:** `http://localhost:3000/auth/callback`

5. **Run the development server**
```bash
npm run dev
```

6. **Open the application**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🚢 Deployment to Vercel

### 1. Set Environment Variables

In your Vercel project settings, add:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Update Supabase URL Configuration

**IMPORTANT:** After deploying to production, update Supabase Authentication settings:
- **Site URL:** `https://your-app-name.vercel.app`
- **Redirect URL:** `https://your-app-name.vercel.app/auth/callback`

### 3. Deploy

```bash
git push origin main
```

Vercel will automatically deploy your application.

---


---

## 🔑 Environment Variables

### Required Variables

| Variable                          | Description                           |
|-----------------------------------|---------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`        | Your Supabase project URL             |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Your Supabase anonymous key           |

### Getting Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings → API**
3. Copy the **Project URL** and **anon/public key**

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---



## 👨‍💻 Author

**Pratham M**

- GitHub: [@PrathamM16](https://github.com/PrathamM16)
- Project: [Smart Bookmark App](https://github.com/PrathamM16/Smart-Bookmark-App)

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/PrathamM16/Smart-Bookmark-App/issues) page
2. Create a new issue with detailed information
3. Or reach out via GitHub discussions

---

**⭐ If you found this project helpful, please consider giving it a star!**
