# Task Manager - Frontend

A modern React/Next.js frontend for the Task Manager application with dark mode support, real-time filtering, and analytics.

## Features

- **User Authentication**: Secure JWT-based login and signup
- **Task Management**: Create, read, update, and delete tasks
- **Advanced Filtering**: Filter by status, priority, tags, and search
- **Dark Mode**: Built-in dark/light theme toggle
- **Analytics Dashboard**: View task completion metrics
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: React Query for efficient data fetching and caching
- **Toast Notifications**: User-friendly feedback with Sonner

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios with JWT interceptors
- **UI Components**: shadcn/ui
- **Theme**: next-themes
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running on `http://localhost:8000`

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Configure environment variables:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Update `.env.local`:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000/api
\`\`\`

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

Visit `http://localhost:3000` in your browser.

## Project Structure

\`\`\`
frontend/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
├── components/
│   ├── auth/
│   ├── dashboard/
│   ├── ui/
│   └── theme-toggle.tsx
├── lib/
│   └── api-client.ts
└── package.json
\`\`\`

## Key Components

### Authentication
- `LoginForm`: User login with email/password
- `SignupForm`: New user registration

### Dashboard
- `TaskDashboard`: Main task management interface
- `TaskList`: Display tasks with filtering
- `TaskCard`: Individual task display
- `TaskModal`: Create/edit task modal
- `TaskFilters`: Advanced filtering options
- `AnalyticsSummary`: Task statistics

## API Integration

The frontend connects to the Django REST API at `http://localhost:8000/api`.

### Key Endpoints

- `POST /auth/register/` - User registration
- `POST /auth/login/` - User login
- `POST /auth/token/refresh/` - Refresh JWT token
- `GET /tasks/` - List tasks with filtering
- `POST /tasks/` - Create task
- `PATCH /tasks/{id}/` - Update task
- `DELETE /tasks/{id}/` - Delete task

## Authentication Flow

1. User signs up or logs in
2. Backend returns `access` and `refresh` tokens
3. Tokens stored in localStorage
4. Access token sent in Authorization header for all requests
5. On 401 response, refresh token used to get new access token
6. If refresh fails, user redirected to login

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

\`\`\`bash
vercel deploy
\`\`\`

### Environment Variables for Production

\`\`\`
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
\`\`\`

## Development

### Running Tests

\`\`\`bash
npm run test
\`\`\`

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Troubleshooting

### CORS Issues
Ensure backend has CORS enabled for your frontend URL.

### Authentication Issues
- Check that tokens are stored in localStorage
- Verify API URL in `.env.local`
- Check browser console for error messages

### API Connection Issues
- Ensure backend is running on correct port
- Check network tab in browser DevTools
- Verify API_URL environment variable

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
