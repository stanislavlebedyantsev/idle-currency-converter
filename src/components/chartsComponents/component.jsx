import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "@components/common/error/component";
import { getValuesDatabaseRequest } from "@actions/firebaseActionCreators";
import ChartTopToolArea from "./chartComponentContent/ChartTopToolArea/component";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { toHashCode } from "@utils/colorGenerator/index";
import { Chart, ChartContainer } from "./styles";
import {
  Container,
  ContentContainer,
} from "@components/common/commonStyles/styles";

const ChartLanding = () => {
  const dispatch = useDispatch();
  const selectedCharts = useSelector((store) => store.charts.selectedCurrency);
  const chartsData = useSelector((store) => store.charts.mappedRates);
  useEffect(() => {
    dispatch(getValuesDatabaseRequest());
  }, [dispatch]);
  return (
    <Container>
      <Error />
      <ContentContainer>
        <ChartTopToolArea />
        <ChartContainer>
          <Chart>
            <LineChart width={500} height={300} data={chartsData}>
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedCharts.map((el) => (
                <Line
                  type="monotone"
                  dataKey={el}
                  stroke={`#${toHashCode(el)}`}
                />
              ))}
            </LineChart>
          </Chart>
        </ChartContainer>
      </ContentContainer>
    </Container>
  );
};

export default ChartLanding;
