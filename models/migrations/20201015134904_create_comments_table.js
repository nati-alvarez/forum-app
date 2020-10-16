exports.up = function(knex) {
    return knex.schema.createTable("Comment", table=>{
        table.increments();
        table.integer("post_id").notNullable().references("id").inTable("Post").onDelete("CASCADE").onUpdate("CASCADE");
        table.integer("user_id").notNullable().references("id").inTable("User").onDelete("CASCADE").onUpdate("CASCADE");
        table.string("body").notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("Comment");
};
