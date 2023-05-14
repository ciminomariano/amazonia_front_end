import React, { useState, useEffect } from 'react';


import logo from './logo.svg';
import './App.css';
import Form from './form';

function App() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    async function fetchTrips() {
      const response = await fetch('/api/trips');
      const data = await response.json();
      setTrips(data);
    }
    fetchTrips();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Trip Calculator</h1>
      </header>
      <main>
        <Form />
        <button onClick={async () => {
          const response = await fetch('/api/trips/last-10');
          const data = await response.json();
          setTrips(data);
        }}>Get Last 10 Trips</button>
        <ul>
          {trips.map(trip => (
            <li key={trip.id}>
              <p>Start: {trip.start}</p>
              <p>Pickup: {trip.pickup}</p>
              <p>Destination: {trip.destination}</p>
              <p>Distance: {trip.distance} km</p>
              <hr />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
