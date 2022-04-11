const express = require('express');
const app = express();
const port = 5005;
const cors = require('cors');

const users = { 
   users_list :
   [
      { 
         id : '1345',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : '8123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : '2222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: '5479', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: '1355', 
         name: 'Dennis', 
         job: 'Bartender', 
      }
   ]
}
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', (req, res) => {
    res.send(users);
});


app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

/* implement an additional action to get all users that match a given name and a given job */
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined) {
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});


/*app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});*/
/* Linking Frontend with Backend - step 6.1*/
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    if (userToAdd['id'] === undefined)
        userToAdd['id'] = generateRandomID();
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

/*implement hard delete operation to remove a particular user by id from the list */
app.delete('/users/:id', (req, res)=> {
    const id = req.params.id;
    let result = findUserById(id)
    if (result === undefined || result.length == 0)
        res.status(404).send('resource not found.\n');
    else {
        users['users_list'] = users['users_list'].filter( (user) => user['id'] != id);
        res.status(204).end();
    }
    
    
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});   


function addUser(user){
    users['users_list'].push(user);
}


const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => {
    return users['users_list'].filter ((user) => user['job'] == job);
}

function findUserByNameAndJob(name, job){
    return users['users_list'].find( (user) => user['name'] === name && user['job'] == job);  
} 

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

/* function to generate a random ID and assign it to the new object that comes through the API post route */
function generateRandomID(){
    id = Math.floor(Math.random() * 10000);
    return id;
}



       