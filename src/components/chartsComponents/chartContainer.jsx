import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getValuesDatabaseRequest } from "@actions/firebaseActionCreators";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { displayedCharts } from "@utils/charts/index";
import {
  Container,
  ContentContainer,
} from "@components/common/commonStyles/styles";

const ChartsContainer = () => {
  const dispatch = useDispatch();
  const selectedCharts = useSelector((store) => store.charts.selectedCurrency);
  const chartsData = useSelector((store) => store.charts.rates);
  const [chartsMapperValue, setChartsMapperValue] = useState([
    {
      amt: 6,
      currency: "USD",
      date: 1614772448414,
      name: "USD",
      pv: 6,
      uv: 1,
    },
    {
      amt: 6,
      currency: "USD",
      date: 1614772468874,
      name: "USD",
      pv: 6,
      uv: 1,
    },
  ]);
  useEffect(() => {
    dispatch(getValuesDatabaseRequest());
  }, [dispatch]);
  // useEffect(() => {
  //   setChartsMapperValue(() => displayedCharts(selectedCharts, chartsData));
  // }, [selectedCharts, chartsData]);
  return (
    <Container>
      <ContentContainer>
        <LineChart width={600} height={300} data={chartsMapperValue}>
          <Line type="monotone" dataKey='uv' name='USD' stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend/>
        </LineChart>
      </ContentContainer>
    </Container>
  );
};

export default ChartsContainer;
