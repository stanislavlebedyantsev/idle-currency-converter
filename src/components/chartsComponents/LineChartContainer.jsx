import { React } from 'react';
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
import { toHashCode } from '@/utils/';
import { Chart, ChartContainer } from './styles';

const LineChartContainer = () => {
  const chartsData = useSelector((store) => store.charts.mappedRates);
  const selectedCharts = useSelector(
    (store) => store.charts.selectedCheckboxesCurrencies
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
            ? selectedCharts.map((el) => (
                <Line
                  key={el}
                  type="monotone"
                  dataKey={el}
                  stroke={`#${toHashCode(el)}`}
                />
              ))
            : null}
        </LineChart>
      </Chart>
    </ChartContainer>
  );
};

export default LineChartContainer;
