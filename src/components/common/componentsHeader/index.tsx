import React from 'react';
import { HeaderContainer, MainTitle, SecondTitle } from './styles';

type TProps = {
  title?: string;
  description?: string;
};

const ComponentHeader = ({
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

export default ComponentHeader;
