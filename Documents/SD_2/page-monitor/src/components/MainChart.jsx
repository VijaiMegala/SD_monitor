import React, { useEffect, useRef } from "react";
import mainChartStyles from "../styles/main.module.scss";
import { useParams } from "react-router-dom";
import Chart from 'react-apexcharts';
import { useChartContext } from "../context/CharContext";

export const MainChart = () => {
  const { id } = useParams(); 
  const { chartData, updateChartData } = useChartContext(); // Use the context
  const mountTimeRef = useRef(0); // Ref to store the mount time

  const chartDataMap = {
    1: {
      title: "Company Performance",
      series: [
        {
          name: "Performance",
          data: [5000, 7000, 8000, 6000, 9000, 11000],
        },
      ],
      type: "bar",
    },
    2: {
      title: "Product Sales",
      series: [
        {
          name: "Sales",
          data: [2000, 3000, 4000, 3500, 5000, 6000],
        },
      ],
      type: "line",
    },
    3: {
      title: "Monthly Revenue",
      series: [
        {
          name: "Revenue",
          data: [12000, 15000, 13000, 17000, 20000, 22000],
        },
      ],
      type: "area",
    },
    4: {
      title: "R&D Investment vs New Product Launches",
      series: [
        {
          name: "R&D Investment",
          data: [12000, 15000, 18000, 22000, 25000],
        },
        {
          name: "New Product Launches",
          data: [4, 5, 6, 8, 10],
        },
      ],
      type: "line",
    },
    5: {
      title: "Chart View Time Distribution",
      series: [], // Will be set dynamically based on view time distribution
      type: "pie",
    },
  };

  const chartOptionsMap = {
    1: {
      chart: {
        id: "company-performance-bar",
      },
      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June"],
        labels: {
          style: {
            colors: "#FFFFFF", // Set X-axis labels to white
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#FFFFFF", // Set Y-axis labels to white
          },
        },
      },
    },
    2: {
      chart: {
        id: "product-sales-line",
      },
      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June"],
        labels: {
          style: {
            colors: "#FFFFFF", // Set X-axis labels to white
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#FFFFFF", // Set Y-axis labels to white
          },
        },
      },
    },
    3: {
      chart: {
        id: "monthly-revenue-area",
      },
      xaxis: {
        categories: ["January", "February", "March", "April", "May", "June"],
        labels: {
          style: {
            colors: "#FFFFFF", // Set X-axis labels to white
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#FFFFFF", // Set Y-axis labels to white
          },
        },
      },
    },
    4: {
      chart: {
        id: "rd-investment-line",
      },
      xaxis: {
        categories: ["2018", "2019", "2020", "2021", "2022"],
        labels: {
          style: {
            colors: "#FFFFFF", // Set X-axis labels to white
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#FFFFFF", // Set Y-axis labels to white
          },
        },
      },
    },
    5: {
      chart: {
        id: "view-time-pie",
      },
      labels: ["Company Performance", "Product Sales", "Monthly Revenue", "R&D Investment"],
      legend: {
        labels: {
          colors: "#FFFFFF", // Set legend item colors to white
        },
      },
    },
  };

  const selectedChart = chartDataMap[id];
  const selectedOptions = chartOptionsMap[id];

  useEffect(() => {
    // Set the start time when the component mounts
    const startTime = Date.now();
    mountTimeRef.current = startTime;

    return () => {
      // When the component unmounts, calculate the time spent and update the context
      const endTime = Date.now();
      const timeSpent = Math.floor((endTime - startTime) / 1000); // Convert to seconds
      updateChartData(id, timeSpent); // Pass the current chart ID
    };
  }, [id, updateChartData]);

  // Calculate percentages for the pie chart (5th chart)
  const totalTimeSpent = Object.keys(chartData).reduce(
    (acc, key) => acc + (chartData[key]?.totalViewTime || 0), 0
  );

  if (id === "5") {
    chartDataMap[5].series = [
      (chartData[1]?.totalViewTime / totalTimeSpent) * 100 || 0,
      (chartData[2]?.totalViewTime / totalTimeSpent) * 100 || 0,
      (chartData[3]?.totalViewTime / totalTimeSpent) * 100 || 0,
      (chartData[4]?.totalViewTime / totalTimeSpent) * 100 || 0,
    ];
  }

  return (
    <div className={mainChartStyles.mainChartCon}>
      <div className={mainChartStyles.mainChartConHeader}>
        J&J Analytics Dashboard
      </div>
      <div className={mainChartStyles.mainChartConContent}>
        <div className={mainChartStyles.mainChartConContentDesc}>
          <h2>{selectedChart?.title || "Chart"}</h2>
          <div className={mainChartStyles.mainChartConContentDescText}>
            {id !== "5" && (
              <>
                <span>Total View Time: {chartData[id]?.totalViewTime || 0} secs</span>
                <span>View Count: {chartData[id]?.viewCount || 0}</span>
                <span>Average Session Time: {Math.floor(chartData[id]?.averageSessionTime || 0)} secs</span>
              </>
            )}
          </div>
        </div>
        <div className={mainChartStyles.mainChartConContentChart}>
          {selectedChart ? (
            <Chart
              series={selectedChart.series}
              options={selectedOptions}
              type={selectedChart.type}
              height="350"
              width="400"
            />
          ) : (
            <div>Chart not found</div>
          )}
        </div>
      </div>
    </div>
  );
};
