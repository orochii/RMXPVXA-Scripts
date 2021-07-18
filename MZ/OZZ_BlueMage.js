//=============================================================================
// RPG Maker MZ - OZZ Blue Mage
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Learn enemy skills when targeted.
 * @author Orochii Zouveleki
 * 
 * @help OZZ_BlueMage.js
 * 
 * This plugin makes enemy skills be learnable by characters 
 * based on their class.
 * 
 * To make a class able to learn enemy skills, add the following 
 * tag into the class note box:
 * <bluemage>
 * 
 * To make a skill learnable by actors when targeted by the skill, 
 * add this tag into the skill note box:
 * <bluemagic>
 * 
 * @param General settings
 * 
 * @param Learn skill text
 * @parent General settings
 * @desc Text that will appear when an actor learns a skill. Leave blank to disable.
 * @default %1 learns %2!
 */

(() => {
    const PLUGIN_NAME = "OZZ_BlueMage";
    var OZZBM_Param = PluginManager.parameters(PLUGIN_NAME);
    var learnSkillText = OZZBM_Param['Learn skill text'];

    // Is actor a blue mage?
    Game_Actor.prototype.isBlueMage = function() {
        return this.currentClass().meta["bluemage"] === true;
    };
    // Check for learning conditions, learn if it can.
    Game_Actor.prototype.tryLearnEnemySkill = function(skill) {
        if (!this.isBlueMage()) return;
        if (!this.result().isHit()) return;
        if (skill.meta["bluemagic"] && !(this.isLearnedSkill(skill.id))) {
            this.learnSkill(skill.id);
            this.result().learntSkill = skill.id;
        }
    }
    // Learning check on action finished.
    Game_Action_updateLastTarget = Game_Action.prototype.updateLastTarget;
    Game_Action.prototype.updateLastTarget = function(target) {
        if (target.isActor()) {
            target.tryLearnEnemySkill(this.item());
        }
        Game_Action_updateLastTarget.call(this,target);
    };
    // Show message at Window Log message.
    Window_BattleLog_displayFailure = Window_BattleLog.prototype.displayFailure;
    Window_BattleLog.prototype.displayFailure = function(target) {
        Window_BattleLog_displayFailure.call(this, target)
        if (target.result().learntSkill !== undefined) {
            if (learnSkillText.length === 0) return;
            var text = learnSkillText.format(target.name(), $dataSkills[target.result().learntSkill].name);
            this.push("addText", text);
            target.result().learntSkill = undefined;
        }
    };
})();
