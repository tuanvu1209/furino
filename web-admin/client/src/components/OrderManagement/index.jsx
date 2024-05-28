// @ts-nocheck
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../store/slices/productManagementSlice/productReduce';
import OrderList from './OrderList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 600,
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '3px',
  boxShadow: 24,
};

function OrderManagement() {
  const dispatch = useDispatch();
  const [limitOffset, setLimitOffset] = useState({
    limit: 10,
    page: 1,
  });

  const { orders } = useSelector((state) => state.productManagement);

  useEffect(() => {
    dispatch(getOrders(limitOffset));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center full-w py-4 text-black h-[68.5px]">
        <span>Order Manager</span>
      </div>
      <OrderList
        orders={orders}
        limitOffset={limitOffset}
      />
    </div>
  );
}

export default OrderManagement;
