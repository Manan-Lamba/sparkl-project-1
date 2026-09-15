package controllers

import (
	"backend/dto"
	"backend/models"
	"encoding/json"
	"strconv"

	"github.com/beego/beego/v2/client/orm"
	"github.com/beego/beego/v2/server/web"
	// "backend/models"
)

type User_detailsController struct {
	web.Controller
}

// controller methods

// index route
func (c *User_detailsController) GetUserDetails() {

	var users []dto.GetUserDetails

	o := orm.NewOrm()

	sql := `
        SELECT users.id, users.name AS name, users.age, users.email, 
		user_details.designation, user_details.phone, user_details.address,
		cities.name AS city_name

        FROM users
        INNER JOIN user_details
        ON users.id = user_details.user_id 

        INNER JOIN cities
        ON user_details.city_id = cities.id;
    `

    raw := o.Raw(sql)
    _, err := raw.QueryRows(&users)

    if err != nil{
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
func (c* User_detailsController) GetUserDetailsById(){
    // extract id from the params
    userId := c.Ctx.Input.Param(":id")
    id, err := strconv.Atoi(userId)

    if err != nil{
        c.Data["json"] = map[string]string{
            "error": "Invalid user id",
        }
        c.ServeJSON()
        return
    }

    
    var user dto.GetUserDetailById

    o := orm.NewOrm()

    sql := `
        SELECT users.id, users.name AS name, users.age, users.email, 
		user_details.designation, user_details.phone, user_details.address,
		cities.name AS city_name, cities.id AS city_id,
		states.name AS state_name,
		countries.name AS country_name
		
        FROM users
        INNER JOIN user_details
        ON users.id = user_details.user_id 

        INNER JOIN cities
        ON user_details.city_id = cities.id

        INNER JOIN states
        ON states.id = cities.state_id

        INNER JOIN countries
        ON countries.id = states.country_id
        WHERE users.id = ?;
    `
    raw := o.Raw(sql, id)
   
    err = raw.QueryRow(&user)

    if err != nil{
        c.Data["json"] = map[string]string{
			"error": err.Error(),
		}
		c.ServeJSON()
		return
    }

    c.Data["json"] = user
    c.ServeJSON()

}

// create user details for particular user
func (c *User_detailsController) CreateUserDetail(){
    // extract user.id from the params
    userId := c.Ctx.Input.Param(":id")
    id, err := strconv.Atoi(userId)

    if err != nil{
        c.Data["json"] = map[string]string{
            "error": "Invalid user id",
        }
        c.ServeJSON()
        return
    }

    var user dto.CreateUserDetail

    // body now in []byte
    body := c.Ctx.Input.RequestBody

    // convert it into go struct
    err = json.Unmarshal(body, &user)
    if err != nil {
        c.Data["json"] = map[string]string{
            "error": "invalid request body",
        }
        c.ServeJSON()
        return
    }

    // Create UserDetail model
    UserDetail := models.User_Details{
        User_id: id,
        City_id:  user.City_id,
        Designation: user.Designation,
        Phone: user.Phone,
        Address: user.Address,
    }

    o := orm.NewOrm()

    // insert UserDetail in user_details
    _, err = o.Insert(&UserDetail)

    if err != nil {
        c.Data["json"] = map[string]string{
            "error": err.Error(),
        }
        c.ServeJSON()
        return
    }

    c.Data["json"] = UserDetail
    c.ServeJSON()
}

// update user details
func (c *User_detailsController) UpdateUserDetail(){
    
    // extracting id
    userId := c.Ctx.Input.Param(":id")
    id, err := strconv.Atoi(userId)
    if err != nil{
        c.Data["json"] = map[string]string{
            "error": "Invalid id",
        }
        c.ServeJSON()
        return
    }

    // body now in []byte
    body := c.Ctx.Input.RequestBody

    var user dto.UpdateUserDetail

    // convert it into go struct
    err = json.Unmarshal(body, &user)
    if err != nil {
        c.Data["json"] = map[string]string{
            "error": "invalid request body",
        }
        c.ServeJSON()
        return
    }


    UserDetail := models.User_Details{User_id: id}

    o := orm.NewOrm()
    err = o.Read(&UserDetail, "User_id")
    if err != nil{
         c.Data["json"] = map[string]string{
            "error": err.Error(),
        }
        c.ServeJSON()
        return
    }


    if user.Address != nil{
        UserDetail.Address = *user.Address
    }
    if user.Designation != nil{
        UserDetail.Designation = *user.Designation
    }
    if user.Phone != nil{
        UserDetail.Phone = *user.Phone
    }
    if user.City_id != nil{
        UserDetail.City_id = *user.City_id
    }

    // update
   _, err = o.Update(&UserDetail)
   if err != nil{
         c.Data["json"] = map[string]string{
            "error": err.Error(),
        }
        c.ServeJSON()
        return
    }

    c.Data["json"] = UserDetail
    c.ServeJSON()
}

// delete request
func (c *User_detailsController) DeleteUserDetails(){
    // extracting id
    userId := c.Ctx.Input.Param(":id")
    id, err := strconv.Atoi(userId)
    if err != nil{
        c.Data["json"] = map[string]string{
            "error": "Invalid id",
        }
        c.ServeJSON()
        return
    }

    UserDetail := models.User_Details{User_id: id}
      o := orm.NewOrm()

      _, err = o.Delete(&UserDetail, "User_id")

      if err != nil {
        c.Data["json"] = map[string]string{
            "error": "Failed to delete user details",
        }
        c.ServeJSON()
        return
    }

      c.Data["json"] = UserDetail
      c.ServeJSON()
}