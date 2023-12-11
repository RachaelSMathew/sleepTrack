// components/LineChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function DoughnutChart({ chartData }) {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>What's your mood while sleeping?</h2>
      <Doughnut
        data={chartData}
      />
    </>
  );
}
export default DoughnutChart;