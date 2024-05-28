// @ts-nocheck
import { FaRegEdit } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { LuDelete } from 'react-icons/lu';

import { LoadingButton } from '@mui/lab';
import {
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { createProduct, updateProduct } from '../../store/slices/productManagementSlice/productReduce';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function ProductForm({ onClose, product, action, limitOffset }) {
  const [edit, setEdit] = useState(action === 'create');
  const [productCategories, setProductCategories] = useState(
    product?.productCategories.length > 0
      ? product?.productCategories.map((item) => item.categoryId)
      : []
  );
  const [productInventories, setProductInventories] = useState(
    product?.productInventories.length > 0
      ? product?.productInventories.map((item) => ({
          productColorId: item.productColor.productColorId,
          productSizeId: item.productSize.productSizeId,
          quantity: item.quantity,
          price: item.price,
          sold: item.sold,
        }))
      : [
          {
            productColorId: null,
            productSizeId: null,
            quantity: null,
            price: null,
          },
        ]
  );
  const [productImages, setProductImages] = useState([
    { image: null, productColorId: null, name: null },
  ]);
  const [productGeneralImages, setProductGeneralImages] = useState(
    product?.productGeneralImages.length > 0
      ? product?.productGeneralImages.map((item) => item.image)
      : []
  );

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setProductCategories(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const category = useSelector((state) => state.productManagement.categories);
  const colors = useSelector((state) => state.productManagement.colors);
  const sizes = useSelector((state) => state.productManagement.sizes);
  const isLoadingButton = useSelector((state) => state.loading.isLoadingButton);

  const formik = useFormik({
    initialValues: {
      name: product?.name || '',
      description: product?.description || '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      description: Yup.string()
        .required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  React.useEffect(() => {
    const colorIds = productInventories.map((item) => item.productColorId);
    const filteredArray = colors.filter((item) =>
      colorIds.includes(item.productColorId)
    );

    setProductImages(
      filteredArray.map((item) => ({
        image:
          product?.productImages.find(
            (image) => image.productColorId === item.productColorId
          )?.image ||
          productImages.find(
            (image) => image.productColorId === item.productColorId
          )?.image ||
          null,
        productColorId: item.productColorId,
        name: item.name,
      }))
    );
  }, [productInventories]);

  const handleSubmit = () => {
    const data = {
      name: formik.values.name,
      description: formik.values.description,
      productCategories,
      productInventories,
      productImages,
      productGeneralImages,
    };
    if(action === 'view') {
      data.productId = product.productId;
      dispatch(updateProduct(data));
      return;
    }
    dispatch(createProduct(data));
  };

  return (
    <div className='mx-auto p-6 shadow-lg h-[600px] overflow-scroll'>
      <div className='flex py-4 justify-between items-center'>
        <h2 className='text-[20px]'>
          {action === 'view' ? 'Product' : 'Create Product'}
        </h2>
        <IconButton onClick={() => setEdit(!edit)}>
          <FaRegEdit
            className='text-black'
            size={16}
          />
        </IconButton>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className='flex flex-col gap-4'
      >
        <TextField
          error={Boolean(formik.touched.name && formik.errors.name)}
          id='name'
          label='Name'
          disabled={!edit}
          variant='outlined'
          sx={{ width: '100%' }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          helperText={
            formik.touched.name && formik.errors.name && formik.errors.name
          }
        />
        <TextField
          error={Boolean(
            formik.touched.description && formik.errors.description
          )}
          id='description'
          label='Description'
          disabled={!edit}
          variant='outlined'
          sx={{ width: '100%' }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          helperText={
            formik.touched.description &&
            formik.errors.description &&
            formik.errors.description
          }
        />
        <FormControl>
          <InputLabel id='demo-multiple-checkbox-label'>Category</InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            disabled={!edit}
            value={productCategories}
            onChange={handleChange}
            input={<OutlinedInput label='Category' />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {category.map((item) => (
              <MenuItem
                key={item.name}
                value={item.categoryId}
              >
                <Checkbox
                  checked={productCategories.includes(item.categoryId)}
                />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className='flex justify-between items-center'>
          <div className='flex gap-4 items-center'>
            <h2 className='text-[16px]'>Inventories</h2>
            <span>{`${productInventories.length}/10`}</span>
          </div>
          {edit && (
            <IconButton
              disabled={productInventories.length >= 10}
              onClick={() => {
                if (productInventories.length >= 10) {
                  return;
                }
                setProductInventories([
                  ...productInventories,
                  {
                    productColorId: null,
                    productSizeId: null,
                    quantity: null,
                    price: null,
                  },
                ]);
              }}
            >
              <FaPlus
                size={20}
                className='text-black'
              />
            </IconButton>
          )}
        </div>
        <div className='flex gap-x-2 gap-y-6 flex-col'>
          {productInventories.map((_, index) => (
            <div
              className={`grid ${action === 'view' ? 'grid-cols-12' : 'grid-cols-10'} gap-2`}
              key={index}
            >
              <FormControl
                fullWidth
                className='col-span-3'
              >
                <InputLabel id='demo-simple-select-label'>Color</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Color'
                  disabled={!edit}
                  value={productInventories[index]?.productColorId || null}
                  onChange={(e) => {
                    productInventories[index].productColorId = e.target.value;
                    setProductInventories([...productInventories]);
                  }}
                >
                  {colors.map((item) => (
                    <MenuItem value={item.productColorId}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                className='col-span-2'
              >
                <InputLabel id='demo-simple-select-label'>Sizes</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  disabled={!edit}
                  value={productInventories[index]?.productSizeId || null}
                  onChange={(e) => {
                    productInventories[index].productSizeId = e.target.value;
                    setProductInventories([...productInventories]);
                  }}
                  label='Sizes'
                >
                  {sizes.map((item) => (
                    <MenuItem value={item.productSizeId}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id='outlined-basic'
                className='col-span-2'
                label='Quantity'
                disabled={!edit}
                value={productInventories[index]?.quantity || ''}
                onChange={(e) => {
                  productInventories[index].quantity = Number(e.target.value);
                  setProductInventories([...productInventories]);
                }}
                variant='outlined'
              />
              <TextField
                id='outlined-basic'
                className='col-span-2'
                disabled={!edit}
                onChange={(e) => {
                  productInventories[index].price = Number(e.target.value);
                  setProductInventories([...productInventories]);
                }}
                value={productInventories[index]?.price || ''}
                label='Price'
                variant='outlined'
              />
              {action === 'view' && (
                <TextField
                  id='outlined-basic'
                  className='col-span-2'
                  disabled={!edit}
                  onChange={(e) => {
                    productInventories[index].sold = Number(e.target.value);
                    setProductInventories([...productInventories]);
                  }}
                  value={productInventories[index]?.sold || ''}
                  label='Sold'
                  variant='outlined'
                />
              )}
              <div>
                {edit && (
                  <IconButton
                    className='col-span-1'
                    disabled={productInventories.length === 1}
                    onClick={() =>
                      setProductInventories(
                        productInventories.filter((_item, i) => index !== i)
                      )
                    }
                  >
                    <LuDelete className='text-black' />
                  </IconButton>
                )}
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2>Product Images</h2>
          <div className='flex flex-col gap-x-2 gap-y-6 mt-4'>
            {productImages.map((item, index) => (
              <div
                key={item.productColorId}
                className='grid grid-cols-3 gap-x-2 gap-y-6'
              >
                <TextField
                  id='outlined-basic'
                  InputProps={{
                    readOnly: true,
                  }}
                  className='col-span-1'
                  value={item.name}
                  label='Color'
                  variant='outlined'
                />
                <TextField
                  id='outlined-basic'
                  className='col-span-2'
                  disabled={!edit}
                  label='Image'
                  value={item.image || ''}
                  variant='outlined'
                  onChange={(e) => {
                    productImages[index].image = e.target.value;
                    setProductImages([...productImages]);
                  }}
                />
                {item.image && (
                  <img
                    src={item.image}
                    alt='image'
                    className='col-span-1 h-full'
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className='mb-4'>Product Image General</h2>
          <div className='flex flex-col gap-4'>
            <TextField
              fullWidth
              id='outlined-basic'
              className='col-span-1'
              disabled={!edit}
              label='Image'
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  setProductGeneralImages([
                    ...productGeneralImages,
                    e.target.value,
                  ]);
                  e.target.value = '';
                }
              }}
              variant='outlined'
            />
            <div className='grid grid-cols-4 gap-2'>
              {productGeneralImages.map((item, index) => (
                <div
                  key={index}
                  className='relative'
                >
                  <img
                    src={item}
                    alt='img'
                    className='col-span-1 h-[100px] object-cover w-full'
                  />
                  {edit && (
                    <IconButton
                      className='top-2 right-2'
                      sx={{
                        position: 'absolute',
                        background: 'white',
                        color: 'black',
                        '&:hover': {
                          background: 'black',
                          color: 'white',
                        },
                      }}
                    >
                      <IoClose
                        size={14}
                        onClick={() => {
                          setProductGeneralImages(
                            productGeneralImages.filter(
                              (_item, i) => index !== i
                            )
                          );
                        }}
                      />
                    </IconButton>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {edit && (
          <div className='text-right'>
            <LoadingButton
              loading={isLoadingButton}
              variant='contained'
              onClick={handleSubmit}
            >
              {action === 'view' ? 'Update' : 'Create'}
            </LoadingButton>
          </div>
        )}
      </form>
    </div>
  );
}

export default ProductForm;
