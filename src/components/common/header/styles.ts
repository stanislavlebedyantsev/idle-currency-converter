import styles from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Link = styles(NavLink).attrs((props) => ({ ...props }))`
  &:hover{
    color: #ffff;
  }
  &:active{
    color: #ffff;
  }
  &{
    color: #ffff;
  }
`;

export const EmailBlock = styles.p`
margin-right:1%;
  @media (max-width: 760px) {
    display: none;
  }
`;
