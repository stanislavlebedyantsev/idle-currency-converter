import React from 'react';
import { HeaderContainer, MainTitle, SecondTitle } from './styles';

type TProps = {
  title: string;
  description: string;
};

const ConverterHeader = ({
  title,
  description,
}: TProps): React.ReactElement => {
  return (
    <HeaderContainer>
      <MainTitle>{title}</MainTitle>
      <SecondTitle>{description}</SecondTitle>
    </HeaderContainer>
  );
};

export default ConverterHeader;
