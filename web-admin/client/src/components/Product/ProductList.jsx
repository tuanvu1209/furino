// @ts-nocheck
import { Box, Button, Modal, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { BiDetail } from 'react-icons/bi';

import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { optionLimit } from '../../assets/enum/constants';
import { deleteProduct } from '../../store/slices/productManagementSlice/productReduce';
import ButtonSubmit from '../common/ButtonSubmit';
import ProductForm from './ProductForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
};

const dataGridClass = {
  '& .MuiDataGrid-columnHeaderTitleContainer': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .MuiDataGrid-cell--withRenderer': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '& .MuiDataGrid-cell': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const ProductList = ({ limitOffset }) => {
  const [itemProduct, setItemProduct] = useState();
  const [action, setAction] = useState();
  const [open, setOpen] = React.useState(false);
  const { products } = useSelector((state) => state.productManagement);

  const dispatch = useDispatch();

  const handleDelete = (product) => {
    setItemProduct(product?.id);
    setAction('delete');
    handleOpen();
  };
  const handleSubmitDelete = () => {
    dispatch(deleteProduct({ productId: itemProduct, limitOffset }));
  };

  useEffect(() => {
    handleClose();
  }, [products]);

  const handleEdit = (product) => {
    const findProduct = products.find((item) => item.productId === product.id);
    setItemProduct(findProduct);
    setAction('view');
    handleOpen();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 130 },
    {
      field: 'image',
      headerName: 'Images',
      width: 160,
      renderCell: (params) => (
        <img
          src={params.value}
          alt='Product'
          style={{
            width: '100px',
            height: '100px',
            padding: '10px',
            borderRadius: '20px',
          }}
        />
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 130,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 160,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 140,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 140,
    },
    {
      field: 'categoryId',
      headerName: 'Category',
      type: 'number',
      width: 140,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
    },
    {
      field: 'updatedAp',
      headerName: 'Update At',
      width: 150,
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (params) => (
        <div className='flex gap-2'>
          <Button
            sx={{
              color: 'black',
              borderColor: 'black',
              '&:hover': { background: 'black', color: 'white' },
            }}
            variant='outlined'
            onClick={() => handleDelete(params.row)}
          >
            <AiOutlineDelete size={24} />
          </Button>
          <Button
            sx={{
              color: 'black',
              borderColor: 'black',
              '&:hover': { background: 'black', color: 'white' },
            }}
            variant='outlined'
            onClick={() => handleEdit(params.row)}
          >
            <BiDetail size={24} />
          </Button>
        </div>
      ),
    },
  ];

  const rows = (products || []).map((item) => ({
    id: item.productId,
    name: item.name,
    description: item.description,
    quantity: item?.productInventories[0].quantity,
    price: item?.productInventories[0].price,
    categoryId: item.name,
    createdAt: item?.createdAt,
    updatedAp: item?.updatedAt,
    image: item.productGeneralImages[0]?.image,
  }));

  return (
    <div className='overflow-scroll'>
      <h2 className='text-2xl font-bold mb-4 text-black'>Product List</h2>
      <div style={{ height: 'calc(100vh - 160px)' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={100}
          sx={dataGridClass}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={optionLimit}
        />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {action === 'delete' ? (
            <div className=''>
              <h2 className='text-xl font-bold text-black text-auto'>
                Are you sure you want to delete the product?
              </h2>
              <div className='flex justify-between pt-5'>
                <Button
                  onClick={handleClose}
                  sx={{ color: 'black' }}
                >
                  Cancel
                </Button>
                <ButtonSubmit
                  content='Delete'
                  onSubmit={handleSubmitDelete}
                />
              </div>
            </div>
          ) : (
            <div className='w-[600px]'>
              <ProductForm
                product={itemProduct}
                onClose={handleClose}
                limitOffset={limitOffset}
                action='view'
              />
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ProductList;
