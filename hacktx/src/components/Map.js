import React, { useState, useRef, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { db } from "../firebase";
require("dotenv").config();

//A pantry as it appears on the map. Should probably be an icon+text? Hover functionality would
//be even better but idk we can pull that off
const Marker = ({ text }) => <div>{text}</div>;

//A pantry as it appears in the list. This should ideally be limited to nearby pantries
const Pantry = ({ name, info, inventory }) => {
  return (
    <div>
      <h2>{name}</h2>
      <h3>{info}</h3>
      <p>Inventory:</p>
      {Object.keys(inventory).map((key) => {
        return <p>{key + ":" + inventory[key]}</p>;
      })}
    </div>
  );
};

//get all pantries from the database, populate pantries and markers
const getMarkers = async () => {
  let markers = [];
  let pdata = [];
  let pantries = await db.collection("pantries").get();

  if (pantries.empty) {
    console.log("nothing found");
    return;
  }

  let data;
  pantries.forEach((doc) => {
    data = doc.data();
    console.log(data.lat, data.lng, data.name);
    if (data.lat && data.lng && data.name)
      markers.push(<Marker lat={data.lat} lng={data.lng} text={data.name} />);

    if (data.name && data.info && data.inventory)
      pdata.push(
        <Pantry name={data.name} info={data.info} inventory={data.inventory} />
      );
  });
  return [pdata, markers];
};

const SimpleMap = (props) => {
  const [markers, setMarkers] = useState([]);
  const [pdata, setPdata] = useState([]);
  const mapRef = useRef();

  //when the component loads call getMarkers
  useEffect(() => {
    getMarkers().then((m) => {
      setPdata(m[0]);
      setMarkers(m[1]);
    });
  }, []);

  console.log(markers);
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "50vh", width: "50%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPAPIKEY }}
        defaultCenter={props.center}
        defaultZoom={10}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map;
        }}
      >
        {markers}
      </GoogleMapReact>
      {pdata}
    </div>
  );
};

export default SimpleMap;
