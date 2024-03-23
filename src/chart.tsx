import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { WaterReservoirApi } from "./WaterReservoirApi";

const DEFAULT_CHART_DATA: any = {
  labels: [],
  datasets: [],
};

const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const parseQueryParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryParams: { [key: string]: string } = {};
    for (const [key, value] of searchParams.entries()) {
        queryParams[key] = value;
    }
    return queryParams;
  };

const LineChart = () => {
  const [chartData, setChartData] = useState({ ...DEFAULT_CHART_DATA });
  const queryParams = parseQueryParams(); 
  useEffect(() => {

    const fetchData = async () => {
        try {
            
            const response = await WaterReservoirApi.getReservoirData(queryParams.reservoir);

            const labels = response.map((item: any) => item.auditDate);
            const capacityValues: any = response.map((item: any) => item.capacity);
            const hardnessValues: any = response.map((item: any) => item.hardness);
            const phLevelValues: any = response.map((item: any) => item.phLevel);
        
            setChartData({
                labels: labels,
                datasets: [
                  {
                    label: "Capacity",
                    data: capacityValues,
                    borderColor: "blue",
                  },
                  {
                    label: "Hardness",
                    data: hardnessValues,
                    borderColor: "green",
                  },
                  {
                    label: "pH Level",
                    data: phLevelValues,
                    borderColor: "red",
                  },
                ],
              });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();    
    }, []);
  
    return (
      <div>
        <h2>Water Reservoir</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    );
};

export default LineChart;  