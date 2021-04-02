import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BasicLayout from '@/components/layouts/BasicLayout/';
import { currencyRateRequest } from '@/actions/index';
import ConverterContent from '@/components/converterComponents/converterContent';
import Error from '@/components/common/error';
import { Container } from '@/components/common/componentStyles/styles';

const ConverterPage: React.FunctionComponent = (): React.ReactElement => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currencyRateRequest());
  }, [dispatch]);
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
