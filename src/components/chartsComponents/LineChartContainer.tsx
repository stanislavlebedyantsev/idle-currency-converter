import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { toHashCode } from '@/utils';
import { Chart, ChartContainer } from './styles';
import { IRootState } from '@/types/rootStateTypes';

const LineChartContainer = (): React.ReactElement => {
  const chartsData = useSelector((store: IRootState) => store.charts.mappedRates);
  const selectedCharts = useSelector(
    (store: IRootState) => store.charts.selectedCurrencies
  );

  return (
    <ChartContainer>
      <Chart>
        <LineChart width={500} height={300} data={chartsData}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedCharts
            ? selectedCharts.map((element) => (
                <Line
                  key={element}
                  type="monotone"
                  dataKey={element}
                  stroke={`#${toHashCode(element)}`}
                />
              ))
            : null}
        </LineChart>
      </Chart>
    </ChartContainer>
  );
};

export default LineChartContainer;
