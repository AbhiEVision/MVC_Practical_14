create database Practical_14
GO;

use Practical_14
GO;

create table employee
(
	Id int primary key identity,
	Name varchar(50) NOT NULL,
	DOB date not null,
	Age int 
)
GO;
