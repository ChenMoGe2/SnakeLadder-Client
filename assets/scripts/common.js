let sl = require("sl");
module.exports = { 
	sessionId: 0,
    user: {
        default: null,
        type: sl.slproto.User,
    },
    matchResult: {
        default: null,
        type: sl.slproto.MatchResult,
    },
    curUserId:  0,
    curIndex:   0,
    curPos1:    0,
    curPos2:    0,
    dollNum:    1,
    victory:    0,
    replayGameId:   0,
    replayProcess:  "[]",
};