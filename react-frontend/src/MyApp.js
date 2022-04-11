/*import React, {useState} from 'react'*/
import React, {useState, useEffect} from 'react'
import Table from './Table'
import Form from './Form'
import axios from 'axios'

/*const characters = [
      {
        name: 'Charlie',
        job: 'Janitor',
      },
      {
        name: 'Mac',
        job: 'Bouncer',
      },
      {
        name: 'Dee',
        job: 'Aspring actress',
      },
      {
        name: 'Dennis',
        job: 'Bartender',
      },
];
function MyApp() {
    return (
      <div className="container">
        <Table characterData={characters} />
      </div>
    )
}*/
function MyApp() {
  const [characters, setCharacters] = useState([
  /*{
        name: 'Charlie',
        job: 'Janitor',
      },
      {
        name: 'Mac',
        job: 'Bouncer',
      },
      {
        name: 'Dee',
        job: 'Aspring actress',
      },
      {
        name: 'Dennis',
        job: 'Bartender',
      },*/
  ]);
  useEffect(() => {
   fetchAll().then( result => {
      if (result)
         setCharacters(result);
    });
    }, [] );

  /*function removeOneCharacter (index, id) {
    const updated = characters.filter((character, i) => {
        return i !== index
    });
    setCharacters(updated);
    /*deleteRow(id); } */
function removeOneCharacter (index, id) {
    makeDeleteCall(characters[index]).then( result => {
        if (result && result.status === 204) {
            const updated = characters.filter((character, i) => {
            return i !== index  
        });
        setCharacters(updated);
        }
        
    });
    
    }
    

  /*function updateList(person) { 
   makePostCall(person).then( result => {
   if (result && result.status === 200)
      setCharacters([...characters, person] );
   });
}*/
function updateList(person) { 
   makePostCall(person).then( result => {
   if (result && result.status === 201)
      setCharacters([...characters, result.data] );
   });
}


  async function fetchAll(){
   try {
      const response = await axios.get('http://localhost:5005/users');
      return response.data.users_list;     
   }
   catch (error){
      // We're not handling errors. Just logging into the console.
      console.log(error); 
      return false;         
   }
}
  

async function makePostCall(person){
   try {
      const response = await axios.post('http://localhost:5005/users', person);
      return response;
   }
   catch (error) {
      console.log(error);
      return false;
   }
}


async function makeDeleteCall(person){
    try{
        const response = await axios.delete('http://localhost:5005/users/' + person.id);
        return response;

    }
    catch (error) {
        console.log(error);
        return false;
    }
}

    return (
      <div className="container">
        <Table characterData={characters} removeCharacter={removeOneCharacter} />
        <Form handleSubmit={updateList} />
      </div>
  )

}
export default MyApp;