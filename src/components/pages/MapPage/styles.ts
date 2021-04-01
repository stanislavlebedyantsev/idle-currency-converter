import styled from 'styled-components';

export const MapBlock = styled.div`
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
  flex-flow: row-reverse;
  margin: 5%;
  height: 50vh;
	@media(max-width: 720px){
		flex-flow: column;
		height: 60vh;
	}
`;
