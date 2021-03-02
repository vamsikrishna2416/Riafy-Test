var config = {};

config.env = "prod"; //dev,prod

config.baseURL = "";

config.database = "";
config.db1 = "";

if (config.env == "dev") {
	// config.databaseURL = "mongodb://localhost/riafyTest";
	config.databaseURL = "mongodb+srv://vamsivk:vamsikrishna2416@cluster0.2rntk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
	config.baseURL = "http://localhost:5000/";
	config.dbName = "riafyTest";
	
} else if (config.env == "prod") {
	config.databaseURL = "mongodb+srv://vamsivk:vamsikrishna2416@cluster0.2rntk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
	
	config.baseURL = "https://riafymachinetest.herokuapp.com/";
	config.dbName = "riafyTest";
	
}