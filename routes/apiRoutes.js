// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const { v4: uuidv4 } = require("uuid");
var fs = require("fs");

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var notesdata = require("../db/db.json");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function (req, res) {
    res.json(notesdata);
  });

  // API POST Requests
  // ---------------------------------------------------------------------------

  //giving my note a specific ID lookinto for Post and Delete
  app.post("/api/notes", function (req, res) {
    let id = { id: uuidv4() };
    // req.body hosts is equal to the JSON post sent from the user
    var newNote = Object.assign(req.body, id);

    console.log(newNote);

    notesdata.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(notesdata, null, 1), (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });

    res.json(newNote);
  });

  // API Delete Requests
  // ---------------------------------------------------------------------------

  app.delete("/api/notes/:id", function (req, res) {
  //grab ID by params
 var deletechosen = req.params.id
  //use a for loop to "filter" through array and splice out note
  for (var i = 0; i < notesdata.length; i++) {
    if (deletechosen === notesdata[i].id) {
      notesdata.splice(i,1)
    }
  }

//write file
  fs.writeFile("./db/db.json", JSON.stringify(notesdata, null, 1), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  //return json
  return res.json(notesdata)

})
}