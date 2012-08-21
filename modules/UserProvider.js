/**
 * Created with JetBrains WebStorm.
 * User: jiangli
 * Date: 12-8-9
 * Time: 下午5:02
 * To change this template use File | Settings | File Templates.
 */
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

UserProvider = function (host, port) {
    this.db = new Db('test', new Server(host, port, {auto_reconnect:true}, {}));
    this.db.open(function () {
    });
};

UserProvider.prototype.getCollection = function (callback) {
    this.db.collection('emperor', function (error, collection) {
        if (error) callback(error);
        else callback(null, collection);
    });
};

//添加
UserProvider.prototype.save = function (item,res, callback) {
    this.getCollection(function (error, collection) {
        if (error) callback(error)
        else {
            var userinfo = item.body;
            userinfo._id = new ObjectID();
            collection.insert(userinfo, {safe:true}, function (err,docs) {
                if(err){
                    console.log("++++err++++++"+err);
                }else{
                    res.send({isSuccess:true, _id:docs[0]._id});
                }
            });
        }
    });
};

//查找
UserProvider.prototype.find = function (item, callback) {
    this.getCollection(function (error, collection) {
        if (error) callback(error)
        else {
            collection.find({}).toArray(function (err,docs) {
                if(err){
                    console.log("++++err++++++"+err);
                }else{
                    callback(docs);
                }


            });
        }
    });
};

exports.UserProvider = UserProvider;