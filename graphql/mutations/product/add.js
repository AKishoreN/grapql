import {
    GraphQLNonNull,
    GraphQLBoolean
}

from 'graphql';

import productInputType from '../../types/product.input.type';
import ProductModel from '../../../models/product.model';

export default {
	type:GraphQLBoolean,
	args:{
		data:{
			name:'data',
			type:new GraphQLNonNull(productInputType)
		}
	},
	async resolve(root,params,options){
		const productModel = new ProductModel({
			'name':params.data.name,
			'description':params.data.description
		});
		const newProduct = await productModel.save();

		if (!newProduct) {
			throw new Error('Error adding new product');
		}
		return true;
	}

}
