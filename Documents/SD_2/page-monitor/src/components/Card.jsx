import React from 'react';
import { useNavigate } from 'react-router-dom';
import Chart from 'react-apexcharts';
import cardStyles from '../styles/main.module.scss';

export const Card = ({ title, chartData, chartOptions, type, id }) => {
  const navigate = useNavigate(); 

  const handleCardClick = () => {
    navigate(`/chart/${id}`); 
  };

  return (
    <div className={cardStyles.chartCon} onClick={handleCardClick}>
      <div className={cardStyles.chartConTitle}>{title}</div>
      <div className={cardStyles.chartConChart}>
      <Chart 
        series={chartData.series} 
        options={chartOptions} 
        type={type} 
        height="250"
      />
      </div>
    </div>
  );
};
