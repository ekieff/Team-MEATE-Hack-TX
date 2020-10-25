import React, { useEffect, useState, setState } from "react"
import { db } from "../firebase";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const AddPantry = (props) => {

  const classes = useStyles();

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


  const [name, setName] = useState('name of your pantry')
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [info, setInfo] = useState('some info about your pantry')
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
      <form className={classes.root} noValidate autoComplete="off">
        <h1>Add a food pantry to our list</h1>
          <div>
            <TextField required id="standard-required" label="name of your food pantry" name="name" placeholder="name" onChange={onChangeName}/>
          </div>
          <div>
            <TextField required id="standard-required" label="latitude of your food pantry" name="lat" placeholder="Latitude" onChange={onChangeLat}/>
          </div>
          <div>
            <TextField required id="standard-required" label="longitude of your food pantry" name="long" placeholder="Longitude" onChange={onChangeLong}/>
          </div>
          <div>
            <TextField required id="standard-required" label="some info about your food pantry" name="info" placeholder="info" onChange={onChangeInfo}/>
          </div>
      </form>
      <div>
        <h4>Add a product to your food pantry</h4>
      <TextField required id="standard-required" label="Product" name="info" placeholder="product" onChange={onChangeItem}/>
      <TextField required id="standard-required" label="Quantity:" name="itemNo" placeholder="quantity" onChange={onChangeItemNo}/>
      </div>
      <div>
      <Button variant="contained" color="primary" onClick={dbsettest}>Add a pantry</Button>
      <Button variant="contained" color="primary" onClick={dbsettest}>Add Food to Pantry</Button>
      </div>
    </div>
  );
};
export default AddPantry;
