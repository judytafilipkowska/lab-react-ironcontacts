import './App.css';
import constactsJSON from "./contacts.json";
import { useState } from 'react';

function App() {
  const [contacts, setContacts] = useState(constactsJSON.slice(0, 5));
  const [wonAnOscar, setWonAnOscar] = useState(true);
  const [wonAnEmmy, setWonAnEmmy] = useState(true);
  const [remainingContacts, setRemainingContacts] = useState(constactsJSON.slice(setContacts.length, constactsJSON.length))

  const addContact = () => {
    let contactIndex = Math.floor(Math.random() * remainingContacts.length);
    let randomCeleb = remainingContacts[contactIndex];
    setContacts([...contacts, randomCeleb]);
  }

  const sortByName = () => {
    const sortArr = [...contacts].sort((a, b) => {
      const keyA = a.name
      const keyB = b.name
      if (keyA > keyB) { return 1; }
      if (keyA < keyB) { return -1; }
      else { return 0; }
    });
    setContacts(sortArr);
  }

  const sortByPop = () => {
    const sortArrPop = [...contacts].sort((a, b) => {
      const keyA = a.popularity;
      const keyB = b.popularity;
      return keyB - keyA;
    });
    setContacts(sortArrPop);
  }

  const deleteCeleb = (celebId) => {
    const filterArr = [...contacts].filter((celeb) => {
      return celeb.id !== celebId;
    });
    setContacts(filterArr)
  }



  return (
    <>
      <div className="buttons">
        <button onClick={(addContact)}>
          Add a random contact
        </button>

        <button onClick={(sortByName)}>
          Sort by name
        </button>

        <button onClick={(sortByPop)}>
          Sort by popularity
        </button>
      </div>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Actions</th>
        </tr>

        {wonAnOscar && wonAnEmmy && contacts.map((celebrity) => {
          return (
            <tr>
              <td><img src={celebrity.pictureUrl} alt="celebpic" className="pic" /></td>
              <td>{celebrity.name}</td>
              <td>{celebrity.popularity} </td>
              <td>{celebrity.wonOscar && <p>🏆</p>}
                {!celebrity.wonOscar}
              </td>
              <td>{celebrity.wonEmmy && <p>🏆</p>}
                {!celebrity.wonEmmy}
              </td>
              <td> <button onClick={() => deleteCeleb(celebrity.id)}>Delete</button></td>
            </tr>
          )
        })}
      </table>

    </>
  );
}


export default App;
