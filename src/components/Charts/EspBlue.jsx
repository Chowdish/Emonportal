import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const EnergyGraph = () => {
  const [energyData, setEnergyData] = useState([]);

  const fetchDataFromESP = async () => {
    try {
      // Replace 'ESP8266_IP_ADDRESS' with the actual IP address of your ESP8266
      const response = await fetch('http://ESP8266_IP_ADDRESS/data');
      const data = await response.json();
      setEnergyData(data);
    } catch (error) {
      console.error('Error fetching data from ESP8266:', error);
    }
  };

  const handleConnectButtonClick = () => {
    // Fetch data from ESP8266 when the connect button is clicked
    fetchDataFromESP();
  };

  const options = {
    chart: {
      id: 'energy-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: 'numeric',
      categories: energyData.map(entry => entry.hour), // Assuming 'hour' property in your data
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
  };

  const series = [{
    name: 'Energy',
    data: energyData.map(entry => entry.energy), // Assuming 'energy' property in your data
  }];

  return (
    <div>
      <button
        onClick={handleConnectButtonClick}
        className="bg-light-gray hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
      >
        Connect to ESP8266
      </button>
      {energyData.length > 0 && (
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={300}
        />
      )}
    </div>
  );
};

export default EnergyGraph;
