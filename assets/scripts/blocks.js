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
        arrowNode:  cc.Node,
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
    },

    start () {

    },

    // update (dt) {},
});
