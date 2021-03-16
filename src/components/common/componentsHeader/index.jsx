import { React } from 'react';
import { HeaderContainer, MainTitle, SecondTitle } from './styles';

const ConverterHeader = ({title, discription}) => {
  return (
    <HeaderContainer>
      <MainTitle>{title}</MainTitle>
      <SecondTitle>
				{discription}
      </SecondTitle>
    </HeaderContainer>
  );
};

export default ConverterHeader;
