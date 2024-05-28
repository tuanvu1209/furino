// @ts-nocheck
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts } from '../../store/slices/userManagementSlice/userReduce';
import AccountForm from './AccountForm';
import AccountList from './AccountList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 600,
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '3px',
  boxShadow: 24,
};

function AccountManagement() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [limitOffset, setLimitOffset] = useState({
    limit: 1000,
    page: 1,
  });

  const { accounts } = useSelector((state) => state.userManagement);

  useEffect(() => {
    dispatch(getAccounts(limitOffset));
  }, []);

  useEffect(() => {
    handleClose();
  }, [accounts]);

  return (
    <div>
      <div className='flex justify-between items-center full-w py-4 text-black'>
        <span>Account Manager</span>
        <Button
          variant='contained'
          sx={{
            color: 'white',
            backgroundColor: 'black',
            '&:hover': {
              backgroundColor: 'black',
            },
          }}
          onClick={handleOpen}
        >
          Add Account
        </Button>
      </div>
      <AccountList
        accounts={accounts}
        limitOffset={limitOffset}
      />
      <Modal
        // @ts-ignore
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <AccountForm
            action='create'
            onClose={handleClose}
            limitOffset={limitOffset}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default AccountManagement;
