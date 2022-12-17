let sl = require("sl");
let crc32 = require("NetCrc32");
let common = require("common");

var NetCtrl = {
    _sock: {},  //当前的webSocket的对象

    connect: function () {
        if (this._sock.readyState !== 1) {
            //当前接口没有打开
            //重新连接
            this._sock = new WebSocket("ws://127.0.0.1:3000/sl");
            this._sock.onopen = this._onOpen.bind(this);
            this._sock.onclose = this._onClose.bind(this);
            this._sock.onmessage = this._onMessage.bind(this);
        }
        return this;
    },

    _onOpen: function() {
        cc.log("onOpen");
    },                                                                                                                                                          

    _onClose: function(err) {
        cc.log("onClose");
    },

    _onMessage: function(msg) {
        msg.data.arrayBuffer()
        .then(buf => new Uint8Array(buf))
        .then(bytes => {
            let slObject = sl.slproto.SLObject.decode(bytes)
            switch(slObject.crc32) {
                case crc32.CRC32MatchResult:
                    let matchResult = sl.slproto.MatchResult.decode(slObject.object);
                    common.matchResult = matchResult
                    common.curUserId = matchResult.curUserId
                    cc.director.loadScene("Game");
                    break;
                case crc32.CRC32DollResult:
                    let dollResult = sl.slproto.DollResult.decode(slObject.object);
                    let mR = common.matchResult;
                    let users = mR.users;
                    let curIndex = 0;
                    for (var i = 0; i < users.length; i++) {
                        let user = users[i];
                        let userId = user.id
                        if(userId == dollResult.curPlayer) {
                            curIndex = i;
                        }
                    }
                    if(curIndex === 0) {
                        common.curPos1 = dollResult.curPos;
                    } else {
                        common.curPos2 = dollResult.curPos; 
                    }
                    common.curUserId = dollResult.nextPlayer
                    if(common.user.id === dollResult.curPlayer) {
                        common.dollNum = dollResult.num;
                    }
                    if(dollResult.curPos === 100) {
                        common.victory = dollResult.curPlayer;
                    }
                    break;
                case crc32.CRC32ReplayResult:
                    let replayResult = sl.slproto.ReplayResult.decode(slObject.object);
                    common.replayGameId = replayResult.gameId;
                    common.replayProcess = replayResult.process;
                    cc.director.loadScene("Replay");
                    break;
            }
            switch(slObject.reqCrc32) {
                case crc32.CRC32SignIn:
                    let user = sl.slproto.User.decode(slObject.object);
                    common.sessionId = slObject.sessionId;
                    common.user = user;
                    cc.director.loadScene("Start");
                    break;
                case crc32.CRC32Match:
                    cc.director.loadScene("Match");
                    break;
            }
        })
        .catch(error => {
            cc.log("onmessage error", error)
        });
    },

    send:function(msg) {
        this._sock.send(msg);
    },

};

module.exports=NetCtrl;
