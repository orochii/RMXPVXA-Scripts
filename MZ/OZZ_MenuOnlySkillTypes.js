/*:
 * @plugindesc Adds skill types to actors that aren't configured to appear in battle.
 * @author Orochii Zouveleki
 * @target MZ
 * 
 * @param Added Menu Skill Types
 * @desc Check database Types section. Add IDs of skill types to add to menu here.
 * @type number[]
 * @default []
 * 
 * @help Adds skill types that will only show when inside the party menu screens 
 * (outside of battle).
 * 
 * Adds skill types that will only show when inside the party menu screens (outsi
 * 
 * This is thought for skill types that you want to either never appear at all in 
 * battle (i.e. custom mechanics) or that should be added as part of something 
 * else, like when under specific status for a special mode and whatnot.
 * 
 * ACTOR NOTETAGS:
 * <menuSkillTypes:n>
 * <menuSkillTypes:1,2,3,4,...>
 * Adds the skill type(s) only when inside the party menu.
 */

(()=>{
    var __filename = document.currentScript.src;
    var path = require('path');
    const PLUGIN_NAME = path.basename(__filename, path.extname(__filename));

    class OZZ_MenuSkillTypes {
        constructor() {
            var params = PluginManager.parameters(PLUGIN_NAME);
            this.menuAddedSkillTypes = JSON.parse(params['Added Menu Skill Types']);
            for (var i = 0; i < this.menuAddedSkillTypes.length; i++) {
                this.menuAddedSkillTypes[i] = Number(this.menuAddedSkillTypes[i]);
            }
        }
    }
    if (typeof OZ === 'undefined') OZ = {};
    OZ.menuSkillTypes = new OZZ_MenuSkillTypes();
    //
    var OZMOST_Game_Actor_skillTypes = Game_Actor.prototype.skillTypes;
    Game_Actor.prototype.skillTypes = function() {
        // Return original for battle.
        if ($gameParty.inBattle()) return OZMOST_Game_Actor_skillTypes.call(this);
        // Add types outside of battle.
        var origSkillTypes = OZMOST_Game_Actor_skillTypes.call(this);
        for (var i = 0; i < OZ.menuSkillTypes.menuAddedSkillTypes.length; i++) {
            origSkillTypes.push(OZ.menuSkillTypes.menuAddedSkillTypes[i]);
        }
        if (typeof this.actor().meta.menuSkillTypes !== 'undefined') {
            var list = JSON.parse("["+this.actor().meta.menuSkillTypes+"]");
            console.log(list);
            for (const v of list) {
                origSkillTypes.push(Number(v));
            }
        }
        const skillTypes = origSkillTypes.sort((a, b) => a - b);
        return skillTypes.filter((x, i, self) => self.indexOf(x) === i);
    };
})();