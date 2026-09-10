package routers

import (
	"backend/controllers"

	beego "github.com/beego/beego/v2/server/web"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/users", &controllers.UserController{}, "get:GetUsers;post:CreateUser")
	beego.Router("/users/:id", &controllers.UserController{}, "get:ShowUser;patch:UpdateUser;delete:DeleteUser")
}
