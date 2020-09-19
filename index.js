const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { KnexAdapter: Adapter } = require('@keystonejs/adapter-knex');
const { NextApp } = require('@keystonejs/app-next');

const dotenv = require('dotenv');

const config = require('./config');
const initializeData = require('./initial-data');
const models = require('./models');

dotenv.config();

// Inintialize keystone
const adapter = new Adapter(config.adapter());
const keystone = new Keystone(config.keystone(adapter, initializeData));

models.init(keystone);

const authStrategy = keystone.createAuthStrategy(config.authStrategy(PasswordAuthStrategy));

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp(config.adminUi(authStrategy)),
    new NextApp(config.nextApp()),
  ],
};
