import React, { createContext, useContext, useState } from 'react';

const ChartContext = createContext();

export const useChartContext = () => {
  return useContext(ChartContext);
};

export const ChartProvider = ({ children }) => {
  const [chartData, setChartData] = useState({});

  const updateChartData = (id, timeSpent) => {
    setChartData((prevData) => {
      const existingData = prevData[id] || {
        totalViewTime: 0,           
        viewCount: 0,               
        averageSessionTime: 0,      
      };

      const newViewCount = existingData.viewCount + 1;
      const newTotalViewTime = existingData.totalViewTime + timeSpent;
      
      return {
        ...prevData,
        [id]: {
          totalViewTime: newTotalViewTime,
          viewCount: newViewCount,
          averageSessionTime: newTotalViewTime / newViewCount,
        },
      };
    });
  };

  return (
    <ChartContext.Provider value={{ chartData, updateChartData }}>
      {children}
    </ChartContext.Provider>
  );
};

export default ChartContext;