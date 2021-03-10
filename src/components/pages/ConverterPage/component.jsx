import React from 'react';
import BasicLayout from '@/components/layouts/BasicLayout/';
import ConverterContent from '@/components/converterComponents/converterContent';
import Error from '@/components/common/error/component';
import { Container } from '@/components/common/commonStyles/styles';

const ConverterPage = () => {
  return (
    <BasicLayout>
      <Container>
        <Error />
        <ConverterContent />
      </Container>
    </BasicLayout>
  );
};

export default ConverterPage;
