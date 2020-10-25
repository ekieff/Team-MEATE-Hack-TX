
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

function AddPantry(props){
  const classes = useStyles();
  
  const dbsettest = async () => {
    await db
      .collection("pantries")
      .add({
        name: {name},
        lon: parseFloat({long}),
        lat: parseFloat({lat}),
        info: {info},
        inventory: {
          canned_peas: 5,
          bread: 10,
        },
      });
      console.log('saved')
  };
  
  const dbgettest = async () => {
    const doc = await db.collection("pantries").get();
    console.log(doc.data());
  };

  const [name, setName] = useState('name of your pantry')
  const [lat, setLat] = useState('Your Latitude')
  const [long, setLong] = useState('Your Longitude')
  const [info, setInfo] = useState('some info about your pantry')

  const onChangeName = (event) =>{
    setName(event.target.value)
    console.log('typing')
    console.log(event.target.value)
  }
  const onChangeLat = (event) =>{
    setLat(parseFloat(event.target.value))
    console.log('typing')
    console.log(event.target.value)
  }
  const onChangeLong = (event) =>{
    setLong(parseFloat(event.target.value))
    console.log('typing')
    console.log(event.target.value)
  }
  const onChangeInfo = (event) =>{
    setInfo(event.target.value)
    console.log('typing')
    console.log(event.target.value)
  }

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <h1>Add a food pantry to our list</h1>
          <div>
            <TextField required id="standard-required" label={name} name="name" placeholder={name} onChange={onChangeName}/>
          </div>
          <div>
            <TextField required id="standard-required" label={lat} name="lat" placeholder={lat} onChange={onChangeLat}/>
          </div>
          <div>
            <TextField required id="standard-required" label={long} name="long" placeholder={long} onChange={onChangeLong}/>
          </div>
          <div>
            <TextField required id="standard-required" label={info} name="info" placeholder={info} onChange={onChangeInfo}/>
          </div>
      </form>
      {/* add to above form */}
      <Button variant="contained" color="primary" onClick={dbsettest}>Add a pantry</Button>
      {/* add to homepage and pantry id */}
      {/* <button onClick={() => dbgettest()}>retrieve from db</button> */}
    </div>
  );
};
export default AddPantry;
