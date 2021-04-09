import { IRootState } from '@/types/rootStateTypes';
import { select, line, axisBottom, scaleLinear, curveNatural } from 'd3';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChartContainer } from './styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ResizeObserver from 'resize-observer-polyfill';
import { IInputedCurrenciesValues, IMappedRates } from '@/types/reducersTypes';
import moment from 'moment';
import { toHue } from '@/utils/';

type TooltipState = {
  left: number;
  top: number;
  fields: Array<string>;
  previousValue: number;
  value: number;
};
type TooltipProps = {
  state: TooltipState;
};

const useResizeObserver = (
  ref: MutableRefObject<HTMLElement | null | undefined>
) => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget: any = ref.current;
    const resizeObserver = new ResizeObserver((entries: any) => {
      entries.forEach((entry: any) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

const findMax = (
  mappedRates: Array<IMappedRates>,
  inputedValues: Array<IInputedCurrenciesValues>
) => {
  return mappedRates.reduce((acc: number | string, el: IMappedRates) => {
    acc = inputedValues.reduce(
      (prev: number | string, inputedElement: IInputedCurrenciesValues) => {
        if (el[inputedElement.currency.substring(0, 3)] > prev) {
          prev = el[inputedElement.currency.substring(0, 3)];
        }
        return prev;
      },
      0
    );
    return acc;
  }, 0);
};

const LineChart = () => {
  const [tooltipState, setTooltipState] = useState<TooltipState>({
    top: 0,
    left: 0,
    fields: [],
    previousValue: 0,
    value: 0,
  });
  const dataVal = useSelector((store: IRootState) => store.charts.mappedRates);
  const values = useSelector(
    (state: IRootState) => state.converter.inputedValues
  );
  const svgRef: any = useRef();
  const wrapperRef: any = useRef();
  const dimensions: any = useResizeObserver(wrapperRef);

  useEffect(() => {
    const tickFormat: any = '';
    const svg: any = select(svgRef.current);
    const svgContent: any = svg.select('.content');

    svgContent.selectAll('path').remove();
    svgContent.selectAll('circle').remove();
    svgContent.selectAll('.grid').remove();
    select('.mainSVG').selectAll('.tooltip').remove();
    const { width, height }: any =
      dimensions || wrapperRef.current.getBoundingClientRect();
    if (!dimensions) return;
    if (values.length) {
      const dateArr: Array<string> = dataVal.map((element) =>
        moment(element.date).format('MMM DD')
      );
      const xScale: any = scaleLinear()
        .domain([0, dataVal.length - 1])
        .range([0, width]);

      const xAxis: any = axisBottom(xScale)
        .ticks(dataVal.length)
        .tickFormat((d, index) => [...dateArr][index]);

      const yScale: any = scaleLinear()
        .domain([0, findMax(dataVal, values)] as any)
        .range([height - 10, 0]);
      //render grid
      const drawXGrid = () => {
        return axisBottom(xScale).ticks(14);
      };
      svgContent
        .append('g')
        .attr('class', 'grid')
        .call(drawXGrid().tickSize(height).tickFormat(tickFormat));
      //remove top grid line
      select('.grid path').remove();
      //remove x-axis lines
      select('.x-axis').selectAll('.tick line').remove();
			//remove even grid lines
      const evenGridLines = svgContent
        .selectAll('.grid .tick')
        .filter((element: any, index: number) => index % 2 === 0);
      evenGridLines.remove();
      //render line
      const lineGenerator = line()
        .x((value: any, index: number) => xScale(index))
        .y((value: any) => yScale(value))
        .curve(curveNatural);

      //render path element and add d attribure
      values.map((element: IInputedCurrenciesValues, index: number): void => {
        const currency = element.currency.substring(0, 3);
        const chartValuesArray = dataVal.reduce(
          (acc: any, value: any, index: number) => {
            acc.push(value[currency]);
            return acc;
          },
          []
        );
        svgContent
          .selectAll(`.line${currency}`)
          .data([chartValuesArray])
          .join('path')
          .attr('class', `line${currency}`)
          .attr('d', lineGenerator)
          .attr('fill', 'none')
          .attr('stroke', `hsl(${toHue(currency)}, 39%, 76%)`)
          .attr('stroke-width', `4`);
        svgContent
          .selectAll(`.myDot${index} .mainDot`)
          .data([...chartValuesArray])
          .join('circle')
          .attr('class', `mainDot`)
					.attr('stroke', `hsl(${toHue(currency)}, 39%, 76%)`)
          .style('opacity', `0`)
          .attr('r', 7)
          .attr('cx', (value: any, index: number) => xScale(index))
          .attr('cy', yScale)
          .on('mouseover', (event: any, value: number) => {
            const left = event.target.cx.baseVal.value;
            const index = Math.ceil(left / (width / 7))
              ? Math.ceil(left / (width / 7) - 1)
              : Math.ceil(left / (width / 7));
            const prevValue = chartValuesArray[index - 1];

            event.target.style.opacity = 1;
            setTooltipState({
              top: event.target.cy.baseVal.value,
              left: left > 180 ? left - 120 : left + 120,
              fields: [`${value} ${element.currency.substring(0, 3)}`],
              previousValue: prevValue,
              value: value,
            });
          })
          .on('mouseout', (event: any) => {
            event.target.style.opacity = 0;
            setTooltipState({
              top: 0,
              left: 0,
              fields: [],
              previousValue: 0,
              value: 0,
            });
          });
      });

      svg
        .select('.x-axis')
        .style('transform', `translateY(${dimensions.height}px)`)
        .call(xAxis);
      svg.select('.x-axis').select('path').remove();
    }
  }, [dataVal, dimensions, values]);
  return (
    <ChartContainer ref={wrapperRef}>
      <svg ref={svgRef} className="mainSVG">
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="content" clipPath={`url(#LineChart)`}></g>
      </svg>
      <Tooltip state={tooltipState} />
    </ChartContainer>
  );
};

export const Tooltip = ({ state }: TooltipProps) => {
  return (
    <div
      className="tooltip"
      style={{
        display: state.fields.length ? 'flex' : 'none',
        top: `${state.top}px`,
        left: `${state.left}px`,
      }}>
      {state.value > state.previousValue && state.previousValue ? (
        <ExpandLessIcon className="MuiIcon-colorPrimary" />
      ) : null}
      {state.value < state.previousValue && state.previousValue ? (
        <ExpandMoreIcon color="error" />
      ) : null}
      {state.fields.map((field: string, index: number) => (
        <p key={index}>{field}</p>
      ))}
    </div>
  );
};

export default LineChart;
