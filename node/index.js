const express = require('express')
const faker = require('faker');
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

function seed() {
    for (var i = 1; i <= 10; i++) {
        const sql = `INSERT INTO people(name) values('${faker.name.findName().replace('\'', '')}')`;
        connection.query(sql)
    }
}

async function getPeople() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM people;', function (error, results) {
            if (error) reject(error);
            resolve(results);
        });
    });
}

app.get('/', async (req, resp) => {
    let people = await getPeople();
    if (people.length == 0) {
        seed();
        people = await getPeople();
    }
    let html = '<h1>Full Cycle!</h1><hr/>';
    html += '<table width="100%" border="1">';
    html += '<thead><tr><th>ID</th><th>Name</th></tr></thead>'
    html += '<tbody>';
    html += people.map((item) => '<tr><td>'+item.id+'</td><td>'+item.name+'</td></tr>').join('')
    html += '</tbody>'
    html += '</table>';
    
    resp.send(html);    
})

app.listen(port, () => {
    console.log("Listening on port " + port)
})