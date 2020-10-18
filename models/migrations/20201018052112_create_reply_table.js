exports.up = function(knex) {
    return knex.schema.createTable("Reply", table=>{
        table.increments();
        table.integer("comment_id").notNullable().references("id").inTable("Comment").onDelete("CASCADE").onUpdate("CASCADE");
        table.integer("user_id").notNullable().references("id").inTable("User").onDelete("CASCADE").onUpdate("CASCADE");
        table.string("body").notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Reply");
};