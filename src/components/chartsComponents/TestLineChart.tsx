import { IRootState } from '@/types/rootStateTypes';
import { toHashCode } from '@/utils';
import {
  select,
  line,
  axisBottom,
  axisLeft,
  curveCardinal,
  scaleLinear,
} from 'd3';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChartContainer } from './styles';
import ResizeObserver from 'resize-observer-polyfill';
import { IInputedCurrenciesValues, IMappedRates } from '@/types/reducersTypes';
import moment from 'moment';

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
      if (svgContent.selectAll('.grid').empty()) {
        svgContent
          .append('g')
          .attr('class', 'grid')
          .style('stroke-dasharray', '10')
          .call(drawXGrid().tickSize(height).tickFormat(tickFormat));
      }
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
          .attr('stroke', `#${toHashCode(element.currency)}`)
          .on('mouseover', (event: any, value: any) => {
            // console.log(event);
          });
        if (svgContent.selectAll(`.myDot${index}`).empty()) {
          svgContent
            .selectAll(`.myDot${index}`)
            .data([...chartValuesArray])
            .join('circle')
            .attr('class', `.myDot${index}`)
            .attr('stroke', 'black')
            .attr('r', 4)
            .attr('fill', 'none')
            .attr('cx', (value: any, index: number) => xScale(index))
            .attr('cy', yScale);
        }
        // svgContent
        //   .selectAll(`.myDot${element.currency}${index}`)
        //   .data([chartValuesArray])
        //   .join('circle')
        //   .attr('class', `.myDot${element.currency}${index}`)
        //   .attr('stroke', 'black')
        //   .attr('r', 4)
        //   .attr('fill', 'blue')
        //   .attr('cx', (value: any, index: any) => xScale(index))
        //   .attr('cy', yScale)
        // .on('mouseover', function (event: any, value: number) {
        //   const div = select(wrapperRef.current);
        //   if (!div.selectAll('.tooltip')) {
        //     div.append('div').attr('class', 'tooltip').style('opacity', 0);
        //     div.transition().duration(200).style('opacity', 0.9);
        //     div
        //       .text(value)
        //       .style('left', event.pageX + 'px')
        //       .style('top', event.pageY - 28 + 'px');
        //   }
        // })
        // .on('mouseout', () => {
        //   setTimeout(() => {
        //     select('.tooltip')
        //       .transition()
        //       .duration(500)
        //       .style('opacity', 0);
        //     select('.tooltip').remove();
        //   }, 1000);
        // });
      });

      svg
        .select('.x-axis')
        .style('transform', `translateY(${dimensions.height}px)`)
        .call(xAxis);
    }
  }, [dataVal, dimensions, values]);
  return (
    <ChartContainer ref={wrapperRef}>
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="content" clipPath={`url(#LineChart)`}></g>
      </svg>
    </ChartContainer>
  );
};

export default LineChart;
