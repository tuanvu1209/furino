// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { handleLeftMenu } from '../../store/slices/leftMenuSlice';
import { BiLogoProductHunt, BiSolidUserAccount } from 'react-icons/bi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

const menuItems = [
  {
    to: '/product',
    icon: <BiLogoProductHunt />,
    title: 'Product Management',
  },
  {
    to: '/order',
    icon: <FaRegMoneyBillAlt />,
    title: 'Order Management',
  },
  {
    to: '/account',
    icon: <BiSolidUserAccount />,
    title: 'Account Management',
  },
];

const getFilteredMenu = (user) => {
  return menuItems.filter((item) =>
    user?.role?.roleId === 2
      ? item.to !== '/account' && item.to !== '/product'
      : user?.role?.roleId === 1
      ? item.to !== '/account'
      : true
  );
};

function LeftMenu() {
  const leftMenuRef = useRef(null);
  const location = useLocation();
  const { showMenu } = useSelector((state) => state?.leftMenu);
  const { user } = useSelector((state) => state?.userManagement);
  const dispatch = useDispatch();

  const windowResize = () => {
    dispatch(handleLeftMenu(window.innerWidth > 768));
  };

  useEffect(() => {
    window.addEventListener('resize', windowResize);
    windowResize();
    return () => {
      window.removeEventListener('resize', windowResize);
    };
  }, []);

  const filteredMenu = getFilteredMenu(user);

  return (
    <div>
      <menu
        ref={leftMenuRef}
        className={`pl-4 pt-6 md:pt-[80px] transition-[width] md:top-0 left-0 z-[40] duration-300 group fixed md:sticky top-[56px]  bg-Neutral10-0 ${
          showMenu ? 'w-60' : 'w-2'
        } min-h-[100vh] border-r`}
      >
        <div className="whitespace-nowrap overflow-hidden">
          <ul className=" mr-4">
            {filteredMenu.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  className={`flex px-[10px] rounded-[3px] gap-4 items-center ${
                    location.pathname === item.to
                      ? 'text-white bg-black'
                      : 'text-black'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="leading-10 font-medium">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </menu>
    </div>
  );
}

export default LeftMenu;
