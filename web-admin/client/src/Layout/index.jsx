import { Outlet } from 'react-router-dom';
import LeftMenu from '../components/LeftMenu';

function LayOut() {
  return (
    <main className='flex '>
      <LeftMenu />
      <div className='flex-1 pt-14 px-4 overflow-scroll'>
        <Outlet />
      </div>
    </main>
  );
}

export default LayOut;
