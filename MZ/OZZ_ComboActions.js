/*:
 * @plugindesc Replaces attack with combo styled actions like Xenogears and Legend of Legaia
 * @author Orochii Zouveleki
 * @target MZ
 * 
 * @help This plugin adds a combo sequence and skills activated by pressing specific 
 * input sequences. It modifies the way one skill works, which can be the attack 
 * skill.
 * 
 * ACTOR AND ENEMY NOTETAGS:
 * <deathblowMaxAP:n>
 * Changes the max AP of the actor/enemy with tag to N, instead of the default, 
 * specified through the plugin configuration parameters.
 * 
 * SKILL NOTETAGS:
 * <deathblow:n,n,n,...>
 * Specifies the IDs of the inputs used to execute the deathblow. The input IDs 
 * correspond to the indexes of the inputs, defined in the Action List parameter.
 * 
 * @param Visual
 * 
 * @param Window X Position Formula
 * @parent Visual
 * @desc windowWidth:current height
 * @default 0
 * @param Window Y Position Formula
 * @parent Visual
 * @desc windowHeight:current height, windowAreaHeight:Area for UI below (status, etc)
 * @default Graphics.boxHeight - windowHeight - windowAreaHeight
 * 
 * @param Window Skin Opacity
 * @parent Visual
 * @desc Set this to zero to hide the windowskin.
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 * @param Window Background
 * @parent Visual
 * @desc When assigned, will use a static image that goes between windowskin and contents.
 * @type file
 * @dir img/system/
 * 
 * @param Window Background Offset X
 * @desc Horizontal displacement for window's background.
 * @parent Visual
 * @type number
 * @min -1920
 * @max 1920
 * @default 0
 * 
 * @param Window Background Offset Y
 * @desc Vertical displacement for window's background.
 * @parent Visual
 * @type number
 * @min -1920
 * @max 1920
 * @default 0
 * 
 * @param Behavior
 * 
 * @param Combo Skill
 * @parent Behavior
 * @desc Skill that when used starts the combo sequence.
 * @type skill
 * 
 * @param Actor Default Combo Action Points
 * @parent Behavior
 * @desc Number of points available every turn for executing combo sequences.
 * @type number
 * @default 7
 * 
 * @param Enemy Default Combo Action Points
 * @parent Behavior
 * @desc Number of points available every turn for executing combo sequences.
 * @type number
 * @default 4
 * 
 * @param Action List
 * @parent Behavior
 * @desc Bindings active while on map
 * @type struct<ActionType>[]
 * 
 */
/*~struct~ActionType:
 * @param Action Name
 * @desc Action display name.
 * @type text
 * @default ok
 * 
 * @param Action Icon ID
 * @desc Icon shown besides action.
 * @type number
 * @default 0
 * 
 * @param Bind Name
 * @desc Name for the key to be binded to.
 * @type text
 * @default ok
 * 
 * @param Skill
 * @desc Skill to be executed when action is selected.
 * @type skill
 * @default 0
 * 
 * @param Cost AP
 * @desc Amount of Action Points expended when using this action.
 * @type number
 * @min 1
 * @max 99
 * @default 1
 */

/*~struct~Deathblow:
 */

// Target works the same, but save target
// move to enemy (or at least move forward)
// display UI
// on keypress, execute skill (Low, Mid, High), store input for check
// check if sequence corresponds to a deathblow

// Game_Action.prototype.apply = function(target) {
// Game_Actor.prototype.performActionStart = function(action) {
// BattleManager.updatePhase = function(timeActive) {

(()=>{
    var __filename = document.currentScript.src;
    var path = require('path');
    const PLUGIN_NAME = path.basename(__filename, path.extname(__filename));

    class OZZ_Deathblows {
        constructor() {
            var params = PluginManager.parameters(PLUGIN_NAME);
            // Combo skill
            this.comboSkillId = JSON.parse(params['Combo Skill']);
            this.actorComboActionPoints = Number(params['Actor Default Combo Action Points']);
            this.enemyComboActionPoints = Number(params['Enemy Default Combo Action Points']);
            this.visual = {};
            this.visual.windowXFormula = params['Window X Position Formula'];
            this.visual.windowYFormula = params['Window Y Position Formula'];
            this.visual.windowSkinOpacity = Number(params['Window Skin Opacity']);
            this.visual.background = params['Window Background'];
            this.visual.backgroundOX = Number(params['Window Background Offset X']);
            this.visual.backgroundOY = Number(params['Window Background Offset Y']);
            // Default actions
            if (params['Action List'].length != 0) this.actionList = JSON.parse(params['Action List']);
            else this.actionList = [];
            for (var i = 0; i < this.actionList.length; i++) {
                this.actionList[i] = JSON.parse(this.actionList[i]);
                this.actionList[i].displayName = this.actionList[i]['Action Name'];
                this.actionList[i].displayIconId = Number(this.actionList[i]['Action Icon ID']);
                this.actionList[i].bindName = this.actionList[i]['Bind Name'];
                this.actionList[i].skillId = Number(this.actionList[i]['Skill']);
                this.actionList[i].costAP = Number(this.actionList[i]['Cost AP']);
            }
        }
    }
    if (typeof OZ === 'undefined') OZ = {};
    OZ.deathblows = new OZZ_Deathblows();

    Game_Actor.prototype.getComboSkillId = function(index) {
        // TODO: support for skill based on weapon, actor, etc
        if (index < OZ.deathblows.actionList.length) {
            return OZ.deathblows.actionList[index].skillId;
        }
    }

//#region Behaviour
    var OZZDB_Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        OZZDB_Game_Battler_initMembers.call(this);
    };
    var OZZDB_Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
    Game_Battler.prototype.onBattleStart = function(advantageous) {
        OZZDB_Game_Battler_onBattleStart.call(this, advantageous);
        this._deathblow = false;
        this._deathblowSetup = false;
        this._deathblowInputs = [];
        this._deathblowTargets = [];
        this._deathblowRefresh = false;
        this._deathblowRemaining = 0;
    }
    Game_Battler.prototype.shouldRefreshDeathblowInputs = function() {
        return this._deathblowRefresh;
    }
    Game_Battler.prototype.queueRefreshDeathblows = function() {
        return this._deathblowRefresh = true;
    }
    Game_Battler.prototype.clearRefreshDeathblows = function() {
        return this._deathblowRefresh = false;
    }
    Game_Battler.prototype.isDeathblowActive = function() {
        return this._deathblow;
    }
    Game_Battler.prototype.setDeathblow = function(v) {
        this._deathblow = v;
    }

    Game_Battler.prototype.isDeathblowSetup = function() {
        return this._deathblowSetup;
    }
    Game_Battler.prototype.setDeathblowSetup = function(v) {
        this._deathblowSetup = v;
    }
    Game_Battler.prototype.getDeathblowRemaining = function() {
        return this._deathblowRemaining;
    }
    Game_Battler.prototype.changeDeathblowRemaining = function(change) {
        this._deathblowRemaining -= change;
    }
    Game_Battler.prototype.deathblowMaxActionPoints = function() {
        return OZ.deathblows.enemyComboActionPoints;
    }
    Game_Actor.prototype.deathblowMaxActionPoints = function() {
        if (typeof this.actor().meta.deathblowMaxAP !== 'undefined') {
            return Number(this.actor().meta.deathblowMaxAP);
        }
        return OZ.deathblows.actorComboActionPoints;
    }
    Game_Enemy.prototype.deathblowMaxActionPoints = function() {
        if (typeof this.enemy().meta.deathblowMaxAP !== 'undefined') {
            return Number(this.enemy().meta.deathblowMaxAP);
        }
        return OZ.deathblows.actorComboActionPoints;
    }
    Game_Battler.prototype.refillDeathblowRemaining = function() {
        this._deathblowRemaining = this.deathblowMaxActionPoints();
    }
    Game_Battler.prototype.getDeathblowInputs = function() {
        return this._deathblowInputs;
    }
    Game_Battler.prototype.flushDeathblowInputs = function() {
        this._deathblowInputs = [];
    }
    Game_Battler.prototype.pushDeathblowInput = function(input) {
        this._deathblowInputs.push(input);
    }
    Game_Battler.prototype.checkCurrentDeathblows = function() {
        return 0;
    }
    Game_Actor.prototype.checkCurrentDeathblows = function() {
        const sequenceCheck = this._deathblowInputs.join();
        for (const skill of this.usableSkills()) {
            if (typeof skill.meta.deathblow !== 'undefined') {
                if (skill.meta.deathblow === sequenceCheck) {
                    return skill.id;
                }
            }
        }
        return 0;
    }

    var OZZDB_BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        const subject = this._subject;
        const action = subject.currentAction();
        if (action.item() !== null && action.isSkill()) {
            const item = action.item();
            if (item.id === OZ.deathblows.comboSkillId && subject.isDeathblowActive()==false) {
                subject.setDeathblow(true);
                subject.flushDeathblowInputs();
                const targets = action.makeTargets();
                this._targets = [];
                subject._deathblowTargets = action.makeTargets();
                subject.queueRefreshDeathblows();
                subject.refillDeathblowRemaining();
                this._phase = "deathblow";
                this._action = action;
                subject.cancelMotionRefresh();
                subject.useItem(action.item());
                this._action.applyGlobal();
                //this._logWindow.startAction(subject, action, targets);
                subject.performActionStart(action);
                subject.removeCurrentAction();
                return;
            }
        }
        OZZDB_BattleManager_startAction.call(this);
    };
    var OZZDB_BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        // Check if targets are dead
        const prevSubject = this._subject;
        if (prevSubject.isDeathblowActive()) {
            if (prevSubject !== null) {
                var livingTargets = 0;
                if (typeof prevSubject._deathblowTargets === "undefined") prevSubject._deathblowTargets = [];
                for (var i = 0; i < prevSubject._deathblowTargets.length; i++) {
                    console.log(prevSubject);
                    const target = prevSubject._deathblowTargets[i];
                    if (!target.isDead()) livingTargets += 1;
                }
                if (livingTargets==0) prevSubject.setDeathblow(false);
                if (prevSubject.isDeathblowActive()) {
                    if (prevSubject.isDeathblowSetup()) {
                        prevSubject.setDeathblowSetup(false);
                    } else {
                        this._phase = "deathblow";
                        this.endBattlerActions(this._subject);
                        return;
                    }
                }
            }
        }
        
        OZZDB_BattleManager_endAction.call(this);
        if (this._subject === null && prevSubject !== null) {
            prevSubject.setDeathblow(false);
            prevSubject._deathblowTargets = [];
        }
    };
    var OZZDB_BattleManager_updatePhase = BattleManager.updatePhase;
    BattleManager.updatePhase = function(timeActive) {
        if (this._phase === "deathblow") {
            
            // Check deathblow
            var skillId = this._subject.checkCurrentDeathblows();
            if (skillId === 0 && this._subject.getDeathblowRemaining() > 0) {
                var autoact = -1;
                if (Game_BattlerBase.prototype.canInput.call(this._subject) === false) {
                    // Select the max cost action available first
                    var _maxCost = 0;
                    for (var i = 0; i < OZ.deathblows.actionList.length; i++) {
                        const action = OZ.deathblows.actionList[i];
                        if (this._subject.getDeathblowRemaining() >= action.costAP) {
                            if (_maxCost < action.costAP) {
                                autoact = i;
                                _maxCost = action.costAP;
                            }
                        }
                    }
                }
                // Read inputs.
                for (var i = 0; i < OZ.deathblows.actionList.length; i++) {
                    const action = OZ.deathblows.actionList[i];
                    if ((Input.isTriggered(action.bindName)&&autoact===-1) || autoact==i) {
                        if (this._subject.getDeathblowRemaining() >= action.costAP) {
                            SoundManager.playCursor();
                            this._subject.pushDeathblowInput(i);
                            this._subject.queueRefreshDeathblows();
                            skillId = action.skillId;
                            // Take off cost
                            this._subject.changeDeathblowRemaining(action.costAP);
                        } else {
                            SoundManager.playBuzzer();
                        }
                    }
                }
                if (Input.isTriggered("cancel")) {
                    SoundManager.playCancel();
                    this._subject.setDeathblow(false);
                    this._phase = "action";
                }
            } else {
                console.log(skillId);
                this._subject.setDeathblow(false);
                this._phase = "action";
            }
            if (skillId != 0) {
                // Execute action
                this._subject.setDeathblowSetup(true);
                this._subject.forceAction(skillId, this._action._targetIndex);
                this._phase = "action";
                return;
            }
        } else {
            OZZDB_BattleManager_updatePhase.call(this,timeActive);
        }
    };
    BattleManager.isDeathblowActive = function() {
        if (this._subject === null) return false;
        return this._subject._deathblow;
    }
//#endregion
//#region Input window
    function Window_DeathblowInput() {
        this.initialize(...arguments);
    }

    Window_DeathblowInput.prototype = Object.create(Window_Selectable.prototype);
    Window_DeathblowInput.prototype.constructor = Window_DeathblowInput;

    Window_DeathblowInput.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.createBackground();
        this.refresh();
    };

    Window_DeathblowInput.prototype.colSpacing = function() {
        return 0;
    };

    Window_DeathblowInput.prototype.createBackground = function() {
        if (OZ.deathblows.visual.background !== "") {
            var img = new Sprite();
            img.bitmap = ImageManager.loadSystem(OZ.deathblows.visual.background);
            img.x = OZ.deathblows.visual.backgroundOX;
            img.y = OZ.deathblows.visual.backgroundOY;
            this._contentsBackSprite.addChild(img);
        }
        this.opacity = OZ.deathblows.visual.windowSkinOpacity;
    }

    Window_DeathblowInput.prototype.refresh = function() {
        const subject = BattleManager._subject;
        this.contents.clear();
        if (subject === null) return;
        // Draw remaining AP
        var apText = "%1 / %2".format(subject.getDeathblowRemaining(), subject.deathblowMaxActionPoints());
        this.drawText(apText,0,0,192,"right")
        // Draw options
        for (var i = 0; i < OZ.deathblows.actionList.length; i++) {
            const action = OZ.deathblows.actionList[i];
            const rect = this.itemLineRect(i+1);
            const x = rect.x;
            const y = rect.y;
            const width = rect.width;
            this.drawIcon(action.displayIconId, x, y);
            this.drawText(action.displayName, x+32,y,width-32);
            this.drawText("(%1)".format(action.costAP), x+32,y,width-32,"right");
        }
        // draw inputs
        const rectInputs = this.itemLineRect(OZ.deathblows.actionList.length+1);
        const x = rectInputs.x;
        const y = rectInputs.y;
        const inputs = subject.getDeathblowInputs();
        for (var i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            const action = OZ.deathblows.actionList[input];
            var xx = x + (i * 32);
            this.drawIcon(action.displayIconId, xx, y);
        }
    };

    var OZZDB_Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        OZZDB_Scene_Battle_createAllWindows.call(this);
        this.createDeathblowWindow();
    };

    Scene_Battle.prototype.deathblowWindowRect = function() {
        const windowAreaHeight = this.windowAreaHeight();
        const windowWidth = 256;
        const windowHeight = this.calcWindowHeight(OZ.deathblows.actionList.length+2, true);
        const wx = eval(OZ.deathblows.visual.windowXFormula);
        const wy = eval(OZ.deathblows.visual.windowYFormula);
        return new Rectangle(wx, wy, windowWidth, windowHeight);
    };

    Scene_Battle.prototype.createDeathblowWindow = function() {
        const rect = this.deathblowWindowRect();
        const window = new Window_DeathblowInput(rect);
        this.addWindow(window);
        this._deathblowWindow = window;
        this._deathblowWindow.visible = BattleManager.isDeathblowActive();
    };

    var OZZDB_Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
    Scene_Battle.prototype.updateVisibility = function() {
        OZZDB_Scene_Battle_updateVisibility.call(this)
        this.updateDeathblowWindowVisibility();
    };

    Scene_Battle.prototype.updateDeathblowWindowVisibility = function() {
        // Show deathblow window if there's an active battler, it's an actor, and the deathblow is active
        const subject = BattleManager._subject;
        const action = BattleManager._action;
        if (subject != null && !subject.isEnemy() && (typeof action !== 'undefined')) {
            this._deathblowWindow.visible = BattleManager.isDeathblowActive();
            if (this._deathblowWindow.visible && subject.shouldRefreshDeathblowInputs()) {
                this._deathblowWindow.refresh();
                subject.clearRefreshDeathblows();
            }
        } else {
            this._deathblowWindow.visible = false;
        }
    };
    //#endregion
})();