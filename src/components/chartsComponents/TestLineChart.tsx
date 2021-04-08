import { IRootState } from '@/types/rootStateTypes';
import { toHashCode } from '@/utils';
import { select, line, axisBottom, curveCardinal, scaleLinear } from 'd3';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChartContainer } from './styles';
import ResizeObserver from 'resize-observer-polyfill';
import { IInputedCurrenciesValues, IMappedRates } from '@/types/reducersTypes';
import moment from 'moment';

type TTooltipState = {
  left: number;
  top: number;
  fields: Array<string>;
};
type TTooltipProps = {
  state: TTooltipState;
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
        if (el[inputedElement.currency] > prev) {
          prev = el[inputedElement.currency];
        }
        return prev;
      },
      0
    );
    return acc;
  }, 0);
};

const LineChart = () => {
  const [tooltipState, setTooltipState] = useState<TTooltipState>({
    top: 0,
    left: 0,
    fields: [],
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
    // add tooltip
    var div = select('.mainSVG')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
    const { width, height }: any =
      dimensions || wrapperRef.current.getBoundingClientRect();
    if (!dimensions) return;
    if (values.length) {
      const dateArr: Array<string> = dataVal.map((element) =>
        moment(element.date).format('MMM DD')
      );
      const xScale: any = scaleLinear()
        .domain([0, dataVal.length - 1])
        .range([0, width - 10]);

      const xAxis: any = axisBottom(xScale)
        .ticks(dataVal.length)
        .tickFormat((d, index) => [...dateArr][index]);

      const yScale: any = scaleLinear()
        .domain([0, findMax(dataVal, values)] as any)
        .range([height - 10, 0]);

      const drawXGrid = () => {
        return axisBottom(xScale).ticks(8);
      };
      svgContent
        .append('g')
        .attr('class', 'grid')
        .style('stroke-dasharray', '10')
        .call(drawXGrid().tickSize(height).tickFormat(tickFormat));

      //render line
      const lineGenerator = line()
        .x((value: any, index: number) => xScale(index))
        .y((value: any) => yScale(value))
        .curve(curveCardinal);

      //render path element and add d attribure
      values.map((element: IInputedCurrenciesValues, index: number): void => {
        const chartValuesArray = dataVal.reduce(
          (acc: any, value: any, index: number) => {
            acc.push(value[element.currency]);
            return acc;
          },
          []
        );
        svgContent
          .selectAll(`.line${element.currency}`)
          .data([chartValuesArray])
          .join('path')
          .attr('class', `line${element.currency}`)
          .attr('d', lineGenerator)
          .attr('fill', 'none')
          .attr('stroke', `#${toHashCode(element.currency)}`);
        svgContent
          .selectAll(`.myDot${index}`)
          .data([...chartValuesArray])
          .join('circle')
          .attr('class', `.myDot${index}`)
          .style('fill', `#${toHashCode(element.currency)}`)
          .style('stroke', `#${toHashCode(element.currency)}`)
          .style('stroke-width', '4px')
          .attr('r', 4)
          .attr('cx', (value: any, index: number) => xScale(index))
          .attr('cy', yScale)
          .on('mouseover', (event: any, value: number, index: number) => {
            console.log(`X: ${xScale(index)}`);
            console.log(`Y: ${yScale}`);
            console.log(event);

            setTooltipState({
              top: event.pageY,
              left: event.pageX,
              fields: [`1 USD = ${value} ${element.currency}`],
            });
          })
          .on('mouseout', () => {
            setTooltipState({
              top: 0,
              left: 0,
              fields: [],
            });
          });
      });

      svg
        .select('.x-axis')
        .style('transform', `translateY(${dimensions.height}px)`)
        .call(xAxis);
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

export const Tooltip = ({ state }: TTooltipProps) => {
  return (
    <div
      className="tooltip"
      style={{
        display: state.fields.length ? 'block' : 'none', 
      }}>
      {state.fields.map((field: string, index: number) => (
        <p key={index}>{field}</p>
      ))}
    </div>
  );
};

export default LineChart;
