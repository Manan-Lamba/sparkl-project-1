package models

import "github.com/beego/beego/v2/client/orm"

type City struct {
	Id    int
	State_id int
	Name  string
}

func (u *City) TableName() string {
	return "cities"
}

func init() {
	orm.RegisterModel(new(City))
}