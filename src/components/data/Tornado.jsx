import { Tooltip } from "react-tooltip";
import './tornado.css'

function BarGroup({ values, max, side }) {
    let cls = + (side === 'left') ? "bar left rounded" : "bar right rounded";
    let content = [];
    values.forEach(item => {
        let value = item[1];
        let text = item[0];
        let percent = (value > 0) ? Math.round((100 / max) * value) : 0;
        content.push(
            <div className={cls} style={{ width: percent + '%' }} data-tooltip-id="tornado-tooltip" data-tooltip-content={text + ' ' + value}><span className="label">{text}</span></div>
        );
    })
    return (
        <>
            <div className="bar-group w-100">
                {content}
            </div>
        </>
    )
}

function ValueLabel({ value }) {
    return (
        <div className="value">{value}</div>
    )
}

function NameLabel({ text }) {
    return (
        <div className="item-name">{text}</div>
    )
}

export default function Tornado({ data, value, dimensions, title, leftValue }) {
    //components to rendez are placed on buffers before rendering
    let [leftBars, leftValues, labels, rightValues, rightBars] = [[], [], [], [], []];

    //format data then creates components 
    (() => {
        //input data are grouped according to choosen dimensions, then transformed again to render components
        let [dimensionsData, tornadoData] = [[], []];

        // data aggregation on dimensions
        data.forEach(row => {
            //normalize row data to complies with expected dimension sequence
            let item = []
            for (let index = 0; index < dimensions.length; index++) {
                const dimensionName = dimensions[index];
                item.push(row[dimensionName]);
            }
            item.push(row[value]);

            addGroup(item);
        });
        function addGroup(item) {
            let found = false;
            dimensionsData.forEach((group, index) => {
                if (group.slice(0, -1).toString() === item.slice(0, -1).toString()) {
                    dimensionsData[index][dimensions.length] = Number(dimensionsData[index][dimensions.length]) + Number(item.slice(-1));
                    found = true;
                    return false;
                }
            });
            if (!found) {
                dimensionsData.push(item);
            }
        }

        dimensionsData.sort((a, b) => {
            function stringify(arr) {
                return arr[1] + arr[0] + ((arr.length === 3) ? arr[0] : '')
            }
            let aStr = stringify(a);
            let bStr = stringify(b);
            if (aStr === bStr) {
                return 0;
            }
            else {
                return (aStr < bStr) ? -1 : 1;
            }
        });

        // data organized to render components 
        dimensionsData.forEach((row) => {
            let value = (dimensions.length===3) ? row.slice(2, 4) : [row[1], row.slice(-1)[0]];
            if (tornadoData.length === 0 || row.slice(0, 2).toString() !== tornadoData[tornadoData.length - 1].slice(0, 2).toString()) {
                let r = row.slice(0, 2)
                r.push([value])
                tornadoData.push(r)
            } else {
                tornadoData[tornadoData.length - 1][2].push(value)
            }
        })

        //counting the amount of values in the longuest bar
        const maxBar = (() => {
            let [max, previousKey, currentSum] = [0, '', 0];

            dimensionsData.forEach(row => {
                let key = row.slice(0, 2).toString();
                let rowValue = row.slice(-1)[0];
                if (key !== previousKey) {
                    previousKey = key;
                    currentSum = rowValue;
                } else {
                    currentSum = currentSum + rowValue;
                }
                if (currentSum > max) {
                    max = currentSum;
                }
            });

            return max;
        })();

        //creating components
        tornadoData.forEach((item, index) => {
            //add dimension 2 label only if different than previous item
            if (index === 0 || tornadoData[index - 1][1] !== item[1]) {
                labels.push(<NameLabel text={item[1]} />)
            }
            const [side, bars, vals] = (item[0] === leftValue) ? ['left', leftBars, leftValues] : ['right', rightBars, rightValues];
            const barSum = item[2].reduce((sum, current) => sum + current[1], 0);
            bars.push(<BarGroup values={item[2]} max={maxBar} side={side} />);
            vals.push(<ValueLabel value={barSum} />);
        })


    })();

    //rendering
    return (
        <>
            <div className={"tornado dimensions-" + dimensions.length}>
                {title && <h6 className="title">{title}</h6>}
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
            <Tooltip id="tornado-tooltip" place="top" effect="solid">
                Tooltip for the register button
            </Tooltip>
        </>
    )
}