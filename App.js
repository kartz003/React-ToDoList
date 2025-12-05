import React from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const today = new Date();
  let day = '';
  const [toDo, setToDo] = useState('');
  const [toDos, setToDos] = useState([]);
  switch (today.getDay()) {
    case 0:
      day = 'Sunday';
      break;
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = 'Tuesday';
      break;
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
    case 6:
      day = 'Saturday';
      break;
    default:
      break;
  }
  return (
    <div>
      <div className='app'>
        <div className='mainHeading'>
          <h1> ToDo List </h1>
        </div>
        <div className='subHeading'>
          <br />
          <h2> Whoop, it's {day} </h2>
        </div>
        <div className='input'>
          <input type='text' placeholder='Add item' value={toDo} onChange={(e) => setToDo(e.target.value)} />
          <i className='fas fa-plus' onClick={() => {
            const count = toDos.filter(
              item => ((!item.status || item.status) && !item.deleted)
            ).length;
            if (count <= 10 && toDo !== '' && !checkDuplicates(toDo, toDos)) {
              // If duplicate exist in deleted incomplete tasks, set it as not deleted
              // if(toDos.some(item => (item.text.toLowerCase() === toDo.toLowerCase() && (!item.status && item.deleted)))) {
              //   setToDos((obj) =>
              //     obj.map((item) =>
              //       item.text.toLowerCase() === toDo.toLowerCase() && item.deleted ? { ...item, deleted: false } : item
              //     )
              //   );
              // } else {
              //   setToDos([...toDos, { id: Date.now(), text: toDo, status: false, deleted: false }]);
              // }
              // setToDos([...toDos, { id: Date.now(), text: toDo, status: false, deleted: false }]);
              // setToDo('');
              setToDos(obj => {
                const filteredToDos = obj.filter(
                  item => !(item.text.trim().toLowerCase() === toDo.toLowerCase() && !item.status && item.deleted)
                );
                return [
                  ...filteredToDos,
                  { id: Date.now(), text: toDo, status: false, deleted: false }
                ];
              });
              setToDo('');
            }
          }}></i>
        </div>
        <div className='todos'>
          {
            toDos.map((obj, index) => {
              if (!obj.deleted) {
                return (
                  <div className='todo'>
                    <div className='left'>
                      <input type='checkbox' name='' id='' value={obj.status} onChange={(e) => {
                        setToDos(toDos.filter(t => {
                          if (t.id === obj.id) {
                            t.status = e.target.checked
                          }
                          return t;
                        }))
                      }} />
                      <p> {obj.text} </p>
                    </div>
                    <div className='right'>
                      <i className='fas fa-times' onClick={(e) => {
                        setToDos(toDos.filter(t => {
                          if (t.id === obj.id) {
                            t.deleted = true;
                          }
                          return t;
                        }))
                      }}></i>
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
      </div>
      <div className='lists'>
        <table border={1}>
          <tr>
            <th> Pending Tasks </th> {/*status = false*/}
            <th> Completed Tasks </th> {/*status = true*/}
            <th> Removed Tasks </th> {/*status = false & deleted*/}
          </tr>
          <tr>
            <td>
              {
                toDos.map((obj) => {
                  if (!obj.status && !obj.deleted) {
                    return (<p> {obj.text} </p>)
                  }
                  return null;
                })
              }
            </td>
            <td>
              {
                toDos.map((obj) => {
                  if (obj.status) {
                    return (<p> {obj.text} </p>)
                  }
                  return null;
                })
              }
            </td>
            <td>
              {
                toDos.map((obj) => {
                  if (!obj.status && obj.deleted) {
                    return (<p> {obj.text} </p>)
                  }
                  return null;
                })
              }
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;

function checkDuplicates(toDo, toDos) {
  return toDos.some(item => (item.text.toLowerCase() === toDo.toLowerCase() && ((!item.status && !item.deleted) || item.status)));
}