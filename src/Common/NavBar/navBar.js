import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const [activeItem, setActiveItem] = useState('crud')
  let history = useHistory();

  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
    history.push(`/${name}`);
  }
  return (
    <div>
      <Menu pointing>
        <Menu.Item
          name='crud'
          active={activeItem === 'crud'}
          onClick={handleItemClick}
        />
        <Menu.Item
          name='completed'
          active={activeItem === 'completed'}
          onClick={handleItemClick}
        />
      </Menu>
    </div>
  )
};

export default NavBar;
