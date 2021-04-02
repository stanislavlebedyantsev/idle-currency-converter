import { COLOR_WHITE } from '@/theme/colors';
import styled from 'styled-components';

export const SignInContainer = styled.div`
  position: absolute;
	input {
		font-size: 1em !important;
	}
	label {
		font-size: 1em !important;
	}
  @media (max-width: 568px) and (max-height: 320px) {
    width: 50%;
  }
	@media(max-width:720px){	
		padding: 24px;
	}
  
  background-color: ${COLOR_WHITE};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  border-radius: 25px;
`;
