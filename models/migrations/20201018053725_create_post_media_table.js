exports.up = function(knex) {
    return knex.schema.createTable("Post_Media", table=>{
        table.increments();
        table.integer("post_id").notNullable().references("id").inTable("Post").onDelete("CASCADE").onUpdate("CASCADE");
        table.string("url").notNullable();
        table.integer("position").defaultTo(0);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Post_Media");
};
