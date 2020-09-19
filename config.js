const adapter = () => {
  const postgresUri = `${process.env.POSTGRES_URI}`;

  return {
    knexOptions: {
      connection: postgresUri,
    },
  };
}

const keystone = (adapter, initializeData) => {
  const doCreateTables = process.env.CREATE_TABLES === 'true';

  return {
    adapter,
    onConnect: !doCreateTables && initializeData,
  }
};

const authStrategy = PasswordAuthStrategy => {
  const userListName = `${process.env.USER_LIST_NAME}`;

  return {
    type: PasswordAuthStrategy,
    list: userListName,
  };
};

const adminUi = authStrategy => {
  const name = `${process.env.PROJECT_NAME}`;

  return {
    name,
    authStrategy,
    enableDefaultRoute: true,
  };
};

const nuxtApp = () => {
  return {
    srcDir: 'src',
    buildDir: 'build',
  };
};

module.exports = {
  adapter,
  authStrategy,
  adminUi,
  keystone,
  nuxtApp,
};
