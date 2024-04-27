import { ApolloServer } from '@apollo/server';

import { startStandaloneServer } from '@apollo/server/standalone';

import { typeDefs } from './schema.js';
//import { resolvers } from './resolvers.js';
import { spaceXAPI } from './datasources/spacex-api.js';

const resolvers = {
    Query: {

        launches: async (_, { limit, offset, keyword, sort }, { dataSources }) => {
            const data = await dataSources.spaceXAPI.searchLaunchesByKeyword(limit, offset, keyword);
            //console.log(data);
            
            return data;
        },

        launch: async (_, { id }, { dataSources }) => {
            return dataSources.spaceXAPI.getLaunch(id);
        },

        payloads: async (_, __, { dataSources }) => {
            return dataSources.spaceXAPI.getPayloads();
        },

        payload: async (_, { id }, { dataSources }) => {
            return dataSources.spaceXAPI.getPayload(id);
        },

        launchpads: async (_, __, { dataSources }) => {
            return dataSources.spaceXAPI.getLaunchpads();
        },

        launchpad: async (_, { id }, { dataSources }) => {
            return dataSources.spaceXAPI.getLaunchpad(id);
        }

    },
    Launch: {
        //get multiple payloads by a list of uuids in the payloads field of launch
        payload: async (parent, __, { dataSources }) => {
            const uuids = parent.payloads;
            const payloadPromises = uuids.map(uuid => dataSources.spaceXAPI.getPayload(uuid));
            return Promise.all(payloadPromises);
        },
        launchpad: async (parent, __, { dataSources }) => {
            const uuid = parent.launchpad;
            return dataSources.spaceXAPI.getLaunchpad(uuid);
        },
        links: async (parent) => {
            return parent.links;
        },
        rocket: async (parent, __, { dataSources }) => {
            const uuid = parent.rocket;
            return dataSources.spaceXAPI.getRocket(uuid);
        }
    },
    Links:
    {
        patch: async (parent) => {
            return parent.patch;
        },
        reddit: async (parent) => {
            return parent.reddit;
        },
        article: async (parent) => {
            return parent.article;
        },
        wikipedia: async (parent) => {
            return parent.wikipedia;
        },
        flickr: async (parent) => {
            return parent.flickr[0];
        },
        webcast: async (parent) => {
            return parent.webcast;
        },
    },
    Flickr:
    {
        small: async (parent) => {
            return parent.small;
        },
        original: async (parent) => {
            return parent.original;
        }
    },
    Patch:
    {
        small: async (parent) => {
            return parent.small;
        },
        large: async (parent) => {
            return parent.large;
        }
    }
    

};

const server = new ApolloServer({ typeDefs, resolvers, status400ForVariableCoercionErrors: true });

const { url } = await startStandaloneServer(server, {
    context: async () => {
        const { cache } = server;
        return {
            dataSources: {
                spaceXAPI: new spaceXAPI({ cache }),
            },
        };
    },
});

console.log(`Server ready at ${url}`);

