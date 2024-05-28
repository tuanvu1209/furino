// @ts-nocheck
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../../assets/icon/logoBlueOC.png';
import { loginUser } from '../../store/slices/userManagementSlice/userReduce';
import ButtonSubmit from '../common/ButtonSubmit';

function Login() {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values) => {
    dispatch(loginUser(values));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <div className='bg-login'>
        <div className='container-small flex flex-col justify-center items-center h-full'>
          <div>
            <div className='form w-full bg-gradient-to-b from-[#0f1049] rounded-2xl shadow-2xl p-7 '>
              <form className='flex flex-col' onSubmit={formik.handleSubmit}>
                <div className=' flex justify-center items-center pb-9 ml-[135px] mr-[135px]'>
                  <div className='bg-white p-8 rounded-full'>
                    <img src={logo} alt='' className='h-[90px] w-[90px]' />
                  </div>
                </div>
                <div className=' flex justify-center items-center pb-4'></div>
                <div className='mb-[25px]'>
                  <label className='text-[#2F3F73] font-semibold text-lg'>
                    Email
                  </label>
                  <input
                    placeholder='Email'
                    type='text'
                    name='email'
                    className={`w-full h-[45px] outline-0 p-[10px] border-2 rounded-md ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-500'
                        : ''
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className='text-red-500'>{formik.errors.email}</div>
                  )}
                </div>
                <div className='mb-[25px] '>
                  <label className='text-[#2F3F73] font-semibold text-lg'>
                    Password
                  </label>
                  <div className='relative'>
                    <input
                      placeholder='Password'
                      type='password'
                      name='password'
                      className={`w-full h-[45px] outline-0 border-2 p-[10px] rounded-md ${
                        formik.touched.password && formik.errors.password
                          ? 'border-red-500'
                          : ''
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className='text-red-500'>
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex flex-col justify-center items-center '>
                  <ButtonSubmit content={'login'} />
                </div>
                {/* <h5 className='text-[16px] pt-[15px] mx-auto '>
                  Don't have an account
                  <span className='ml-[5px]'>
                    <Link className='text-[#2F3F73] font-bold' to='/register'>
                      Sign up
                    </Link>
                  </span>
                </h5> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
