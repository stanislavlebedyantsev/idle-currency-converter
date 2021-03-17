import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BasicLayout from 'src/components/layouts/BasicLayout/';
import { currencyRateRequest } from 'src/actions/index';
import ConverterContent from 'src/components/converterComponents/converterContent';
import Error from 'src/components/common/error/';
import { Container } from 'src/components/common/commonStyles/styles';

const ConverterPage: React.FunctionComponent = (): React.ReactElement => {
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
