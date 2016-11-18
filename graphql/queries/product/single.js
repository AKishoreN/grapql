import {
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} from 'graphql';

import { Types } from 'mongoose';

import productType from '../../types/product.type';
import getProjection from '../../get-projection';
import ProductModel from '../../../models/product.model';

export default {
    type: productType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params, options) {
        const projection = getProjection(options.fieldASTs[0]);
        return ProductModel.findById(params.id)
            .select(projection)
            .exec();
    }
}
