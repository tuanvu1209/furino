import { Menu, MenuItem } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

function AccountMenu({ anchorEl, openMenu, handleCloseMenu, list }) {
  return (
    <Menu
      id='basic-menu'
      anchorEl={anchorEl}
      open={openMenu}
      onClose={handleCloseMenu}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {list &&
        list.map(({ name, value }) => (
          <MenuItem
            key={value}
            onClick={() => {
              handleCloseMenu(value);
            }}
          >
            {name}
          </MenuItem>
        ))}
    </Menu>
  );
}

export default AccountMenu;
