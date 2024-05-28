import { Box, Modal } from '@mui/material';
import AccountDialog from './AccountDialog';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
};

function AccountModal({ openModal, handleCloseModal, handleSubmit }) {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <AccountDialog
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Modal>
  );
}

export default AccountModal;
