import React, { useEffect, useState } from "react";
import LandingPage from "../Components/LandingPage";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { DivIcon, LatLng } from "leaflet";
import { Col, Row, Typography } from "antd";
import { Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import placeholderIcon from "../Images/placeholder.png";
import { Chart, LineAdvance, Tooltip } from "bizcharts";

// icon for the map marker
const customIcon = new DivIcon({
  className: "custom-icon",
  html: `<img src="${placeholderIcon}" style="width: 20px; height: 20px;" />`,
});

const Charts = () => {
  const [covidCase, setCovidCase] = useState<any>(null);
  const [graphData, setGraphData] = useState<any>(null);
  const { Title } = Typography;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // api on get cases including countries
    const fetchCovidCases = () => {
      fetch(`https://disease.sh/v3/covid-19/countries`)
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

  // got (data) and making the cases api in the format of array of objects
  const transformGraphData = (data: any) => {
    const { cases } = data;
    const transformedData = Object.keys(cases).map((date) => ({
      date,
      cases: cases[date],
    }));
    return transformedData;
  };

  useEffect(() => {
    // api for graph details that shows the date and cases count
    const fetchGraphData = () => {
      fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=all`)
        .then((response) => response.json())
        .then((data) => {
          const transformedData = transformGraphData(data);
          setGraphData(transformedData);
          console.log("kkkkkkkkk", transformedData);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchGraphData();
  }, []);

  const center: LatLng = new LatLng(20.5937, 78.9629);
  const zoom = 3;

  return (
    <LandingPage>
      <div>
        {" "}
        <Title level={3}>Case Details</Title>
      </div>
      <Row>
        <Col lg={11} md={11} sm={24} xs={24} offset={1}>
          <MapContainer center={center} zoom={zoom} style={{ height: "300px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {covidCase &&
              covidCase.map((e: any) => (
                <Marker
                  position={[e.countryInfo.lat, e.countryInfo.long]}
                  icon={customIcon}>
                  <Popup>
                    <div>
                      <p>country : {e?.country}</p>
                      <p>Population : {e?.population}</p>
                      <p>Cases : {e?.cases}</p>
                      <p>Critical : {e?.critical}</p>
                      <p>Deaths : {e?.deaths}</p>
                      <p>Recovered : {e?.recovered}</p>
                      <p>TodayCases : {e?.todayCases}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
          <span>(Click on the marker to see the details)</span>
        </Col>

        {/* ---------End of map ---------- */}
        {/* ------- Line Chart ------------ */}

        <Col lg={11} md={11} sm={24} xs={24} offset={1}>
          {graphData && (
            <Chart
              padding={[10, 20, 50, 40]}
              autoFit
              height={300}
              data={graphData}>
              <LineAdvance
                shape="smooth"
                area
                position="date*cases"
                color="cases"
              />
              <Tooltip visible={false} />
            </Chart>
          )}
        </Col>
      </Row>
    </LandingPage>
  );
};

export default Charts;
