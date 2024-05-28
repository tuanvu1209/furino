// @ts-nocheck
import { Button, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/slices/userManagementSlice/userReduce';
import { disableMenu, roleListDefault } from './../../assets/enum/constants';
import MenuSelect from './AccountMenu';
import AccountModal from './AccountModal';
import avatar from '../../assets/image/user-placeholder.jpg';

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

const AccountList = ({ accounts, limitOffset }) => {
  const [menuRole, setMenuRole] = useState(null);
  const [menuDisable, setMenuDisable] = useState(null);
  const [disableList, setDisableList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [dataRequest, setDataRequest] = useState();
  const [user, setUser] = useState();

  const dispatch = useDispatch();

  //modal
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  //menu role
  const openMenuRole = Boolean(menuRole);
  const handleOpenMenuRole = (event, params) => {
    const roleNames = roleListDefault.filter(
      (item) => item?.name.toLowerCase() != params.role.toLowerCase()
    );
    setRoleList(roleNames);
    setMenuRole(event.currentTarget);
    setUser(params);
  };
  const handleCloseMenuRole = (value) => {
    if (typeof value !== 'number') {
      setMenuRole(null);
      return;
    }
    const data = { roleId: value, userId: user?.id };
    setDataRequest(data);
    setMenuRole(null);
    handleOpenModal();
  };

  //menu disable
  const openMenuDisable = Boolean(menuDisable);
  const handleCloseMenuDisable = (value) => {
    if (typeof value !== 'number') {
      setMenuDisable(null);
      return;
    }
    const data = { status: value, userId: user?.id };
    setDataRequest(data);
    setMenuDisable(null);
    handleOpenModal();
  };
  const handleOpenMenuDisable = (event, params) => {
    const newDisableList = disableMenu.filter((item) =>
      params.status === 'Enable' ? item.value === 0 : item.value === 1
  );
    setDisableList(newDisableList);
    setMenuDisable(event.currentTarget);
    setUser(params);
  };

  const handleSubmit = () => {
    dispatch(updateUser({ dataRequest, limitOffset }));
  };

  useEffect(() => {
    handleCloseModal();
  }, [accounts]);

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <img
          className='rounded-full p-4'
          src={params.value}
        />
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 130,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 220,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <span>{params.value}</span>
        </Tooltip>
      ),
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 130,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div className='flex gap-2 items-center'>
          <Tooltip title='Change Status'>
            <Button
              variant='outlined'
              id='basic-button'
              sx={{
                color: 'black',
                borderColor: 'black',
                backgroundColor: 'white',
                '&:hover': { background: 'black', color: 'white' },
                textTransform: 'capitalize',
              }}
              aria-haspopup='true'
              onClick={(event) => handleOpenMenuRole(event, params.row)}
            >
              {params.value}
            </Button>
          </Tooltip>
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div className='flex gap-2 items-center'>
          <Tooltip title='Change status'>
            <Button
              variant='outlined'
              id='basic-button'
              sx={{
                color: 'black',
                borderColor: 'black',
                backgroundColor: 'white',
                '&:hover': { background: 'black', color: 'white' },
                textTransform: 'capitalize',
              }}
              aria-haspopup='true'
              onClick={(event) => handleOpenMenuDisable(event, params.row)}
            >
              {params.value}
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  const rows = (accounts || []).map((item) => ({
    id: item?.userId || '',
    name: item?.name || '',
    email: item?.email || '',
    role: item?.role.name || '',
    phoneNumber: item?.phone || '',
    status: item?.status ? 'Enable' : 'Disable',
    image: item?.image ?? avatar,
  }));

  return (
    <div className='overflow-scroll'>
      <h2 className='text-2xl font-bold mb-4 text-black'>Account Manager</h2>
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
      <MenuSelect
        anchorEl={menuRole}
        openMenu={openMenuRole}
        handleCloseMenu={handleCloseMenuRole}
        list={roleList}
        type={'role'}
      />
      <MenuSelect
        anchorEl={menuDisable}
        openMenu={openMenuDisable}
        handleCloseMenu={handleCloseMenuDisable}
        list={disableList}
        type={'disable'}
      />
      <AccountModal
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AccountList;
