import { Avatar, Box, Button, IconButton, Modal, Tooltip } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { handleLoadingPage } from '../../store/slices/loadingSlice';
import { actionLogout } from '../../store/slices/userManagementSlice/userManagementSlice';
import { LoadingButton } from '@mui/lab';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
};

export function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const logout = () => {
    dispatch(handleLoadingPage(true));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatch(handleLoadingPage(false));
      dispatch(actionLogout());
    }, 3000);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    handleClose();
  };
  const handleCloseModal = () => setOpenModal(false);
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
          padding: 0,
        }}
      >
        <Tooltip title='account settings' sx={{ padding: 0 }}>
          <IconButton
            onClick={handleClick}
            size='small'
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup='true'
            className='p-0'
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, padding: 0, background: 'white', color: 'black' }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiMenuItem-root': {
              fontFamily: 'nunito',
              color: '#42526E',
              textAlign: 'right',
              width: '100%',
            },
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleOpenModal}>
          <ListItemIcon>
            <HiOutlineLogout />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className=''>
            <h2 className='text-xl font-bold text-black text-auto'>
              Are you sure you want Logout?
            </h2>
            <div className='flex justify-between pt-5'>
              <Button onClick={handleCloseModal} sx={{ color: 'red' }}>
                Cancel
              </Button>
              <LoadingButton
                size='small'
                onClick={logout}
                loading={isLoading}
                variant='contained'
              >
                <span>Yes</span>
              </LoadingButton>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
export default Profile;
