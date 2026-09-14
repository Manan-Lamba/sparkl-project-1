package dto

// dto for GetUserDetails -> outgoing response
type GetUserDetails struct{
	Id int
	Name string
	Age int
	Email string
	Designation string
	Phone string
	Address string
	City_name string
}

// dto for GetUserDetailById -> outgoing response
type GetUserDetailById struct{
	Id int
	Name string
	Email string
	Age int
	Designation string
	Phone string
	Address string
	City_name string
	State_name string
	Country_name string
}

// dto for CreateUserDetail -> incoming request
type CreateUserDetail struct{
	Designation string
	Phone string
	Address string
	City_id int
}

// dto for UpdateUserDetail -> incoming request
type UpdateUserDetail struct{
	Designation *string
	Phone *string
	Address *string
	City_id *int
}