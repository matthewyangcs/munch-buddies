import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { AreaChart, Grid, XAxis, YAxis } from "react-native-svg-charts";
import { Defs, LinearGradient, Stop, Path } from "react-native-svg";
import * as shape from "d3-shape";
import * as scale from "d3-scale";

const Chart = ({ type, stacked, data }) => {
  const Line = ({ line }) => (
    <Path key={"line "} d={line} stroke={"#6cae75"} fill={"rgb(231,245,231)"} />
  );

  return (
    <View
      style={{
        height: 330,
        width: 400,
        overflowX: "auto",
        position: "absolute",
        top: 100,
        flex: 1,
        marginLeft: 14
      }}
    >
      <YAxis
        data={data}
        style={{
          marginBottom: 30,
          height: 275,
          position: "absolute",
          zIndex: 9999,
          left: -3,
          top: 20
        }}
        svg={{
          fill: "grey",
          fontSize: 8,
          fontWeight: "400",
          originY: 10,
          y: 20,
          width: 800
        }}
        yAccessor={({ item }) => item}
        scale={scale.scaleLinear}
        numberOfTicks={7}
        formatLabel={(value) => value}
      />
      <View>
        <AreaChart
          style={{
            height: 300,
            width: 375,
            backgroundColor: "white",
            //   borderColor: "#6cae75",
            borderRadius: 5,
            //   border: "1px solid",
            borderRadius: 25,
            left: 15
          }}
          data={data}
          curve={shape.curveMonotoneX}
          contentInset={{ top: 20, bottom: 20, left: 10, right: 20 }}
          gridMin={-5}
          gridMax={20}
          animate={'"false"'}
        >
          <Line />
          {/* <Grid /> */}
        </AreaChart>
        <XAxis
          data={data}
          svg={{
            fill: "grey",
            fontSize: 8,
            fontWeight: "400",
            rotation: 20,
            originY: 30,
            y: 5,
            width: 300
          }}
          xAccessor={({ item, index }) => index}
          scale={scale.scaleLinear}
          numberOfTicks={4}
          style={{ marginHorizontal: -15, height: 20 }}
          contentInset={{ left: 10, right: 25 }}
          formatLabel={(value) => value}
        />
      </View>
    </View>
  );
};

export default Chart;
