module.exports = {
	"sessionConfig": {
		"cookie": {
			"maxAge": 1800000
		},
		"sessionStore": {
			"host": "127.0.0.1",
			"port": "6379",
			"pass": "",
			"db": 1,
			"ttl": 1800,
			"logErrors": true
		}
	},
	"mysqlConfig": {
		"dbhost": "localhost",
		"dbname": "test",
		"dbuser": "root",
		"dbpwd": "",
		"pool": {
			"max": 5,
			"min": 0,
			"idle": 10000
		}
	},
	"secretKey":"DoddCMS"
}