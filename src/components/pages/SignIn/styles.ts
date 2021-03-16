import styled from 'styled-components';

export const SignInContainer = styled.div`
	position:absolute;
	@media (max-width: 568px) and (max-height: 320px){
		margin-top: 20%;
		width: 50%;
		padding: 5%;
		input {
			font-size: 3vw !important;
		}
	}
	@media (max-width: 320px) and (max-height: 568px){
		padding: 5%;
		input {
			font-size: 4.5vw !important;
		}
	}
  background-color: #fff;
  display: flex;
  flex-direction: column;
	justify-content: center;
  padding: 10%;
  border-radius: 4%;
`;

