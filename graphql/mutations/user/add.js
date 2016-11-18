import {
    GraphQLNonNull,
    GraphQLBoolean
}

from 'graphql';

import userInputType from '../../types/user.input.type';
import UserModel from '../../../models/user.model';

export default {
    type: GraphQLBoolean,
    args: {
        data: {
            name: 'data',
            type: new GraphQLNonNull(userInputType)
        }
    },
    async resolve(root, params, options) {
        const data = params.data;
       	UserModel.findOne({'email':data.email},function(err,user){
       		if (!user) {
       			const userData = new UserModel({
       				email:data.email,
       				password:data.password,
       				gender:data.gender
       			});

       			const newUser = userData.save();
       			// if (!newUser) {
       			// 	throw new Error('Error adding new product');
       			// }
       		}

       	})
       	return true;
    }

}

