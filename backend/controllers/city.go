package controllers

import (
	"backend/models"

	"github.com/beego/beego/v2/client/orm"
	"github.com/beego/beego/v2/server/web"
	// "backend/models"
)

type CityController struct {
	web.Controller
}

// controller methods

// index route
func (c *CityController) GetCity() {

	var x []models.City

	o := orm.NewOrm()
	_, err := o.QueryTable(new(models.City)).All(&x)
	if err != nil {
		c.Data["json"] = map[string]string{
			"error": err.Error(),
		}
		c.ServeJSON()
		return
	}

	c.Data["json"] = x
	c.ServeJSON()
}
