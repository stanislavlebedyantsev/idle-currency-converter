import styled from "styled-components";
import { ResponsiveContainer } from "recharts";

export const ChartToolArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 2% 5%;
`;
export const Chart = styled(ResponsiveContainer).attrs((props) => ({ ...props }))`
  width: 50%;
  height: 50%;
  justify-content:center;
`;
