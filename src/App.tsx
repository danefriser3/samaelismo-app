import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import "./App.css";
import './components/pages/start/Start.css';

// Lazy loading per componenti pesanti
const Start = lazy(() => import('./components/pages/start/Start'));
const Diary = lazy(() => import('./components/pages/diary/Diary'));
const ResponsiveLayout = lazy(() => import('./components/layout/ResponsiveLayout'));
const LiturgicalCalendar = lazy(() => import('./components/LiturgicalCalendar'));
const LiberSpirae = lazy(() => import('./components/pages/liber-spirae/LiberSpirae'));
const UserPage = lazy(() => import('./components/pages/profile/UserPage'));
const DailyVerse = lazy(() => import('./components/DailyVerse'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));

// Componente di loading centralizzato
const LoadingSpinner = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="50vh"
    role="status"
    aria-label="Loading content"
  >
    <CircularProgress />
  </Box>
);

const router = createBrowserRouter([
  {
    path: "/", // Public route
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Start />
      </Suspense>
    ),
  },
  {
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ResponsiveLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/home",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <DailyVerse />
          </Suspense>
        ),
      },
      {
        path: "/diary",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute>
              <Diary />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/liber-spirae",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LiberSpirae />
          </Suspense>
        ),
      },
      {
        path: "/calendar",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <LiturgicalCalendar />
          </Suspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
