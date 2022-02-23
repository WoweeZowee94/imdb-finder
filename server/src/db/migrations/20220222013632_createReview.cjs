/**
 * @typedef {import("knex")} Knex
 */



/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("reviews", (table) => {
    table.bigIncrements("id").notNullable().index()
    table.bigInteger("userId").notNullable().index().unsigned()
    table.string("movieTitle").notNullable()
    table.string("movieId").notNullable().index().unsigned()
    table.integer("rating").notNullable()
    table.string("title").notNullable()
    table.text("body").notNullable()
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("reviews")
}
