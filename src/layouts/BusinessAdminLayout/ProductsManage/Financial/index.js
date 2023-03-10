import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';
const Financial = () => {
    const data = [
        { quarter: 1, earnings: 130000 },
        { quarter: 2, earnings: 165000 },
        { quarter: 3, earnings: 142500 },
        { quarter: 4, earnings: 190000 }
    ];
    return (
        <VictoryChart
            // domainPadding will add space to each side of VictoryBar to
            // prevent it from overlapping the axis
            domainPadding={20}
        >
            <VictoryAxis
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                tickValues={[1, 2, 3, 4]}
                tickFormat={["Quý 1", "Quý 2", "Quý 3", "Quý 4"]}
            />
            <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => (`${x / 1000}tr`)}
            />
            <VictoryBar
                data={data}
                x="quarter"
                y="earnings"
            />
        </VictoryChart>
    )
};

export default Financial;
