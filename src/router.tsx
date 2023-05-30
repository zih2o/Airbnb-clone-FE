import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import Home from './routes/Home';
import Notfound from './routes/Notfound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Notfound />,
    children: [
      {
        path: '',
        element: <Home />,
      },
    ],
  },
]);

export default router;
