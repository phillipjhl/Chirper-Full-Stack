//module imports
import { Router } from 'express';
import chirpsStore from '../chirpstore';
import mysql from 'mysql';

let connection = mysql.createConnection(
    {
        host: 'localhost',
        database: 'chirpr',
        user: 'chirprapp',
        password: 'appauthentication'
    }
);

let router = Router();

//get router
//if it has id, respond with one 
//else send all to client
router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if (id) {
        res.json(chirpsStore.GetChirp(id));
    } else {
        res.send(chirpsStore.GetChirps())
    };
});

//post router
//post resource sent from client to database
//req.body is the data object {name: '',text: ''}
router.post('/', (req, res) => {
    connection.connect();
    let chirp = req.body.text;
    console.log(chirp);
    connection.query(`INSERT INTO CHIRPS(userid, text, location) VALUES(1, '${chirp}', 'Birmingham')`, (err, results, fields) => {
        if (err) {
            connection.end();
            return console.log(err);
        }
        connection.end()
    });
    res.sendStatus(200);
});

//put router
//update resource with data sent from client
router.put('/:id', (req, res) => {
    let id = req.params.id;
    chirpsStore.UpdateChirp(id, req.body);
    res.sendStatus(200);
});

//delete router
//delete resource with requested id
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    chirpsStore.DeleteChirp(id);
    res.sendStatus(200);
});

export default router;