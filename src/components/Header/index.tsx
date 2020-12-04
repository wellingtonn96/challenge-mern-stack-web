import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from './style';

const Header: React.FC = () => {
  return (
    <Container>
      <header>
        <li>
          <Link to="/">Mapa</Link>
        </li>
        <li>
          <Link to="/customers">Clintes</Link>
        </li>
      </header>
    </Container>
  );
};

export default Header;
