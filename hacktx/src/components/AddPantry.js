import React, { useEffect, useState, setState } from "react";
import { db } from "../firebase";

const AddPantry = (props) => {
  const dbsettest = async () => {
    await db.collection("pantries").add({
      name: name,
      lng: long,
      lat: lat,
      info: info,
      inventory: inventory,
    });
    console.log("saved");
  };

  const dbgettest = async () => {
    const doc = await db.collection("pantries").get();
    doc.forEach((d) => {
      console.log(d);
    });
  };

  const [name, setName] = useState("name");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [info, setInfo] = useState("some info about your pantry");
  const [inventory, setInventory] = useState({});
  const [item, setItem] = useState("Sliced Bread");
  const [itemno, setItemNo] = useState(0);

  const onChangeName = (event) => {
    setName(event.target.value);
    printState();
  };
  const onChangeLat = (event) => {
    setLat(parseFloat(event.target.value));
    printState();
  };
  const onChangeLong = (event) => {
    setLong(parseFloat(event.target.value));
    printState();
  };
  const onChangeInfo = (event) => {
    setInfo(event.target.value);
    printState();
  };
  const onChangeItem = (event) => {
    setItem(event.target.value);
    printState();
  };
  const onChangeItemNo = (event) => {
    setItemNo(event.target.value);
    printState();
  };

  const printState = () => {
    console.log(name);
    console.log(lat);
    console.log(long);
    console.log(info);
    console.log(inventory);
  };
  const addItem = () => {
    if (item == "" || itemno == 0) return;
    let inv = inventory;
    inv[item] = itemno;
    setInventory(inv);
  };

  return (
    <div>
      <h1>Add your little pantry!</h1>
      <div>
        <label htmlFor="name">Name of your pantry</label>
        <input
          type="text"
          name="name"
          placeholder={name}
          onChange={onChangeName}
        />
      </div>
      <div>
        <label htmlFor="lat">Latitude of your pantry</label>
        <input
          type="text"
          name="lat"
          placeholder={lat}
          onChange={onChangeLat}
        />
      </div>
      <div>
        <label htmlFor="long">Longitude of your pantry</label>
        <input
          type="text"
          name="long"
          placeholder={long}
          onChange={onChangeLong}
        />
      </div>
      <div>
        <label htmlFor="info">Some info about your pantry</label>
        <input
          type="text"
          name="info"
          placeholder={info}
          onChange={onChangeInfo}
        />
      </div>
      <div>
        <label htmlFor="item">Add something to your inventory!</label>
        <input
          type="text"
          name="item"
          placeholder={item}
          onChange={onChangeItem}
        />
        <label htmlFor="itemno">Amount:</label>
        <input
          type="text"
          name="itemNo"
          placeholder={itemno}
          onChange={onChangeItemNo}
        />
      </div>
      <button onClick={addItem}>Add item</button>
      <div></div>
      {/* add to above form */}
      <button onClick={dbsettest}>save to db</button>
      {/* add to homepage and pantry id */}
      <button onClick={() => dbgettest()}>retrieve from db</button>
    </div>
  );
};
export default AddPantry;
