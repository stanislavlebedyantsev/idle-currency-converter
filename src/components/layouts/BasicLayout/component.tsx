import React from 'react';
import Header from '@/components/common/header';

type TChildren = {
  children: React.ReactNode;
};

const BasicLayout = ({ children }: TChildren): React.ReactElement => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default BasicLayout;
