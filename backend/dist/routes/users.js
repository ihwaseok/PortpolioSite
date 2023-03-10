"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = express_1.default.Router();
// 커넥션 생성
const connection = mysql_1.default.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'pwa_crud'
});
// DB 연결
connection.connect(function (err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
});
// URL 등록
router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM users', function (err, rows) {
        if (err)
            throw err;
        res.send(rows);
    });
});
router.post('/signUp', function (req, res) {
    const user = {
        'userid': req.body.user.userid,
        'name': req.body.user.name,
        'password': req.body.user.password
    };
    connection.query('SELECT userid FROM users WHERE userid = "' + user.userid + '"', function (err, row) {
        // 동일한 아이디가 없을 경우 등록
        if (row[0] == undefined) {
            const salt = bcryptjs_1.default.genSaltSync();
            const encryptedPassword = bcryptjs_1.default.hashSync(user.password, salt);
            connection.query('INSERT INTO users (userid, name, password) VALUES ("' + user.userid + '","' + user.name + '","' + encryptedPassword + '")', user, function (err, row2) {
                if (err)
                    throw err;
            });
            res.json({
                success: true,
                message: 'Sign Up Success!'
            });
        }
        else {
            res.json({
                success: false,
                message: 'Sign Up Failed Please use another ID'
            });
        }
    });
});
router.post('/login', function (req, res) {
    const user = {
        'userid': req.body.user.userid,
        'password': req.body.user.password
    };
    connection.query('SELECT userid, password FROM users WHERE userid = "' + user.userid + '"', function (err, row) {
        if (err) {
            res.json({
                success: false,
                message: 'Login failed please check your id or password!'
            });
        }
        if (row[0] !== undefined && row[0].userid === user.userid) {
            bcryptjs_1.default.compare(user.password, row[0].password, function (err, res2) {
                if (res2) {
                    res.json({
                        success: true,
                        message: 'Login successful!'
                    });
                }
                else {
                    res.json({
                        message: 'Login failed please check your id or password!'
                    });
                }
            });
        }
    });
});
exports.default = router;
