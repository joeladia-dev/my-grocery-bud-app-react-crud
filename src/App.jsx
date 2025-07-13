import Form from './Form';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import Items from './Items';
import { ToastContainer, toast } from 'react-toastify';

// Another way to handle localStorage
// const getLocalStorage = () => {
//   let list = localStorage.getItem('list');
//   if (list) {
//     list = JSON.parse(localStorage.getItem('list'));
//   } else {
//     list = [];
//   }
//   return list;
// };

//One liner to get localStorage
const defaultList = JSON.parse(localStorage.getItem('list')) || [];

const setLocalStorage = (items) => {
  localStorage.setItem('list', JSON.stringify(items));
};

const App = () => {
  const [items, setItems] = useState(defaultList);

  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
    toast.success('Item added to the list');
  };

  const editItem = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, completed: !item.completed };
        return updatedItem;
      }
      return item;
    });
    setItems(updatedItems);
    setLocalStorage(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setLocalStorage(updatedItems);
    toast.success('Item deleted');
  };

  return (
    <section className='section-center'>
      <ToastContainer position='top-center' autoClose={2000} />
      <Form addItem={addItem} />
      <Items items={items} removeItem={removeItem} editItem={editItem} />
    </section>
  );
};
export default App;
