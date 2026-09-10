/*:
 * @target MZ
 * @plugindesc Alternative animation setup for actors and enemies.
 * @author Orochii Zouveleki
 * @url https://github.com/orochii/RMXPVXA-Scripts/tree/master/MZ
 * 
 * @help List of notetags for database entries.
 * 
 * ACTOR/ENEMY NOTETAGS
 * <walkToTarget:false> - Makes the battler not walk to the target by default.
 * 
 * SKILL/ITEM NOTETAGS
 * <walkToTarget> - Forces the battler to walk to the target.
 * <walkToTarget:battler> - Uses the battler/weapon configuration (weapons 
 *      override actor's configurations).
 * 
 * WEAPON NOTETAGS
 * <walkToTarget> - Makes the battler walk to the enemy.
 * <motion:thrust> - The motion to use instead of whatever is defined 
 *      in the database. Replace "thrust" with whatever you want.
 * <weaponImageId:36> - The weapon graphic to use instead of the one 
 *      defined in the database. Keep in mind if you go over 36 you'll need 
 *      to add new "WeaponsN" files. Each file contains 12.
 * 
 * @param battlerAnimConfigs
 * @text Battler Animation Configs
 * @desc Set up new battler animation configurations.
 * @default []
 * @type struct<BattlerAnimation>[]
 */
/*~struct~BattlerAnimation:
 * @param filename
 * @type file
 * @dir img/sv_actors/
 * @default 
 * 
 * @param frameWidth
 * @type number
 * @default 64
 * 
 * @param frameHeight
 * @type number
 * @default 64
 * 
 * @param animations
 * @type struct<BattlerPose>[]
 * @default []
 * 
*/
/*~struct~BattlerPose:
 * @param name
 * @type string
 * @default standby
 * 
 * @param frames
 * @type struct<PoseFrame>[]
 * @default []
 * 
 * @param loop
 * @type boolean
 * @default false
 * 
*/
/*~struct~PoseFrame:
 * @param row
 * @type number
 * @default 0
 * 
 * @param column
 * @type number
 * @default 0
 * 
 * @param wait
 * @type number
 * @default 4
 * 
*/

(()=>{
//
const PLUGIN_NAME = "OZZ_BattlerAnimation";
class OZ_BattleAnimation {
    constructor() {
        this.pluginParams = PluginManager.parameters(PLUGIN_NAME);
        //
        this.battlerAnimConfigs = JSON.parse(this.pluginParams.battlerAnimConfigs);
        for (var i = 0; i < this.battlerAnimConfigs.length; i++) {
            var config = JSON.parse(this.battlerAnimConfigs[i]);
            var name = config.filename;
            config.frameWidth = Number(config.frameWidth);
            config.frameHeight = Number(config.frameHeight);
            config.animations = JSON.parse(config.animations);
            for (var j = 0; j < config.animations.length; j++) {
                var animation = JSON.parse(config.animations[j]);
                var aname = animation.name;
                animation.loop = animation.loop == "true";
                animation.frames = JSON.parse(animation.frames);
                for (var k = 0; k < animation.frames.length; k++) {
                    var f = JSON.parse(animation.frames[k]);
                    f.row = Number(f.row);
                    f.column = Number(f.column);
                    f.wait = Number(f.wait);
                    animation.frames[k] = f;
                }
                config.animations[aname] = animation;
            }
            this.battlerAnimConfigs[name] = config;
        }
    }
    GetBattler(battlerName) {
        var battler = this.battlerAnimConfigs[battlerName];
        if (battler) return battler;
        return null;
    }
    GetMotion(battler, motion) {
        if (battler) {
            var _currentPose = battler.animations[motion];
            if (_currentPose) return _currentPose;
            _currentPose = battler.animations["wait"];
            if (_currentPose) return _currentPose;
        }
        return null;
    }
}
if (typeof OZ === 'undefined') OZ = {};
OZ.battleAnimation = new OZ_BattleAnimation();
//
Game_Actor.prototype.performAttack = function() {
    var weaponMotion = "thrust";
    var weaponImageId = 0;
    // Process weapon.
    const weapons = this.weapons();
    const currWpn = weapons[0];
    if (currWpn) {
        const wtypeId = currWpn.wtypeId;
        const attackMotion = $dataSystem.attackMotions[wtypeId];
        if (attackMotion) {
            if (attackMotion.type === 0) {
                weaponMotion = "thrust";
            } else if (attackMotion.type === 1) {
                weaponMotion = "swing";
            } else if (attackMotion.type === 2) {
                weaponMotion = "missile";
            }
            weaponImageId = attackMotion.weaponImageId;
        }
        if (currWpn.meta.motion) weaponMotion = currWpn.meta.motion;
        if (currWpn.meta.weaponImageId) weaponImageId = Number(currWpn.meta.weaponImageId);
    }
    // Debug
    console.log("[performAttack] motion:"+weaponMotion+" id:"+weaponImageId);
    // Execute
    this.requestMotion(weaponMotion);
    this.startWeaponAnimation(weaponImageId);
};
Game_Actor.prototype.getWalkToTarget = function() {
    const weapons = this.weapons();
    const currWpn = weapons[0];
    if (currWpn) {
        if (currWpn.meta.walkToTarget) return currWpn.meta.walkToTarget;
    }
    const battler = this.actor();
    if (battler) {
        if (battler.meta.walkToTarget) return battler.meta.walkToTarget;
    }
    return true;
}
//
Game_Enemy.prototype.performAction = function(action) {
    Game_Battler.prototype.performAction.call(this, action);
    if (action.isAttack()) {
        this.performAttack();
    } else if (action.isGuard()) {
        this.requestMotion("guard");
    } else if (action.isMagicSkill()) {
        this.requestMotion("spell");
    } else if (action.isSkill()) {
        this.requestMotion("skill");
    } else if (action.isItem()) {
        this.requestMotion("item");
    }
};
Game_Enemy.prototype.performAttack = function() {
    this.requestMotion("swing");
};
OZ_Game_Enemy_performDamage = Game_Enemy.prototype.performDamage;
Game_Enemy.prototype.performDamage = function() {
    OZ_Game_Enemy_performDamage.call(this);
    if (this.isSpriteVisible()) {
        this.requestMotion("damage");
    }
};
Game_Enemy.prototype.performEvasion = function() {
    Game_Battler.prototype.performEvasion.call(this);
    this.requestMotion("evade");
};
Game_Enemy.prototype.performMagicEvasion = function() {
    Game_Battler.prototype.performMagicEvasion.call(this);
    this.requestMotion("evade");
};
Game_Enemy.prototype.getWalkToTarget = function() {
    const battler = this.enemy();
    if (battler) {
        if (battler.meta.walkToTarget) return battler.meta.walkToTarget;
    }
    return true;
}
//
Sprite_Battler.prototype.startMoveXY = function(x, y, duration) {
    var _x = x - this._homeX;
    var _y = y - this._homeY;
    this.startMove(_x,_y,duration);
};
Sprite_Battler.prototype.stepForward = function() {
    this.startMove(48, 0, 12);
};
Sprite_Battler.prototype.stepBack = function() {
    this.startMove(0, 0, 12);
};
Sprite_Battler.prototype.retreat = function() {
    this.startMove(300, 0, 30);
};
Sprite_Battler.prototype.moveTowardsTarget = function() {
    const battler = this._battler;
    var action = battler.currentAction();
    if (!action) action = BattleManager._action;
    if (action) {
        var walkToTarget = false;
        const item = action.item();
        if (item) {
            if (item.meta.walkToTarget) {
                if (item.meta.walkToTarget == true) walkToTarget = true;
                else if (item.meta.walkToTarget == "battler") {
                    walkToTarget = battler.getWalkToTarget();
                }
            }
        }
        if (walkToTarget == true) {
            const targets = BattleManager._targets;
            const sprites = SceneManager._scene._spriteset.battlerSprites();
            var count = 0;
            var tx = 0;
            var ty = 0;
            var tw = 0;
            var th = 0;
            for (var i = 0; i < targets.length; i++) {
                var t = targets[i];
                for (var j = 0; j < sprites.length; j++) {
                    var s = sprites[j];
                    if (s._battler == t) {
                        tx += s._homeX;
                        ty += s._homeY;
                        if (tw < s.width) tw = s.width;
                        if (th < s.height) th = s.height;
                        count++;
                        break;
                    }
                }
            }
            if (count > 0) {
                tx = tx/count;
                ty = ty/count;
                if (count == 1) {
                    if (this.x > tx) {
                        tx += tw/2;
                    } else {
                        tx -= tw/2;
                    }
                }
                this.startMoveXY(tx, ty, 12);
            }
            return;
        }
    }
    this.stepForward();
};
//
var OZ_Sprite_Actor_startMotion = Sprite_Actor.prototype.startMotion;
Sprite_Actor.prototype.startMotion = function(motionType) {
    OZ_Sprite_Actor_startMotion.call(this);
    if (this._currentPose !== motionType) {
        this._currentPose = motionType;
        this._currentPoseCount = 0;
        this._currentPosePattern = 0;
    }
};
var OZ_Sprite_Actor_updateFrame = Sprite_Actor.prototype.updateFrame;
Sprite_Actor.prototype.updateFrame = function() {
    Sprite_Battler.prototype.updateFrame.call(this);
    const bitmap = this._mainSprite.bitmap;
    if (bitmap) {
        var battler = OZ.battleAnimation.GetBattler(this._battlerName);
        if (battler) {
            var motion = OZ.battleAnimation.GetMotion(battler, this._currentPose);
            const p = (this._currentPosePattern >= 0 && this._currentPosePattern < motion.frames.length) ? this._currentPosePattern : motion.frames.length-1;
            const frame = p>=0 ? motion.frames[p] : {row: 0, column: 0, wait: 4};
            //
            const cw = battler.frameWidth;
            const ch = battler.frameHeight;
            const cx = frame.row * cw;
            const cy = frame.column * ch;
            this._mainSprite.setFrame(cx, cy, cw, ch);
            this.setFrame(0, 0, cw, ch);
        } else {
            OZ_Sprite_Actor_updateFrame.call(this);
        }
    }
};
var OZ_Sprite_Actor_updateMotionCount = Sprite_Actor.prototype.updateMotionCount;
Sprite_Actor.prototype.updateMotionCount = function() {
    var battler = OZ.battleAnimation.GetBattler(this._battlerName);
    if (battler) {
        var motion = OZ.battleAnimation.GetMotion(battler, this._currentPose);
        const p = (this._currentPosePattern >= 0 && this._currentPosePattern < motion.frames.length) ? this._currentPosePattern : motion.frames.length-1;
        const frame = p>=0 ? motion.frames[p] : {row: 0, column: 0, wait: 4};
        //
        if (motion && ++this._currentPoseCount >= frame.wait) {
            if (motion.loop) {
                this._currentPosePattern = (this._currentPosePattern + 1) % motion.frames.length;
            } else if (this._currentPosePattern < motion.frames.length-1) {
                this._currentPosePattern++;
            } else {
                this.refreshMotion();
            }
            this._currentPoseCount = 0;
        }
    } else {
        OZ_Sprite_Actor_updateMotionCount.call(this);
    }
};
Sprite_Actor.prototype.refreshMotion = function() {
    const battler = this._battler;
    if (battler) {
        const stateMotion = battler.stateMotionIndex();
        if (this._movementDuration > 0) {
            if (this._offsetX > this._targetOffsetX) {
                this.startMotion("walk");
            } else {
                this.startMotion("escape");
            }
        } else if (stateMotion === 3) {
            this.startMotion("dead");
        } else if (stateMotion === 2) {
            this.startMotion("sleep");
        } else if (battler.isChanting()) {
            this.startMotion("chant");
        } else if (battler.isGuard() || battler.isGuardWaiting()) {
            this.startMotion("guard");
        } else if (stateMotion === 1) {
            this.startMotion("abnormal");
        } else if (battler.isDying()) {
            this.startMotion("dying");
        } else if (battler.isUndecided()) {
            this.startMotion("wait");
        } else {
            this.startMotion("wait");
        }
    }
};
Sprite_Actor.prototype.updateTargetPosition = function() {
    if (this._battler.canMove() && BattleManager.isEscaped()) {
        this.retreat();
    }else if (this._battler.isActing()) {
        this.moveTowardsTarget();
    } else if (this._battler.isInputting()) {
        this.stepForward();
    } else if (!this.inHomePosition()) {
        this.stepBack();
    }
};
//
Sprite_Enemy.prototype.loadBitmap = function(name) {
    var battler = OZ.battleAnimation.GetBattler(name);
    if (battler) {
        this.bitmap = ImageManager.loadSvActor(name);
        this.scale.x = -1;
    } else {
        if ($gameSystem.isSideView()) {
            this.bitmap = ImageManager.loadSvEnemy(name);
        } else {
            this.bitmap = ImageManager.loadEnemy(name);
        }
        this.scale.x = 1;
    }
};
var OZ_Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
    OZ_Sprite_Enemy_update.call(this);
    if (this._enemy) {
        this.updateMotion();
    }
};
Sprite_Enemy.prototype.updateMain = function() {
    Sprite_Battler.prototype.updateMain.call(this);
    if (this._battler.isSpriteVisible() && !this.isMoving()) {
        this.updateTargetPosition();
    }
};
Sprite_Enemy.prototype.setupMotion = function() {
    if (this._battler.isMotionRequested()) {
        this.startMotion(this._battler.motionType());
        this._battler.clearMotion();
    }
};
Sprite_Enemy.prototype.updateMotion = function() {
    this.setupMotion();
    if (this._battler.isMotionRefreshRequested()) {
        this.refreshMotion();
        this._battler.clearMotion();
    }
    this.updateMotionCount();
};
Sprite_Enemy.prototype.startMotion = function(motionType) {
    if (this._currentPose !== motionType) {
        this._currentPose = motionType;
        this._currentPoseCount = 0;
        this._currentPosePattern = 0;
    }
};
Sprite_Enemy.prototype.updateFrame = function() {
    Sprite_Battler.prototype.updateFrame.call(this);
    const bitmap = this.bitmap;
    if (bitmap) {
        if (this._effectType === "bossCollapse") {
            this.setFrame(0, 0, this.width, this._effectDuration);
        } else {
            var battler = OZ.battleAnimation.GetBattler(this._battlerName);
            if (battler) {
                var motion = OZ.battleAnimation.GetMotion(battler, this._currentPose);
                const p = (this._currentPosePattern >= 0 && this._currentPosePattern < motion.frames.length) ? this._currentPosePattern : motion.frames.length-1;
                const frame = p>=0 ? motion.frames[p] : {row: 0, column: 0, wait: 4};
                //
                const cw = battler.frameWidth;
                const ch = battler.frameHeight;
                const cx = frame.row * cw;
                const cy = frame.column * ch;
                this.setFrame(cx, cy, cw, ch);
                //this.setFrame(0, 0, cw, ch);
            } else {
                this.setFrame(0, 0, this.bitmap.width, this.bitmap.height);
            }
        }
    }
};
Sprite_Enemy.prototype.startBossCollapse = function() {
    this._effectDuration = this.height;
    this._appeared = false;
};
Sprite_Enemy.prototype.updateMotionCount = function() {
    var battler = OZ.battleAnimation.GetBattler(this._battlerName);
    if (battler) {
        var motion = OZ.battleAnimation.GetMotion(battler, this._currentPose);
        const p = (this._currentPosePattern >= 0 && this._currentPosePattern < motion.frames.length) ? this._currentPosePattern : motion.frames.length-1;
        const frame = p>=0 ? motion.frames[p] : {row: 0, column: 0, wait: 4};
        //
        if (motion && ++this._currentPoseCount >= frame.wait) {
            if (motion.loop) {
                this._currentPosePattern = (this._currentPosePattern + 1) % motion.frames.length;
            } else if (this._currentPosePattern < motion.frames.length-1) {
                this._currentPosePattern++;
            } else {
                this.refreshMotion();
            }
            this._currentPoseCount = 0;
        }
    }
};
Sprite_Enemy.prototype.refreshMotion = function() {
    const battler = this._battler;
    if (battler) {
        const stateMotion = battler.stateMotionIndex();
        if (this._movementDuration > 0) {
            if (this._offsetX < this._targetOffsetX) {
                this.startMotion("walk");
            } else {
                this.startMotion("escape");
            }
        } else if (stateMotion === 3) {
            this.startMotion("dead");
        } else if (stateMotion === 2) {
            this.startMotion("sleep");
        } else if (battler.isChanting()) {
            this.startMotion("chant");
        } else if (battler.isGuard() || battler.isGuardWaiting()) {
            this.startMotion("guard");
        } else if (stateMotion === 1) {
            this.startMotion("abnormal");
        } else if (battler.isDying()) {
            this.startMotion("dying");
        } else if (battler.isUndecided()) {
            this.startMotion("wait");
        } else {
            this.startMotion("wait");
        }
    }
};
Sprite_Enemy.prototype.updateTargetPosition = function() {
    if (this._battler.canMove() && BattleManager.isEscaped()) {
        this.retreat();
    }else if (this._battler.isActing()) {
        this.moveTowardsTarget();
    } else if (this._battler.isInputting()) {
        this.stepForward();
    } else if (!this.inHomePosition()) {
        this.stepBack();
    }
};
OZ_Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    OZ_Sprite_Enemy_setBattler.call(this,battler);
    this.startEntryMotion();
};
Sprite_Enemy.prototype.startEntryMotion = function() {
    if (this._battler && this._battler.canMove()) {
        this.startMotion("walk");
        this.startMove(0, 0, 30);
    } else if (!this.isMoving()) {
        this.refreshMotion();
        this.startMove(0, 0, 0);
    }
};
Sprite_Enemy.prototype.onMoveEnd = function() {
    Sprite_Battler.prototype.onMoveEnd.call(this);
    if (!BattleManager.isBattleEnd()) {
        this.refreshMotion();
    }
};
Sprite_Enemy.prototype.updateStateSprite = function() {
    this._stateIconSprite.y = -Math.round((this.height + 40) * 0.9);
    if (this._stateIconSprite.y < 20 - this.y) {
        this._stateIconSprite.y = 20 - this.y;
    }
};
//
//
})();