// import React from "react";
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import HomePage from '@/features/home/HomePage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
