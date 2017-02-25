var role= require("../role");
var permission=require("../permission");
permission.belongsToMany(role, {through: 'RolePermission'});
console.log("fdsafdafdasfdsafdsaf");
role.belongsToMany(permission, {through: 'RolePermission'});
