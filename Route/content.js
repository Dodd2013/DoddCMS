var express = require('express');
var router = express.Router();
var contentCtrl = require("../Ctrl/contentCtrl");
var permissionCtrl = require("../Ctrl/permissionCtrl");
/* GET home page. */
router.get('/', function (req, res) {
    return contentCtrl.getContentListByParams(req.query).then(function (data) {
        res.jsonp({
            total: data.count,
            rows: data.rows
        });
    })
});
router.get('/delete', function (req, res) {
    return contentCtrl.deleteContent(req.query.contentId).then(function (data) {
        if (data == 1) res.jsonp({status: 'ok'});
    }, function (data) {
        res.sendStatus(500);
    });
});
router.post('/add', function (req, res) {
    contentCtrl.addContent(req.body, req.session.userName).then(function (data) {
        res.jsonp(data);
    }, function (data) {
        res.sendStatus(500);
    });
});
router.post('/update', function (req, res) {
    console.log(JSON.stringify(req.body));
    contentCtrl.updateContentById(req.body).then(function (data) {
        res.jsonp(data);
    }, function (data) {
        res.sendStatus(500);
    });
});
router.get('/pass', function (req, res) {
    let state = (req.query.op == 'pass' ? 1 : (req.query.op == 'notpass' ? -1 : 0));
    console.log(req.query.op + ":" + state);
    contentCtrl.setPass(req.query.contentId, state).then(function (data) {
        res.jsonp(data);
    }, function (data) {
        res.sendStatus(500);
    });
});
router.get('/getById', function (req, res) {

    let userName = req.session.userName;
    let contentId = req.query.contentId;
    if (userName) {
        permissionCtrl.hasPremissionForUser(userName, 4026).then(function (data) {
            if (data.length != 0) {
                contentCtrl.getContentById(contentId).then(function (data) {
                    data.increment('viewCount');
                    res.jsonp(data);
                }, function (data) {
                    res.sendStatus(500);
                });
            } else {
                contentCtrl.getPublicContentById(contentId).then(function (data) {
                    data.increment('viewCount');
                    res.jsonp(data);
                });
            }
        });
    } else {
        contentCtrl.getPublicContentById(contentId).then(function (data) {
            data.increment('viewCount');
            res.jsonp(data);
        });
    }
});
module.exports = router;