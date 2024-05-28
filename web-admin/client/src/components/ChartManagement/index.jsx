import React from 'react';
import { Bar } from 'react-chartjs-2';

function InventoryChart({ productName, initialStock, soldInMonth }) {
  const data = {
    labels: [
      'Số lượng tồn kho ban đầu',
      'Số lượng đã bán trong tháng',
      'Số lượng còn lại',
    ],
    datasets: [
      {
        label: productName,
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        borderColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 1,
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBorderColor: 'rgba(255, 99, 132, 0.2)',
        data: [initialStock, soldInMonth, initialStock - soldInMonth],
      },
    ],
  };

  return (
    <div className='p-4 rounded-lg shadow-lg bg-white'>
      <h2 className='text-lg font-semibold mb-2'>
        {productName} - Thống kê trong tháng
      </h2>
      <Bar
        data={data}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}

function ChartManagement() {
  const inventoryData = {
    productName: 'Product A',
    initialStock: 100,
    soldInMonth: 25,
  };

  return (
    <div className='container mx-auto mt-10'>
      <InventoryChart {...inventoryData} />
    </div>
  );
}

export default ChartManagement;
