exports.up = function(knex) {
    return knex.schema.createTable("User", table=>{
        table.increments().primary();
        table.string("username", 45).notNullable().unique();
        table.string("password").notNullable();
        table.boolean("public").defaultTo(true);
        table.string("bio");
        table.string('pfp');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("User");
};
