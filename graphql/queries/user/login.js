import {
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString
} from 'graphql';

import jwtSecret from '../../../config/constant';

import { Types } from 'mongoose';

import userType from '../../types/user.type';
import getProjection from '../../get-projection';
import UserModel from '../../../models/user.model';
import userInputType from '../../types/user.input.type';

export default {
    type: userType,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(userInputType)
        }
    },
    resolve(root, params, options) {
        const projection = getProjection(options.fieldASTs[0]);

        const user = UserModel.findOne({"email":params.data.email})
        .select('email')
        .exec();
        return user;
    }
}
