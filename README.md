# Remedial Teaching — Stage 1 + Stage 2

Responsive React + Tailwind CSS educational platform, designed to work well on Samsung tablets, phones and desktop screens.

## Stage 2 delivered

- Supabase client setup using environment variables
- Student and parent/guardian registration
- Email/password login and logout
- Email verification flow
- Password reset email request
- Auth session restoration
- Protected dashboard route
- Basic student/guardian dashboard
- Supabase SQL schema with Row Level Security
- Admin membership controlled outside public signup
- Guardian/student link table reserved for trusted admin approval

There are **no teacher accounts**. Public signup only supports `student` and `guardian`. Admin access is not offered through public registration.

## Run in a browser-based coding environment on a Samsung tablet

You can use StackBlitz in Samsung Internet or Chrome:

1. Open https://stackblitz.com/
2. Create/import a Vite + React project or upload this project.
3. Open the terminal and run `npm install`.
4. Configure the environment variables described below.
5. Run `npm run dev` and use the preview.

For source control, create a GitHub repository and import/connect it to StackBlitz. A laptop is more comfortable for larger edits, but the tablet can be used for browser-based development and testing.

## Run locally on a computer

Requirements: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

## Supabase setup

1. Create a Supabase project at https://supabase.com/.
2. In the Supabase SQL Editor, run `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local`.
4. Set:
   - `VITE_SUPABASE_URL` to the Project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY` to the publishable/anon key
5. In Supabase Authentication > URL Configuration, set your local Site URL and add your deployed URL to Redirect URLs.
6. Enable email confirmation if you want verified student/guardian accounts.
7. Register your own account, then manually add its auth user UUID to `public.admin_users` using the SQL comment at the end of `schema.sql`.

Never put a Supabase service-role key in frontend environment variables. The publishable key is designed for browser use only when Row Level Security is correctly configured.

## Environment variables

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Do not commit `.env.local`.

## Important security notes

- Signup accepts only `student` and `guardian` account types.
- Admin status comes from `admin_users`, not user-editable metadata.
- Guardian accounts do not automatically gain access to a student's records.
- Guardian/student relationships must be established by an administrator.
- Student data access policies for later stages must be added deliberately and tested.
- The current dashboard is a Stage 2 account shell, not yet a complete learning dashboard.

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` as Pages environment variables.
- Add the deployed domain to Supabase Auth Redirect URLs.

## Next stages

3. Personalised student dashboard and learning profile
4. Remedial course management
5. PDF library and video lessons
6. Practice, quizzes and examinations
7. Progress tracking
8. Secure AI study assistant
9. Admin and guardian access workflows
10. Testing and deployment hardening
