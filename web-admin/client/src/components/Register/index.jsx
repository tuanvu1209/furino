// @ts-nocheck
import { LoadingButton } from '@mui/lab';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../../assets/icon/logoBlueOC.png';
import { createUser } from '../../store/slices/userManagementSlice/userReduce';

const Register = () => {
  const initialValues = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '', // Thêm trường phoneNumber
    address: '', // Thêm trường address
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
  });

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    const data = {
      name: values.username || values.Username,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      address: values.address,
    };
    dispatch(createUser(data));
    setSubmitting(false);
    setIsLoading(true);
  };

  return (
    <>
      <div className='bg-login '>
        <div className='container-small flex flex-col justify-center items-center h-full'>
          <div>
            <div className='form w-full bg-gradient-to-b from-indigo-500 rounded-2xl shadow-2xl pt-9 pr-9 pl-9 pb-7  h-[730px] overflow-scroll'>
              <div className=' flex justify-center items-center pb-9 ml-[135px] mr-[135px]'>
                <div className='bg-white p-8 rounded-full'>
                  <img src={logo} alt='' className='h-[90px] w-[90px]' />
                </div>
              </div>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className='flex flex-col items-center'>
                    <div className=' flex justify-center items-center pb-4 '>
                      <h2 className='text-[20px] font-bold text-white	'>
                        Registration
                      </h2>
                    </div>
                    <div className='flex flex-col w-[400px] relative'>
                      <label className='text-[#2F3F73] font-semibold text-lg'>
                        Email
                      </label>
                      <Field
                        type='text'
                        name='email'
                        placeholder='Email'
                        className={`w-full mb-[10px] mt-[10px] h-[45px] outline-0 p-[10px] rounded-md`}
                      />
                      <ErrorMessage
                        name='email'
                        component='div'
                        className='text-red-500'
                      />
                    </div>

                    <div className='flex flex-col w-[400px]'>
                      <label className='text-[#2F3F73] font-semibold text-lg'>
                        Username
                      </label>
                      <Field
                        type='text'
                        name='username'
                        placeholder='User name'
                        className={`w-full mb-[10px] mt-[10px] h-[45px] outline-0 p-[10px] rounded-md`}
                      />
                      <ErrorMessage
                        name='username'
                        component='div'
                        className='text-red-500'
                      />
                    </div>

                    <div className='flex flex-col w-[400px]'>
                      <label className='text-[#2F3F73] font-semibold text-lg'>
                        Password
                      </label>
                      <Field
                        type='password'
                        name='password'
                        placeholder='Password'
                        autoComplete='new-password'
                        className={`w-full mb-[10px] mt-[10px] h-[45px] outline-0 border-2 p-[10px] rounded-md`}
                      />
                      <ErrorMessage
                        name='password'
                        component='div'
                        className='text-red-500'
                      />
                    </div>

                    <div className='flex flex-col w-[400px]'>
                      <label className='text-[#2F3F73] font-semibold text-lg'>
                        Confirm Password
                      </label>
                      <Field
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm password'
                        autoComplete='new-password1'
                        className={`w-full mb-[10px] mt-[10px] h-[45px] outline-0 border-2 p-[10px] rounded-md`}
                      />
                      <ErrorMessage
                        name='confirmPassword'
                        component='div'
                        className='text-red-500'
                      />
                    </div>

                    <div className='flex flex-col w-[400px]'>
                      <label className='text-[#2F3F73] font-semibold text-lg'>
                        Phone Number
                      </label>
                      <Field
                        type='text'
                        name='phoneNumber'
                        placeholder='Phone Number'
                        className={`w-full mb-[10px] mt-[10px] h-[45px] outline-0 p-[10px] rounded-md`}
                      />
                      <ErrorMessage
                        name='phoneNumber'
                        component='div'
                        className='text-red-500'
                      />
                    </div>

                    <div className='flex flex-col w-[400px]'>
                      <label className='text-[#2F3F73] font-semibold text-lg'>
                        Address
                      </label>
                      <Field
                        type='text'
                        name='address'
                        placeholder='Address'
                        className={`w-full mb-[10px] mt-[10px] h-[45px] outline-0 p-[10px] rounded-md`}
                      />
                      <ErrorMessage
                        name='address'
                        component='div'
                        className='text-red-500'
                      />
                    </div>

                    <div className='pt-[5px]'>
                      <LoadingButton
                        size='small'
                        type='submit'
                        loading={isLoading}
                        disabled={isSubmitting}
                        variant='contained'
                      >
                        <span> Register</span>
                      </LoadingButton>
                    </div>

                    <h5 className='text-[16px] pt-[1.5rem] mx-auto  '>
                      Already have an account
                      <span className='ml-[5px]'>
                        <Link
                          className='text-[#2F3F73] font-semibold'
                          to='/login'
                        >
                          Login
                        </Link>
                      </span>
                    </h5>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
