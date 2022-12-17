// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

let sl = require("sl");
let netControl = require("NetCtrl");
let crc32 = require("NetCrc32");

cc.Class({
    extends: cc.Component,

    properties: {
        username: cc.EditBox
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        netControl.connect()
    },

    start () {

    },

    loginClick: function (event, customEventData) {
        let signIn = sl.slproto.SignIn.create({username: this.username.string});
        let signInEncode = sl.slproto.SignIn.encode(signIn).finish();

        let slObject = sl.slproto.SLObject.create({sessionId: 0, crc32: crc32.CRC32SignIn, object:signInEncode})
        let slObjectEncode = sl.slproto.SLObject.encode(slObject).finish();

        netControl.send(slObjectEncode);
    }

    // update (dt) {},
});
