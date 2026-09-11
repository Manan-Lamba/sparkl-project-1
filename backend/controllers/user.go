package controllers

//import beego orm and sparkl-project-1/models
import (
	"backend/models"
	"encoding/json"
	"strconv"

	"github.com/beego/beego/v2/client/orm"
	"github.com/beego/beego/v2/core/validation"
	beego "github.com/beego/beego/v2/server/web"
)

// creating user Controller named UserController
type UserController struct {
	beego.Controller
}

// creating struct for patch request
type UpdateUserRequest struct {
	Name  *string `json:"name"`
	Age   *int    `json:"age"`
	Email *string `json:"email"`
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

	valid := validation.Validation{}

	valid.Required(user.Name, "Name")
	valid.Required(user.Email, "Email")
	valid.Required(user.Age, "Age")

	if valid.HasErrors() {
		c.Data["json"] = valid.Errors
		c.ServeJSON()
		return
	}

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

// update route
func (c *UserController) UpdateUser() {
	// extract id from path param
	idStr := c.Ctx.Input.Param(":id")
	// convert it into int
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.Data["json"] = map[string]string{
			"error": "error occured",
		}
		c.ServeJSON()
		return
	}

	// create user variable
	user := models.User{Id: id}

	//Read data from database
	o := orm.NewOrm()

	err = o.Read(&user)
	if err != nil {
		c.Data["json"] = map[string]string{
			"error": err.Error(),
		}
		c.ServeJSON()
		return
	}

	// update data
	var body UpdateUserRequest
	err = json.Unmarshal(c.Ctx.Input.RequestBody, &body)
	if err != nil {
		c.Data["json"] = map[string]string{
			"error": "invalid json",
		}
		c.ServeJSON()
		return
	}

	valid := validation.Validation{}

	//check fields
	if body.Name != nil {
		valid.Required(*body.Name, "Name")
	}

	if body.Email != nil {
		valid.Required(*body.Email, "Email")
	}

	if body.Age != nil {
		valid.Required(*body.Age, "Age")
	}

	if valid.HasErrors() {
		c.Data["json"] = valid.Errors
		c.ServeJSON()
		return
	}

	// ACTUALLY CHANGE THE USER
	if body.Name != nil {
		user.Name = *body.Name
	}

	if body.Email != nil {
		user.Email = *body.Email
	}

	if body.Age != nil {
		user.Age = *body.Age
	}

	// update query
	_, err = o.Update(&user)
	if err != nil {
		c.Data["json"] = map[string]string{
			"error": err.Error(),
		}
		c.ServeJSON()
		return
	}

	//send updated user in the response
	c.Data["json"] = user
	c.ServeJSON()
}

// delete route
func (c *UserController) DeleteUser() {
	// extracting id
	strid := c.Ctx.Input.Param(":id")
	// convert it to int
	id, err := strconv.Atoi(strid)
	if err != nil {
		c.Data["json"] = map[string]string{
			"error": "Invalid Id",
		}
		c.ServeJSON()
		return
	}

	// creating user variable
	user := models.User{Id: id}

	// delete query
	o := orm.NewOrm()
	_, err = o.Delete(&user)
	if err != nil {
		c.Data["json"] = map[string]string{
			"error": err.Error(),
		}
		c.ServeJSON()
		return
	}

	c.Data["json"] = map[string]string{
		"mssg": "user deleted successfully",
	}
	c.ServeJSON()
}
