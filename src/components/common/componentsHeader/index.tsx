import React from 'react';
import { HeaderContainer, MainTitle, SecondTitle } from './styles';

type TProps = {
  title: string;
  discription: string;
};

const ConverterHeader = ({
  title,
  discription,
}: TProps): React.ReactElement => {
  return (
    <HeaderContainer>
      <MainTitle>{title}</MainTitle>
      <SecondTitle>{discription}</SecondTitle>
    </HeaderContainer>
  );
};

export default ConverterHeader;
