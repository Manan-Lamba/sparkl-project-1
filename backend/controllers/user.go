package controllers

//import beego orm and sparkl-project-1/models
import (
	"backend/models"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/beego/beego/v2/client/orm"
	beego "github.com/beego/beego/v2/server/web"
)

// creating user Controller named UserController
type UserController struct {
	beego.Controller
}

// controller methods

// index route
func (c *UserController) GetUsers() {
	o := orm.NewOrm()
	users := []models.User{}

	_, err := o.QueryTable(new(models.User)).All(&users)

	if err != nil {
		c.Data["json"] = map[string]string{
			"error": err.Error(),
		}
		c.ServeJSON()
		return
	}

	c.Data["json"] = users
	c.ServeJSON()
}

// show route
func (c *UserController) ShowUser() {
	o := orm.NewOrm()

	// extract id from url params
	id, _ := strconv.Atoi(c.Ctx.Input.Param(":id"))

	//find the particular user from database
	user := models.User{Id: id}

	err := o.Read(&user)
	if err != nil {
		c.Data["json"] = map[string]string{
			"error": "user not found",
		}
		c.ServeJSON()
		return
	}

	c.Data["json"] = user
	c.ServeJSON()
}

// create route
func (c *UserController) CreateUser() {
	// extract req.body
	// note body is in raw json bytes -> convert into go struct
	body := c.Ctx.Input.RequestBody

	// insert req.body into user
	var user models.User

	// convert body to go struct
	json.Unmarshal(body, &user)

	fmt.Printf("%+v\n", user)
	// insert user in the database
	o := orm.NewOrm()
	_, err := o.Insert(&user)

	if err != nil {
		c.Data["json"] = map[string]string{
			"error": err.Error(),
		}
		c.ServeJSON()
		return
	}

	// return the inserted data as response
	c.Data["json"] = user
	c.ServeJSON()
}
