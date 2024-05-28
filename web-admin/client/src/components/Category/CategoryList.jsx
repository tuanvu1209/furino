// @ts-nocheck
import { LoadingButton } from '@mui/lab';
import { Box, Button, Menu, MenuItem, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { IoAddSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { deleteCategory } from '../../store/slices/productManagementSlice/productReduce';
import CategoryForm from './CategoryForm';
import ButtonSubmit from '../common/ButtonSubmit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: '5px',
};

const CategoryList = ({ onOpenMenu, onHandleCloseMenu, anchorEl }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [categoryItem, setCategoryItem] = useState();
  const [action, setAction] = useState(false);
  const { categories } = useSelector((state) => state.productManagement);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const dispatch = useDispatch();

  const handleEditCategory = (item) => {
    setAction('update');
    onHandleCloseMenu();
    setCategoryItem(item);
    setModalType('update');
    handleOpenModal();
  };

  const handleDeleteCategory = (item) => {
    onHandleCloseMenu();
    setCategoryItem(item);
    setModalType('delete');
    handleOpenModal();
  };

  const handleSubmitDelete = () => {
    handleCloseModal();
    dispatch(deleteCategory(categoryItem.categoryId));
  };

  useEffect(() => {
    handleCloseModal();
  }, [categories]);

  const handleAddCategory = () => {
    setAction('create');
    onHandleCloseMenu();
    setCategoryItem(null);
    setModalType('create');
    handleOpenModal();
  };
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={onOpenMenu}
        onClose={onHandleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={handleAddCategory}
          className="flex gap-4"
        >
          <IoAddSharp />
          Add New Category
        </MenuItem>
        {(categories || []).map((item) => (
          <MenuItem key={uuidv4()}>
            <div className="w-full flex gap-4 justify-between">
              <img
                src={item.image}
                alt={item.name}
                className="h-[20px] w-[20px]"
              />
              <span>{item.name}</span>
              <div className="flex gap-2">
                <Button
                  className="min-w-[20px]"
                  sx={{
                    minWidth: 'unset',
                  }}
                  onClick={() => handleDeleteCategory(item)}
                >
                  <AiOutlineDelete />
                </Button>
                <Button
                  className="min-w-[20px]"
                  sx={{
                    minWidth: 'unset',
                  }}
                  onClick={() => handleEditCategory(item)}
                >
                  <AiFillEdit />
                </Button>
              </div>
            </div>
          </MenuItem>
        ))}
      </Menu>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {modalType == 'update' || modalType == 'create' ? (
            <CategoryForm
              onClose={handleCloseModal}
              category={categoryItem}
              action={action}
            />
          ) : (
            <div className="">
              <h2 className="text-xl font-bold text-black text-auto">
                Are you sure you want to delete the category?
              </h2>
              <div className="flex justify-between pt-5">
                <Button
                  onClick={handleCloseModal}
                  sx={{ color: 'red' }}
                >
                  Cancel
                </Button>
                <ButtonSubmit
                  content='Delete'
                  onSubmit={handleSubmitDelete}
                />
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CategoryList;
