var MongoClient = require( 'mongodb' ).MongoClient;
const dbURI = "mongodb+srv://hanpiet:ihminenrankaisee@cluster0.zqaw3.mongodb.net/recipes?retryWrites=true&w=majority"
var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( dbURI,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('recipes');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};