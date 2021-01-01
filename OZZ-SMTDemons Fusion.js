//=============================================================================
// RPG Maker MZ - SMT Demon fusion
//=============================================================================

/*:
 * @target MZ
 * @plugindesc SMT Demon fusion. Requires SMTDemons placed over. v1
 * @author Orochii Zouveleki
 * ------------------------------------------------------------------------------------------------
 * PARAMETERS
 * ------------------------------------------------------------------------------------------------
 * @param General settings
 * 
 * @param Use Background
 * @parent General settings
 * @desc Background name to use for menu (found at img/system/). Leave blank (none) to disable.
 * @type file
 * @dir img/system/
 * 
 * @param Use Result Background
 * @parent General settings
 * @desc Background name to use for result screen (found at img/system/). Leave blank (none) to disable.
 * @type file
 * @dir img/system/
 * 
 * @param Window Opacity
 * @parent General settings
 * @desc Sets opacity for fusion status windows.
 * @type number
 * @default 0
 * 
 * @param Command Window Opacity
 * @parent General settings
 * @desc Sets opacity for fusion command windows.
 * @type number
 * @default 255
 * 
 * @param Result Window Opacity
 * @parent General settings
 * @desc Sets opacity for fusion result windows.
 * @type number
 * @default 255
 * 
 * @param Race and fusion config
 * 
 * @param Race fusions
 * @parent Race and fusion config
 * @desc Set up all fusions between races. Result will be based on the level of fused demons.
 * @type struct<DemonRaceFusionData>[]
 * @default ["{\"First ID\":\"0\",\"Second ID\":\"11\",\"Result\":\"0\"}","{\"First ID\":\"1\",\"Second ID\":\"11\",\"Result\":\"1\"}","{\"First ID\":\"2\",\"Second ID\":\"11\",\"Result\":\"2\"}","{\"First ID\":\"3\",\"Second ID\":\"11\",\"Result\":\"3\"}","{\"First ID\":\"5\",\"Second ID\":\"11\",\"Result\":\"5\"}","{\"First ID\":\"6\",\"Second ID\":\"11\",\"Result\":\"6\"}","{\"First ID\":\"7\",\"Second ID\":\"11\",\"Result\":\"7\"}","{\"First ID\":\"8\",\"Second ID\":\"11\",\"Result\":\"8\"}","{\"First ID\":\"9\",\"Second ID\":\"11\",\"Result\":\"9\"}","{\"First ID\":\"10\",\"Second ID\":\"11\",\"Result\":\"10\"}","{\"First ID\":\"11\",\"Second ID\":\"11\",\"Result\":\"0\"}","{\"First ID\":\"0\",\"Second ID\":\"2\",\"Result\":\"5\"}","{\"First ID\":\"0\",\"Second ID\":\"3\",\"Result\":\"4\"}","{\"First ID\":\"0\",\"Second ID\":\"4\",\"Result\":\"7\"}","{\"First ID\":\"0\",\"Second ID\":\"5\",\"Result\":\"2\"}","{\"First ID\":\"0\",\"Second ID\":\"6\",\"Result\":\"5\"}","{\"First ID\":\"0\",\"Second ID\":\"7\",\"Result\":\"8\"}","{\"First ID\":\"0\",\"Second ID\":\"9\",\"Result\":\"10\"}","{\"First ID\":\"0\",\"Second ID\":\"10\",\"Result\":\"7\"}","{\"First ID\":\"0\",\"Second ID\":\"0\",\"Result\":\"11\"}","{\"First ID\":\"1\",\"Second ID\":\"1\",\"Result\":\"11\"}","{\"First ID\":\"1\",\"Second ID\":\"2\",\"Result\":\"3\"}","{\"First ID\":\"1\",\"Second ID\":\"3\",\"Result\":\"6\"}","{\"First ID\":\"1\",\"Second ID\":\"4\",\"Result\":\"3\"}","{\"First ID\":\"1\",\"Second ID\":\"5\",\"Result\":\"2\"}","{\"First ID\":\"1\",\"Second ID\":\"6\",\"Result\":\"4\"}","{\"First ID\":\"1\",\"Second ID\":\"7\",\"Result\":\"3\"}","{\"First ID\":\"1\",\"Second ID\":\"8\",\"Result\":\"9\"}","{\"First ID\":\"1\",\"Second ID\":\"9\",\"Result\":\"5\"}","{\"First ID\":\"1\",\"Second ID\":\"10\",\"Result\":\"1\"}","{\"First ID\":\"2\",\"Second ID\":\"2\",\"Result\":\"11\"}","{\"First ID\":\"2\",\"Second ID\":\"3\",\"Result\":\"4\"}","{\"First ID\":\"2\",\"Second ID\":\"4\",\"Result\":\"1\"}","{\"First ID\":\"2\",\"Second ID\":\"5\",\"Result\":\"3\"}","{\"First ID\":\"2\",\"Second ID\":\"6\",\"Result\":\"9\"}","{\"First ID\":\"2\",\"Second ID\":\"7\",\"Result\":\"5\"}","{\"First ID\":\"2\",\"Second ID\":\"9\",\"Result\":\"7\"}","{\"First ID\":\"2\",\"Second ID\":\"10\",\"Result\":\"6\"}","{\"First ID\":\"3\",\"Second ID\":\"3\",\"Result\":\"11\"}","{\"First ID\":\"3\",\"Second ID\":\"4\",\"Result\":\"1\"}","{\"First ID\":\"3\",\"Second ID\":\"5\",\"Result\":\"4\"}","{\"First ID\":\"3\",\"Second ID\":\"6\",\"Result\":\"2\"}","{\"First ID\":\"3\",\"Second ID\":\"7\",\"Result\":\"1\"}","{\"First ID\":\"3\",\"Second ID\":\"8\",\"Result\":\"9\"}","{\"First ID\":\"3\",\"Second ID\":\"9\",\"Result\":\"0\"}","{\"First ID\":\"3\",\"Second ID\":\"10\",\"Result\":\"0\"}","{\"First ID\":\"4\",\"Second ID\":\"5\",\"Result\":\"0\"}","{\"First ID\":\"4\",\"Second ID\":\"6\",\"Result\":\"3\"}","{\"First ID\":\"4\",\"Second ID\":\"8\",\"Result\":\"1\"}","{\"First ID\":\"4\",\"Second ID\":\"9\",\"Result\":\"7\"}","{\"First ID\":\"4\",\"Second ID\":\"10\",\"Result\":\"0\"}","{\"First ID\":\"5\",\"Second ID\":\"5\",\"Result\":\"11\"}","{\"First ID\":\"5\",\"Second ID\":\"6\",\"Result\":\"1\"}","{\"First ID\":\"5\",\"Second ID\":\"7\",\"Result\":\"6\"}","{\"First ID\":\"5\",\"Second ID\":\"8\",\"Result\":\"6\"}","{\"First ID\":\"5\",\"Second ID\":\"9\",\"Result\":\"8\"}","{\"First ID\":\"5\",\"Second ID\":\"10\",\"Result\":\"9\"}","{\"First ID\":\"6\",\"Second ID\":\"6\",\"Result\":\"11\"}","{\"First ID\":\"6\",\"Second ID\":\"7\",\"Result\":\"10\"}","{\"First ID\":\"6\",\"Second ID\":\"8\",\"Result\":\"7\"}","{\"First ID\":\"6\",\"Second ID\":\"9\",\"Result\":\"1\"}","{\"First ID\":\"6\",\"Second ID\":\"10\",\"Result\":\"0\"}","{\"First ID\":\"7\",\"Second ID\":\"7\",\"Result\":\"11\"}","{\"First ID\":\"7\",\"Second ID\":\"8\",\"Result\":\"9\"}","{\"First ID\":\"7\",\"Second ID\":\"9\",\"Result\":\"8\"}","{\"First ID\":\"7\",\"Second ID\":\"10\",\"Result\":\"6\"}","{\"First ID\":\"8\",\"Second ID\":\"8\",\"Result\":\"11\"}","{\"First ID\":\"8\",\"Second ID\":\"9\",\"Result\":\"0\"}","{\"First ID\":\"8\",\"Second ID\":\"10\",\"Result\":\"0\"}","{\"First ID\":\"9\",\"Second ID\":\"9\",\"Result\":\"11\"}","{\"First ID\":\"9\",\"Second ID\":\"10\",\"Result\":\"2\"}","{\"First ID\":\"10\",\"Second ID\":\"10\",\"Result\":\"11\"}"]
 * 
 * @param Demon fusions
 * @parent Race and fusion config
 * @desc Set up all fusions between specific demons. Result will always be the resulting demon.
 * @type struct<DemonTripleFusionData>[]
 * @default ["{\"Requirements\":\"[\\\"1\\\",\\\"2\\\",\\\"3\\\"]\",\"Result\":\"5\"}"]
 * 
 * @param Fusion scene config
 * 
 * @param Scene appear time
 * @parent Fusion scene config
 * @desc Speed at which scene opacity changes when showing.
 * @type number
 * @default 60
 * 
 * @param Scene vanish time
 * @parent Fusion scene config
 * @desc Speed at which scene opacity changes when disappearing.
 * @type number
 * @default 120
 * 
 * @param Enemy appear length
 * @parent Fusion scene config
 * @desc Total time for all fusion materials to appear.
 * @type number
 * @default 60
 * 
 * @param Animation Time
 * @parent Fusion scene config
 * @desc Total time for all fusion materials disappearing animation to display.
 * @type number
 * @default 120
 * 
 * @param Animation Ended Time
 * @parent Fusion scene config
 * @desc Time before the scene starts hiding after fusion has been finished.
 * @type number
 * @default 120
 * 
 * @param Wait after appear
 * @parent Fusion scene config
 * @desc Wait time after all fusion materials are visible, for fusion to start.
 * @type number
 * @default 120
 * 
 * @param Wait after fusion finish
 * @parent Fusion scene config
 * @desc Wait time after the fusion finished and result is visible on screen.
 * @type number
 * @default 300
 * 
 * @param Disappear animation
 * @parent Fusion scene config
 * @desc ID for animation displayed on fusion materials vanishing.
 * @type animation
 * @default 119
 * 
 * @param Appear animation
 * @parent Fusion scene config
 * @desc ID for animation displayed on fusion result appearing.
 * @type animation
 * @default 118
 * 
 * @param Vocabulary
 * 
 * @param TERM: Double Fusion
 * @parent Vocabulary
 * @desc Text to show when fusing two monsters
 * @type text
 * @default Double Fusion
 * 
 * @param TERM: Double Fusion Help
 * @parent Vocabulary
 * @desc Help text to show when Double Fusion is selected
 * @type text
 * @default Fuse one demon with another and obtain a stronger one.
 * 
 * @param TERM: Triple Fusion
 * @parent Vocabulary
 * @desc Text to show when fusing multiple monsters.
 * @type text
 * @default Triple Fusion
 * 
 * @param TERM: Triple Fusion Help
 * @parent Vocabulary
 * @desc Help text to show when Triple Fusion is selected.
 * @type text
 * @default Fuse multiple demons and obtain a powerful new one.
 * 
 * @param TERM: Status Help
 * @parent Vocabulary
 * @desc Help text to show when Status is selected.
 * @type text
 * @default Show status of selected demon.
 * 
 * @param TERM: Cancel Help
 * @parent Vocabulary
 * @desc Help text to show when Cancel is selected.
 * @type text
 * @default Close the demon fusion menu.
 * 
 * @param TERM: Race text
 * @parent Vocabulary
 * @desc If background set to none (autogenerate), text labeling the column for race names.
 * @type text
 * @default RACE
 * 
 * @param TERM: Name text
 * @parent Vocabulary
 * @desc If background set to none (autogenerate), text labeling the column for demon names.
 * @type text
 * @default NAME
 * 
 * @param TERM: Fusion result text
 * @parent Vocabulary
 * @desc If background set to none (autogenerate), text labeling the column for fusion results.
 * @type text
 * @default RESULT
 * 
 * @param TERM: Fusion accept
 * @parent Vocabulary
 * @desc Confirmation option for fusion two demons.
 * @type text
 * @default Fuse
 * @
 * ------------------------------------------------------------------------------------------------
 * COMMANDS
 * ------------------------------------------------------------------------------------------------
 * @command smtCallFusionMenu
 * @text Open fusion menu
 * @desc Calls the fusion menu

 * @help ===========================================================================
 * OZZ-SMTDemons Fusion.js
 * ===========================================================================
 * 
 * ---------------------------------------------------------------------------
 * INTRODUCTION:
 * ---------------------------------------------------------------------------
 * This plugin serves as an add-on for the SMT Demon plugin to fuse two or
 * more demons in order to acquire a new one, in a similar way as the Demon
 * Fusioning mechanic works in the Shin Megami Tensei series.
 * 
 * The rules are mostly based on Shin Megami Tensei 1 for Super Famicom, due 
 * to it being the one with which I was more familiarized.
 * 
 * CAUTION: This plugin depends on the OZZ-SMTDemons plugin. Make sure to 
 * install the OZZ-SMTDemons plugin prior installing this plugin, and make 
 * sure it is enabled when using this plugin.
 * 
 * It is also adviced to order both plugins accordingly, so the OZZ-SMTDemons
 * plugin is before/over this one in in your project's list of installed 
 * plugins.
 * 
 * ---------------------------------------------------------------------------
 * LICENSE:
 * ---------------------------------------------------------------------------
 * Use under MIT License.
 * 
 * Copyright © 2020 Orochii Zouveleki
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the “Software”), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 * ---------------------------------------------------------------------------
 * PLUGIN COMMANDS:
 * ---------------------------------------------------------------------------
 * [Open fusion menu] - Opens the fusion menu.
 * This command has no parameters.
 * 
 * ---------------------------------------------------------------------------
 * END OF HELP FILE
 * ===========================================================================
 */
// ------------------------------------------------------------------------------------------------
// STRUCT DEFINITIONS
// ------------------------------------------------------------------------------------------------
 /*~struct~DemonRaceFusionData:
 * @param First ID
 * @desc First race ID to fuse
 * @type number
 * @default 0
 * @param Second ID
 * @desc Second race ID to fuse
 * @type number
 * @default 1
 * @param Result
 * @desc Resulting race for fusion, based on 1st and 2nd races. Result will vary based on selected demons levels.
 * @type number
 * @default 2
 */

/*~struct~DemonTripleFusionData:
 * @param Requirements
 * @type enemy[]
 * @param Result
 * @type enemy
 */

(() => {
    const PLUGIN_NAME = "OZZ-SMTDemons Fusion";
    //#region Plugin Commands
    PluginManager.registerCommand(PLUGIN_NAME, "smtCallFusionMenu", args => {
        SceneManager.push(Scene_Fusion);
    });
    //#endregion
    /*
    * General use code
    */
    class OZSMTD_Fusion {
        /**
         * Sets up all required data for class. This includes parsing all configuration and preparing data for easy access.
         */
        constructor() {
            // 
            this.cachedData = {};
            // Load general settings
            var OZZSMTDF_Param = PluginManager.parameters(PLUGIN_NAME);
            // Vocabulary
            this.vocab = {};
            this.vocab['doublefusionCommand'] = OZZSMTDF_Param['TERM: Double Fusion'];
            this.vocab['triplefusionCommand'] = OZZSMTDF_Param['TERM: Triple Fusion'];
            this.vocab['doubleFusionHelp'] = OZZSMTDF_Param['TERM: Double Fusion Help'];
            this.vocab['tripleFusionHelp'] = OZZSMTDF_Param['TERM: Triple Fusion Help'];
            this.vocab['statusHelp'] = OZZSMTDF_Param['TERM: Status Help'];
            this.vocab['cancelFusionHelp'] = OZZSMTDF_Param['TERM: Cancel Help'];
            this.vocab['demonRace'] = OZZSMTDF_Param['TERM: Race text'];
            this.vocab['demonName'] = OZZSMTDF_Param['TERM: Name text'];
            this.vocab['fusionResult'] = OZZSMTDF_Param['TERM: Fusion result text'];
            this.vocab['fusionAccept'] = OZZSMTDF_Param['TERM: Fusion accept'];
            // General settings
            this.fusionBackName = OZZSMTDF_Param['Use Background'];
            this.resultBackName = OZZSMTDF_Param['Use Result Background'];
            this.fusionWindowOpacity = Number(OZZSMTDF_Param['Window Opacity']);
            this.fusionCommandOpacity = Number(OZZSMTDF_Param['Command Window Opacity']);
            this.fusionResultOpacity = Number(OZZSMTDF_Param['Result Window Opacity']);
            // Fusion result scene configuration
            this.spritesetAppearTime = Number(OZZSMTDF_Param['Scene appear time']); // 8
            this.spritesetDisappearTime = Number(OZZSMTDF_Param['Scene vanish time']); // 4
            this.enemyAppearLength = Number(OZZSMTDF_Param['Enemy appear length']); // 60
            this.enemyAnimationWait = Number(OZZSMTDF_Param['Animation Time']); // 120
            this.enemyAnimationEndWait = Number(OZZSMTDF_Param['Animation Ended Time']); // 120
            this.enemyWaitAfterAppear = Number(OZZSMTDF_Param['Wait after appear']); // 120
            this.enemyWaitAfterFusionFinish = Number(OZZSMTDF_Param['Wait after fusion finish']); // 300
            this.disappearAnimationId = Number(OZZSMTDF_Param['Disappear animation']); // 1
            this.appearAnimationId = Number(OZZSMTDF_Param['Appear animation']); // 1
            // Race fusions
            if (OZZSMTDF_Param['Race fusions'].length != 0) this.raceFusions = JSON.parse(OZZSMTDF_Param['Race fusions']);
            else this.raceFusions = [];
            this.raceFusionsPairs = [];
            for (var i = 0; i < this.raceFusions.length; i++) {
                this.raceFusions[i] = JSON.parse(this.raceFusions[i]);
                this.raceFusions[i].first = Number(this.raceFusions[i]['First ID']);
                this.raceFusions[i].second = Number(this.raceFusions[i]['Second ID']);
                this.raceFusions[i].result = Number(this.raceFusions[i]['Result']);
                // Cache on demon fusion pairings
                if (typeof this.raceFusionsPairs[this.raceFusions[i].first] === 'undefined')  this.raceFusionsPairs[this.raceFusions[i].first]  = [];
                if (typeof this.raceFusionsPairs[this.raceFusions[i].second] === 'undefined') this.raceFusionsPairs[this.raceFusions[i].second] = [];
                this.raceFusionsPairs[this.raceFusions[i].second][this.raceFusions[i].first] = this.raceFusions[i].result;
                this.raceFusionsPairs[this.raceFusions[i].first][this.raceFusions[i].second] = this.raceFusions[i].result;
            }
            // Demon fusions
            if (OZZSMTDF_Param['Demon fusions'].length != null) this.demonFusions = JSON.parse(OZZSMTDF_Param['Demon fusions']);
            else this.demonFusions = [];
            for (var i = 0; i < this.demonFusions.length; i++) {
                this.demonFusions[i] = JSON.parse(this.demonFusions[i]);
                this.demonFusions[i].requirements = JSON.parse(this.demonFusions[i]['Requirements']);
                for (var j = 0; j < this.demonFusions[i].requirements.length; j++) {
                    this.demonFusions[i].requirements[j] = Number(this.demonFusions[i].requirements[j]);
                }
                this.demonFusions[i].result = Number(this.demonFusions[i]['Result']);
            }
        }
        /**
         * Gets the resulting race out of combining two races (can be equal).
         * @param {number} first First race
         * @param {number} second Second race
         * @returns {number} Resulting race, null if not found.
         */
        CheckRaceFusion(first, second) { // returns result
            let f = this.raceFusionsPairs[first];
            if (typeof f === 'undefined' || f === null) return null;
            let result = this.raceFusionsPairs[first][second];
            if (typeof result === 'undefined' || result === null) return null;
            return result;
        }
        /**
         * Gets the resulting enemy fusion between two different enemies.
         * @param {number} first First enemy ID
         * @param {number} second Second enemy ID
         * @returns {number} Resulting enemy index (null if not found).
         */
        CheckRaceFusionResult(first, second) {
            // Get resulting race
            let raceFirst = OZ.smtd.RaceId(first.imitateEnemy);
            let raceSecond = OZ.smtd.RaceId(second.imitateEnemy);
            // Check if it's a valid fusion
            let raceResult = this.CheckRaceFusion(raceFirst, raceSecond);
            if (raceResult === null) return null;
            // Get levels
            let lvlFirst = first.level;
            let lvlSecond = second.level;
            let lvlAvg = (lvlFirst + lvlSecond) / 2;
            // Look for demon with appropiate level
            let result = null;
            let lastLevel = null;
            for (var eIdx = 1; eIdx < $dataEnemies.length; eIdx++) {
                let checkRace = OZ.smtd.RaceId(eIdx);
                // Check for appropiate race
                if (checkRace === raceResult) {
                    let checkLevel = OZ.smtd.GetStartingLevel(eIdx);
                    // Set this as result if haven't found another one
                    if (lastLevel == null) {
                        result = eIdx;
                        lastLevel = checkLevel;
                    } else {
                        if (checkLevel > lvlAvg) {
                            // Get the closest to the average
                            if (checkLevel < lastLevel) {
                                result = eIdx;
                                lastLevel = checkLevel;
                            }
                        } else {
                            // Get if it's higher
                            if (checkLevel > lastLevel) {
                                result = eIdx;
                                lastLevel = checkLevel;
                            }
                        }
                    }
                }
            }
            return result;
        }
        /**
         * Check if a combination of specific demons
         * @param {array} materials Array containing actors
         */
        CheckMultiFusionResult(materials) {
            let result = null;
            this.demonFusions.forEach(fusionData => {
                // Check if materials are valid for this fusion
                for (var i = 0; i < materials.length; i++) {
                    let currMat = materials[i];
                    if (!fusionData.requirements.includes(currMat.imitateEnemy)) {
                        // Invalid material for this fusion
                        return;
                    }
                }
                // If conditions are met, set result
                result = fusionData.result;
            });
            return result;
        }
    }
    if (typeof OZ === 'undefined') OZ = {};
    OZ.smtdf = new OZSMTD_Fusion();
    if (typeof OZ.smtd === 'undefined') console.warn("WARNING: Check for 'OZZ-SMTDemons' base module failed. Make sure to have it enabled and listed before this module, otherwise unexpected behaviour might occur.");
    //#region Fusion system
    //-----------------------------------------------------------------------------
    // Window_FusionCommand
    //      Command window for picking between the different fusion options.
    //#region Window_FusionCommand
    function Window_FusionCommand() {
        this.initialize(...arguments);
    }

    Window_FusionCommand.prototype = Object.create(Window_Command.prototype);
    Window_FusionCommand.prototype.constructor = Window_FusionCommand;
    Window_FusionCommand.prototype.initialize = function(rect) {
        Window_Command.prototype.initialize.call(this, rect);
    };

    Window_FusionCommand.prototype.makeCommandList = function() {
        this.addCommand(OZ.smtdf.vocab['doublefusionCommand'], "doubleFusion");
        this.addCommand(OZ.smtdf.vocab['triplefusionCommand'], "tripleFusion");
        this.addCommand(TextManager.status, "status");
        this.addCommand(TextManager.cancel, "back");
    };

    Window_FusionCommand.prototype.updateHelp = function() {
        switch(this.commandName(this.index())) {
            case OZ.smtdf.vocab['doublefusionCommand']: // Double fusion
                this._helpWindow.setText(OZ.smtdf.vocab['doubleFusionHelp']);
                break;
            case OZ.smtdf.vocab['triplefusionCommand']: // Triple fusion
                this._helpWindow.setText(OZ.smtdf.vocab['tripleFusionHelp']);
                break;
            case TextManager.status: // Status
                this._helpWindow.setText(OZ.smtdf.vocab['statusHelp']);
                break;
            case TextManager.cancel: // Cancel
                this._helpWindow.setText(OZ.smtdf.vocab['cancelFusionHelp']);
                break;
        }
    };
    //#endregion
    //-----------------------------------------------------------------------------
    // Window_FusionSelect
    //      Window that lists all available monsters.
    //#region Window_FusionSelect
    function Window_FusionSelect() {
        this.initialize(...arguments);
    }
    Window_FusionSelect.prototype = Object.create(Window_Selectable.prototype);
    Window_FusionSelect.prototype.constructor = Window_FusionSelect;
    Window_FusionSelect.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.mode = 0;
        this.selections = [];
        this.results = [];
        this.refresh();
    };
    Window_FusionSelect.prototype.clearSelections = function() {
        this.selections = [];
        this.results = [];
        //this.refresh();
        Window_Selectable.prototype.refresh.call(this);
    }
    Window_FusionSelect.prototype.selectedResult = function() {
        return this.results[this.index()];
    }
    Window_FusionSelect.prototype.selectionSize = function() {
        return this.selections.length;
    }
    Window_FusionSelect.prototype.pushSelection = function() {
        let element = this.item();
        if (this.selections.includes(element)) {
            this.selections.remove(element);
        }
        else {
            this.selections.push(element);
        }
        Window_Selectable.prototype.refresh.call(this);
    }
    Window_FusionSelect.prototype.popLastSelection = function() {
        this.selections.pop();
        Window_Selectable.prototype.refresh.call(this);
    }
    Window_FusionSelect.prototype.maxCols = function() {
        return 1;
    };
    Window_FusionSelect.prototype.colSpacing = function() {
        return 16;
    };
    Window_FusionSelect.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };
    Window_FusionSelect.prototype.item = function() {
        return this.itemAt(this.index());
    };
    Window_FusionSelect.prototype.itemAt = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };
    Window_FusionSelect.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.item());
    };
    Window_FusionSelect.prototype.isEnabled = function(item) {
        return true; // TODO: Based on if can fuse
    };
    Window_FusionSelect.prototype.makeItemList = function() {
        this._data = [];
        $gameParty.members().forEach(actor => {
            if (actor.isDemon()) {
                this._data.push(actor);
            }
        });
    };
    Window_FusionSelect.prototype.selectLast = function() {
        this.forceSelect(0);
    };
    Window_FusionSelect.prototype.drawItem = function(index) {
        const item = this.itemAt(index);
        if (item) {
            let selIdx = this.selections.indexOf(item);
            let result = null;
            // Get place to draw item
            const rect = this.itemLineRect(index);
            let halfWidth = (rect.width / 2) - 16;
            this.changePaintOpacity(this.isEnabled(item));
            // Draw selection index
            if (selIdx >= 0) {
                // Draw back based on if item was found
                this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, ColorManager.dimColor1());
                const lastFontSize = this.contents.fontSize;
                this.contents.fontSize = 12;
                this.drawText((selIdx+1), rect.x, rect.y, 24, "center");
                this.contents.fontSize = lastFontSize;
            }
            // Get result
            switch (this.mode) {
                case 'double':
                    if (this.selections.length > 0) {
                        let first = this.selections[0];
                        let second = item;
                        if (first != second) {
                            resultId = OZ.smtdf.CheckRaceFusionResult(first, second);
                            result = {id:resultId, selections:[first,second]};
                        }
                    }
                    break;
                case 'triple':
                    if (this.selections.length > 1) {
                        let currSelected = item;
                        if (!this.selections.includes(currSelected)) {
                            let allSelections = this.selections.concat([currSelected]);
                            let resultId = OZ.smtdf.CheckMultiFusionResult(allSelections);
                            result = {id:resultId, selections:allSelections};
                        }
                    }
                    break;
            }
            // Cache result.
            this.results[index] = result;
            // Draw demon data
            this.drawDemonData(item, rect.x, rect.y, halfWidth);
            // Draw fusion result (if any)
            this.drawFusionResult(result, rect.x + halfWidth + 16, rect.y, halfWidth);
            this.changePaintOpacity(1);
        }
    };
    Window_FusionSelect.prototype.drawDemonData = function(actor, x, y, width) {
        const levelWidth = this.textWidth("000");
        const columnWidth = (width - levelWidth) / 2;
        this.drawText(actor.nickname(), x + 24,              y, columnWidth - 24,   "left");  // race
        this.drawText(actor.name(),     x + columnWidth * 1, y, columnWidth,        "left");  // name
        this.drawText(actor.level,      x + columnWidth * 2, y, levelWidth,         "right"); // level
    };
    Window_FusionSelect.prototype.drawFusionResult = function(result, x, y, width) {
        const levelWidth = this.textWidth("000");
        const columnWidth = (width - levelWidth) / 2;
        if (result === null || result.id === null) {
            this.drawText("---",    x,                   y, columnWidth, "left"); // blank race
            this.drawText("---",    x + columnWidth * 1, y, columnWidth, "left"); // blank name
            this.drawText("--",     x + columnWidth * 2, y, levelWidth,  "right"); // blank level
        } else {
            this.drawText(OZ.smtd.Race(result.id).name,        x,                   y, columnWidth, "left"); // DB race
            this.drawText($dataEnemies[result.id].name,        x + columnWidth * 1, y, columnWidth, "left"); // DB name
            this.drawText(OZ.smtd.GetStartingLevel(result.id), x + columnWidth * 2, y, levelWidth,  "right"); // DB level
        }
    };
    Window_FusionSelect.prototype.updateHelp = function() {
        this.setHelpWindowItem(this.item());
    };
    Window_FusionSelect.prototype.refresh = function() {
        this.makeItemList();
        Window_Selectable.prototype.refresh.call(this);
    };
    Window_FusionSelect.prototype.setHelpWindowItem = function(item) {
        if (this._helpWindow) {
            this._helpWindow.setFusionInfo(item, this);
        }
    };
    Window_Help.prototype.setFusionInfo = function(item, fsn) {
        let str = "";
        if (fsn.selectionSize() > 0) {
            fsn.selections.forEach(i => {
                if (str.length > 0) str += " + ";
                str += "%1 %2".format(i.nickname(), i.name());
            });
            if (fsn.active) {
                if (!fsn.selections.includes(item)) str += " + %1 %2".format(item.nickname(), item.name());
            }
            result = fsn.selectedResult();
            if (result !== null && result.id !== null) str += "\n = %1 %2".format(OZ.smtd.Race(result.id).name, $dataEnemies[result.id].name);
        } else {
            if (item) {
                str = "%1 %2".format(item.nickname(), item.name());
            }
        }
        this.setText(str);
    };
    //#endregion
    //-----------------------------------------------------------------------------
    // Window_FusionResult
    //      Window showing the result for the fusion.
    //#region Window_FusionResult
    function Window_FusionResult() {
        this.initialize(...arguments);
    }
    Window_FusionResult.prototype = Object.create(Window_Selectable.prototype);
    Window_FusionResult.prototype.constructor = Window_FusionResult;
    Window_FusionResult.prototype.initialize = function(rect){
        Window_Selectable.prototype.initialize.call(this, rect);
        this.battlerGraphic = new Sprite();
        this.battlerGraphic.x = this.innerWidth * 0.8;
        this.battlerGraphic.y = this.innerHeight * 0.8;
        this.battlerGraphic.anchor.x = 0.5;
        this.battlerGraphic.anchor.y = 1;
        this.addChild(this.battlerGraphic);
        this.clearContents();
        this.setHandler("pageup", this.onPrev.bind(this));
        this.setHandler("pagedown", this.onNext.bind(this));
        this.skills = null;
    }
    Window_FusionResult.prototype.refresh = function() {
        Window_Selectable.prototype.refresh.call(this);
    };
    Window_FusionResult.prototype.clearContents = function() {
        this.selections = null;
        this.result = null;
        this.selectionIndex = 0;
    }
    Window_FusionResult.prototype.setContents = function(selections, result) {
        this.selections = selections;
        this.result = result;
        this.selectionIndex = 0;
        this.refresh();
        this.activate();
    }
    Window_FusionResult.prototype.onPrev = function() {
        if (this.selections == null) return;
        let len = this.selections.length+1;
        this.selectionIndex = (this.selectionIndex + len - 1) % len;
        this.refresh();
        this.activate();
    }
    Window_FusionResult.prototype.onNext = function() {
        if (this.selections == null) return;
        let len = this.selections.length+1;
        this.selectionIndex = (this.selectionIndex + 1) % len;
        this.refresh();
        this.activate();
    }
    Window_FusionResult.prototype.forceSelectResult = function() {
        if (this.selections == null) return;
        this.selectionIndex = this.selections.length;
        this.refresh();
        this.activate();
    }
    Window_FusionResult.prototype.drawAllItems = function() {
        // Check if any valid data
        if (this.selections === null) return;
        // Draw top options
        let len = this.selections.length+1;
        let arrowWidth = this.textWidth(" ⯇ "); // ⯇ ⯈
        let optWidth = (this.innerWidth - arrowWidth * 2) / len;
        this.drawText("⯇", 0, 0, arrowWidth, 'center');
        this.drawText("⯈", this.innerWidth - arrowWidth, 0, arrowWidth, 'center');
        for (var i = 0; i < len; i++) {
            let optX = arrowWidth + optWidth*i;
            if (this.selectionIndex == i) this.contents.fillRect(optX, 0, optWidth, this.lineHeight(), ColorManager.systemColor());
            if (i >= this.selections.length) this.drawText("RESULT", optX, 0, optWidth, 'center');
            else this.drawText("DEMON %1".format(i+1), optX, 0, optWidth, 'center');
        }
        // Horizontal division
        this.contents.fillRect(0, this.lineHeight(), this.innerWidth, 4, ColorManager.dimColor1());
        let object = null;
        if (this.selectionIndex >= this.selections.length) {
            // RESULT
            let data = $dataEnemies[this.result.id];
            // Create display data
            object = {}
            object.graphic = this.loadBattler(data.battlerName);
            object.race = OZ.smtd.Race(this.result.id).name;
            object.name = data.name;
            object.level = OZ.smtd.GetStartingLevel(this.result.id);
            // Statistics
            object.params = {hp:data.params[0], mp:data.params[1], atk:data.params[2], def:data.params[3], 
                mat:data.params[4], mdf:data.params[5], agi:data.params[6], luk:data.params[7]}
            // Skills
            if (this.skills !== null) this.skills.setEnemy(data);
        } else {
            // SELECTION n
            let data = this.selections[this.selectionIndex];
            // Create display data
            object = {}
            object.graphic = this.loadBattler(data.battlerName());
            object.race = data.nickname();
            object.name = data.name();
            object.level = data.level;
            // Statistics
            object.params = {hp:data.mhp, mp:data.mmp, atk:data.atk, def:data.def, mat:data.mat, mdf:data.mdf, agi:data.agi, luk:data.luk}
            // Skills
            if (this.skills !== null) this.skills.setActor(data);
        }
        if (object !== null) {
            // graphic
            this.battlerGraphic.bitmap = object.graphic;
            // Prepare whatever
            let lh = this.lineHeight();
            let cw = this.innerWidth / 4;
            let px = 16;
            let py = lh*2;
            this.contents.fillRect(0, py, this.innerWidth, this.lineHeight(), ColorManager.dimColor1());
            this.changeTextColor(ColorManager.systemColor());
            this.drawText(object.race, px+cw*0, py);
            this.changeTextColor(ColorManager.normalColor());
            this.drawText(object.name, px+cw*1, py);
            this.drawText(TextManager.levelA + object.level, px+cw*2, py);
            // stats
            py += lh;
            this.drawParameter(px+cw*0, py, cw, TextManager.hpA, object.params.hp);
            this.drawParameter(px+cw*1, py, cw, TextManager.mpA, object.params.mp);
            py += lh;
            this.drawParameter(px+cw*0, py, cw, TextManager.param(2), object.params.atk);
            this.drawParameter(px+cw*1, py, cw, TextManager.param(3), object.params.def);
            py += lh;
            this.drawParameter(px+cw*0, py, cw, TextManager.param(4), object.params.mat);
            this.drawParameter(px+cw*1, py, cw, TextManager.param(5), object.params.mdf);
            py += lh;
            this.drawParameter(px+cw*0, py, cw, TextManager.param(6), object.params.agi);
            this.drawParameter(px+cw*1, py, cw, TextManager.param(7), object.params.luk);
            py += lh;
            this.contents.fillRect(0, py, this.innerWidth, lh, ColorManager.dimColor1());
            this.drawText(TextManager.skill, px, py);
            // Set back to normal
            this.changeTextColor(ColorManager.normalColor());
        }
    };
    Window_FusionResult.prototype.drawParameter = function(x,y,w,name,value) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(name, x, y, w-16, 'left');
        this.changeTextColor(ColorManager.normalColor());
        this.drawText(value, x, y, w-16, 'right');
    };
    Window_FusionResult.prototype.loadBattler = function(name) {
        if ($gameSystem.isSideView()) {
            return ImageManager.loadSvEnemy(name);
        } else {
            return ImageManager.loadEnemy(name);
        }
    }
    //#endregion
    //-----------------------------------------------------------------------------
    // Window_FusionResultSkillList
    //      Confirmation window for fusion.
    //-----------------------------------------------------------------------------
    //#region Window_FusionResultSkillList
    function Window_FusionResultSkillList() {
        this.initialize(...arguments);
    }
    Window_FusionResultSkillList.prototype = Object.create(Window_Selectable.prototype);
    Window_FusionResultSkillList.prototype.constructor = Window_FusionResultSkillList;
    Window_FusionResultSkillList.prototype.initialize = function(rect){
        Window_Selectable.prototype.initialize.call(this, rect);
        this._data = [];
    }
    Window_FusionResultSkillList.prototype.setEnemy = function(data) {
        this._actor = null;
        this._enemy = data;
        this.refresh();
    }
    Window_FusionResultSkillList.prototype.setActor = function(data) {
        this._actor = data;
        this._enemy = null;
        this.refresh();
    }
    Window_FusionResultSkillList.prototype.makeItemList = function() {
        if (this._actor) {
            // Get actor  skills. Super simple.
            this._data = this._actor.skills();
        } else if (this._enemy){
            this._data = [];
            let level = OZ.smtd.GetStartingLevel(this._enemy.id);
            this._enemy.actions.forEach(action => {
                let learn = Game_Actor.prototype.shouldLearnActionSkill(action, level);
                if (learn) this._data.push($dataSkills[action.skillId]);
            });
        } else {
            this._data = [];
        }
        this.forceSelect(0);
        this.updateHelp();
    };
    Window_FusionResultSkillList.prototype.maxItems = function() {
        return this._data.length;
    };
    Window_FusionResultSkillList.prototype.itemAt = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };
    Window_FusionResultSkillList.prototype.drawItem = function(index) {
        const skill = this.itemAt(index);
        if (skill) {
            const costWidth = Window_SkillList.prototype.costWidth.call(this);
            const rect = this.itemLineRect(index);
            this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
            this.drawSkillCost(skill, rect.x, rect.y, rect.width);
        }
    };
    Window_FusionResultSkillList.prototype.drawSkillCost = function(skill, x, y, width) {
        if (skill.tpCost > 0) {
            this.changeTextColor(ColorManager.tpCostColor());
            this.drawText(skill.tpCost, x, y, width, "right");
        } else if (skill.mpCost > 0) {
            this.changeTextColor(ColorManager.mpCostColor());
            this.drawText(skill.mpCost, x, y, width, "right");
        }
    };
    Window_FusionResultSkillList.prototype.item = function() {
        return this._data[this.index()];
    }
    Window_FusionResultSkillList.prototype.refresh = function() {
        this.makeItemList();
        Window_Selectable.prototype.refresh.call(this);
    };
    Window_FusionResultSkillList.prototype.maxCols = function() {
        return 2;
    };
    Window_FusionResultSkillList.prototype.updateHelp = function() {
        this.setHelpWindowItem(this.item());
    };
    //#endregion
    // Window_FusionResultCommand
    //      Confirmation window for fusion.
    //#region Window_FusionResultCommand
    function Window_FusionResultCommand() {
        this.initialize(...arguments);
    }
    Window_FusionResultCommand.prototype = Object.create(Window_Command.prototype);
    Window_FusionResultCommand.prototype.constructor = Window_FusionResultCommand;
    Window_FusionResultCommand.prototype.initialize = function(rect) {
        this.fusionEnable = false;
        Window_Selectable.prototype.initialize.call(this, rect);
        this.refresh();
    }
    Window_FusionResultCommand.prototype.makeCommandList = function() {
        this.addCommand(OZ.smtdf.vocab['fusionAccept'], "ok", this.fusionEnable);
        this.addCommand(TextManager.cancel, "cancel", true);
    };
    Window_FusionResultCommand.prototype.setEnable = function(value) {
        this.fusionEnable = value;
        this.refresh();
    }
    //#endregion
    //-----------------------------------------------------------------------------
    // Scene_Fusion
    //      The scene class of the fusion screen.
    //#region Scene_Fusion
    function Scene_Fusion() {
        this.initialize(...arguments);
    }
    Scene_Fusion.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Fusion.prototype.constructor = Scene_Fusion;
    Scene_Fusion.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };
    Scene_Fusion.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        // Create windows
        this.createHelpWindow();
        this.createFusionStatusWindow();
        this.createCommandWindow();
        // Create fusion result window
        this.createFusionResultWindows();
    };
    Scene_Fusion.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        //
    };
    Scene_Fusion.prototype.createBackground = function() {
        Scene_MenuBase.prototype.createBackground.call(this);
        // Create background
        this.createOverlay();
    }
    Scene_Fusion.prototype.createOverlay = function() {
        this.back1 = null;
        this.back2 = null;
        // Create from a specific image
        if (OZ.smtdf.fusionBackName !== undefined && OZ.smtdf.fusionBackName !== null && OZ.smtdf.fusionBackName !== "") {
            this.back1 = ImageManager.loadSystem(OZ.smtdf.fusionBackName);
        } else {
        // Generate background
            this.back1 = new Bitmap(Graphics.width, Graphics.height);
            const windowRect = this.statusWindowRect();
            const cTrans = ColorManager.dimColor2();
            const cSolid = ColorManager.dimColor1();
            const cBase1 = ColorManager.gaugeBackColor();
            const cBase2 = ColorManager.outlineColor();
            // Fill the top part
            y = 0;
            h = windowRect.y - Window_Base.prototype.lineHeight();
            this.back1.gradientFillRect (0, y, Graphics.width, h, cTrans, cBase1, true);
            y += h;
            h = Window_Base.prototype.lineHeight();
            this.back1.gradientFillRect (0, y, Graphics.width, h, cBase1, cSolid, true);
            y += h;
            h = 8;
            this.back1.gradientFillRect (0, y, Graphics.width, h, cSolid, cBase1, true);
            y += h;
            h = windowRect.height;
            this.back1.gradientFillRect (0, y, Graphics.width, h, cBase1, cBase2, true);
            y += h;
            h = Graphics.height - y;
            this.back1.gradientFillRect (0, y, Graphics.width, h, cBase2, cTrans, true);
            // Draw title texts
            lh = Window_Base.prototype.lineHeight();
            x = windowRect.x + 28;
            y = windowRect.y - lh;
            const halfWidth = (windowRect.width / 2) - 28 - 16;
            const levelWidth = Math.floor(this.back1.measureTextWidth("000"));
            const columnWidth = (halfWidth - levelWidth) / 2;
            this.back1.drawText (OZ.smtdf.vocab['demonRace'], x, y, columnWidth, lh, "left");
            x += columnWidth;
            this.back1.drawText (OZ.smtdf.vocab['demonName'], x, y, columnWidth, lh, "left");
            x += columnWidth;
            this.back1.drawText (TextManager.levelA.toUpperCase(), x, y, levelWidth, lh, "right");
            x += levelWidth + 16;
            this.back1.drawText (OZ.smtdf.vocab['fusionResult'], x, y, halfWidth, lh, "left");
        }
        if (OZ.smtdf.resultBackName !== undefined && OZ.smtdf.resultBackName !== null && OZ.smtdf.resultBackName !== "") {
            this.back2 = ImageManager.loadSystem(OZ.smtdf.resultBackName);
        } else {
            this.back2 = new Bitmap(Graphics.width, Graphics.height);
            this.back2.gradientFillRect (0, 0, Graphics.width, Graphics.height, ColorManager.gaugeBackColor(), ColorManager.dimColor1(), true);
        }
        this._overlaySprite = new Sprite(this.back1);
        this.addChild(this._overlaySprite);
    }
    Scene_Fusion.prototype.switchOverlay = function(overlay) {
        this._overlaySprite.bitmap = overlay;
    }
    Scene_Fusion.prototype.createCommandWindow = function() {
        const rect = this.commandWindowRect();
        const commandWindow = new Window_FusionCommand(rect);
        commandWindow.setHelpWindow(this._helpWindow);
        commandWindow.opacity = OZ.smtdf.fusionCommandOpacity;
        commandWindow.setHandler("doubleFusion", this.commandDoubleFusion.bind(this));
        commandWindow.setHandler("tripleFusion", this.commandMultiFusion.bind(this));
        commandWindow.setHandler("status", this.commandStatus.bind(this));
        commandWindow.setHandler("back", this.popScene.bind(this));
        commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(commandWindow);
        this._commandWindow = commandWindow;
    };
    Scene_Fusion.prototype.createFusionStatusWindow = function() {
        const rect = this.statusWindowRect();
        const statusWindow = new Window_FusionSelect(rect);
        statusWindow.setHelpWindow(this._helpWindow);
        statusWindow.deactivate();
        statusWindow.opacity = OZ.smtdf.fusionWindowOpacity;
        statusWindow.forceSelect(0);
        // Handlers
        statusWindow.setHandler("ok", this.commandFusionAccept.bind(this));
        statusWindow.setHandler("cancel", this.commandFusionBack.bind(this));
        this.addWindow(statusWindow);
        this._statusWindow = statusWindow;
    }
    Scene_Fusion.prototype.createFusionResultWindows = function() {
        const rectResult = this.fusionResultWindowRect();
        const resultWindow = new Window_FusionResult(rectResult);
        resultWindow.setHandler("ok", this.commandShow.bind(this));
        resultWindow.setHandler("cancel", this.commandHide.bind(this));
        resultWindow.deactivate();
        resultWindow.visible = false;
        resultWindow.opacity = OZ.smtdf.fusionResultOpacity;
        // Handlers
        this.addWindow(resultWindow);
        this._resultWindow = resultWindow;
        // Add result skills
        const rectSkills = this.fusionSkillsWindowRect();
        const skillsWindow = new Window_FusionResultSkillList(rectSkills);
        this._resultWindow.skills = skillsWindow;
        //skillsWindow.opacity = 0;
        skillsWindow.setHelpWindow(this._helpWindow);
        skillsWindow.opacity = OZ.smtdf.fusionResultOpacity;
        skillsWindow.visible = false;
        // Handlers
        this.addWindow(skillsWindow);
        this._skillsWindow = skillsWindow;
        // Add result command
        const rectCommand = this.fusionResultCommandRect();
        const resultCommand = new Window_FusionResultCommand(rectCommand);
        resultCommand.opacity = OZ.smtdf.fusionCommandOpacity;
        resultCommand.setHandler("ok",      this.commandResultAccept.bind(this));
        resultCommand.setHandler("cancel",  this.commandResultCancel.bind(this));
        resultCommand.visible = false;
        this.addWindow(resultCommand);
        this._resultCommand = resultCommand;
    };
    Scene_Fusion.prototype.setResultScreen = function(state) {
        // Swap overlay
        this.switchOverlay(state ? this.back2 : this.back1);
        // Hide previous screen
        this._statusWindow.active = !state;
        this._statusWindow.visible= !state;
        // Show/enable windows
        this._resultWindow.active = state;
        this._resultWindow.visible = state;
        if (state) this._resultWindow.forceSelectResult();
        this._skillsWindow.active = state;
        this._skillsWindow.visible = state;
        this._resultCommand.active = false;
        this._resultCommand.visible = false;
        this._resultCommand.forceSelect(0);
        // Check if can fuse
        let requiredLevel = OZ.smtd.GetStartingLevel(this._resultWindow.result.id);
        let currentLevel = $gameParty.leader().level;
        this._resultCommand.setEnable(currentLevel >= requiredLevel);
    };
    Scene_Fusion.prototype.commandShow = function() {
        this._resultCommand.active = true;
        this._resultCommand.visible = true;
        this._resultWindow.active = false;
    }
    Scene_Fusion.prototype.commandHide = function() {
        // Just go back to the list.
        this.setResultScreen(false);
        this._statusWindow.clearSelections();
    }
    Scene_Fusion.prototype.commandResultAccept = function() {
        this.setResultScreen(false); // TMP
        this._statusWindow.clearSelections();
        // Add data to $gameTemp
        $gameTemp.smtdFusionSelections = this._resultWindow.selections;
        $gameTemp.smtdFusionResult = this._resultWindow.result;
        SceneManager.push(Scene_FusionResult);
    }
    Scene_Fusion.prototype.commandResultCancel = function() {
        this._resultCommand.active = false;
        this._resultCommand.visible = false;
        this._resultWindow.active = true;
    }
    Scene_Fusion.prototype.commandDoubleFusion = function() {
        // TODO: Double Fusion
        this._commandWindow.deactivate();
        this._commandWindow.visible = false;
        this._statusWindow.activate();
        this._statusWindow.mode = 'double';
        this._statusWindow.clearSelections();
    };
    Scene_Fusion.prototype.commandMultiFusion = function() {
        // TODO: Double Fusion
        this._commandWindow.deactivate();
        this._commandWindow.visible = false;
        this._statusWindow.activate();
        this._statusWindow.mode = 'triple';
        this._statusWindow.clearSelections();
    };
    Scene_Fusion.prototype.commandStatus = function() {
        this._commandWindow.deactivate();
        this._commandWindow.visible = false;
        this._statusWindow.activate();
        this._statusWindow.mode = 'status';
        this._statusWindow.clearSelections();
    };
    Scene_Fusion.prototype.commandFusionAccept = function() {
        switch (this._statusWindow.mode) {
            case 'double':
                this._statusWindow.pushSelection();
                if (this._statusWindow.selectionSize() == 2) {
                    this._resultWindow.setContents(this._statusWindow.selections, this._statusWindow.selectedResult());
                    this.setResultScreen(true);
                } else {
                    this._statusWindow.activate();
                }
                break;
            case 'triple':
                let r = this._statusWindow.selectedResult();
                if (r !== null && r.id !== null) {
                    console.log(r);
                    this._statusWindow.pushSelection();
                    this._resultWindow.setContents(this._statusWindow.selections, r);
                    this.setResultScreen(true);
                } else {
                    this._statusWindow.pushSelection();
                    this._statusWindow.activate();
                }
                break;
            default:
                // Default will be status
                $gameParty.setMenuActor(this._statusWindow.item());
                SceneManager.push(Scene_Status);
                break;
        }
    };
    Scene_Fusion.prototype.commandFusionBack = function() {
        if (this._statusWindow.selectionSize() > 0) {
            this._statusWindow.popLastSelection();
            this._statusWindow.activate();
            return;
        }
        this._statusWindow.deactivate();
        this._commandWindow.visible = true;
        this._commandWindow.activate();
        this._statusWindow.mode = 'none';
        this._statusWindow.clearSelections();
    };
    Scene_Fusion.prototype.commandWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.mainAreaHeight();
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Fusion.prototype.statusWindowRect = function() {
        const ww = Graphics.boxWidth;
        const wh = this.mainAreaHeight();
        const wx = 0;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Fusion.prototype.fusionResultWindowRect = function() {
        const ww = Graphics.boxWidth;
        const wh = this.mainAreaHeight();
        const wx = 0;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Fusion.prototype.fusionResultCommandRect = function() {
        const ww = Graphics.boxWidth * 4 / 10;
        const wh = this.calcWindowHeight(2, true);
        const wx = (Graphics.boxWidth - ww);
        const wy = (this.mainAreaTop() + this.mainAreaHeight() - wh);
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Fusion.prototype.fusionSkillsWindowRect = function() {
        const baseRect = this.fusionResultWindowRect();
        let lh = Window_Base.prototype.lineHeight();
        const ww = baseRect.width * 2 / 3 - lh;
        const wh = baseRect.height - (lh * 9);
        const wx = baseRect.x + 16;
        const wy = (this.mainAreaTop() + this.mainAreaHeight() - wh - lh/2);
        return new Rectangle(wx, wy, ww, wh);
    };
    //#endregion
    //-----------------------------------------------------------------------------
    // Scene_FusionResult
    //      The scene class for the fusion animation thingie.
    //#region Scene_FusionResult
    function Scene_FusionResult() {
        this.initialize(...arguments);
    }
    Scene_FusionResult.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_FusionResult.prototype.constructor = Scene_FusionResult;
    Scene_FusionResult.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
        // Get cached data.
        this.selections = $gameTemp.smtdFusionSelections;
        this.result = $gameTemp.smtdFusionResult;
        // Clean cache.
        $gameTemp.smtdFusionSelections = null;
        $gameTemp.smtdFusionResult = null;
    };
    Scene_FusionResult.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        //
    };
    Scene_FusionResult.prototype.create = function() {
        this.createDemons();
        this.sceneAppearTimer = 0;
        this.sceneDisappearTimer = 0;
        this.appearedSprites = 0;
        this.disappearedSprites = 0;
        this.waitTimer = 0;
        Scene_MenuBase.prototype.create.call(this);
    };
    Scene_FusionResult.prototype.createBackground = function() {
        Scene_MenuBase.prototype.createBackground.call(this);
        // Create background
        this.createFusionBackground();
    }
    Scene_FusionResult.prototype.createFusionBackground = function() {
        this._spriteset = new Spriteset_Battle();
        this._spriteset.opacity = 0;
        this.addChild(this._spriteset);
    }
    Scene_FusionResult.prototype.spritesetAppearTime = function() {
        return OZ.smtdf.spritesetAppearTime; // 8
    }
    Scene_FusionResult.prototype.spritesetDisappearTime = function() {
        return OZ.smtdf.spritesetDisappearTime; // 4
    }
    Scene_FusionResult.prototype.enemyWaitAfterAppear = function() {
        return OZ.smtdf.enemyWaitAfterAppear; // 60
    }
    Scene_FusionResult.prototype.enemyWaitAfterFusionFinish = function() {
        return OZ.smtdf.enemyWaitAfterFusionFinish; // 60
    }
    Scene_FusionResult.prototype.enemyAppearLength = function() {
        return OZ.smtdf.enemyAppearLength; // 60;
    }
    Scene_FusionResult.prototype.enemyAnimationWait = function() {
        return OZ.smtdf.enemyAnimationWait; // 120;
    }
    Scene_FusionResult.prototype.enemyAnimationEndWait = function() {
        return OZ.smtdf.enemyAnimationEndWait; // 120;
    }
    Scene_FusionResult.prototype.disappearAnimationId = function() {
        return OZ.smtdf.disappearAnimationId; // 1;
    }
    Scene_FusionResult.prototype.appearAnimationId = function() {
        return OZ.smtdf.appearAnimationId; // 1;
    }
    Scene_FusionResult.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        if (this.waitTimer > 0) {
            this.waitTimer --;
            return;
        }
        // Scene appear
        if (this.sceneAppearTimer < this.spritesetAppearTime()) {
            let opac = this.sceneAppearTimer * 255 / this.spritesetAppearTime();
            this._spriteset.opacity = Math.round(opac);
            this.sceneAppearTimer++;
            return;
        }
        // Update scene, do stuff.
        if (Input.isTriggered('ok')) {
            this.onClose();
            return;
        }
        // Enemies appear
        if (this.appearedSprites < this.selections.length) {
            this.gameEnemies[this.appearedSprites].appear();
            this.appearedSprites ++;
            if (this.appearedSprites >= this.selections.length) {
                this.waitTimer = this.enemyWaitAfterAppear();
            } else {
                this.waitTimer = this.enemyAppearLength() / this.selections.length;
            }
            return;
        }
        // Enemies disappear
        if (this.disappearedSprites < this.selections.length) {
            let currEnemy = this.gameEnemies[this.disappearedSprites];
            this.showAnimation([currEnemy], this.disappearAnimationId());
            currEnemy.hide();
            this.disappearedSprites ++;
            if (this.disappearedSprites >= this.selections.length) {
                this.waitTimer = this.enemyAnimationEndWait();
            } else {
                this.waitTimer = this.enemyAnimationWait() / this.selections.length;
            }
            return;
        }
        // Result appear
        if (this.appearedSprites < this.gameEnemies.length) {
            let currEnemy = this.gameEnemies[this.appearedSprites];
            currEnemy.appear();
            this.showAnimation([currEnemy], this.appearAnimationId());
            this.appearedSprites ++;
            this.waitTimer = this.enemyWaitAfterFusionFinish();
            return;
        }
        if (this.sceneDisappearTimer < this.spritesetDisappearTime()) {
            let opac = 255 - (this.sceneDisappearTimer * 255 / this.spritesetDisappearTime());
            this._spriteset.opacity = Math.round(opac);
            this.sceneDisappearTimer++;
            return;
        }
        this.onClose();
    }
    Scene_FusionResult.prototype.onClose = function() {
        this.applyFusion();
        this.popScene();
    }
    Scene_FusionResult.prototype.applyFusion = function() {
        for (var i = 0; i < this.selections.length; i++) {
            let aID = this.selections[i].actorId();
            if (i == 0) {
                // Create a demon over the first selection.
                let eID = this.result.id;
                OZ.smtd.CreateDemon(eID, aID);
            } else {
                // Delete all other demons selected.
                OZ.smtd.RemoveDemon(aID);
            }
        }
    }
    Scene_FusionResult.prototype.createDemons = function() {
        // this.selections : actors
        // this.result : dbEnemy
        // Add and position selected members
        let enemiesData = [];
        let degToRad = Math.PI / 180;
        let middleWidth = Graphics.width / 2;
        let middleHeight= Graphics.height / 2;
        let vDisplacement = Graphics.height * 0.2;
        let angleStep = 360 / this.selections.length;
        let currAngle = 90 + angleStep/2;
        let distanceW = middleWidth * 0.6;
        let distanceH = middleHeight * 0.5;
        for (var i = 0; i < this.selections.length; i++) {
            let actor = this.selections[i];
            let rad = currAngle * degToRad;
            let nx = Math.cos(rad) * distanceW + middleWidth;
            let ny = Math.sin(rad) * distanceH + middleHeight + vDisplacement;
            const newMember = {enemyId:actor.imitateEnemy, x:nx, y:ny};
            enemiesData.push(newMember);
            currAngle += angleStep;
        }
        // Add resulting member
        let rx = middleWidth;
        let ry = middleHeight + vDisplacement;
        let eId = this.result.id;
        const resultMember = {enemyId:eId, x:rx, y:ry};
        enemiesData.push(resultMember);
        // Create troop
        let troop = new Game_Troop();
        troop.clear();
        troop._troopId = -1;
        this.gameEnemies = [];
        // this.appear();
        for (const member of enemiesData) {
            if ($dataEnemies[member.enemyId]) {
                const enemyId = member.enemyId;
                const x = member.x;
                const y = member.y;
                const enemy = new Game_Enemy(enemyId, x, y);
                enemy.hide();
                this.gameEnemies.push(enemy);
            }
        }
        troop._enemies = this.gameEnemies;
        troop.makeUniqueNames();
        $gameTroop = troop;
    }
    // Show Animation
    Scene_FusionResult.prototype.showAnimation = function(targets, animationId) {
        $gameTemp.requestAnimation(targets, animationId);
    };
    //#endregion
    //#endregion
    /// End of Plugin
})();
