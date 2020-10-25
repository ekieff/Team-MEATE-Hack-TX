import React, { useEffect, useState } from "react";
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

const PantryId = (props) => {

  const classes = useStyles();

  const [loaded, setLoaded] = useState(0);
  const [pantry, setPantry] = useState({});
  const [item, setItem] = useState("Sliced Bread");
  const [itemno, setItemNo] = useState(0);

  useEffect(() => {
    async function fetchData() {
      console.log("at least were here");
      let doc = await db
        .collection("pantries")
        .doc(props.match.params.id)
        .get();
      console.log(doc.data());
      setPantry(doc.data());
      setLoaded(true);
    }
    fetchData();
  }, []);


  const takeItem = (key) => {
    let p = pantry;
    if (p.inventory[key] && p.inventory[key] > 0) {
      p.inventory[key]--;
    }
  };

  const onChangeItem = (event) => {
    setItem(event.target.value);
    console.log(event.target.value);
  };

  const onChangeItemNo = (event) => {
    setItemNo(parseInt(event.target.value));
    console.log(event.target.value);
  };

  const addItem = () => {
    let p = pantry;
    p.inventory[item] = itemno;
    setPantry(p);
  };

  const save = async () => {
    await db.collection("pantries").doc(props.match.params.id).set(pantry);
  };
  console.log("pantry:", pantry);
  if (loaded) {
    return (
      <div>
        <h1>{pantry.name}</h1>
        <h3>Location:{pantry.lat + "," + pantry.lng}</h3>
        <div>
          <p>Inventory:</p>
          {Object.keys(pantry.inventory).map((key) => {
            return (
              <div label={key}>
                <p>{key + ":" + pantry.inventory[key]}</p>
                <Button variant="contained" color="primary"
                  onClick={() => {
                    takeItem(key);
                  }}
                >
                  Take item
                </Button>
              </div>
            );
          })}
        </div>
        <div>
        <h4>Add a product to your food pantry</h4>
      <TextField required id="standard-required" label="Product" name="info" placeholder="product" onChange={onChangeItem}/>
      <TextField required id="standard-required" label="Quantity:" name="itemNo" placeholder="quantity" onChange={onChangeItemNo}/>
      </div>
        <Button variant="contained" color="primary" onClick={() => addItem()}>Add item</Button>
        <Button variant="contained" color="primary"onClick={save}>Save!</Button>
      </div>
    );
  } else return <div>loading</div>;
};

export default PantryId;
/**/
