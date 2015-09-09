var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema Definition
var countrySchema = new Schema({
	countryName : String
});

// Model
mongoose.model('Country', countrySchema);