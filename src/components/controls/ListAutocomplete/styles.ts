import styled from 'styled-components';
import { COLOR_GREY } from '@/theme/colors';

export const AutoCompleteListContainer = styled.div`
  width: 25em;
  height: 100%;
  @media (max-width: 720px) {
    width: 18em;
    height: 30%;
		padding-bottom: 24px;
  }
	@media (min-width: 720px) {
    width: 15em !important;
		height: 100% !important;
  }
	@media (max-height: 812px) {
    width: 100%;
    height: 30%;
  }
  ul {
		background: ${COLOR_GREY}
    @media (max-height: 812px) {
      height: 100% !important;
    }

  }
`;
