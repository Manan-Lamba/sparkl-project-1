package models

import "github.com/beego/beego/v2/client/orm"

type User struct {
	Id    int
	Name  string
	Age   int
	Email string
}

func (u *User) TableName() string {
	return "users"
}

func init() {
	orm.RegisterModel(new(User))
}
