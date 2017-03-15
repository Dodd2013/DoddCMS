var navBar=require("../Model/navbar");
module.exports={
	getNavbarByOrder:function(){
		return navBar.findAll({
			order: 'orderby DESC'
		});
	}
}