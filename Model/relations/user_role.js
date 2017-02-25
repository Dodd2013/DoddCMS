var user=require("../user");
var role=require("../role");
user.belongsToMany(role, {through: 'UserRole'});
role.belongsToMany(user, {through: 'UserRole'});