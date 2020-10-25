import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const PantryId = (props) => {
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
                <button
                  onClick={() => {
                    takeItem(key);
                  }}
                >
                  Take item
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <label htmlFor="Add item:">Item:</label>
          <input
            type="text"
            name="invitem"
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
        <button onClick={() => addItem()}>Add item</button>
        <button onClick={save}>Save!</button>
      </div>
    );
  } else return <div>loading</div>;
};

export default PantryId;
/**/
