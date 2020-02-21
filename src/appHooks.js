import React, { useEffect, useState, Fragment } from "react";

import { getItems } from "./services/firebase/database";

export const App = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
    const results = await getItems();
    setItems(results);
    }
    fetchItems();
  }, []);

  return (
    <div>
      {items.map(item => (
        <>
          <img src={item.imageUrl} alt='wiki'/>
          <div>{item.caption}</div>
        </>
      ))}
    </div>
  );
};
