import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { HeadingPage } from '../../common';
import {
  notificationActions,
  selectNotifications,
} from '../../store/notification/slice';
import { useAppDispatch, useAppSelector } from '../../store/root/hooks';

function Notification({ onClose }: { onClose?: () => void }) {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        onClose
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationRef, onClose]);

  useEffect(() => {
    dispatch(notificationActions.getNotifications());
  }, [dispatch]);

  return (
    <div
      ref={notificationRef}
      className='container bg-white md:absolute md:top-[61px] right-0 md:max-w-[350px] md:rounded- md:shadow-sm md:border'
    >
      <div className='px-4 md:hidden pt-[40px]'>
        <HeadingPage
          title='Notification'
          style={{ padding: 0, margin: '10px 0' }}
        />
      </div>
      <div className='flex flex-col md:h-[600px] md:overflow-scroll'>
        {notifications.data.map((item: any) => (
          <Link
            to={`/order/${item.orderId}`}
            onClick={() =>
              dispatch(
                notificationActions.updateNotification(item.notificationId)
              )
            }
            className={`grid grid-cols-12 border-b py-4 px-4 ${
              item.read && 'bg-[#e3dfdf]'
            }`}
            key={uuid()}
          >
            <img
              src={item?.image}
              alt=''
              className='col-span-2 object-cover w-full aspect-square'
            />
            <div className='col-span-10 ml-4'>
              <h3 className='text-[20px]'>{item.title}</h3>
              <p className='text-[gray]'>{item.message}</p>
              <span className='text-[13px] text-[gray]'>
                {new Date(item.notificationDate).toLocaleString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false,
                }) +
                  ', ' +
                  new Date(item.notificationDate).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Notification;
