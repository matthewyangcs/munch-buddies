import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { AreaChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";

const Chart = ({ type, stacked }) => {
  const [data, setData] = useState([50, 10, 40, 95, -4, -24, 85]);
  const [keys, setKeys] = useState([]);

  const colors = [];

  if (!stacked) {
    return (
      <AreaChart
        style={{
          height: 450,
          width: 400,
          backgroundColor: "white",
          borderRadius: 15,
          overflow: "auto"
        }}
        data={data}
        contentInset={{ top: 30, bottom: 30 }}
        curve={shape.curveNatural}
        svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
        animate="true"
      ></AreaChart>
    );
  }

  //   <StackedAreaChart
  //     style={{ height: 200, paddingVertical: 16 }}
  //     data={data}
  //     keys={keys}
  //     colors={colors}
  //     curve={shape.curveNatural}
  //     showGrid={false}
  //     svgs={svgs}
  //   />;
};

export default Chart;
