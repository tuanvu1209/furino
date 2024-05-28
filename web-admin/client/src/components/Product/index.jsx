// @ts-nocheck
import { Box, Button, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataProduct } from '../../store/slices/productManagementSlice/productReduce';
import CategoryList from '../Category/CategoryList';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '5px',
};

export function Product() {
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [limitOffset, setLimitOffset] = useState({
    limit: 100,
    page: 1,
    categoryId: null,
    keyword: '',
  });
  const { products } = useSelector((state) => state.productManagement);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataProduct(limitOffset));
  }, []);

  useEffect(() => {
    handleCloseModal();
  }, [products]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center full-w py-4 text-black">
        <span>Product Manager</span>
        <div className="flex gap-2">
          <Button
            variant="contained"
            sx={{
              background: 'black',
              '&:hover': {
                backgroundColor: 'black',
              },
            }}
            id="basic-button"
            onClick={handleClickMenu}
          >
            Category
          </Button>
          <Button
            variant="contained"
            sx={{
              background: 'black',
              '&:hover': {
                backgroundColor: 'black',
              },
            }}
            onClick={handleOpenModal}
          >
            Add Product
          </Button>
        </div>
      </div>
      <ProductList
        limitOffset={limitOffset}
      />
      <CategoryList
        onOpenMenu={openMenu}
        onHandleCloseMenu={handleCloseMenu}
        anchorEl={anchorEl}
      />
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ProductForm
            onClose={handleCloseModal}
            action="create"
            limitOffset={limitOffset}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default Product;
