const path = require('path');
const fs = require('fs')
const uniqid = require('uniqid');

module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        res.sendFile(path.join(__dirname, '../db/db.json'))
    });
    
    // post new note to database file
    app.post('/api/notes', (req, res) => {
        
        // items that will be in the body of the object
        const { title, text } = req.body;
    
        if(title && text){
            // variable to save the object
            const newNote = {
                title,
                text,
                id: uniqid()
            };
    
            // read the file, add new note object
            const oldNotes = fs.readFileSync(`../db/db.json`);
            const notes = JSON.parse(oldNotes);
            notes.push(newNote)
    
            // convert the data to a string so it can be saved
            const noteString = JSON.stringify(notes, null, 2);
    
            // write the string to the database file
            fs.writeFile(`../db/db.json`, noteString, (err) => 
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

}