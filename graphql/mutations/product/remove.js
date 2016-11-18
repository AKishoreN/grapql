import {
    GraphQLNonNull,
    GraphQLID
}
from 'graphql';

import productType from '../../types/product.type';
import getProjection from '../../get-projection';
import productModel from '../../../models/product.model';

export default {
    type: productType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve(root, params, options) {
        const projection = getProjection(options.fieldASTs[0]);
        const removedProduct = await productModel
        .findByIdAndRemove(params.id,{
        	select:projection
        })
        .exec();

        if (!removedProduct) {
        	throw new Error('Error removing product');
        }

        return removedProduct;
    }
};
