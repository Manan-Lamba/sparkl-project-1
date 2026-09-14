package routers

import (
	"backend/controllers"

	beego "github.com/beego/beego/v2/server/web"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/users", &controllers.UserController{}, "get:GetUsers;post:CreateUser")
	beego.Router("/users/:id", &controllers.UserController{}, "get:ShowUser;patch:UpdateUser;delete:DeleteUser")
	beego.Router("/users/details", &controllers.User_detailsController{}, "get:GetUserDetails")
	beego.Router("/users/:id/details", &controllers.User_detailsController{}, "get:GetUserDetailsById;post:CreateUserDetail;patch:UpdateUserDetail;delete:DeleteUserDetails")
}
