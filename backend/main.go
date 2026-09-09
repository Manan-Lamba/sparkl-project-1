package main

// import beego orm and mysql driven
import (
	_ "backend/routers"

	"github.com/beego/beego/v2/client/orm"
	"github.com/beego/beego/v2/server/web"
	_ "github.com/go-sql-driver/mysql"
)

// register the mysql database and connecting to sparklProject1 database
func init() {
	err := orm.RegisterDriver("mysql", orm.DRMySQL)
	if err != nil {
		panic(err)
	}

	err = orm.RegisterDataBase(
		"default",
		"mysql",
		"mananSparkl:mananmysql@tcp(127.0.0.1:3306)/sparklProject1?charset=utf8mb4",
	)
	if err != nil {
		panic(err)
	}

	web.BConfig.CopyRequestBody = true

}

func main() {
	web.Run()
}
