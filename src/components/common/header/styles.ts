import styles from 'styled-components';
import { NavLink } from 'react-router-dom';
import { COLOR_BLACK } from '@/theme/colors';

export const Link = styles(NavLink).attrs((props) => ({ ...props }))`
  &:hover{
    color: ${COLOR_BLACK};
  }
  &:active{
    color: ${COLOR_BLACK};
  }
  &{
    color: ${COLOR_BLACK};
  }
`;

export const EmailBlock = styles.p`
margin-right:1%;
  @media (max-width: 760px) {
    display: none;
  }
`;
