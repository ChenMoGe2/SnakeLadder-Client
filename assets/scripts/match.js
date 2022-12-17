// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

let sl = require("sl");
let crc32 = require("NetCrc32");
let common = require("common");
let netControl = require("NetCtrl");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    startClick: function (event, customEventData) {
        let num = parseInt(customEventData);
        let match = sl.slproto.Match.create({num: num});
        let matchEncode = sl.slproto.Match.encode(match).finish();

        let slObject = sl.slproto.SLObject.create({sessionId: common.sessionId, crc32: crc32.CRC32Match, object:matchEncode})
        let slObjectEncode = sl.slproto.SLObject.encode(slObject).finish();

        netControl.send(slObjectEncode);
    }
});
