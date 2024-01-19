import { createBrowserRouter } from 'react-router-dom';
import DashboardShell from './components/DashboardShell';
import {
  ArticleDetailsPage,
  ArticlesPage,
  DocumentsPage,
  HomePage,
  PageDetailsPage,
  PagesPage,
  ReportPage,
} from './pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardShell />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/documents',
        element: <DocumentsPage />,
      },
      {
        path: '/pages',
        element: <PagesPage />,
      },
      {
        path: '/pages/:id',
        element: <PageDetailsPage />,
      },
      {
        path: '/articles',
        element: <ArticlesPage />,
      },
      {
        path: '/articles/:id',
        element: <ArticleDetailsPage />,
      },
      {
        path: '/report',
        element: <ReportPage />,
      },
    ],
  },
]);
