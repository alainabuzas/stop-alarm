var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StopSchema = new Schema({
    stop_id: { type: Number },
    stop_name: { type: String },
    stop_lat: { type: Number },
    stop_lon: { type: Number },
});

module.exports = mongoose.model('Stop', StopSchema);
