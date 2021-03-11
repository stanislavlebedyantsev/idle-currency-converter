import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BasicLayout from '@/components/layouts/BasicLayout/';
import { currencyRateRequest } from '@/actions/index';
import ConverterContent from '@/components/converterComponents/converterContent';
import Error from '@/components/common/error/component';
import { Container } from '@/components/common/commonStyles/styles';

const ConverterPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currencyRateRequest());
  }, []);
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
