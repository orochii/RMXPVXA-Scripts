//=============================================================================
// RPG Maker MZ - SMT Demons
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Shin Megami Tensei styled demon recruiting. v1
 * @author Orochii Zouveleki
 * ------------------------------------------------------------------------------------------------
 * PARAMETERS
 * ------------------------------------------------------------------------------------------------
 * @param General settings
 * 
 * @param Actors for demon slots
 * @parent General settings
 * @desc List of actors that will be used and overriden by demons.
 * @type actor[]
 * @default []
 * 
 * @param HP/MP Formula
 * @parent General settings
 * @desc Determines growth for HP/MP on demons.
 * @default base + deltaLevel*2 + (base * deltaLevel / 9) / startLevel
 * 
 * @param Parameter Formula
 * @parent General settings
 * @desc Determines parameter growth on demons.
 * @default base + deltaLevel + (base * deltaLevel / 10) / startLevel
 * 
 * @param Demons settings
 * 
 * @param Default demon class
 * @parent Demons settings
 * @desc Class used by ALL demons.
 * @type class
 * @default 2
 * 
 * @param Default character
 * @parent Demons settings
 * @desc Default character sprite for demons
 * @type file
 * @dir img/characters/
 * @default Monster
 * 
 * @param Default character index
 * @parent Demons settings
 * @desc Default character index for demons
 * @type number
 * @default 0
 * 
 * @param Default face
 * @parent Demons settings
 * @desc Default character sprite for demons
 * @type file
 * @dir img/faces/
 * @default Monster
 * 
 * @param Default face index
 * @parent Demons settings
 * @desc Default character index for demons
 * @type number
 * @default 0
 * 
 * @param Race config
 * 
 * @param Demon races
 * @parent Race config
 * @desc All names for demon types
 * @type struct<DemonRaceData>[]
 * @default ["{\"Name\":\"Fairy\",\"Default personality\":\"0\"}","{\"Name\":\"Jirae\",\"Default personality\":\"0\"}","{\"Name\":\"Wilder\",\"Default personality\":\"0\"}","{\"Name\":\"Foul\",\"Default personality\":\"0\"}","{\"Name\":\"Ghost\",\"Default personality\":\"0\"}","{\"Name\":\"Avian\",\"Default personality\":\"0\"}","{\"Name\":\"Vile\",\"Default personality\":\"0\"}","{\"Name\":\"Night\",\"Default personality\":\"0\"}","{\"Name\":\"Snake\",\"Default personality\":\"0\"}","{\"Name\":\"Divine\",\"Default personality\":\"0\"}","{\"Name\":\"Deity\",\"Default personality\":\"0\"}","{\"Name\":\"Element\",\"Default personality\":\"0\"}","{\"Name\":\"Gaean\",\"Default personality\":\"0\"}","{\"Name\":\"Tyrant\",\"Default personality\":\"0\"}","{\"Name\":\"Machine\",\"Default personality\":\"0\"}"]
 * 
 * @param Demon personalities
 * @parent Race config
 * @desc All personalities a demon can have
 * @type struct<DemonPersonality>[]
 * @default ["{\"Name\":\"Normal\",\"Negotiation events\":\"[\\\"{\\\\\\\"Negotiation kind\\\\\\\":\\\\\\\"talk\\\\\\\",\\\\\\\"Trigger events\\\\\\\":\\\\\\\"[\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"]\\\\\\\"}\\\"]\",\"On failed negotiation\":\"2\"}"]
 * @
 * ------------------------------------------------------------------------------------------------
 * COMMANDS
 * ------------------------------------------------------------------------------------------------
 * @command smtDemonAdd
 * @text Create demon
 * @desc Create a demon (enemy) in an actor slot.
 * 
 * @arg enemyId
 * @type enemy
 * @text Enemy Id
 * @desc Enemy to be "copied".
 * 
 * @arg actorId
 * @type actor
 * @text Target Actor
 * @desc Actor slot to be used.
 * 
 * @command smtDemonRemove
 * @text Remove demon
 * @desc Remove a demon by actor ID.
 * 
 * @arg actorId
 * @type actor
 * @text Actor ID
 * @desc Demon slot to be reset and removed from party.
 * 
 * @command smtDemonRemoveById
 * @text Remove by Enemy Id
 * @desc Remove a demon based on the enemy ID.
 * 
 * @arg enemyId
 * @type enemy
 * @text Enemy ID
 * @desc Enemy ID to look up for and remove.
 * 
 * @command smtDemonRecruited
 * @text Is Demon Recruited
 * @desc Returns if you have a specific demon in your possesion.
 * 
 * @arg enemyId
 * @type enemy
 * @text Enemy ID
 * @desc Enemy ID to look for.
 * 
 * @arg switchId
 * @type switch
 * @text Result switch
 * @desc Switch to set based on result.
 * 
 * @command smtCopyTargetName
 * @text Copy target name to variable
 * @desc Copies the current target name to a variable, to later on 
 * be inserted into a text i.e. by using \v[1].
 * 
 * @arg variableId
 * @type variable
 * @text Target variable
 * @desc Variable to copy the target name into.
 * 
 * @arg originalName
 * @type boolean
 * @text Use original name
 * @desc Should name exclude unique signs? (i.e. Goblin A).
 * 
 * @command smtHasTarget
 * @text Check target recruited
 * @desc Checks if current negotiation target has been recruited already.
 * Useful for ignoring duplicates.
 * 
 * @arg switchId
 * @type switch
 * @text Result switch
 * @desc Switch where result will be stored (for conditional branches and stuff).
 * 
 * @command smtAddNegotiationTarget
 * @text Recruit negotiation target
 * @desc Adds the current negotiation target to the party.
 * 
 * @arg switchId
 * @type switch
 * @text Result switch
 * @desc Switch where result will be stored (for conditional branches and stuff).
 * Adding a demon only fails when there is no space in your demon slots.
 * 
 * @command smtNegotiationTargetEscape
 * @text Negotiation target escape
 * @desc Make the negotiation target escape, used in any case the enemy must be hidden.
 
 * @help ===========================================================================
 * OZZ-SMTDemons.js
 * ===========================================================================
 * 
 * ---------------------------------------------------------------------------
 * INTRODUCTION:
 * ---------------------------------------------------------------------------
 * This plugin enables the use and recruitment of enemies in a similar
 * way to the Shin Megami Tensei series. That is, recruiting enemies
 * via negotiation skills, which lets you talk to the enemy and, 
 * in this case, decide the outcome of this negotiation based on the 
 * enemy personality.
 * 
 * Setting things up is kind of cumbersome, but I tried to do the best 
 * I could to provide both functionalities and ways to extend them and
 * do as much as you want. You can even use just the negotiation aspects
 * and do your own. Or use it to arbitrarily add any enemy to your party
 * via events.
 * 
 * Please look into the plugin commands, and try them out, to understand 
 * the kind of effects they have. And then... enjoy!
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
 * - General commands: These commands are meant to be used in any situation.
 * 
 * [Create demon] - Create a demon in a specific actor slot.
 * PARAMETERS:
 *  - Enemy ID: Enemy ID to use.
 *  - Target actor: Actor slot to place the demon into.
 * 
 * [Remove demon] - Removes a demon from a specific actor slot.
 * PARAMETERS:
 *  - Actor ID: Actor slot to be freed.
 * 
 * [Remove by Enemy Id] - Removes a specific demon based on its enemy ID.
 * PARAMETERS:
 *  - Enemy ID: ID of enemy to look for.
 * 
 * [Is Demon Recruited] - Checks if a demon with a matching enemy ID has 
 * been recruited and in your possession.
 * PARAMETERS:
 *  - Enemy ID: ID of enemy to look for.
 *  - Result Switch: Switch where result will be stored.
 * 
 * - Battle commands: These commands will only be available while in battle.
 * They also are meant to be used while in middle of a negotiation event.
 * Using these outside of those situations might cause unexpected results.
 * 
 * [Copy target name to variable] - Copies the current negotiation target
 * name to a variable, to be used inside Message Text commands.
 * Keep in mind it's advisable to reset the variable's name via a Set
 * Variable command after finishing using it.
 * PARAMETERS:
 *  - Target variable: ID for variable to place the enemy name into.
 *  - Use original name: Should the unique marks (A, B, C) be ignored.
 * 
 * [Check target recruited] - Checks if a demon in your recruited demons
 * shares the same enemy ID as the negotiation target. Useful to avoid
 * duplicates in your group. Ignore it if you don't mind.
 * PARAMETERS:
 *  - Result switch: Switch to store result.
 * 
 * [Recruit negotiation target] - Adds the negotiation target to your party.
 * PARAMETERS:
 *  - Result switch: Switch to store result.
 * 
 * [Negotiation target escape] - Removes the negotiation target from battle.
 * 
 * ---------------------------------------------------------------------------
 * ENEMY NOTETAGS:
 * ---------------------------------------------------------------------------
 * Enemies are configured through the use of enemy notetags. There is 
 * quite a lot to add there.
 * 
 * <race:number> - Sets up the race ID for the enemy (based on numbering at)
 * the Race configurations from the plugin. If ommited, race is 0 by default.
 * I.e. <race:1> will set up the race to the second in list.
 * 
 * <class:number> - Class number to use for this enemy. When ommited, uses
 * the default class in the plugin configuration.
 * I.e. <class:1> will make it use the first class in the Database.
 * 
 * <charName:text> - The name of the character graphic to use.
 * If ommited, it will default to whatever graphic is set up in the 
 * plugin configuration.
 * I.e. <charName:Monster> will make it use the Monster character graphic.
 * 
 * <charIdx:number> - The character index, out of the 8 available per graphic
 * (use 0 if it's a character graphic starting with $). Default is set up in 
 * plugin.
 * I.e. <charIdx:2> will make it use the third character in the graphic.
 * 
 * <faceName:text> - The name for the face graphic to use. Defaults to
 * whatever name was set up on plugin if the tag is ommited.
 * I.e. <faceName:Hero1> will make it use the face graphic Hero1.
 * 
 * <faceIdx:number> - Face index in the face graphic to be used.
 * Default is set up via the plugin configuration.
 * I.e. <faceIdx:4> will make it use the fifth face in the graphic.
 * 
 * <level:number> - Sets the enemy starting level, which in turn determines
 * the enemy growth as a character. When ommited, defaults to 1.
 * I.e. <level:50> makes the enemy start at level 50.
 * 
 * <personality:number> - Sets the enemy personality, used on negotiation 
 * events. If ommited, its default value is dependant on the enemy's race.
 * I.e. <personality:2> will set its personality to the third entry.
 * 
 * ---------------------------------------------------------------------------
 * SKILL NOTETAGS:
 * ---------------------------------------------------------------------------
 * This system only adds one notetag, which enables any skill to become
 * a 'negotiation skill'.
 * 
 * <negotiate:kind> - Sets the skill to be a negotiation skill. The kind
 * of negotiation skill is up to you.
 * I.e. <negotiate:talk> will set it up to be the of the 'talk' kind.
 * If ommited, the skill is not a negotiation skill.
 * 
 * ---------------------------------------------------------------------------
 * END OF HELP FILE
 * ===========================================================================
 * 
 */
// ------------------------------------------------------------------------------------------------
// STRUCT DEFINITIONS
// ------------------------------------------------------------------------------------------------
 /*~struct~DemonRaceData:
 * @param Name
 * @desc Race name
 * @type text
 * @default Fairy
 * 
 * @param Default personality
 * @desc Default personality on negotiation for this race.
 * @type number
 * @default 0
 */

 /*~struct~DemonPersonality:
 * @param Name
 * @desc Personality name
 * @type text
 * @default Normal
 * 
 * @param Negotiation events
 * @desc .
 * @type struct<DemonPersonalityEntry>[]
 * @default 0
 * 
 * @param On failed negotiation
 * @desc Used when no matching negotiation was found
 * @type common_event
 */
/*~struct~DemonPersonalityEntry:
 * @param Negotiation kind
 * @desc Identifier for negotiation kind
 * @type text
 * @default talk
 * 
 * @param Trigger events
 * @desc Common events triggered on negotiation start.
 * @type common_event[]
 */

(() => {
    const PLUGIN_NAME = "OZZ-SMTDemons";
    //#region Plugin Commands
    PluginManager.registerCommand(PLUGIN_NAME, "smtDemonAdd", args => {
        eId = Number(args.enemyId);
        aId = Number(args.actorId);
        OZ.smtd.CreateDemon(eId, aId);
    });
    PluginManager.registerCommand(PLUGIN_NAME, "smtDemonRemove", args => {
        aId = Number(args.actorId);
        OZ.smtd.RemoveDemon(aId);
    });
    PluginManager.registerCommand(PLUGIN_NAME, "smtDemonRemoveById", args => {
        eId = Number(args.enemyId);
        aId = OZ.smtd.HasDemon(enemyId);
        if (aId != false) OZ.smtd.RemoveDemon(aId);
    });
    PluginManager.registerCommand(PLUGIN_NAME, "smtDemonRecruited", args => {
        switchId = Number(args.switchId);
        eId = Number(args.enemyId);
        result = OZ.smtd.HasDemon(enemyId);
        $gameSwitches.setValue(switchId, result != false);
    });
    PluginManager.registerCommand(PLUGIN_NAME, "smtHasTarget", args => {
        if (typeof OZ.smtd.currentNegotiationTarget !== "undefined") {
            switchId = Number(args.switchId);
            enemyId = OZ.smtd.currentNegotiationTarget.enemyId();
            result = OZ.smtd.HasDemon(enemyId);
            $gameSwitches.setValue(switchId, result != false);
        }
    });
    PluginManager.registerCommand(PLUGIN_NAME, "smtCopyTargetName", args => {
        if (typeof OZ.smtd.currentNegotiationTarget !== "undefined") {
            varId = Number(args.variableId);
            originalName = (args.originalName === "true");
            tName = originalName ? OZ.smtd.currentNegotiationTarget.originalName() : OZ.smtd.currentNegotiationTarget.name();
            $gameVariables.setValue(varId, tName);
        }
    });
    PluginManager.registerCommand(PLUGIN_NAME, "smtAddNegotiationTarget", args => {
        if (typeof OZ.smtd.currentNegotiationTarget !== "undefined") {
            switchId = Number(args.switchId);
            enemyId = OZ.smtd.currentNegotiationTarget.enemyId();
            result = OZ.smtd.CreateDemonOnBlankSlot(enemyId);
            // Store result for conditional branches
            $gameSwitches.setValue(switchId, result);
        }
    });
    PluginManager.registerCommand(PLUGIN_NAME, "smtNegotiationTargetEscape", args => {
        if (typeof OZ.smtd.currentNegotiationTarget !== "undefined") {
            OZ.smtd.currentNegotiationTarget.escape();
            OZ.smtd.currentNegotiationTarget = undefined;
        }
    });
    //#endregion
    /*
    * General use code
    */
    class OZSMTD {
        /**
         * Sets up all required data for class. This includes parsing all configuration and preparing data for easy access.
         */
        constructor() {
            // 
            this.cachedData = {};
            // Load general settings
            var params = PluginManager.parameters(PLUGIN_NAME);
            // General settings
            this.actorList = JSON.parse(params['Actors for demon slots']);
            for (var i = 0; i < this.actorList.length; i++) {
                this.actorList[i] = Number(this.actorList[i]);
            }
            this.defaultClass = Number(params['Default demon class']);
            this.defaultCharacterName = params['Default character'];
            this.defaultCharacterIdx = Number(params['Default character index']);
            this.defaultFaceName = params['Default face'];
            this.defaultFaceIdx = Number(params['Default face index']);
            this.hpmpFormula = params['HP/MP Formula'];
            this.paramFormula = params['Parameter Formula'];
            this.paramPercChange = Number(params['Parameter Percent Change per Level']);
            // Demon Race
            if (params['Demon races'].length != 0) this.demonRaces = JSON.parse(params['Demon races']);
            else this.demonRaces = [];
            for (var i = 0; i < this.demonRaces.length; i++) {
                this.demonRaces[i] = JSON.parse(this.demonRaces[i]);
                this.demonRaces[i].name = this.demonRaces[i]['Name'];
                this.demonRaces[i].defaultPersonality = Number(this.demonRaces[i]['Default personality']);
            }
            // Demon personalities
            if (params['Demon personalities'].length != 0) this.demonPersonalities = JSON.parse(params['Demon personalities']);
            else this.demonPersonalities = [];
            for (var i = 0; i < this.demonPersonalities.length; i++) {
                this.demonPersonalities[i] = JSON.parse(this.demonPersonalities[i]);
                this.demonPersonalities[i].name = this.demonPersonalities[i]['Name'];
                this.demonPersonalities[i].negotiationEvts = JSON.parse(this.demonPersonalities[i]['Negotiation events']);
                for (var j = 0; j < this.demonPersonalities[i].negotiationEvts.length; j++) {
                    this.demonPersonalities[i].negotiationEvts[j] = JSON.parse(this.demonPersonalities[i].negotiationEvts[j]);
                    let currEvt = this.demonPersonalities[i].negotiationEvts[j];
                    currEvt.kind = currEvt['Negotiation kind'];
                    currEvt.events = JSON.parse(currEvt['Trigger events']);
                    for (var k = 0; k < currEvt.events.length; k++) {
                        currEvt.events[k] = Number(currEvt.events[k]);
                    }
                    // Save by kind for convenience
                    this.demonPersonalities[i].negotiationEvts[currEvt.kind] = currEvt;
                }
                this.demonPersonalities[i].onFail = Number(this.demonPersonalities[i]['On failed negotiation']);
            }
        }
        /**
         * Create a demon at the first blank slot using a specific enemy.
         * @param {number} enemyId Target enemy ID from the database to use.
         * @returns {boolean} Success on creation.
         */
        CreateDemonOnBlankSlot(enemyId) {
            var slot = this.GetFirstAvailableSpace();
            if (slot != null) {
                this.CreateDemon(enemyId, slot);
                $gameParty.addActor(slot);
                return true;
            }
            return false;
        }
        /**
         * Create a demon over a specific character.
         * @param {number} enemyId Target enemy ID from the database.
         * @param {number} actorId Target slot on actor's database to override with enemy.
         */
        CreateDemon(enemyId, actorId) {
            var actor = $gameActors.actor(actorId);
            if (actor === null) return; // No actor with that ID
            var enemy = $dataEnemies[enemyId];
            if (enemy === undefined) return; // No enemy with that ID
            // Set actor to imitate enemy.
            actor.imitateEnemy = enemyId;
            actor.setName(enemy.name);
            actor.setNickname(this.Race(enemyId).name);
            actor.changeClass(this.GetClass(enemyId), false);
            let data = this.GetCharacter(enemyId);
            actor.setCharacterImage(data[0], data[1]);
            data = this.GetFace(enemyId);
            actor.setFaceImage(data[0], data[1]);
            actor.setBattlerImage(enemy.battlerName);
            // Set level and learned skills
            actor.changeLevel(this.GetStartingLevel(enemyId), false);
            actor.resetSkills();
            actor.recoverAll();
        }
        RemoveDemon(actorId) {
            var actor = $gameActors.actor(actorId);
            if (actor === null) return;
            actor.imitateEnemy = null;
            // Remove from party
            $gameParty.removeActor(actorId);
        }
        /**
         * Manages the creation and access to a cached data array.
         * @param {number} identifier Identifier for data array.
         * @returns {object} Cached data for identifier.
         */
        GetData(identifier) {
            if (this.cachedData[identifier] === undefined) {
                this.cachedData[identifier] = {};
            }
            return this.cachedData[identifier];
        }
        /**
         * Checks a database object notes for a specific numeric value and caches it when found.
         * @param {object} dbData Database object to be parsed.
         * @param {string} value String to look for in data.
         * @param {number} defVal Default value in case no data was found either in DB or cached.
         * @returns {number} Value found in data.
         */
        GetValueNumberFromData(dbData,value,defVal) {
            var dataName = dbData.name + dbData.id;
            var data = this.GetData(dataName + dbData.id);
            if (data[value] === undefined) {
                var result = dbData.meta[value];
                if (result != null) data[value] = Number(result);
                else data[value] = defVal;
            }
            return data[value];
        }
        /**
         * Checks a database object notes for a specific value. This also maintains a cache for the data in order to reduce reprocessing data.
         * @param {object} dbData Database object to be parsed.
         * @param {string} value String to look for in data.
         * @param {*} defVal Default value in case no data was found either in DB or cached.
         * @returns {number} Value found in data.
         */
        GetValueFromData(dbData,value,defVal) {
            var dataName = dbData.name + dbData.id;
            var data = this.GetData(dataName);
            if (data[value] === undefined) {
                var result = dbData.meta[value];
                if (result != null) data[value] = result;
                else data[value] = defVal;
            }
            return data[value];
        }
        /**
         * Checks notes for an enemy existing on database for a numeric value. Returns cached value if found.
         * @param {number} enemyId Enemy ID in database to be parsed.
         * @param {string} value String to look for in data.
         * @param {number} defVal Default value in case no data was found either in DB or cached.
         * @returns {number} Value found in data.
         */
        GetEnemyValueNumberFromNotes(enemyId, value, defVal) {
            var dbData = $dataEnemies[enemyId];
            return this.GetValueNumberFromData(dbData, value, defVal);
        }
        /**
         * Checks notes for an enemy existing on database for a value. Returns cached value if found.
         * @param {number} enemyId Enemy ID in database to be parsed.
         * @param {string} value String to look for in data.
         * @param {*} defVal Default value in case no data was found either in DB or cached.
         * @returns {*} Value found in data.
         */
        GetEnemyValueFromNotes(enemyId, value, defVal) {
            var dbData = $dataEnemies[enemyId];
            return this.GetValueFromData(dbData, value, defVal);
        }
        /**
         * Gets the race identifier for the specific enemy.
         * @param {number} enemyId Enemy ID to look for.
         * @returns {number} Race ID (index).
         */
        RaceId(enemyId) {
            return this.GetEnemyValueNumberFromNotes(enemyId, 'race', 0);
        }
        /**
         * Gets data for the enemy's race (properties: name, defaultPersonality).
         * @param {number} enemyId Enemy ID to look for.
         * @returns {object} Race data.
         */
        Race(enemyId) {
            return this.demonRaces[this.RaceId(enemyId)];
        }
        /**
         * Get class to be used when creating a demon of the enemy type specified.
         * @param {number} enemyId Enemy ID to look for.
         * @returns {number} Database class ID.
         */
        GetClass(enemyId) {
            return this.GetEnemyValueNumberFromNotes(enemyId, 'class', this.defaultClass);
        }
        /**
         * Get character graphic to be used for demon based on enemy type.
         * @param {number} enemyId Enemy ID to look for.
         * @returns {array} Array containing character graphic name and index.
         */
        GetCharacter(enemyId) {
            let name = this.GetEnemyValueFromNotes(enemyId, 'charName', this.defaultCharacterName);
            let idx = this.GetEnemyValueNumberFromNotes(enemyId, 'charIdx', this.defaultCharacterIdx);
            return [name, idx];
        }
        /**
         * Get face graphic to be used for demon based on enemy type.
         * @param {number} enemyId Enemy ID to look for.
         * @returns {array} Array containing face graphic name and index.
         */
        GetFace(enemyId) {
            let name = this.GetEnemyValueFromNotes(enemyId, 'faceName', this.defaultFaceName);
            let idx = this.GetEnemyValueNumberFromNotes(enemyId, 'faceIdx', this.defaultFaceIdx);
            return [name, idx];
        }
        /**
         * Get starting/default level for demon of a specific enemy type.
         * @param {number} enemyId Enemy ID to look for.
         * @returns {number} Level of demon.
         */
        GetStartingLevel(enemyId) {
            return this.GetEnemyValueNumberFromNotes(enemyId, 'level', 1);
        }
        /**
         * Get personality data for a specific enemy kind, used on negotiation.
         * @param {number} enemyId Enemy ID to look for.
         * @returns {object} Personality data.
         */
        GetPersonality(enemyId) {
            let def = this.Race(enemyId).defaultPersonality;
            let idx = this.GetEnemyValueNumberFromNotes(enemyId, 'personality', def);
            return this.demonPersonalities[idx];
        }
        /**
         * Gets a negotiation event based on enemy personality and negotiation kind.
         * @param {string} kind Negotiation kind
         * @param {number} enemyId Enemy ID to look for.
         * @returns {number} Common event ID to be triggered.
         */
        GetNegotiationEvent(kind, enemyId) {
            let personality = this.GetPersonality(enemyId);
            let retVal = personality.onFail;
            if (personality.negotiationEvts[kind] !== undefined) {
                let choices = personality.negotiationEvts[kind].events;
                let rndIdx = Math.randomInt(choices.length);
                retVal = choices[rndIdx];
            }
            return retVal;
        }
        /**
         * Gets number of demons in party.
         * @returns {number} Amount of slots used for demons.
         */
        FilledSlots() {
            let total = 0;
            this.actorList.forEach(actorId => {
                var actor = $gameActors.actor(actorId);
                if (actor.isDemon()) total++;
            });
            return total;
        }
        /**
         * Gets max amount of available demon slots, both used and free.
         * @returns {number} Total useable slots.
         */
        MaxSlots() {
            // this.actorList
            return this.actorList.length;
        }
        /**
         * Gets available, free slots for demons.
         * @returns {number} Max slots minus filled slots.
         */
        AvailableSpaces() {
            return this.MaxSlots() - this.FilledSlots();
        }
        /**
         * Returns first free slot found.
         * @returns {number} First found empty Actor's ID.
         */
        GetFirstAvailableSpace() {
            let found = null;
            this.actorList.forEach(actorId => {
                if (found != null) return;
                let actor = $gameActors.actor(actorId);
                if (!actor.isDemon()) found = actorId;
            });
            return found;
        }
        /**
         * Checks if a specific demon is already registered in party.
         * @param {number} enemyId Enemy ID to look for.
         * @returns {boolean} Demon is already in party.
         */
        HasDemon(enemyId) {
            let found = false;
            this.actorList.forEach(actorId => {
                let actor = $gameActors.actor(actorId);
                if (actor.imitateEnemy == enemyId) found = actorId;
            });
            return found;
        }
    }
    if (typeof OZ === 'undefined') OZ = {};
    OZ.smtd = new OZSMTD();
    
    //#region Game Actor
    /**
     * Alias for character parameters
     * Adds code for determining the base parameter in the enemy's parameters.
     * @param {number} paramId Parameter to get.
     */
    var OZSMTD_Game_Actor_paramBase = Game_Actor.prototype.paramBase;
    Game_Actor.prototype.paramBase = function(paramId) {
        // Check if this actor is imitating a specific enemy
        if (typeof this.imitateEnemy !== 'undefined') {
            // Get parameter from enemy
            let base = $dataEnemies[this.imitateEnemy].params[paramId];
            let startLevel = OZ.smtd.GetStartingLevel(this.imitateEnemy);
            let level = this._level;
            let deltaLevel = level - startLevel;
            // Calculate parameter
            if (paramId==1 && base==0) return 0;
            if (paramId < 2) return Math.floor(eval(OZ.smtd.hpmpFormula));
            return Math.floor(eval(OZ.smtd.paramFormula));
        }
        // Otherwise return normal parameters
        return OZSMTD_Game_Actor_paramBase.call(this, paramId);
    };

    /**
     * Alias for character traits
     * Adds enemy traits to the resulting list of traits.
     * @returns {object} List of traits.
     */
    var OZSMTD_Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
    Game_Actor.prototype.traitObjects = function() {
        const objects = OZSMTD_Game_Actor_traitObjects.call(this);
        if (typeof this.imitateEnemy !== 'undefined') {
            objects.push($dataEnemies[this.imitateEnemy]);
        }
        return objects;
    };
    /**
     * Alias for learning skills
     * Sets up learnings based on enemy action skills
     */
    var OZSMTD_Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        OZSMTD_Game_Actor_levelUp.call(this);
        this.learnEnemyActionSkills();
    };
    /**
     * Resets and relearns skills.
     * TODO: Add functionality for skill inheritance
     */
    Game_Actor.prototype.resetSkills = function() {
        let oldSkills = this._skills;
        this._skills = [];
        this.learnEnemyActionSkills();
    }
    /**
     * Learning skills based on original enemy data's actions.
     */
    Game_Actor.prototype.learnEnemyActionSkills = function() {
        if (typeof this.imitateEnemy !== 'undefined') {
            var eActions = $dataEnemies[this.imitateEnemy].actions;
            for (const action of eActions) {
                this.learnActionSkill(action);
            }
        }
    }
    /**
     * Checks if a specific action's skill should be learned, based on the action parameters.
     * @param {object} action Reference to action listed in enemy's data.
     * @param {*} mockLevel Should a test level be used? (number to override level, undefined if not). Used for non-existing actors, such as for Fusion Result.
     * @returns {boolean} Should be learned or not.
     */
    Game_Actor.prototype.shouldLearnActionSkill = function(action, mockLevel) {
        let mock = (typeof mockLevel === 'number');
        switch (action.conditionType) {
            case 0: // Always
                return true;
                break;
            case 1: // Turn? I guess I can use it as variable?
                if ($gameVariables.value(action.conditionParam1) >= action.conditionParam2) return true;
                break;
            case 2: // HP -- Ignore on mock
                if (!mock) {
                    let hpPerc = this.hpRate() * 100;
                    if (action.conditionParam1 <= hpPerc && hpPerc <= action.conditionParam2) return true;
                }
                break;
            case 3: // MP -- Ignore on mock
                if (!mock) {
                    let mpPerc = this.mpRate() * 100;
                    if (action.conditionParam1 <= mpPerc && mpPerc <= action.conditionParam2) return true;
                }
                break;
            case 4: // State -- Ignore on mock
                if (!mock) {
                    if (this.isStateAffected(action.conditionParam1)) return true;
                }
                break;
            case 5: // Level
                let lvl = mockLevel;
                if (!mock) lvl = this._level;
                if (action.conditionParam1 === lvl) return true;
                break;
            case 6: // Switch
                if ($gameSwitches.value(action.conditionParam1)) return true;
                break;
        }
        return false;
    }
    /**
     * Learn action's skill.
     * @param {*} action Reference to action listed in enemy's data.
     */
    Game_Actor.prototype.learnActionSkill = function(action) {
        if (this.shouldLearnActionSkill(action)) this.learnSkill(action.skillId);
    }
    /**
     * Check if current actor is a demon (i.e. imitateEnemy property is set up).
     * @returns {boolean} Is demon.
     */
    Game_Actor.prototype.isDemon = function() {
        if (typeof this.imitateEnemy === 'undefined') return false;
        return this.imitateEnemy !== null;
    }
    //#endregion

    //#region Talk skills
    /**
     * Alias for applyItemUserEffect
     * Checks if the used skill is marked as a negotiation skill.
     * If it is, sets up the appropiate negotiation event after the skill is processed.
     * @param {*} target Target to negotiate with.
     */
    var OZSMTD_Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
     Game_Action.prototype.applyItemUserEffect = function(target) {
        OZSMTD_Game_Action_applyItemUserEffect.call(this,target);
        // Add effects of negotiation skill here
        let data = this.item();
        let negotiationKind = OZ.smtd.GetValueFromData(data, "negotiate", null);
        // If it is a negotiation skill, execute code for negotiation.
        if (negotiationKind != null) {
            let evtId = OZ.smtd.GetNegotiationEvent(negotiationKind, target.enemyId());
            $gameTemp.reserveCommonEvent(evtId);
            const result = target.result();
            result.used = true;
            this.makeSuccess(target);
            OZ.smtd.currentNegotiationTarget = target;
        }
    };    
    //#endregion
    
    /// End of Plugin
})();
