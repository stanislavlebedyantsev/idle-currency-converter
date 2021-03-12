import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Error from '@/components/common/error/';
import { getValuesDatabaseRequest } from '@/actions/';
import ChartTopToolArea from '@/components/chartsComponents/ChartTopToolArea';
import LineChartContainer from '@/components/chartsComponents/LineChartContainer';
import {
  Container,
  ContentContainer,
} from '@/components/common/commonStyles/styles';
import BasicLayout from '@/components/layouts/BasicLayout/index';

const ChartsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getValuesDatabaseRequest());
  }, [dispatch]);

  return (
    <BasicLayout>
      <Container>
        <Error />
        <ContentContainer>
          <ChartTopToolArea />
          <LineChartContainer />
        </ContentContainer>
      </Container>
    </BasicLayout>
  );
};

export default ChartsPage;
