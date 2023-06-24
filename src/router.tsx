import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import Home from './routes/Home';
import Notfound from './routes/Notfound';
import RoomDetail from './routes/RoomDetail';
import GithubConfirm from './routes/GithubConfirm';

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
      {
        path: 'rooms/:roomPk',
        element: <RoomDetail />,
      },
      {
        path: 'social',
        children: [
          {
            path: 'github',
            element: <GithubConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;
