import { React, useState, useEffect } from "react";
import { TileLayer, LayersControl, GeoJSON, MapContainer } from "react-leaflet";
//It is important to import leaflet styles in your component
import "leaflet/dist/leaflet.css";
const MyData = () => {
  // create state variable to hold data when it is fetched
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/geom");

      //jsonData is an array cotaining the json object
      const jsonData = await response.json();

      //Accessing the json object and then obtaining the geojson object
      //which is the value of st_asgeojson key
      setData(JSON.parse(jsonData[8].st_asgeojson));

    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(data);

  // render react-leaflet GeoJSON when the data is ready
  if (data) {
    return <GeoJSON data={data} />;
  } else {
    return null;
  }
};


// Using the GeoJSON tag in a Map container
const LeafletMap = () => {

  const [center, setCenter] = useState({ lat: 37.834849, lng:  27.841736 });
  const zoomLevel = 14;
  return (
    <MapContainer center={center} zoom={zoomLevel}>
      {/*The LayersControl tag help us organize our layers into baselayers and tilelayers*/}
      <LayersControl position="topright">
        {/*Using an OpenStreetMap basemap as a basemap*/}
        <LayersControl.BaseLayer name="OpenStreetMap" checked>
          <TileLayer
            attribution='&copy; <a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=adAOpSS5VBicRxqVfAqaaUzPsahQr6Ryd9LqqUHl4LNlE7uWbwmAJAdrf0DDzY4M"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="My GeoJSON layer" checked>
          <MyData />
        </LayersControl.Overlay>
      </LayersControl>

    </MapContainer>
  );
};
export default LeafletMap;

//{ lat: 37.834849, lng: 27.841736 }
//var Jawg_Matrix = L.tileLayer('https://{s}.tile.jawg.io/jawg-matrix/{z}/{x}/{y}{r}.png?access-token=adAOpSS5VBicRxqVfAqaaUzPsahQr6Ryd9LqqUHl4LNlE7uWbwmAJAdrf0DDzY4M', {
//	attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//	minZoom: 0,
//	maxZoom: 22,
//	subdomains: 'abcd',
//	accessToken: '<your accessToken>'
//});
//
//<LayersControl.BaseLayer name="OpenStreetMap" checked>
 //                   <TileLayer
 //                       attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 //                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
 //                   />
 //               </LayersControl.BaseLayer>