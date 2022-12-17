// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
let sl = require("sl");
let netControl = require("NetCtrl");
let crc32 = require("NetCrc32");
let common = require("common");

cc.Class({
    extends: cc.Component,

    properties: {
        dollText:       cc.Label,
        curPlayChass:   cc.Sprite,   
        chass1:         cc.Sprite,
        chass2:         cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('touchend', this.dollClick, this);
    },

    start () {

    },

    dollClick: function (event, customEventData) {
        if(common.curUserId != common.user.id) {
            return
        }
        let doll = sl.slproto.Doll.create({});
        let dollEncode = sl.slproto.Doll.encode(doll).finish();

        let slObject = sl.slproto.SLObject.create({sessionId: common.sessionId, crc32: crc32.CRC32Doll, object:dollEncode})
        let slObjectEncode = sl.slproto.SLObject.encode(slObject).finish();

        netControl.send(slObjectEncode);
    },

    update (dt) {
        this.dollText.string = '' + common.dollNum;
        this.chass1Pos();
        this.chass2Pos();
        if(common.victory !== 0) {
            cc.director.loadScene("Over");
        }
    },

    chass1Pos() {
        if(common.curPos1 === 0) {
            return;
        }
        var y = Math.floor(common.curPos1 / 10) + 1;
        var x = common.curPos1 % 10;
        if(x === 0) {
            x = 10;
            y = y - 1;
        }
        if(y % 2 === 1) {
            this.chass1.node.x = x * 40 - 15;  
        } else {
            this.chass1.node.x = (11 - x) * 40 - 15;
        }
        this.chass1.node.y = (y - 1) * 40 + 10;
    },

    chass2Pos() {
        if(common.curPos2 === 0) {
            return;
        }
        var y = Math.floor(common.curPos2 / 10) + 1;
        var x = common.curPos2 % 10;
        if(x === 0) {
            x = 10;
            y = y - 1;
        }
        if(y % 2 === 1) {
            this.chass2.node.x = x * 40 - 15;  
        } else {
            this.chass2.node.x = (11 - x) * 40 - 15;
        }
        this.chass2.node.y = (y - 1) * 40 + 10;
    }
});
