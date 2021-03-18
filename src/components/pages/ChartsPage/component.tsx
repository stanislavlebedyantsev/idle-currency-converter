import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Error from 'src/components/common/error/';
import ChartsHeader from 'src/components/common/componentsHeader/';
import { getValuesDatabaseRequest } from 'src/actions/';
import ChartTopToolArea from 'src/components/chartsComponents/ChartTopToolArea';
import LineChartContainer from 'src/components/chartsComponents/LineChartContainer';
import {
  Container,
  ContentContainer,
} from 'src/components/common/commonStyles/styles';
import BasicLayout from 'src/components/layouts/BasicLayout/index';

const ChartsPage = (): React.ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getValuesDatabaseRequest());
  }, [dispatch]);

  return (
    <BasicLayout>
      <Container>
        <Error />
        <ContentContainer>
          <ChartsHeader
            title="Welcome to charts page"
            discription="On the chart you will see the ratio of the selected currency to the currencies selected by the checkboxes. The value is taken from 1 unit of the selected currency to 1 unit of the currency selected by the checkbox"
          />
          <ChartTopToolArea />
          <LineChartContainer />
        </ContentContainer>
      </Container>
    </BasicLayout>
  );
};

export default ChartsPage;
