// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
let common = require("common");
cc.Class({
    extends: cc.Component,

    properties: {
        numberNode: cc.Node,
        chass1:     cc.Sprite,
        chass2:     cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for (var x = 1; x <= 10; x++) {
            for (var y = 1; y <= 10; y++) {
                labelCount = (y - 1) * 10 + x;
                if (y % 2 === 0) {
                    labelCount = (y - 1) * 10 + (11 - x);
                }
                let labelScore = new cc.Node();
                labelScore.color = new cc.Color(255, 255, 255);
                labelScore.addComponent(cc.Label);
                labelScore.getComponent(cc.Label).fontSize = 24;
                labelScore.getComponent(cc.Label).string = '' + labelCount;
                labelScore.name = '' + (x * y);
                labelScore.parent = this.numberNode;
                labelScore.setPosition(x * 40 - 20, y * 40 - 30);
            }
        }
        let currentIndex = 0;
        let curChass = 0;
        let chassPos1 = 0;
        let chassPos2 = 0;
        this.schedule(function() {
            let processes = JSON.parse(common.replayProcess);
            if(currentIndex >= processes.length) {
                cc.director.loadScene("Start");
                common.replayGameId = 0;
                common.replayProcess = "[]";
                return;
            }
            let process = processes[currentIndex];
            if(curChass == 0) {
                chassPos1 = chassPos1 + process.num;
                if(chassPos1 > 100) {
                    chassPos1 = 200 - chassPos1
                }
                this.chass1Pos(chassPos1);
                curChass = 1;
            } else {
                chassPos2 = chassPos2 + process.num;
                if(chassPos2 > 100) {
                    chassPos2 = 200 - chassPos2
                }
                this.chass2Pos(chassPos2);
                curChass = 0;
            }
            currentIndex = currentIndex + 1;
        }, 1);
    },

    chass1Pos(chassPos) {
        if(chassPos === 0) {
            return;
        }
        var y = Math.floor(chassPos / 10) + 1;
        var x = chassPos % 10;
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

    chass2Pos(chassPos) {
        if(chassPos === 0) {
            return;
        }
        var y = Math.floor(chassPos / 10) + 1;
        var x = chassPos % 10;
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
    },

    start () {

    },

    // update (dt) {},
});
