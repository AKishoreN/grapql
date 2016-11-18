import {
    GraphQLList
} from 'graphql';

import productType from '../../types/product.type';
import getProjection from '../../get-projection';
import ProductModel from '../../../models/product.model';

export default {
    type: new GraphQLList(productType),
    args: {},
    resolve(root, params, options) {
        const projection = getProjection(options.fieldASTs[0]);

        return ProductModel
            .find()
            .select(projection)
            .exec();
    }
}
