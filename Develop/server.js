const express = require('express');
const path = require('path');
const fs = require('fs')
const db = require('./db/db.json');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// post new note to database file
app.post('/notes', (req, res) => {
    
    // items that will be in the body of the object
    const { title, text } = req.body;

    if(title && text){
        // variable to save the object
        const newNote = {
            title,
            text
        };

        // read the file, add new note object
        const oldNotes = fs.readFileSync(`./db/db.json`);
        const notes = JSON.parse(oldNotes);
        notes.push(newNote)

        // convert the data to a string so it can be saved
        const noteString = JSON.stringify(notes, null, 2);

        // write the string to the database file
        fs.writeFile(`./db/db.json`, noteString, (err) => 
            err ? console.error(err) : console.log(`New note ${newNote.title} added to file.`)
        );

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting review');
    }
});

app.listen(PORT, () =>
    console.log(`View at http://localhost:${PORT}`)
);