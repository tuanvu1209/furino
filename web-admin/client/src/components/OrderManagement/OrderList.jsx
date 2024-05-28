// @ts-nocheck
import { Box, Button, Menu, MenuItem, Modal, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { BiDetail } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { changeStatusOrder } from '../../store/slices/productManagementSlice/productReduce';
import ButtonSubmit from '../common/ButtonSubmit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
  overflow: 'scroll',
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

const statusListDefault = [
  { value: 0, name: 'Confirming' },
  { value: 1, name: 'Processing' },
  { value: 2, name: 'Delivered' },
  { value: 3, name: 'Cancel' },
];

const OrderList = ({ orders, limitOffset }) => {
  const dispatch = useDispatch();
  const [action, setAction] = useState();
  const [dataChange, setDataChange] = useState();
  const [order, setOrder] = useState();
  const [statusList, setStatusList] = useState(statusListDefault);
  const [openModal, setOpenModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  //modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //menu
  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (event, params) => {
    const newStatusList = statusListDefault.filter(
      (item) => item?.name != params.status
    );
    setStatusList(newStatusList);
    setOrder(params);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (value) => {
    if (typeof value == 'number') {
      setAction('change');
      const data = { status: value, orderId: order?.id };
      setDataChange(data);
      handleOpenModal();
    }
    setAnchorEl(null);
  };

  const handleSubmitDelete = () => {
    dispatch(changeStatusOrder(dataChange));
  };

  // detail
  const handleView = (order) => {
    setAction('view');
    const orderFind = orders.find((item) => item.orderId == order.id);
    setOrder(orderFind);
    handleOpenModal();
  };

  useEffect(() => {
    handleCloseModal();
  }, [orders]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    {
      field: 'orderDate',
      headerName: 'Order Date',
      width: 160,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 120,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 120,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
    },
    {
      field: 'userId',
      headerName: 'UserID',
      width: 220,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 150,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 250,
      renderCell: (params) => (
        <div className='flex gap-2'>
          <Tooltip title='Change Status'>
            <Button
              variant='outlined'
              id='basic-button'
              sx={{
                color: 'black',
                borderColor: 'black',
                backgroundColor: 'white',
                '&:hover': { background: 'black', color: 'white' },
              }}
              aria-controls={openModal ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={openModal ? 'true' : undefined}
              onClick={(event) => handleClickMenu(event, params.row)}
            >
              <AiFillEdit size={24} />
            </Button>
          </Tooltip>
          <Tooltip title='View Order'>
            <Button
              variant='outlined'
              sx={{
                color: 'black',
                borderColor: 'black',
                backgroundColor: 'white',
                '&:hover': { background: 'black', color: 'white' },
              }}
              onClick={() => handleView(params.row)}
            >
              <BiDetail size={24} />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const rows =
    orders &&
    orders.map((item) => ({
      id: item?.orderId,
      orderDate: item?.orderDate,
      status:
        item?.orderStatus == 0
          ? 'Confirming'
          : item?.orderStatus == 1
          ? 'Processing'
          : item?.orderStatus == 2
          ? 'Delivered'
          : 'Cancel',
      userId: item?.userId,
      orderDetail: item?.orderDetail,
      quantity: item?.quantity,
      total: item?.total,
      name: `${item?.firstName} ${item?.lastName}`,
      address: `${item?.address}, ${item?.ward}, ${item?.district}, ${item?.province}`,
      phoneNumber: item?.phone,
    }));

  const rowsDetail =
    order &&
    (order.orderItems || []).map((item) => ({
      id: item?.product.productId,
      name: item?.product.name,
      quantity: item?.quantity,
      color: item?.productColor.name,
      price: item?.price,
      image: item?.product.productImages,
    }));

  const columnsDetail = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'image',
      headerName: 'Image',
      width: 220,
      renderCell: (params) => (
        <img
          src={params.value}
          alt='product'
          className='w-[100px] h-[100px] object-contain'
        />
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 160,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 120,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 120,
    },
    {
      field: 'color',
      headerName: 'Color',
      width: 120,
    },
  ];

  const OrderDetail = () => {
    return (
      <div className='text-black w-[700px]'>
        <h2 className='text-xl mb-4 text-center'>ORDER DETAIL</h2>
        <div className='flex h-[420px] '>
          <div className='pr-4 pb-4 overflow-scroll flex-1'>
            <DataGrid
              rows={rowsDetail}
              columns={columnsDetail}
              rowHeight={100}
              sx={dataGridClass}
            />
          </div>
        </div>
      </div>
    );
  };

  const ChangeStatus = () => {
    return (
      <div className=''>
        <h2 className='text-xl font-bold text-black text-auto'>
          Are you sure you want change status to{' '}
          {dataChange?.status == 0
            ? 'Confirming'
            : dataChange?.status == 1
            ? 'Processing'
            : dataChange?.status == 2
            ? 'Delivered'
            : 'Cancel'}
        </h2>
        <div className='flex justify-between pt-5'>
          <Button
            onClick={handleCloseModal}
            sx={{ color: 'black' }}
          >
            Cancel
          </Button>
          <ButtonSubmit
            onSubmit={handleSubmitDelete}
            content='Yes'
          />
        </div>
      </div>
    );
  };

  return (
    <div className='overflow-scroll'>
      <h2 className='text-2xl font-bold mb-4 text-black'>Order Manager</h2>
      <div style={{ height: 'calc(100vh - 160px)' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={100}
          sx={dataGridClass}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {statusList &&
          statusList.map(({ value, name }) => (
            <MenuItem
              key={value}
              onClick={() => handleCloseMenu(value)}
            >
              {name}
            </MenuItem>
          ))}
      </Menu>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          {action === 'view' ? <OrderDetail /> : <ChangeStatus />}
        </Box>
      </Modal>
    </div>
  );
};

export default OrderList;
