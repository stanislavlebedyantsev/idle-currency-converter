import { React } from 'react';
import { HeaderContainer, MainTitle, SecondTitle } from './styles';

const ConverterHeader = () => {
  return (
    <HeaderContainer>
      <MainTitle>Welcome to currency converter</MainTitle>
      <SecondTitle>
        If you want to swap fields you can drag them and drop
      </SecondTitle>
    </HeaderContainer>
  );
};

export default ConverterHeader;
