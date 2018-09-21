//module imports
import { Router } from 'express';
import chirpsStore from '../chirpstore';
import mysql from 'mysql';

//establish connection to mysqldb
let connection = mysql.createPool(
    {
        connectionLimit: 10,
        host: 'localhost',
        database: 'chirpr',
        user: 'chirprapp',
        password: 'appauthentication'
    }
);

let router = Router();

//get router
//if it has id, respond with said chirp
//else send all to client from database
router.get('/:id?', (req, res) => {
        let id = req.params.id;
        if (id) {
            connection.query(`
                select 
                    c.id,
                    u.name,
                    text
                from chirps c
                join users u on u.id=c.userid
                where c.id=${id};`,
                (err, results, fields) => {
                    if (err) {
                        return console.log(err);
                    }
                    res.json(results);
                });
            // res.json(chirpsStore.GetChirp(id));
        } else {
            connection.query(`
                select 
                    c.id,
                    u.name,
                    text
                from chirps c
                join users u on u.id=c.userid
                ORDER BY c.id DESC;`,
                (err, results, fields) => {
                    if (err) {
                        return console.log(err);
                    }
                    res.send(results);
                });
        };
});

//post router
//post resource sent from client to database
//req.body is the data object {name: '',text: ''}
router.post('/', (req, res) => {
    let chirp = req.body.text;
    connection.query(`INSERT INTO CHIRPS(userid, text, location) VALUES(1, '${chirp}', 'Birmingham')`, (err, results, fields) => {
        if (err) {
            return console.log(err);
        }
    });
    res.sendStatus(200);
});

//put router
//update resource with data sent from client
router.put('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`UPDATE CHIRPS SET TEXT = ${req.body.text} WHERE id=${id}`, (err, results, fields) => {
        if (err) {
            return console.log(err);
        }
    });
    // chirpsStore.UpdateChirp(id, req.body);
    res.sendStatus(200);
});

//delete router
//delete resource with requested id
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    connection.query(`DELETE FROM CHIRPS WHERE id=${id}`, (err, results, fields)=>{
        if (err) {
            return console.log(err);
        }
    });
    res.sendStatus(200);
});

export default router;