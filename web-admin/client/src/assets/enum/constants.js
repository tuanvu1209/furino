const IP = '192.168.10.55';
export const baseURL = `http://${IP}:3001/admin`;
// export const baseURL = 'https://furino-admin-server.vercel.app/admin';
export const optionLimit = [10, 20, 40];
export const roleListDefault = [
  { value: 0, name: 'SuperAdmin' },
  { value: 1, name: 'Admin' },
  { value: 2, name: 'Shipper' },
  { value: 3, name: 'User' },
];

export const disableMenu = [
  { value: 1, name: 'Enable' },
  { value: 0, name: 'Disable' },
];
