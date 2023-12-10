


import React, { useState } from "react";

function Crud() {
  const list = [
    {
      id: 1,
      name: 'apple',
      price: 10
    },
    {
      id: 2,
      name: 'kiwi',
      price: 10
    }
  ];

  const [lists, setList] = useState(list);
  const [editItemId, setEditItemId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const handleEdit = (id) => {
    const itemToEdit = lists.find((item) => item.id === id);
    setEditItemId(id);
    setEditedName(itemToEdit.name);
    setEditedPrice(itemToEdit.price);
  };

  const handleUpdate = () => {
    const updatedList = lists.map((item) =>
      item.id === editItemId ? { ...item, name: editedName, price: editedPrice } : item
    );
    setList(updatedList);
    setEditItemId(null);
    setEditedName("");
    setEditedPrice("");
  };

  const handleDelete = (id) => {
    const newList = lists.filter((item) => item.id !== id);
    setList(newList);
  };

  return (
    <div>
      <h2>crud</h2>
      <AddList setList={setList}/>
      <table>
       
          {lists.map((current) => (
            <tr key={current.id}>
              <td>{current.id}</td>
              <td>
                {editItemId === current.id ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  current.name
                )}
              </td>
              <td>
                {editItemId === current.id ? (
                  <input
                    type="text"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                  />
                ) : (
                  current.price
                )}
              </td>
              <td>
                {editItemId === current.id ? (
                  <button className="edit" onClick={handleUpdate}>Save</button>
                ) : (
                  <button className="edit" onClick={() => handleEdit(current.id)}>Edit</button>
                )}
                <button className="delete" onClick={() => handleDelete(current.id)}>Delete</button>
              </td>
            </tr>
          ))}
       
      </table>
    </div>
  );
}

function AddList({setList}){

    function handleSubmit(event){
        function random(){
            return(
                parseInt(Math.random()*1000000)
            )
        }
        event.preventDefault()
       const name = event.target.elements.name.value;
       const price = event.target.elements.price.value;
       console.log(name,price);

       const newList ={
        id:random(),
        name,
        price
       }

       setList((prevList)=>{
        return prevList.concat(newList)
       }
       )

    }
    return(
        <form onSubmit={handleSubmit}>
            <input type='text' name='name'placeholder="your name"/>

            <input type='text' name='price'placeholder="your name"/>

            <button type="submit"> add</button>
        </form>
    )
}
export default Crud;

