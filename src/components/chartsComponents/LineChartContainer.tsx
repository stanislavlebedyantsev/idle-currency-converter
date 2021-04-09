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
import { Chart, ChartContainer } from './styles';
import { IRootState } from '@/types/rootStateTypes';

const LineChartContainer = (): React.ReactElement => {
  const chartsData = useSelector(
    (store: IRootState) => store.charts.mappedRates
  );
  const values = useSelector(
    (state: IRootState) => state.converter.inputedValues
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
          {values.map((element) => (
            <Line
              key={element.currency}
              type="monotone"
              dataKey={element.currency}
              // stroke={`#${toHashCode(element.currency)}`}
            />
          ))}
        </LineChart>
      </Chart>
    </ChartContainer>  
  );
};

export default LineChartContainer;
