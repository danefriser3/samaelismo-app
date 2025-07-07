import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Start from './components/pages/start/Start';
import Diary from './components/pages/diary/Diary';

import "./App.css";
import './components/pages/start/Start.css';
import ResponsiveLayout from './components/layout/ResponsiveLayout';
import LiturgicalCalendar from './components/LiturgicalCalendar';
import LiberSpirae from './components/pages/liber-spirae/LiberSpirae';

const router = createBrowserRouter([
  {
    path: "/", // Public route
    element: <Start />,
  },
  {
    element: <ResponsiveLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/diary",
        element: <Diary />,
      },
      {
        path: "/liber-spirae",
        element: <LiberSpirae />,
      },
      {
        path: "/calendar",
        element: <LiturgicalCalendar />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
