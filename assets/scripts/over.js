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
        victoryText:    cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if(common.user.id === common.victory) {
            this.victoryText.string = "胜利";
        } else {
            this.victoryText.string = "失败";
        }
    },

    start () {

    },

    goStartClick: function (event, customEventData) {
        cc.director.loadScene("Start");
        common.matchResult = null;
        common.curUserId = 0;
        common.curIndex = 0;
        common.curPos1 = 0;
        common.curPos2 = 0;
        common.dollNum = 1;
        common.victory = 0;
    },

    replayClick: function (event, customEventData) {
        let replay = sl.slproto.Replay.create({gameId: common.matchResult.id});
        let replayEncode = sl.slproto.Replay.encode(replay).finish();

        let slObject = sl.slproto.SLObject.create({sessionId: common.sessionId, crc32: crc32.CRC32Replay, object:replayEncode})
        let slObjectEncode = sl.slproto.SLObject.encode(slObject).finish();

        netControl.send(slObjectEncode);

        common.matchResult = null;
        common.curUserId = 0;
        common.curIndex = 0;
        common.curPos1 = 0;
        common.curPos2 = 0;
        common.dollNum = 1;
        common.victory = 0;
    },

    // update (dt) {},
});
