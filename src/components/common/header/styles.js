import styles from 'styled-components'
import {NavLink} from "react-router-dom";

export const Link = styles(NavLink).attrs((props) => ({...props}))`
  &:hover{
    color: #ffff;
  }
  &:active{
    color: #ffff;
  }
  &{
    color: #ffff;
  }
`