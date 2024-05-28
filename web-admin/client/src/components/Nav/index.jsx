// @ts-nocheck
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import IconMenu from '../../assets/icon/IconMenu';
import logo from '../../assets/icon/logoBlueOC.png';
import { handleLeftMenu } from '../../store/slices/leftMenuSlice';
import Profile from '../Profile';

function Nav() {
  const { showMenu } = useSelector((state) => state?.leftMenu);
  const dispatch = useDispatch();

  const handleToggleMenu = (event) => {
    event.stopPropagation();
    dispatch(handleLeftMenu(!showMenu));
  };
  return (
    <nav className='flex justify-between py-3 items-center text-RiverBed-0'>
      <div className='flex items-center gap-2'>
        <IconButton
          sx={{
            minWidth: 20,
          }}
          onClick={handleToggleMenu}
        >
          <IconMenu />
        </IconButton>
        <h1 className='text-h1 text-white font-semibold uppercase hidden sm:block'>
          Store
        </h1>
        <span className='sm:hidden'>
          <img
            src={logo}
            alt='logo'
            className='h-[30px]'
          />
        </span>
      </div>
      <div className='flex sm:gap-[22px] items-center'>
        <Profile />
      </div>
    </nav>
  );
}

export default Nav;
