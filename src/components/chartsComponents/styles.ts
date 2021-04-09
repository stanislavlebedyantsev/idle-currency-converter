import styled from 'styled-components';
import { ResponsiveContainer } from 'recharts';
import { COLOR_GREY, COLOR_WHITE } from '@/theme/colors';

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
  position: relative;
  display: flex;
  justify-content: center !important;
  height: 20em;
  padding-bottom: 50px;
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
  .mainSVG {
    padding: 0;
  }
  & .tooltip {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 300;
    width: 200px;
    height: 50px;
    text-align: center;
    transform: translate(-50%, -50%);
    padding: 0 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    font-size: 14px;
    background: ${COLOR_WHITE};
    border: 0px;
    border-radius: 8px;
    pointer-events: none;
    svg {
      width: 20px;
      padding: 0;
    }
    .MuiIcon-colorPrimary {
      color: green !important;
    }
  }
  .x-axis text {
    font-size: 24px;
		@media(max-width: 720px){
			font-size: 12px;
		}
    color: rgba(0, 0, 0, 0.54);
  }
  .content .grid line {
    stroke: lightgrey;
    stroke-opacity: 0.9;
    shape-rendering: crispEdges;
    stroke-width: 2;
  }
  .content .mainDot {
    fill: ${COLOR_WHITE};
    stroke-width: 5;
  }
  g.grid:hover ~ g.grid {
    bacground: black;
  }
`;
