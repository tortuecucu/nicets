import { Tooltip } from "react-tooltip";
import './tornado.css'

interface BarGroupProps {
    values: Value[];
    max: number;
    side: string;
}

type Value = [string, number];

interface TornadoProps {
    data: Array<{ [x: string]: string | number }>; //array of objects that contains source data
    valueField: string; //name of the field that contains the numeric value to display
    dimensionFields: string[]; //array of field names that contains the dimensions to group data
    /**
     * dimension 0 determine if value is placed right or left on the graph
     * dimension 1 determine the row
     * optionsal dimension 3 allors to split the row
     */
    title?: string; //title of the figure
    leftValue: string; //if  dimensionFields[0] is equal to leftValue, then the bar is displayed on the left side
}

interface NormalizedRow {
    dimensionValues: number[];
    value: number;
}

interface Row {
    dimensionValues: number[];
    values: number[];
}

function BarGroup(props: BarGroupProps) {
    let cls = + (props.side === 'left') ? "bar left rounded" : "bar right rounded";
    let bars = props.values.map(item => {
        const [text, value] = item;
        let percent = (value > 0) ? Math.round((100 / props.max) * value) : 0;
        return (
            <div className={cls} style={{ width: percent + '%' }} data-tooltip-id="tornado-tooltip" data-tooltip-content={text + ' ' + value}><span className="label">{text}</span></div>
        );
    })
    return (
        <>
            <div className="bar-group w-100">
                {bars}
            </div>
        </>
    )
}

function ValueLabel(props: { value: string }) {
    return (
        <div className="value">{props.value}</div>
    )
}

function NameLabel(props: { text: string }) {
    return (
        <div className="item-name">{props.text}</div>
    )
}

const values = new Set<string>();

const valueIndex = (value: string) => {
    if (!values.has(value)) {
        values.add(value);
    }
    return [...values].indexOf(value);
}

const getValue = (index: number): string => {
    return [...values][index];
}

function areEqual(array1: any[], array2: any[]): boolean {
    if (array1.length === array2.length) {
      return array1.every((element, index) => {
        if (element === array2[index]) {
          return true;
        }
  
        return false;
      });
    }
  
    return false;
  }

// concatenates dimensions values to create a unique key
function reduceDimensionValues(row: { [x: string]: string | number }, fields: string[]): string {
    return fields.reduce((previousValue, currentValue) => {
        return previousValue + row[currentValue];
    })
}

export default function Tornado(props: TornadoProps) {
    const { data, valueField, dimensionFields, title, leftValue } = props;

    //data are sorted on dimensions values
    data.sort((a, b) => {
        const aValue = reduceDimensionValues(a, dimensionFields);
        const bValue = reduceDimensionValues(b, dimensionFields);
        return (aValue === bValue) ? 0 : (aValue < bValue) ? -1 : 1;
    })

    //data are normalized 
    const normalizedData: NormalizedRow[] = data.map(row => {
        return {
            dimensionValues: dimensionFields.map(field => valueIndex(row[field] as string)),
            value: row[valueField] as number
        }
    })

    //dupicated rows are merged
    const mergedData: NormalizedRow[] = [];
    normalizedData.forEach((row, index: number) => {
        if (index === 0 || !areEqual(row.dimensionValues, normalizedData[index - 1].dimensionValues)) {
            mergedData.push(row);
        } else {
            mergedData[mergedData.length - 1].value += row.value;
        }
    })

    //data are grouped by rows
    const rows: Row[] = [];
    mergedData.forEach((row, index: number) => {
        //compares only the first two dimensions
        if (index === 0 || !areEqual(row.dimensionValues.slice(0, 2),  mergedData[index - 1].dimensionValues.slice(0, 2))) {
            rows.push({
                dimensionValues: row.dimensionValues,
                values: [row.value]
            });
        } else {
            rows[rows.length - 1].values.push(row.value);
        }
    })

    //rendering
    return (
        <TornadoRenderer rows={rows} leftValue={leftValue} title={title} />
    )

}

interface TornadoRendererProps {
    rows: Row[]
    leftValue: string,
    title?: string
}

const TornadoRenderer = (props: TornadoRendererProps) => {
    //components are placed on buffers before rendering
    const labels: any[] = [];
    const leftBars: any[] = [];
    const leftValues: any[] = [];
    const rightValues: any[] = [];
    const rightBars: any[] = [];

    //counting the sum of values in the longest row
    const maxRow = Math.max(
        ...props.rows.map<number>(row => {
            return row.values.reduce((sum, current) => sum + current, 0);
        })
    )

    //creating components
    props.rows.forEach((row, index) => {
        //add dimension 2 label only if different than previous item
        if (index === 0 || props.rows[index - 1].dimensionValues[1] !== row.dimensionValues[1]) {
            labels.push(<NameLabel text={getValue(row.dimensionValues[1])} />)
        }
        const [side, bars, vals] = (getValue(row.dimensionValues[0]) === props.leftValue) ? ['left', leftBars, leftValues] : ['right', rightBars, rightValues];
        const barSum = row.values.reduce((sum, current) => sum + current, 0);

        const values: Value[] = row.dimensionValues.map((value, index) => {
            return [getValue(value), row.values[index]];
        })

        bars.push(<BarGroup values={values} max={maxRow} side={side} />);
        vals.push(<ValueLabel value={barSum.toString()} />);
    })


    return (
        <>
            <div className={"tornado dimensions-" + props.rows[0].dimensionValues.length}>
                {props.title && <h6 className="title">{props.title}</h6>}
                <div className="chart  d-flex flex-row mb-3 justify-content-center">
                    <div className="left d-flex flex-column mb-3 align-items-end flex-fill justify-content-around">
                        {leftBars}
                    </div>
                    <div className="d-flex flex-column mb-3 align-items-end text-secondary justify-content-around">
                        {leftValues}
                    </div>
                    <div className="d-flex flex-column mb-3 align-items-center justify-content-around">
                        {labels}
                    </div>
                    <div className="d-flex flex-column mb-3 align-items-start justify-content-around">
                        {rightValues}
                    </div>
                    <div className="right d-flex flex-column mb-3 align-items-start flex-fill justify-content-around">
                        {rightBars}
                    </div>
                </div>
            </div>
            <Tooltip id="tornado-tooltip" place="top"></Tooltip>
        </>
    )
}