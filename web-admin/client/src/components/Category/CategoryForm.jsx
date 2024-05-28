// @ts-nocheck
import { Button } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  createCategory,
  updateCategory,
} from '../../store/slices/productManagementSlice/productReduce';

import { LoadingButton } from '@mui/lab';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Category name is required'),
});

function CategoryForm({ onClose, category, action }) {
  const initialValues = {
    name: category ? category.name : '',
  };

  const [inputImg, setInputImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.productManagement);

  const handleSubmit = async (values) => {
    values.image = inputImg;
    setIsLoading(true);

    if (action === 'create') {
      dispatch(createCategory(values));
    } else {
      values = { ...values, categoryId: category.categoryId };
      dispatch(updateCategory(values));
    }
  };

  const handleChangeInputImg = (event) => {
    if (event) {
      setInputImg(event.target.files[0]);
    }
  };

  return (
    <div className="mx-auto p-6 shadow-lg text-[#42526e]">
      <h1 className="text-2xl font-semibold mb-4 text-black">Category</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black"
            >
              Category Name:
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              autoComplete="new-password"
              className="mt-1 p-2 border border-[#C4C4C4] rounded w-full outline-none"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-black"
            >
              Image:
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChangeInputImg}
              className="mt-1 p-2 border border-[#C4C4C4] rounded w-full outline-none"
            />
            <ErrorMessage
              name="image"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="flex justify-between">
            <Button
              onClick={onClose}
              sx={{ color: 'black' }}
            >
              Discard
            </Button>
            <LoadingButton
              size="small"
              type="submit"
              sx={{
                color: 'white',
                background: 'black',
                '&:hover': {
                  backgroundColor: 'black',
                },
              }}
              loading={isLoading}
              variant="contained"
            >
              <span>{action === 'create' ? 'Submit' : 'Update'}</span>
            </LoadingButton>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default CategoryForm;
