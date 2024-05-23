const express = require('express');
const cors = require('cors')
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
dotenv.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;



const Ajv = require("ajv")
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}
const schema =
{
    "type": "object",
    "properties": {
        "title": {
            "type": "string"
        },
        "completed": {
            "type": "integer"
        }
    },
    "required": [
        "title",
        "completed"
    ]
}
const validate = ajv.compile(schema)
const data = {
    title: "hugo",
    completed: 0
}
const valid = validate(data)
if (!valid) console.log(validate.errors)


const app = express();

app.use(cors());

// Variante 2
//Zugriff auf Body des Request wir wollen nur JSON am Anfang des Dokuments!!
app.use((req, res, next) => {
    express.json()(req, res, err => {
        if (err) {
            return res.status(400).send({
                message: "Could not parse JSON"
            });
        }
        next();
    })
});



// Abfrage mit Plat
app.use(express.urlencoded({ extended: true }))

// Create an async pool object with promisified methods
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})
async function query(sql, params) {
    try {
        const [rows, fields] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        throw error;
    }
}
// Function to check the connection
async function checkConnection() {
    try {
        // Execute a simple query to check the connection
        await pool.query('SELECT 1');
        console.log('Connected to the MySQL server.');
    } catch (err) {
        console.error('Error connecting to MySQL server:', err);
    } finally {
        // Close the connection pool
    }
}
// Call the function to check the connection
checkConnection();

app.get('/todos', authenticateToken, async function (req, res) {
    try {
        const sql = "SELECT * FROM todos";
        var todos = await query(sql);
        console.log(todos);
        if (todos.length == 0) {
            res.status(404).json({
                status: 404,
                message: "keine Todos gefunden"
            });
            return;
        }
        //console.log(todos);
        var row = todos.length;
        res.status(200).json({
            status: 200,
            todos,
            row
        });
        return;
    } catch (err) {
        res.status(500).send({
            status: 500,
            message: err
        });
    }
    return;
});


app.get('/', (req, res) => {
    res.send("hallo ihr schueler");
});

///Zugriffe auf Pfade mit :
// Apfrage mit Parameter  /hello?name=xxx
app.get('/hello', (req, res) => {
    res.send("hallo mein query ist:" + req.query.name);
});
// Abfrage mit Platzhalter in /hello/markus
app.get('/hello/:name', (req, res) => {
    console.log(req.params.name);
    res.send("hallo mein Name ist auch " + req.params.name);
});

// Abfrage mit Platzhalter in /hello/markus
app.post('/hello/body', function (req, res) {
    console.log(req.body);
    res.send(req.body);
});

// LOGIN
app.get('/user/login', async function (req, res) {
    //data = req.body;
    let sql = "select username, password from user where username = ? and password = ?";
    const values = [req.body.username, req.body.password];
    try {
        const results = await query(sql, values);
        if (results.length === 0) {
            return res.status(409).json({ status: 409, message: "username oder password falsch" });
        }
        const token = generateAccessToken({ username: req.body.username });
        return res.status(201).json({
            token: token,
            status: 201,
            message: "erfolgreich eingeloggt und token erstellt"
        })
    } catch (err) {
        console.error("Database error:", err);
        return res.status(500).json({ status: 500, message: "Datenbankfehler: " + err.message });
    }
})


// Token für User erstellen
function generateAccessToken(username) {
    return jwt.sign(username, TOKEN_SECRET, { expiresIn: '1800s' });
}

//Token Überprüfung
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ message: "kein token gefunden", status: 401 })
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "falscher token", status: 403 })
        req.user = user
        next()
    })
}

//!

// POST zum Erstellen eines neuen Todos
app.post('/todos', authenticateToken, async function (req, res) {
    try {
        // Überprüfen, ob die Anforderung den erforderlichen JSON-Daten entspricht
        if (!validate(req.body)) {
            return res.status(400).json({
                status: 400,
                message: "Ungültige Daten",
                errors: validate.errors
            });
        }

        // Extrahiere die Todo-Daten aus dem Anforderungskörper
        const { title, completed } = req.body;

        // SQL-Abfrage zum Einfügen eines neuen Todos
        const sql = "INSERT INTO todos (title, completed) VALUES (?, ?)";
        const values = [title, completed];

        // Führe die SQL-Abfrage aus
        const result = await query(sql, values);

        // Extrahiere die ID des eingefügten Todos
        const insertedId = result.insertId;

        // Sende eine Erfolgsantwort mit den erstellten Todo-Daten und der ID
        res.status(201).json({
            status: 201,
            message: "Todo erfolgreich erstellt",
            todo: {
                id: insertedId,
                title: title,
                completed: completed
            }
        });
    } catch (err) {
        // Behandlung von Fehlern
        console.error("Database error:", err);
        res.status(500).json({
            status: 500,
            message: "Datenbankfehler: " + err.message
        });
    }
});




// DELETE, um ein vorhandenes Todo zu löschen
app.delete('/todos/:id', authenticateToken, async function (req, res) {
    try {
        // Extrahiere die Todo-ID aus den Anforderungsparametern
        const todoId = req.params.id;

        // Überprüfen, ob die ID eine gültige Zahl ist
        if (isNaN(todoId)) {
            return res.status(400).json({
                status: 400,
                message: "Ungültige ID: Es sind nur numerische IDs erlaubt"
            });
        }

        // SQL-Abfrage zum Löschen eines Todos basierend auf der ID
        const sql = "DELETE FROM todos WHERE id = ?";
        const values = [todoId];

        // Führe die SQL-Abfrage aus
        const result = await query(sql, values);

        // Überprüfe, ob ein Todo gelöscht wurde
        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                message: "Todo nicht gefunden"
            });
        }

        // Sende eine Erfolgsantwort
        res.status(200).json({
            status: 200,
            message: "Todo erfolgreich gelöscht"
        });
    } catch (err) {
        // Behandlung von Fehlern
        console.error("Database error:", err);
        res.status(500).json({
            status: 500,
            message: "Datenbankfehler: " + err.message
        });
    }
});


//put

// PUT, um ein vorhandenes Todo zu aktualisieren
app.put('/todos/:id', authenticateToken, async function (req, res) {
    try {
        // Extrahiere die Todo-ID aus den Anforderungsparametern
        const todoId = req.params.id;

        // Überprüfen, ob die Anforderung den erforderlichen JSON-Daten entspricht
        if (!validate(req.body)) {
            return res.status(400).json({
                status: 400,
                message: "Ungültige Daten",
                errors: validate.errors
            });
        }

        // Extrahiere die Todo-Daten aus dem Anforderungskörper
        const { title, completed } = req.body;

        // SQL-Abfrage zum Aktualisieren eines Todos basierend auf der ID
        const sql = "UPDATE todos SET title = ?, completed = ? WHERE id = ?";
        const values = [title, completed, todoId];

        // Führe die SQL-Abfrage aus
        const result = await query(sql, values);

        // Überprüfe, ob ein Todo aktualisiert wurde
        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: 404,
                message: "Todo nicht gefunden"
            });
        }

        // Sende eine Erfolgsantwort
        res.status(200).json({
            status: 200,
            message: "Todo erfolgreich aktualisiert"
        });
    } catch (err) {
        // Behandlung von Fehlern
        console.error("Database error:", err);
        res.status(500).json({
            status: 500,
            message: "Datenbankfehler: " + err.message
        });
    }
});


app.listen(4000, () => console.log("Example REST gestartet"));