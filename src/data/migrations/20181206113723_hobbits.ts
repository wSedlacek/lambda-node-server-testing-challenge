import * as Knex from "knex";

export const up = async (knex: Knex) => {
  await knex.schema.createTable("hobbits", tbl => {
    tbl.increments();
    tbl.string("name", 255).notNullable();
  });
};

export const down = async (knex: Knex) => {
  await knex.schema.dropTableIfExists("hobbits");
};
