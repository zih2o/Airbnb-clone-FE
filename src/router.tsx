import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import Home from './routes/Home';
import Notfound from './routes/Notfound';
import RoomDetail from './routes/RoomDetail';
import GithubConfirm from './routes/GithubConfirm';
import KakaoConfirm from './routes/KakaoConfirm';
import UploadRoom from './routes/UploadRoom';
import UploadPhotos from './routes/UploadPhotos';
import EditRoom from './routes/EditRoom';

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
        path: 'rooms/upload',
        element: <UploadRoom />,
      },
      {
        path: 'rooms/:roomPk',
        element: <RoomDetail />,
      },
      {
        path: 'rooms/:roomPk/edit',
        element: <EditRoom />,
      },
      {
        path: 'rooms/:roomPk/photos',
        element: <UploadPhotos />,
      },
      {
        path: 'social',
        children: [
          {
            path: 'github',
            element: <GithubConfirm />,
          },
          {
            path: 'kakao',
            element: <KakaoConfirm />,
          },
        ],
      },
    ],
  },
]);

export default router;
