//console.log('Starting notes.js');

const fs = require('fs');


var fetchNotes = () => {
  try {
    var noteString = fs.readFileSync('notes-data.json');
   return JSON.parse(noteString);
  } catch (err) {//Prevents unexpected shutdown
    return [];
  }
}

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));//Everytime we add a note previous one will be deleted 
  //Therefore use read file first
}

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  }

  

  var duplicateNotes = notes.filter((note) => note.title === title)//Will return only duplicate notes

  if (duplicateNotes.length === 0) {//Will return undefined if it doesn't go to this if block
    notes.push(note);
    saveNotes(notes);
    return note;
  }
 
};
var listNote = () => {
  return fetchNotes();

};

var readNote = (title) => {
  let notes = fetchNotes();
  let reqdNote = notes.filter((note) => note.title === title);
  return reqdNote[0];//Will return undefined if empty
  
};

var removeNote = (title) => {
  var notes = fetchNotes();
  let filteredNotes = notes.filter((note) => note.title !== title );
  saveNotes(filteredNotes);

  return (notes.length !== filteredNotes.length) //returns true if length is different means note is deleted

};

var logNote = (note) => {
 // debugger;
  console.log(`----
  Title : ${note.title}
  Body : ${note.body}`);
  
}

module.exports = {
  addNote: addNote, //Or simply use addNode if names are taken same
  listNote,
  readNote,
  removeNote,
  logNote
}
