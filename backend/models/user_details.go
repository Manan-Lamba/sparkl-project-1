package models

import "github.com/beego/beego/v2/client/orm"

type User_Details struct {
    Id int
	User_id int
	City_id  int
	Designation string
	Phone string
	Address string
}

func (m *User_Details) TableName() string {
    return "user_details"
}

func init() {
    orm.RegisterModel(new(User_Details))
}