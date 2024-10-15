import React, { useContext } from 'react';
import mainStyles from '../styles/main.module.scss';
import { Card } from '../components/Card';
import ChartContext from '../context/CharContext';

function Home() {
  const { chartData } = useContext(ChartContext); 

  const totalTimeSpent = Object.keys(chartData).reduce(
    (acc, key) => acc + (chartData[key]?.totalViewTime || 0), 0
  );

  const viewTimeDistributionData = {
    series: [
      (chartData[1]?.totalViewTime / totalTimeSpent) * 100 || 0, 
      (chartData[2]?.totalViewTime / totalTimeSpent) * 100 || 0, 
      (chartData[3]?.totalViewTime / totalTimeSpent) * 100 || 0, 
      (chartData[4]?.totalViewTime / totalTimeSpent) * 100 || 0, 
    ],
  };

  const viewTimeDistributionOptions = {
    chart: {
      id: 'view-time-pie',
    },
    labels: ['Company Performance', 'Product Sales', 'Monthly Revenue', 'R&D Investment'],
  };

  const companyPerformanceData = {
    series: [
      {
        name: 'Performance',
        data: [5000, 7000, 8000, 6000, 9000, 11000],
      },
    ],
  };

  const productSalesData = {
    series: [
      {
        name: 'Sales',
        data: [2000, 3000, 4000, 3500, 5000, 6000],
      },
    ],
  };

  const monthlyRevenueData = {
    series: [
      {
        name: 'Revenue',
        data: [12000, 15000, 13000, 17000, 20000, 22000],
      },
    ],
  };

  const rdInvestmentData = {
    series: [
      {
        name: 'R&D Investment ($)',
        data: [12000, 15000, 18000, 22000, 25000],
      },
      {
        name: 'New Product Launches',
        data: [4, 5, 6, 8, 10],
      },
    ],
  };

  const companyPerformanceOptions = {
    chart: {
      id: 'company-performance-bar',
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June'],
    },
  };

  const productSalesOptions = {
    chart: {
      id: 'product-sales-line',
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June'],
    },
  };

  const monthlyRevenueOptions = {
    chart: {
      id: 'monthly-revenue-area',
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June'],
    },
  };

  const rdInvestmentOptions = {
    chart: {
      id: 'rd-investment-line',
    },
    xaxis: {
      categories: ['2018', '2019', '2020', '2021', '2022'],
    },
  };

  return (
    <div className={mainStyles.mainCon}>
      <Card
        title="Company Performance"
        chartData={companyPerformanceData}
        chartOptions={companyPerformanceOptions}
        type="bar"
        id="1"
      />
      <Card
        title="Product Sales"
        chartData={productSalesData}
        chartOptions={productSalesOptions}
        type="line"
        id="2"
      />
      <Card
        title="Monthly Revenue"
        chartData={monthlyRevenueData}
        chartOptions={monthlyRevenueOptions}
        type="area"
        id="3"
      />
      <Card
        title="R&D Investment vs New Product Launches"
        chartData={rdInvestmentData}
        chartOptions={rdInvestmentOptions}
        type="line"
        id="4"
      />
      <Card
        title="Chart View Time Distribution"
        chartData={viewTimeDistributionData}
        chartOptions={viewTimeDistributionOptions}
        type="pie"
        id="5"
      />
    </div>
  );
}

export default Home;
