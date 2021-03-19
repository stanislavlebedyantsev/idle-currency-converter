import styled from 'styled-components';
import Alert from '@material-ui/lab/Alert';

export const AlertError = styled(Alert).attrs((props) => ({ ...props }))`
  position: absolute;
	z-index:10;
  top: 10%;
	@media(min-width: 1200px){
		top: 7%;
	}
  right: 0;
`;
