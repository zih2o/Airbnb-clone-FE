import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div>
      im root
      <Outlet />
    </div>
  );
}
