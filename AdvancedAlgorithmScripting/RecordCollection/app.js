
// Setup
var collection = {
  "2548": {
    "album": "Slippery When Wet",
    "artist": "Bon Jovi",
    "tracks": [ 
    "Let It Rock", 
    "You Give Love a Bad Name" 
    ]
  },
  "2468": {
    "album": "1999",
    "artist": "Prince",
    "tracks": [ 
    "1999", 
    "Little Red Corvette" 
    ]
  },
  "1245": {
    "artist": "Robert Palmer",
    "tracks": [ ]
  },
  "5439": {
    "album": "ABBA Gold"
  }
};
// Keep a copy of the collection for tests
var collectionCopy = JSON.parse(JSON.stringify(collection));

// Only change code below this line
function updateRecords(id, prop, value) {
  for (var key in collection) {
    if (key == id) {
      if (value === '' && Object.hasOwnProperty.call(collection[key], prop)) {
        delete collection[key][prop];
        return collection;
      }
      if (prop == 'tracks') {
        if (!Object.hasOwnProperty.call(collection[key], prop)) {
          collection[key][prop] = [];
        }
        collection[key][prop].push(value);
        return collection;
      }
      collection[key][prop] = value;
      return collection;
    }
  }
}
// Alter values below to test your code
console.log(updateRecords(5439, "artist", "ABBA"));

