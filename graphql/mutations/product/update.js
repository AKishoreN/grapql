import {
    GraphQLNonNull,
    GraphQLID,
    GraphQLBoolean
}
from 'graphql';

import productType from '../../types/product.type';
import getProjection from '../../get-projection';
import ProductModel from '../../../models/product.model';
import productInputType from '../../types/product.input.type';

export default {
    type: GraphQLBoolean,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: 'data',
            type: new GraphQLNonNull(productInputType)
        }
    },
    async resolve(root, params, options) {
        var updateModel = {
            'name': params.data.name,
            'description': params.data.description
        }
        const updateProduct = await ProductModel
            .findByIdAndUpdate(params.id, updateModel)
            .exec(function(err, product) {
                if (!product) {
                    throw new Error('Product not found with id: ' + params.id);
                }
            });
        if (!updateProduct) {
            throw new Error('Error removing blog post');
        }
        return true;
    }
};
