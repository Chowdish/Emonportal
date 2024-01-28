import React, { useState, useEffect } from 'react';

const WifiConfigurator = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [wifiCredentials, setWifiCredentials] = useState({
    ssid: '',
    password: '',
  });

  useEffect(() => {
    // Request Bluetooth device
    navigator.bluetooth
      .requestDevice({ filters: [{ services: ['<Your Bluetooth Service UUID>'] }] })
      .then(device => {
        setDevices([device]);
      })
      .catch(error => console.error('Error discovering Bluetooth devices:', error));
  }, []);

  const handleDeviceSelect = device => {
    setSelectedDevice(device);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setWifiCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSendCredentials = () => {
    if (!selectedDevice) {
      console.error('No device selected.');
      return;
    }

    const credentialsString = JSON.stringify(wifiCredentials);

    selectedDevice.gatt
      .connect()
      .then(server => server.getPrimaryService('<Your Bluetooth Service UUID>'))
      .then(service => service.getCharacteristic('<Your Characteristic UUID>'))
      .then(characteristic => characteristic.writeValue(new TextEncoder().encode(credentialsString)))
      .then(() => {
        console.log('WiFi credentials sent successfully.');
      })
      .catch(error => console.error('Error sending WiFi credentials:', error));
  };

  return (
    <div>
      <h1 className='mb-3'>WiFi Configurator</h1>
      <div>
        <label>
          WiFi SSID:
          <input className='bg-light-gray rounded-full border-none  px-2 py-0.1 text-black ml-4'
            type="text"
            name="ssid"
            value={wifiCredentials.ssid}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          WiFi Password:
          <input className='bg-light-gray rounded-full border-none  px-2 py-0.1 text-black ml-4 mt-1'            type="password" // Use "password" type for password input
            name="password"
            value={wifiCredentials.password}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <button onClick={handleSendCredentials} className='mt-4 button'>Send WiFi Credentials</button>
      </div>
      <div className='mt-3'>
        <h3>Available Bluetooth Devices:</h3>
        <ul className='bg-light-gray w-full h-10 rounded-lg'>
          {devices.map(device => (
            <li key={device.id} onClick={() => handleDeviceSelect(device)}>
              {device.name || 'Unknown Device'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WifiConfigurator;
