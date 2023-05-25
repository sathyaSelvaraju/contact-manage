import React, { useEffect, useState } from "react";
import LandingPage from "../Components/LandingPage";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { DivIcon, LatLng } from "leaflet";
import L from "leaflet";
import { Typography, Row, Col } from "antd";
import { Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import placeholderIcon from "../Images/placeholder.png";

// icon for the map marker
const customIcon = new DivIcon({
  className: "custom-icon",
  html: `<img src="${placeholderIcon}" style="width: 50px; height: 50px;" />`,
});

const Maps = () => {
  const [covidCase, setCovidCase] = useState<any>(null);
  const { Title } = Typography;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchCovidCases = () => {
      fetch(`https://disease.sh/v3/covid-19/all`)
        .then((response) => response.json())
        .then((data) => {
          setCovidCase(data);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchCovidCases();
  }, []);

  const center: LatLng = new LatLng(20.5937, 78.9629);
  const zoom = 3;

  return (
    <LandingPage>
      <div>
        {" "}
        <Title level={3}>Cases all over details</Title>
      </div>
      <Row>
        <Col span={22} offset={1}>
          <MapContainer center={center} zoom={zoom} style={{ height: "400px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {covidCase && (
              <Marker position={[20.5937, 78.9629]} icon={customIcon}>
                <Popup>
                  <div>
                    <p>Total Cases : {covidCase.cases}</p>
                    <p>Total Active : {covidCase.active}</p>
                    <p>Total Critical : {covidCase.critical}</p>
                    <p>Total Deaths : {covidCase.deaths}</p>
                    <p>Total Population : {covidCase.population}</p>
                    <p>Total Recovered : {covidCase.recovered}</p>
                    <p>Total Tests : {covidCase.tests}</p>
                    <p>Total TodayCases : {covidCase.todayCases}</p>
                    <p>Total TodayDeaths : {covidCase.todayDeaths}</p>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </Col>
      </Row>
      <span>(Click on the marker to see the details)</span>
    </LandingPage>
  );
};

export default Maps;
