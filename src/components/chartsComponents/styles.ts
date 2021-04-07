import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';

export const ChartToolArea = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 2% 2% 2% 5%;
`;
export const Chart = styled(ResponsiveContainer).attrs((props) => ({
  ...props,
}))`
  width: 100% !important;
  height: 100% !important;
  margin-right: 3%;
`;

export const ChartContainer = styled.div`
  display: flex;
  justify-content: center !important;
  max-height: 15em;
  width: 100%;
  .recharts-legend-wrapper {
    bottom: 0 !important;
  }
  svg {
    display: block;
    overflow: visible;
    width: 100%;
    padding: 0 50px;
  }
  @media (max-width: 720px) {
    height: 15em;
  }
  .tick + .tick:hover:before {
    background: black;
  }
`;
