import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Error from '@/components/common/error';
import ChartsHeader from '@/components/common/componentsHeader';
import { getValuesDatabaseRequest } from '@/actions';
import ChartTopToolArea from '@/components/chartsComponents/ChartTopToolArea';
import LineChartContainer from '@/components/chartsComponents/LineChartContainer';
import { Container, ContentContainer } from '@/theme/styles';
import BasicLayout from '@/components/layouts/BasicLayout/';
import { useTranslation } from 'react-i18next';

const ChartsPage: React.FunctionComponent = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getValuesDatabaseRequest());
  }, [dispatch]);

  return (
    <BasicLayout>
      <Container>
        <Error />
        <ContentContainer>
          <ChartsHeader
            title={t('chartsTitle')}
            description={t('chartsDescription')}
          />
          <ChartTopToolArea />
          <LineChartContainer />
        </ContentContainer>
      </Container>
    </BasicLayout>
  );
};

export default ChartsPage;
