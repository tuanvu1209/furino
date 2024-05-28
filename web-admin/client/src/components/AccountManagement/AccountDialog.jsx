import { Button } from '@mui/material';
import ButtonSubmit from '../common/ButtonSubmit';

function AccountDialog({ handleCloseModal, handleSubmit }) {
  return (
    <div className="p-5">
      <h2 className="text-xl font-bold text-black text-auto">
        {`Are you sure you want change`}
      </h2>
      <div className="flex justify-between pt-5">
        <Button
          onClick={handleCloseModal}
          sx={{ color: 'black' }}
        >
          Cancel
        </Button>
        <ButtonSubmit
          content="Yes"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default AccountDialog;
