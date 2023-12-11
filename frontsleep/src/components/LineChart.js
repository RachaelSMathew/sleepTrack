// components/LineChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';

function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Sleep Chart</h2>
      <Line
        data={chartData}
        options={{
            scales: {
                y: {
                    title: {
                      display: true,
                      text: 'hours'
                    }
                  }
            },
          plugins: {
            title: {
              display: true,
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;