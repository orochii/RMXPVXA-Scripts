/*:
 * @target MZ
 * @plugindesc Alternative animation setup for actors and enemies.
 * @author Orochii Zouveleki
 * @url https://github.com/orochii/RMXPVXA-Scripts/tree/master/MZ
 * 
 * @help 
 * WARNING
 * =======
 * This is a very experimental plugin. Although it works, I consider it very 
 * user-unfriendly, but I guess I kinda skimmed on things just to test the 
 * concept. I do believe it is very powerful though.
 * 
 * HOW TO CREATE A SEQUENCE?
 * =========================---------------------------------------------------
 * Sequences are written in JavaScript, with some quirks of its own.
 * 
 * This what a block for an action sequence looks like.
 * <seqAction>
 * ...
 * </seqAction>
 * 
 * Each line in the sequence is run separately in its own frame. So line 1 will
 * run in a frame, wait for next frame, then continue with the next, and so on.
 * This has the following issues:
 * - you can't define a variable in a line and use it in another one. To beat 
 * this limitation I made the memory. More on that later.
 * 
 * BASIC OBJECT REFERENCES
 * a - Reference to the action object.
 * b - Battler or subject doing the action. 
 *     Use b.s() to get the sprite (position, etc)
 * t - List of targets. Access each of them with t[n]
 * m - The memory. Used to keep persistent values.
 * v - The game's variables, similar to the one in damage formulas.
 * 
 * USING THE "MEMORY"
 * The memory is just an object that allows you to keep information around.
 * The memory is meant to get over the problem of not being able to share 
 * variables between each line of the sequence, due to each being processed 
 * separately with an eval().
 * 
 * EXAMPLES
 * - Applies the skill's effect over enemies within a radius of 64px.
 * <ignoreOriginalEffect>
 * <seqAction>
 * m.t = this.circleFind(b,t[0],"enemy",0,0,64)
 * this.waitTime(20)
 * this.applyActionEffect(b,m.t,a)
 * </seqAction>
 * 
 * - Applies the skill's effect over enemies in a box area around the target.
 * <ignoreOriginalEffect>
 * <seqAction>
 * m.t = this.boxFind(b,t[0],"enemy",0,0,160,30)
 * this.waitTime(20)
 * this.applyActionEffect(b,m.t,a)
 * </seqAction>
 * 
 * - Applies the effects of skill 17 over its targets at random. 
 * Repeats N times where N is the number of targets. Then at the end applies 
 * the original effect to all targets (note it lacks <ignoreOriginalEffect>).
 * <seqAction>
 * m.repeat = t.length
 * m.r = Math.randomInt(t.length)
 * m.t = t[m.r]
 * this.moveTowards(b,m.t.s().x,m.t.s().y,20)
 * this.waitUntil(!b.s().isMoving())
 * this.showAnim(m.t,5)
 * this.waitTime(20)
 * this.applySkillEffect(b,m.t,17)
 * if (m.repeat>0) { m.repeat--; this.currentSequenceIdx=0; }
 * this.waitTime(20)
 * this.waitUntil(!b.s().isMoving())
 * </seqAction>
 * 
 * LIST OF SPECIAL COMMANDS
 * These are just some of the things created as part of this plugin. You're
 * free to extend and create more utility functions.
 * 
 * waitUntil(b)
 *      waits until a boolean expression is true
 * applyActionEffect(b,t,a)
 *      apply effect of action a to target(s) t (t can be array)
 * applySkillEffect(b,t,id)
 *      apply effect of skill ID to target(s) t (t can be array)
 * applyItemEffect(b,t,id)
 *      apply effect of item to target(s) t (t can be array)
 * showAnim(t,id)
 *      show animation over target(s) (t can be array)
 * waitTime(frames)
 *      waits for an amount of frames
 * moveTowards(b,x,y,duration)
 *      moves battler towards x/y over a number of frames
 * boxFind(battler,target,targetType,offsetX,offsetY,sizeX,sizeY)
 *      finds targets within a box area around the specified target
 *      targetType can be "ally", "enemy" or "any"
 * circleFind(battler,target,targetType,offsetX,offsetY,radius)
 *      finds targets within a circle around the specified target
 *      targetType can be "ally", "enemy" or "any"
 *      
*/
(()=>{
//
const PLUGIN_NAME = "OZZ_ActionSequences";
class OZ_ActionSequences {
    constructor() {
        this.pluginParams = PluginManager.parameters(PLUGIN_NAME);
        //
    }
    ParseSequence(sequence) {
        console.log(sequence);
        var result = sequence.split("\n");
        result.remove("");
        return result;
    }
}
if (typeof OZ === 'undefined') OZ = {};
OZ.actionSequences = new OZ_ActionSequences();
//#region Sprite modifications
var OZ_Sprite_Actor_updateTargetPosition = Sprite_Actor.prototype.updateTargetPosition;
Sprite_Actor.prototype.updateTargetPosition = function() {
    if (BattleManager.isCurrentSequence()) return;
    OZ_Sprite_Actor_updateTargetPosition.call(this);
};
var OZ_Sprite_Enemy_updateTargetPosition = Sprite_Enemy.prototype.updateTargetPosition;
Sprite_Enemy.prototype.updateTargetPosition = function() {
    if (BattleManager.isCurrentSequence()) return;
    OZ_Sprite_Enemy_updateTargetPosition.call(this);
};
//#endregion
//#region Game Battler modifications
Game_Battler.prototype.s = function() {
    var _ss = SceneManager._scene._spriteset.battlerSprites();
    for (var i = 0; i < _ss.length; i++) {
        var _s = _ss[i];
        if (_s._battler == this) return _s;
    }
    return null;
}
var OZ_Game_Battler_performActionStart = Game_Battler.prototype.performActionStart;
Game_Battler.prototype.performActionStart = function(action) {
    OZ_Game_Battler_performActionStart.call(this, action);
    // TODO?
};
var OZ_Game_Battler_performActionEnd = Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    OZ_Game_Battler_performActionEnd.call(this);
    // TODO?
};
//#endregion
//#region Battle Manager/Log
var OZ_Window_BattleLog_performAction = Window_BattleLog.prototype.performAction;
Window_BattleLog.prototype.performAction = function(subject, action) {
    OZ_Window_BattleLog_performAction.call(this,subject,action);
    var item = action.item();
    if (item && item.meta.seqAction) {
        BattleManager.currentSequence = OZ.actionSequences.ParseSequence(item.meta.seqAction);
        BattleManager.currentSequenceIgnoreOriginalEffect = item.meta.ignoreOriginalEffect;
        BattleManager.currentSequenceIdx = 0;
        BattleManager.currentSequenceMemory = {}
    }
};
BattleManager.isCurrentSequence = function() {
    return this.currentSequence && this.currentSequenceIdx < this.currentSequence.length;
}
var OZ_BattleManager_isBusy = BattleManager.isBusy;
BattleManager.isBusy = function() {
    if (this.isCurrentSequence()) return true;
    return OZ_BattleManager_isBusy.call(this);
};
var OZ_BattleManager_invokeNormalAction = BattleManager.invokeNormalAction;
BattleManager.invokeNormalAction = function(subject, target) {
    if (this.currentSequenceIgnoreOriginalEffect) return;
    OZ_BattleManager_invokeNormalAction.call(this,subject,target);
};
var OZ_BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    this.currentSequenceIgnoreOriginalEffect = null;
    OZ_BattleManager_endAction.call(this);
};
var OZ_BattleManager_update = BattleManager.update;
BattleManager.update = function(timeActive) {
    if (this.isCurrentSequence()) {
        // binds
        const a = this._action; // eslint-disable-line no-unused-vars
        const b = this._subject; // eslint-disable-line no-unused-vars
        const t = this._targets; // eslint-disable-line no-unused-vars
        const m = this.currentSequenceMemory; // eslint-disable-line no-unused-vars
        const v = $gameVariables._data; // eslint-disable-line no-unused-vars
        //
        var command = this.currentSequence[this.currentSequenceIdx];
        var result = eval(command);
        if (result != this.getWaitValue()) {
            this.currentSequenceIdx++;
        }
    }
    OZ_BattleManager_update.call(this,timeActive);
};
BattleManager.getWaitValue = function() {
    return "xXx_stopPls_xXx";
}
//#endregion
//#region Helper Functions
BattleManager.waitUntil = function(b) {
    return b ? null : this.getWaitValue();
}
BattleManager.applyActionEffect = function(b,t,a) {
    this.applyEffect(b,t,a.item());
}
BattleManager.applySkillEffect = function(b,t,id) {
    this.applyEffect(b,t,$dataSkills[id]);
}
BattleManager.applyItemEffect = function(b,t,id) {
    this.applyEffect(b,t,$dataItems[id]);
}
BattleManager.applyEffect = function(b, t, item) {
    if (Array.isArray(t)) {
        for (var i=0; i < t.length; i++) {
            var tt = t[i];
            this.applyEffect(b,tt,item);
        }
        return;
    }
    var a = new Game_Action(b);
    a.setItemObject(item);
    a.apply(t);
    t.startDamagePopup();
    BattleManager._logWindow.displayAffectedStatus(t);
}
BattleManager.showAnim = function(targets,animationId) {
    if (!Array.isArray(targets)) targets = [targets];
    //
    $gameTemp.requestAnimation(targets, animationId, false);
}
BattleManager.waitTime = function(frames) {
    var m = BattleManager.currentSequenceMemory;
    console.log(m.__waitCount);
    if (m.__waitCount) {
        m.__waitCount--;
        if (m.__waitCount <= 0) {
            m.__waitCount = null;
            return null;
        }
    } else {
        m.__waitCount = frames;
    }
    return this.getWaitValue();
}
BattleManager.moveTowards = function(b, x, y, duration) {
    var s = b.s();
    var _x = x - s._homeX;
    var _y = y - s._homeY;
    s.startMove(_x,_y,duration);
    s.refreshMotion();
};
BattleManager.boxFind = function(battler,target,targetType,offsetX,offsetY,sizeX,sizeY) {
    var bIsActor = battler.isActor();
    var s = target.s();
    var sx = s.x + offsetX - sizeX/2;
    var sy = s.y + offsetY - sizeY/2;
    var ex = sx + sizeX;
    var ey = sy + sizeY;
    var all = BattleManager.allBattleMembers();
    var result = [];
    for (var i = 0; i < all.length; i++) {
        var curr = all[i];
        var include = targetType=="ally" ? curr.isActor()==bIsActor : targetType=="enemy" ? curr.isActor()!=bIsActor : true;
        if (include) {
            var cs = curr.s();
            if (cs.x >= sx && cs.x <= ex && cs.y >= sy && cs.y <= ey) {
                result.push(curr);
            }
        }
    }
    return result;
}
BattleManager.circleFind = function(battler,target,targetType,offsetX,offsetY,radius) {
    var bIsActor = battler.isActor();
    var s = target.s();
    var cx = s.x + offsetX;
    var cy = s.y + offsetY;
    var all = BattleManager.allBattleMembers();
    var result = [];
    for (var i = 0; i < all.length; i++) {
        var curr = all[i];
        var include = targetType=="ally" ? curr.isActor()==bIsActor : targetType=="enemy" ? curr.isActor()!=bIsActor : true;
        if (include) {
            var cs = curr.s();
            var dx = cs.x - cx;
            var dy = cs.y - cy;
            var dst = dx*dx + dy*dy;
            if (dst <= radius*radius) {
                result.push(curr);
            }
        }
    }
    return result;
}
//#endregion
//
})();