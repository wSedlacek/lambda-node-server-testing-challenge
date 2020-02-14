import * as Knex from "knex";

export const seed = async (knex: Knex) => {
  await knex("hobbits")
    .truncate()
    .then(function() {
      return knex("hobbits").insert([
        { name: "sam" },
        { name: "frodo" },
        { name: "pippin" },
        { name: "merry" }
      ]);
    });
};
