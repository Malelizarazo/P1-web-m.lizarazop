import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Robots.css";

function Robots() {
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchRobots = async () => {
    try {
      const response = await fetch("http://localhost:3001/robots"); // Updated URL
      if (response.ok) {
        const data = await response.json();
        setRobots(data);
      } else {
        console.error("Failed to fetch robots");
      }
    } catch (error) {
      console.error("Error fetching robots:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchRobots();
}, []);


  return (
    <div className="robots-container">
      <h1>Adopta un Robot con Robot Lovers!</h1>
      <img src="/image.png" alt="Robots" className="banner-image" />

      {loading ? (
        <p className="loading-text">Cargando robots...</p>
      ) : (
        <table className="robots-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Modelo</th>
              <th>Empresa Fabricante</th>
            </tr>
          </thead>
          <tbody>
            {robots.map((robot) => (
              <tr key={robot.id}>
                <td>{robot.id}</td>
                <td>{robot.name}</td>
                <td>{robot.model}</td>
                <td>{robot.manufacturer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="footer">Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers</p>
    </div>
  );
}

export default Robots;
