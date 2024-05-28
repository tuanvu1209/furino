// @ts-nocheck
import {
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { roleListDefault } from '../../assets/enum/constants';
import { createUser } from '../../store/slices/userManagementSlice/userReduce';
import ButtonSubmit from '../common/ButtonSubmit';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  password: Yup.string().required('Password is required'),
});

function AccountForm({ action, account, onClose, limitOffset }) {
  const [role, setRole] = useState(3);

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const dispatch = useDispatch();
  const initialValues = {
    name: account ? account.name : '',
    email: account ? account.email : '',
    phone: account ? account.phone : '',
    password: account ? account.password : '',
  };
  const handleSubmit = (dataRequest) => {
    dataRequest.roleId = role;
    dispatch(createUser({ dataRequest, limitOffset }));
  };

  return (
    <div>
      <div className='mx-auto p-6 shadow-lg text-[#42526e]'>
        <h1 className='text-2xl font-semibold mb-4 text-black'>
          Create Account
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-black'
              >
                Name:
              </label>
              <Field
                type='text'
                id='name'
                name='name'
                autoComplete='new-password'
                className='mt-1 p-2 border border-[#C4C4C4] rounded w-full outline-none'
              />
              <ErrorMessage
                name='name'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-black'
              >
                Email:
              </label>
              <Field
                type='text'
                id='email'
                name='email'
                autoComplete='new-password'
                className='mt-1 p-2 border border-[#C4C4C4] rounded w-full outline-none'
              />
              <ErrorMessage
                name='email'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-black'
              >
                Phone:
              </label>
              <Field
                type='text'
                id='phone'
                name='phone'
                autoComplete='new-password'
                className='mt-1 p-2 border border-[#C4C4C4] rounded w-full outline-none'
              />
              <ErrorMessage
                name='phone'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-black'
              >
                Password:
              </label>
              <Field
                type='text'
                id='password'
                name='password'
                autoComplete='new-password'
                className='mt-1 p-2 border border-[#C4C4C4] rounded w-full outline-none'
              />
              <ErrorMessage
                name='password'
                component='div'
                className='text-red-500 text-sm'
              />
            </div>
            <div className='mb-4'>
              <FormControl
                sx={{
                  minWidth: 120,
                }}
              >
                <InputLabel id='demo-simple-select-label'>Role</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={role}
                  label='Role'
                  onChange={handleChange}
                >
                  {roleListDefault &&
                    roleListDefault.map((item) => (
                      <MenuItem
                        key={item.value}
                        value={item.value}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div className='flex justify-between'>
              <Button
                sx={{ color: 'black' }}
                onClick={onClose}
              >
                Discard
              </Button>
              <ButtonSubmit
                content={action === 'create' ? 'Submit' : 'Update'}
              />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AccountForm;
