import React, { useState } from 'react';
import './form.css';

function Form() {
  const [start, setStart] = useState('');
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState('');
  const [trips, setTrips] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/deliveries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ start, pickup, destination })
    });
    const data = await response.json();
    console.log(data);

    // Update state with the response
    setResult({ route: data.route, time: data.time });
  };

  const handleGetLastTrips = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/deliveries');
    const data = await response.json();
    console.log(data);
    setTrips(data);
    setResult('');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="start">Start:</label>
          <input type="text" id="start" value={start} onChange={(e) => setStart(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="pickup">Pickup:</label>
          <input type="text" id="pickup" value={pickup} onChange={(e) => setPickup(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <input type="text" id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
        </div>

        <div className="buttons-container">
          <button type="submit">Calculate Route</button>
          <button onClick={handleGetLastTrips}>Get Last 10 Trips</button>
        </div>
      </form>

      {result.route && (
        <table className="result">
          <thead>
            <tr>
              <th>Route</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{result.route}</td>
              <td>{result.time}</td>
            </tr>
          </tbody>
        </table>
      )}

      {trips.length > 0 && (
        <table className="trips">
          <thead>
            <tr>
              <th>Start</th>
              <th>Pickup</th>
              <th>Destination</th>
              <th>Route</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id}>
                <td>{trip.start}</td>
                <td>{trip.pickup}</td>
                <td>{trip.destination}</td>
                <td>{trip.route}</td>
                <td>{trip.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Form;
