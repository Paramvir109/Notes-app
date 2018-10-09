const fs = require('fs');
const _ = require('lodash');//requiring third party modules
const yargs = require('yargs');

const notes = require('./notes.js')

const titleOptions = {
    describe:'Title of a note',
    demand : true,
    alias :'t'// We can just use the flag -t
}
const bodyOptions =  {
    describe : 'Body of a note',
    demand : true,
    alias : 'b'
}

//builder object to give hints about the options that your command accepts
const args = yargs.command('add', 'Adding a note' ,{//.command(cmd, desc, {builder})builder take flags for add command
        title : titleOptions,
        body : bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title:titleOptions
    })
    .command('remove', 'Deleting a note', {
        title:titleOptions
    })
    .help()
    .argv;//argv is an object here diff from normal

var command = process.argv[2]; //Process object
if (command === "read") {
    var note = notes.readNote(args.title);
    if (note) {
        console.log(`Note found`)
        notes.logNote(note);
    } else {
        console.log('Note note found!')
    }
}
else if (command === "remove") {
    if (notes.removeNote(args.title)) {
        console.log(`Note with title ${args.title} removed`);
    } else {
        console.log(`Note couldn't be found`)
    }
}
else if (command === "add") {
    let note = notes.addNote(args.title, args.body);
    if (note !== undefined) {
        console.log(`Node added`)
        notes.logNote(note);
    } else {
        console.log("Duplicate title found!");
    }
}
else if (command === "list") {
    let allNotes = notes.listNote();
    console.log(`Printing ${allNotes.length} note(s)`)
    allNotes.forEach(element => notes.logNote(element));
}
else {
    console.log("Sorry! Wrong command. Use help flag to see valid options")
}