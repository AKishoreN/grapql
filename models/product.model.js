import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Product name',
		trim: true
	},
	description: {
		type:String,
		trim:true
	},
	sizeFit: {
		type: String,
		trim: true
	},
	images: {}
});

export default mongoose.model('Product',ProductSchema);

