import React from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { barangaydata } from './data'; 
import './App.css';

const center = [13.952438381913112, 121.17640493766272];

function getColor(density) {
  return density > 100 ? '#800026' :
         density > 50  ? '#BD0026' :
         density > 20  ? '#E31A1C' :
         density > 10  ? '#FC4E2A' :
         density > 5   ? '#FD8D3C' :
         density > 3   ? '#FEB24C' :
         density > 1   ? '#FED976' :
                          '#FFEDA0';
}

function App() {
  return (

    <MapContainer center={center} zoom={12} style={{ width: '100vw', height: '100vh' }}>
      <TileLayer url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=1ObsIXOWnLG6z0WjrNMw" attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>' />

      {barangaydata.features.map((barangay) => {
        const coordinates = barangay.geometry.coordinates[0];
        const density = barangay.properties.density;
        const fillColor = getColor(density);
        const barangayName = barangay.properties.name;

        return (
        
          <Polygon
           
            pathOptions={{
              fillColor: fillColor,
              fillOpacity: 0.7,
              color: 'white',
              weight: 1
            }}
            positions={coordinates}
          >
           <Popup>
              <div>
                <h3>{barangayName}</h3>
                <p>Density: {density}</p>
              </div>
            </Popup>

          </Polygon>
    
        );
      })}
    </MapContainer>


  );
}

export default App;
