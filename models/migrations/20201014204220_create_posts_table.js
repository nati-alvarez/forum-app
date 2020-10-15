exports.up = function(knex) {
    return knex.schema.createTable("Post", table=>{
        table.increments().primary();
        table.integer("community_id").references("id").inTable("Community").onDelete("CASCADE").onUpdate("CASCADE");
        table.integer("author_id").references("id").inTable("User").onDelete('CASCADE').onUpdate("CASCADE");
        table.string("title").notNullable();
        table.string("body");
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Post");
};
