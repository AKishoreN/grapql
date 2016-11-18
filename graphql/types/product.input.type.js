import {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLID
} from 'graphql';

export default new GraphQLInputObjectType({
    name: 'ProductInput',
    fields: {
        _id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        sizefit: {
            type: GraphQLString
        },
        images: {
            type: GraphQLString
        }
    }
})
