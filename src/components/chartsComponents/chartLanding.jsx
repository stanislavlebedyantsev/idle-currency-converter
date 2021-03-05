import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getValuesDatabaseRequest } from "@actions/firebaseActionCreators";
import ChartTopToolArea from "./chartComponentContent/ChartTopToolArea";
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
      <ContentContainer>
        <ChartTopToolArea />
        <LineChart width={600} height={300} data={chartsData}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedCharts.map((el) => (
            <Line type="monotone" dataKey={el} stroke={`#${toHashCode(el)}`} />
          ))}
        </LineChart>
      </ContentContainer>
    </Container>
  );
};

export default ChartLanding;
