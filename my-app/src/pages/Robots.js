import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import "./Robots.css";

function Robots() {
  const [robots, setRobots] = useState([]);
  const [selectedRobot, setSelectedRobot] = useState(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const response = await fetch("http://localhost:3001/robots");
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

  // Fetch individual robot details by ID
  const fetchRobotDetails = async (robotId) => {
    try {
      const response = await fetch(`http://localhost:3001/robots/${robotId}`);
      if (response.ok) {
        let data = await response.json();

        // Fix image URL (GitHub to raw link)
        if (data.imagen.includes("github.com") && data.imagen.includes("blob")) {
          data.imagen = data.imagen.replace("blob/", "raw/");
        }

        setSelectedRobot(data);
      } else {
        console.error("Failed to fetch robot details");
      }
    } catch (error) {
      console.error("Error fetching robot details:", error);
    }
  };

  return (
    <div className="robots-container">
      <LanguageSwitcher />
      <h1>Adopta un Robot con Robot Lovers!</h1>
      <img src="/image.png" alt="Robots" className="banner-image" />

      <div className="content">
        {/* Table Section */}
        {loading ? (
          <p className="loading-text">Cargando robots...</p>
        ) : (
          <table className="robots-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>{t('table.name')}</th>
                <th>Modelo</th>
                <th>Empresa Fabricante</th>
              </tr>
            </thead>
            <tbody>
              {robots.map((robot) => (
                <tr key={robot.id} onClick={() => fetchRobotDetails(robot.id)}>
                  <td>{robot.id}</td>
                  <td>{robot.nombre}</td>
                  <td>{robot.modelo}</td>
                  <td>{robot.empresaFabricante}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Robot Details Section */}
        {selectedRobot && (
          <div className="robot-details">
            <h2>{selectedRobot.nombre}</h2>
            <img src={selectedRobot.imagen} alt={selectedRobot.nombre} className="robot-image-large" />
            <p><strong>➜ {t('table.manufacturingYear')}:</strong> {selectedRobot.añoFabricacion}</p>
            <p><strong>➜ {t('table.processingCapacity')}:</strong> {selectedRobot.capacidadProcesamiento}</p>
            <p><strong>➜ {t('table.additionalFeatures')}:</strong> {selectedRobot.humor}</p>
          </div>
        )}
      </div>

      <p className="footer">Contact us: +57 3102105253 - info@robot-lovers.com - @robot-lovers</p>
    </div>
  );
}

export default Robots;
