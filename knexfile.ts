export const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/data/hobbits.db'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/data/migrations'
    },
    seeds: {
      directory: './src/data/seeds'
    }
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './src/data/test.db'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/data/migrations'
    },
    seeds: {
      directory: './src/data/seeds'
    }
  }
};
