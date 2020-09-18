const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');

const dotenv = require('dotenv');

const initialiseData = require('./initial-data');
const models = require('./models');

dotenv.config();

const projectName = process.env.PROJECT_NAME;
const adapterConfig = { knexOptions: { connection: process.env.POSTGRES_URI } };

// Inintialize keystone
const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== 'true' && initialiseData,
});

models.init(keystone);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: projectName,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
