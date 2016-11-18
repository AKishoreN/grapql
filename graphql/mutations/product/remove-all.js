import {
	GraphQLBoolean
}from 'graphql'

import productModel from '../../../models/product.model';

export default {
	type:GraphQLBoolean,
	resolve(root,params,options){
		return productModel
		.remove({})
		.exec();
	}
}