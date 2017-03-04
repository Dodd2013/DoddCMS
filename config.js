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
	"secretKey":"DoddCMS",//密码加密选项
	"cros":"*"//跨域相关重要安全性配置，请改成前端所在域名
}