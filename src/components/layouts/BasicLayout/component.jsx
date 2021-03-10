import { React } from 'react';
import Header from '@/components/common/header/';

const BasicLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default BasicLayout;
