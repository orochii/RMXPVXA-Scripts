//=============================================================================
// RPG Maker MZ - Actor Summoning v1
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Actor Summoning skills. Add and remove actors through the use of character skills.
 * @author Orochii Zouveleki
 * ------------------------------------------------------------------------------------------------
 * PARAMETERS
 * ------------------------------------------------------------------------------------------------
 * 
 * @param Return on death
 * @desc When return-able units die, they will be returned to the bench.
 * @type boolean
 * @default true
 * @
 * ------------------------------------------------------------------------------------------------
 * COMMANDS
 * ------------------------------------------------------------------------------------------------
 * @command actorSummonAdd
 * @text Add summon to list
 * @desc Adds an actor to your summons, to a specific category.
 * 
 * @arg kind
 * @type text
 * @text Category
 * @desc Summon category.
 * 
 * @arg actorId
 * @type actor
 * @text Target Actor
 * @desc Actor to add to the list.
 * 
 * @command actorSummonRemove
 * @text Remove summon from list
 * @desc Removes an actor from a summon list.
 * 
 * @arg kind
 * @type text
 * @text Category
 * @desc Summon category.
 * 
 * @arg actorId
 * @type actor
 * @text Target Actor
 * @desc Actor to remove from the list.
 * 
 * @help ===========================================================================
 * OZZ-ActorSummoning.js
 * ===========================================================================
 * 
 * ---------------------------------------------------------------------------
 * INTRODUCTION:
 * ---------------------------------------------------------------------------
 * This plugin implements a very complex but powerful (?) actor summoning 
 * system. Originally inspired by the Shin Megami Tensei series, it lets you 
 * add and remove characters in battle through the use of skills.
 * 
 * - You can summon a special character arbitrarily by Actor ID.
 * - You can add/remove characters from your inactive party members.
 * - You can also manage lists of characters and make a special skill to pick
 * between one of those lists.
 * 
 * But wait there is more...
 * 
 * This plugin makes several changes to party and formations, in order to make
 * it possible to add and remove characters from the active group, both inside
 * and outside of battle.
 * 
 * In order to permit groups smaller than the max, it overrides some of the 
 * functions for adding and removing actors. It also makes a couple changes
 * to the formation mode at the default Scene_Menu. Keep that in mind if using
 * a custom formation menu.
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
 * REMARKS:
 * ---------------------------------------------------------------------------
 * - Attempting to summon a character while there is no space free in your 
 * active party will result in the summon failing.
 * - Attempting to summon a character that is already in your party will also
 * result in the summon failing.
 * - Any summoned character that wasn't originally in your party (be it in
 * the bench or active) will be automatically returned after battle ends.
 * 
 * ---------------------------------------------------------------------------
 * PLUGIN COMMANDS:
 * ---------------------------------------------------------------------------
 * [Add summon to list] - Adds an actor to a specific summoning list.
 * Naming for categories is arbitrary (there is no limit or control over it)
 * so be careful when specifying it.
 * PARAMETERS:
 *  - Category: Category name (used at summon skill).
 *  - Target Actor: Target Actor ID to be added.
 * 
 * [Remove summon from list] - Removes actor from a specific summoning list.
 * Naming for categories is arbitrary (there is no limit or control over it)
 * so be careful when specifying it.
 * PARAMETERS:
 *  - Category: Category name (used at summon skill).
 *  - Target Actor: Target Actor ID to be removed.
 * ---------------------------------------------------------------------------
 * SKILL NOTETAGS:
 * ---------------------------------------------------------------------------
 * <summon> - When present, this notetag makes the skill a summoning skill.
 * When no value is specified, it lets you summon characters in your bench
 * of your party (inactive party members).
 * i.e. Tag <summon> will open a list of all characters in bench, in party.
 * 
 * <summon:id> - When an actor ID is specified, it automatically sets the 
 * actor with that ID to be summoned, skipping picking summon from a list.
 * i.e. Tag <summon:9> will summon actor #9 in database.
 *  
 * <summon:category> - When a category name is specified, it will open a 
 * list containing only the available actors from that specific category.
 * Make sure to add actors to the category by using the corresponding
 * plugin command "Add summon to list".
 * i.e. Tag <summon:eidolons> will open a list with all "eidolons".
 * 
 * <return> - When present, makes the target be unsummoned.
 * When used on enemies, it forces targets to escape.
 * 
 * Hint: If you think that having both to return and summon an actor takes
 * too many turns (which is kind of unfair), you can mix both <return> and 
 * <summon> tags to make a swap skill.
 * 
 * ---------------------------------------------------------------------------
 * ACTOR/ENEMY NOTETAGS:
 * ---------------------------------------------------------------------------
 * <noreturn> - Makes the target immune to return skills effects.
 * This tag works for both actors and enemies, as having return affect
 * enemies acts almost as instant kill with no counter (besides this tag), 
 * 100% effectiveness at the cost of not receiving spoils from the target.
 */

(() => {
    const PLUGIN_NAME = "OZZ-ActorSummoning";
    //#region Plugin Commands
    PluginManager.registerCommand(PLUGIN_NAME, "actorSummonAdd", args => {
        aId = Number(args.actorId);
        kind = args.kind;
        $gameParty.addSummon(kind, aId);
    });
    PluginManager.registerCommand(PLUGIN_NAME, "actorSummonRemove", args => {
        aId = Number(args.actorId);
        kind = args.kind;
        $gameParty.removeSummon(kind, aId);
    });
    //#endregion
    // General code
    class OZ_ActorSummon {
        constructor() {
            var params = PluginManager.parameters(PLUGIN_NAME);
            this.returnOnDeath = params['Return on death']==='true';
        }
        IsInstantSummon(kind) {
            if (kind === true) return false;
            return !isNaN(kind);
        }
        IsSummon(skillId) {
            let skill = $dataSkills[skillId];
            if (typeof skill !== 'undefined' && skill !== null) {
                return skill.meta.summon;
            }
        }
        IsReturn(skillId) {
            let skill = $dataSkills[skillId];
            if (typeof skill !== 'undefined' && skill !== null) {
                return skill.meta.return;
            }
        }
    }
    if (typeof OZ === 'undefined') OZ = {};
    OZ.actorSummon = new OZ_ActorSummon();
    /**
     * Battlers and party modifications
     */
    //#region Game_Actor additions
    OZZActorSummon_Game_BattlerBase_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
    Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
        return OZZActorSummon_Game_BattlerBase_meetsSkillConditions.call(this,skill) && this.canUseSummonSkill(skill);
    };
    Game_BattlerBase.prototype.canUseSummonSkill = function(skill) {
        let summonKind = OZ.actorSummon.IsSummon(skill.id);
        let isReturn = OZ.actorSummon.IsReturn(skill.id);
        if (typeof summonKind !== 'undefined') {
            // Check if there's space in your party.
            let availableSlots = $gameParty.maxBattleMembers() - $gameParty.currentMaxBattleMembers();
            if (availableSlots < 1 && typeof isReturn === 'undefined') return false;
            // Check if there's valid targets to summon.
            if (!OZ.actorSummon.IsInstantSummon(summonKind)) {
                let list = $gameParty.getSummons(summonKind);
                if (list < 1) return false;
            }
        }
        return true;
    }

    Game_Battler.prototype.canReturn = function() {
        return false;
    }
    Game_Battler.prototype.returnUnit = function() {
        // I guess enemies can escape?
        this.escape();
    }
    Game_Actor.prototype.returnUnit = function() {
        let reset = this.resetOnReturn;
        if (typeof reset !== 'undefined' && reset) {
            // Actor is fully removed from party
            $gameParty.removeActor(this.actorId());
        } else {
            // Actor will remove itself from the battle members
            let idx = $gameParty.allMembers().indexOf(this);
            $gameParty.sendToBack(idx);
        }
    }
    Game_Actor.prototype.setSummon = function(actorId) {
        this.actorSummonId = Number(actorId);
    }
    Game_Actor.prototype.canReturn = function() {
        return typeof this.actor().meta.noreturn === 'undefined';
    }
    OZZActorSummon_Game_Actor_performCollapse = Game_Actor.prototype.performCollapse;
    Game_Actor.prototype.performCollapse = function() {
        OZZActorSummon_Game_Actor_performCollapse.call(this);
        if (OZ.actorSummon.returnOnDeath && this.canReturn()) {
            this.returnUnit();
        }
    };
    Game_Enemy.prototype.canReturn = function() {
        return typeof this.enemy().meta.noreturn === 'undefined';
    }
    //#endregion
    //#region Game Party
    /**
     * Removes an actor from the active members in battle.
     * @param {number} index Actor index in party.
     */
    Game_Party.prototype.sendToBack = function(index) {
        // Check if already on back, if it is, don't do anything.
        if (index >= this.currentMaxBattleMembers()) {
            return;
        }
        // Reduce max by one
        this.setCurrentMaxBattleMembers(this.currentMaxBattleMembers() - 1);
        // Reposition actor
        this.repositionActor(index, this.currentMaxBattleMembers());
    }
    /**
     * Adds an actor in party to the active members in battle.
     * @param {number} index Actor index in party
     */
    Game_Party.prototype.addToFront = function(index) {
        // Check if already on front, if it is, don't do anything.
        if (index < this.currentMaxBattleMembers()) {
            return;
        }
        let oldMax = this.currentMaxBattleMembers();
        // Raise max by one
        this.setCurrentMaxBattleMembers(this.currentMaxBattleMembers() + 1);
        // Send to front
        this.repositionActor(index, oldMax);
    }
    /**
     * Checks if a specific actor is part of the battle members.
     * @param {Game_Actor} actor Actor to check if is a battle member.
     */
    Game_Party.prototype.isInFront = function(actor) {
        return this.battleMembers().includes(actor);
    }
    /**
     * Check if there is space available for characters in battle.
     * @returns {boolean} True if there is at least one space available on party's front.
     */
    Game_Party.prototype.spaceAvailable = function() {
        let space = this.maxBattleMembers() - this.currentMaxBattleMembers();
        return space > 0;
    }
    /**
     * Repositions an actor, without swapping.
     * @param {number} index Actor index
     * @param {number} newIndex New place for actor
     */
    Game_Party.prototype.repositionActor = function(index, newIndex) {
        // Cache entry
        let entry = this._actors[index];
        const wasBattleMember = this.battleMembers().includes(entry);
        // Remove entry from old place
        this._actors.splice(index, 1);
        // Add to list
        this._actors.splice(newIndex, 0, entry);
        // Refresh actors
        $gamePlayer.refresh();
        $gameMap.requestRefresh();
        $gameTemp.requestBattleRefresh();
        if (this.inBattle() && wasBattleMember) {
            actor.onBattleEnd();
        }
    }
    /**
     * Alias for adding actors.
     * Adds change to current battle members length, in order to make it possible to have less than 4 characters in battle.
     * @param {number} actorId Id of actor to add.
     */
    var OZZActorSummon_Game_Party_addActor = Game_Party.prototype.addActor;
    Game_Party.prototype.addActor = function(actorId) {
        let actorSize = this.allMembers().length;
        OZZActorSummon_Game_Party_addActor.call(this, actorId);
        // If there was a change in size (adding actor was successful), try upping the battle members size.
        if (actorSize < this.allMembers().length) {
            // Check if there is any size on party
            if (this.currentMaxBattleMembers() < this.maxBattleMembers()) {
                // Put on bottom of active party
                this.addToFront(this._actors.length-1);
                // Call refresh again
                $gamePlayer.refresh();
                $gameMap.requestRefresh();
                $gameTemp.requestBattleRefresh();
                if (this.inBattle()) {
                    const actor = $gameActors.actor(actorId);
                    if (this.battleMembers().includes(actor)) {
                        actor.onBattleStart();
                    }
                }
            }
        }
    }
    /**
     * Alias for removing actors.
     * Adds change to current battle members length, in order to make it possible to have less than 4 characters in battle.
     * @param {number} actorId Id of actor to remove.
     */
    var OZZActorSummon_Game_Party_removeActor = Game_Party.prototype.removeActor;
    Game_Party.prototype.removeActor = function(actorId) {
        // Check if actor was active
        const actor = $gameActors.actor(actorId);
        const wasBattleMember = this.battleMembers().includes(actor);
        if (wasBattleMember) {
            this.setCurrentMaxBattleMembers(this.currentMaxBattleMembers() - 1);
        }
        // Call original method.
        OZZActorSummon_Game_Party_removeActor.call(this, actorId);
    }
    /**
     * Rewrite for battle members definition.
     * Adds the posibility of having less than the max characters in battle.
     * @returns {array} Battle actors.
     */
    Game_Party.prototype.battleMembers = function() {
        return this.allMembers()
            .slice(0, this.currentMaxBattleMembers())
            .filter(actor => actor.isAppeared());
    };
    /**
     * Returns all members in the bench.
     * @returns {array} containing all inactive actors.
     */
    Game_Party.prototype.benchedMembers = function() {
        return this.allMembers().slice(this.currentMaxBattleMembers());
    };
    /**
     * Number of characters currently permitted in battle.
     * @returns {number} Current max size for battling party.
     */
    Game_Party.prototype.currentMaxBattleMembers = function() {
        // If not defined, return the amount of actors, up to the max battle members allowed.
        if (typeof this._currentMaxBattleMembers === 'undefined') {
            return this._actors.length.clamp(0, this.maxBattleMembers());
        }
        return this._currentMaxBattleMembers;
    };
    /**
     * Sets a new max for the amount of party members in battle. Used to add/remove members from 
     * the active party without making them fully unavailable.
     * @param {number} value New amount of active party members.
     */
    Game_Party.prototype.setCurrentMaxBattleMembers = function(value) {
        this._currentMaxBattleMembers = value.clamp(1, this.maxBattleMembers());
    }
    Game_Party.prototype.getSummons = function(kind) {
        if (kind === true) return $gameParty.benchedMembers().filter(member => member.isAlive());
        if (typeof this._summons === 'undefined') return [];
        let kindList = this._summons[kind];
        if (typeof kindList === 'undefined') return [];
        let actorAry = [];
        kindList.forEach(id => {
            let act = $gameActors.actor(id);
            if(typeof act !== 'undefined' && act.isAlive()) actorAry.push(act);
        });
        return actorAry;
    }
    Game_Party.prototype.addSummon = function(kind, actorId) {
        if (typeof this._summons === undefined) this._summons = {};
        let kindList = this._summons[kind];
        if (typeof kindList === 'undefined') kindList = [];
        kindList.push(actorId);
        this._summons[kind] = kindList;
    }
    Game_Party.prototype.removeSummon = function(kind, actorId) {
        if (typeof this._summons === undefined) this._summons = {};
        let kindList = this._summons[kind];
        if (typeof kindList === 'undefined') kindList = [];
        kindList.remove(actorId);
        this._summons[kind] = kindList;
    }
    //#endregion
    /**
     * Summon skill list
     */
    //#region Summon skill show
    /**
     * Window_SummonList
     */
    //#region Window_SummonList
    function Window_SummonList() {
        this.initialize(...arguments);
    }
    Window_SummonList.prototype = Object.create(Window_Selectable.prototype);
    Window_SummonList.prototype.constructor = Window_SummonList;
    Window_SummonList.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.kind = null;
        this.hide();
    };
    Window_SummonList.prototype.setKind = function(kind) {
        this.kind = kind;
        this.refresh();
    }
    Window_SummonList.prototype.maxCols = function() {
        return 1;
    };
    Window_SummonList.prototype.colSpacing = function() {
        return 16;
    };
    Window_SummonList.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };
    Window_SummonList.prototype.item = function() {
        return this.itemAt(this.index());
    };
    Window_SummonList.prototype.itemAt = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };
    Window_SummonList.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this._data[this.index()]);
    };
    Window_SummonList.prototype.isEnabled = function(item) {
        return !($gameParty.isInFront(item));
    };
    Window_SummonList.prototype.makeItemList = function() {
        // TODO: Actor list
        this._data = $gameParty.getSummons(this.kind);
    };
    Window_SummonList.prototype.refresh = function() {
        this.makeItemList();
        this.forceSelect(0);
        Window_Selectable.prototype.refresh.call(this);
    };
    Window_SummonList.prototype.drawItem = function(index) {
        const actor = this.itemAt(index);
        if (actor) {
            const rect = this.itemLineRect(index);
            const colWidth = rect.width * 0.6;
            const lvWidth = this.textWidth(TextManager.levelA + "000");
            const nameWidth = (colWidth - lvWidth) / 2;
            const canUse = this.isEnabled(actor);
            this.changePaintOpacity(canUse);
            // Draw character stats
            this.drawText(actor.nickname(), rect.x + nameWidth*0, rect.y, nameWidth - 16);
            this.drawText(actor.name(),     rect.x + nameWidth*1, rect.y, nameWidth - 16);
            this.drawText(TextManager.levelA + actor.level, rect.x + nameWidth*2, rect.y, lvWidth);
            // Draw summoning info
            let secColWidth = rect.width - colWidth;
            let statusStr = canUse ? "Can summon" : "Summoned";
            this.drawText(statusStr, rect.x + colWidth, rect.y, secColWidth);
            this.changePaintOpacity(1);
        }
    };
    Window_SummonList.prototype.updateHelp = function() {
        const actor = this.item();
        let helpText = "%1. %2 %3/%4 %5 %6/%7".format(actor.name(), TextManager.hpA, actor.hp, actor.mhp, TextManager.mpA,actor.mp, actor.mmp);
        this._helpWindow.setText(helpText);
    };
    //#endregion
    /**
     * Scene_Battle modifications
     */
    //#region Scene_Battle modifications
    var OZZActorSummon_Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        OZZActorSummon_Scene_Battle_createAllWindows.call(this);
        this.createSummonWindow();
    }
    Scene_Battle.prototype.createSummonWindow = function() {
        const rect = this.skillWindowRect();
        this._summonWindow = new Window_SummonList(rect);
        this._summonWindow.setHelpWindow(this._helpWindow);
        this._summonWindow.setHandler("ok", this.onSummonOk.bind(this));
        this._summonWindow.setHandler("cancel", this.onSummonCancel.bind(this));
        this.addWindow(this._summonWindow);
    };
    var OZZActorSummon_Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
    Scene_Battle.prototype.onSkillOk = function() {
        const skill = this._skillWindow.item();
        const action = BattleManager.inputtingAction();
        // If it's not a summon skill, let's do other stuff
        let summonKind = OZ.actorSummon.IsSummon(skill.id);
        if (typeof summonKind !== 'undefined') {
            //if ()
            action.setSkill(skill.id);
            BattleManager.actor().setLastBattleSkill(skill);
            if (OZ.actorSummon.IsInstantSummon(summonKind)) {
                // Set fusion instantly
                BattleManager.actor().setSummon(summonKind);
                this.selectNextCommand();
            } else {
                //Open summon window
                if (this._skillWindow.visible) this._skillWindow.active = false;
                this._summonWindow.visible = true;
                this._summonWindow.active = true;
                this._summonWindow.setKind(summonKind);
            }
            return;
        }
        // Otherwise, continue with normal skill processing
        OZZActorSummon_Scene_Battle_onSkillOk.call(this);
    };
    Scene_Battle.prototype.onSummonOk = function() {
        const actor = this._summonWindow.item();
        this._summonWindow.visible = false;
        this._summonWindow.active = false;
        if (this._skillWindow.visible) {
            this._skillWindow.active = true;
        }
        // Set summoning effect.
        let actorId = actor.actorId();
        BattleManager.actor().setSummon(actorId);
        this.selectNextCommand();
    }
    Scene_Battle.prototype.onSummonCancel = function() {
        if (this._skillWindow.visible) this._skillWindow.active = true;
        this._summonWindow.visible = false;
        this._summonWindow.active = false;
    }
    var OZZActorSummon_SceneBattle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    Scene_Battle.prototype.isAnyInputWindowActive = function() {
        let otherActive = OZZActorSummon_SceneBattle_isAnyInputWindowActive.call(this);
        return otherActive || this._summonWindow.active;
    };
    //#endregion
    //#endregion
    /**
     * Game_Action modifications for skill effects.
     */
    //#region Skill effect
    var OZZActorSummon_Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        OZZActorSummon_Game_Action_applyItemUserEffect.call(this,target);
        // Add effects of negotiation skill here
        let data = this.item();
        let returnKind = OZ.actorSummon.IsReturn(data.id);
        let summonKind = OZ.actorSummon.IsSummon(data.id);
        if (typeof returnKind !== 'undefined' && target.canReturn()) {
            // Check if it's already summoned.
            if (typeof summonKind !== 'undefined') {
                let actorSummonId = this.subject().actorSummonId;
                let actor = $gameActors.actor(actorSummonId);
                if ($gameParty.isInFront(actor)) return;
            }
            // user: this.subject()
            target.returnUnit();
            // Set action as effective.
            this.makeSuccess(target);
        }
        if (typeof summonKind !== 'undefined') {
            // Get summon ID
            let actorSummonId = this.subject().actorSummonId;
            // TODO: Let's leave it as only useable by actors for now.
            if (this.subject().isActor()) {
                // Check if summon ID is valid
                if (typeof actorSummonId !== 'undefined' && actorSummonId !== null) {
                    // Get actor, check validity
                    let actor = $gameActors.actor(actorSummonId);
                    if (typeof actor !== 'undefined' && actor !== null) {
                        // Check if actor is already in battle
                        if (!$gameParty.isInFront(actor) && $gameParty.spaceAvailable()) {
                            actor.resetOnReturn = !$gameParty.allMembers().includes(actor);
                            // Summon actor
                            if (actor.resetOnReturn) {
                                // When originally the actor wasn't part of the party.
                                $gameParty.addActor(actorSummonId);
                            } else {
                                // When the actor is already part of the party, but it's in back row.
                                let actorIdx = $gameParty.allMembers().indexOf(actor);
                                $gameParty.addToFront(actorIdx);
                            }
                            // Set action as effective.
                            this.makeSuccess(target);
                        }
                    }
                }
            }
        }
    };
    Game_Actor.prototype.onBattleEnd = function() {
        Game_Battler.prototype.onBattleEnd.call(this);
        if (typeof this.resetOnReturn !== 'undefined' && this.resetOnReturn) {
            // Remove from party on battle end
            $gameParty.removeActor(this.actorId());
        }
    };
    //#endregion
    /**
     * Scene_Menu modifications to formation selection.
     */
    //#region Scene_Menu modifications
    /**
     * Rewrite to onFormationOk method, which dictates what happens on
     * selection options when in formation mode at the menu scene.
     */
    Scene_Menu.prototype.onFormationOk = function() {
        const index = this._statusWindow.index();
        const pendingIndex = this._statusWindow.pendingIndex();
        if (pendingIndex >= 0) {
            if (index === pendingIndex) {
                // Add or remove from bench/front
                const actor = $gameParty.allMembers()[index];
                if (actor.canReturn() && (actor.isAlive() || $gameParty.isInFront(actor))) {
                    if ($gameParty.isInFront(actor)) {
                        //
                        $gameParty.sendToBack(index);
                    } else {
                        //
                        $gameParty.addToFront(index);
                    }
                }
                this._statusWindow.setPendingIndex(-1);
                this._statusWindow.refresh();
            } else {
                if (this.checkIfCanSwap(index, pendingIndex)) {
                    $gameParty.swapOrder(index, pendingIndex);
                }
                this._statusWindow.setPendingIndex(-1);
                this._statusWindow.redrawItem(index);
            }
        } else {
            this._statusWindow.setPendingIndex(index);
        }
        this._statusWindow.activate();
    };

    Scene_Menu.prototype.checkIfCanSwap = function(i1,i2) {
        const a1 = $gameParty.allMembers()[i1];
        const a2 = $gameParty.allMembers()[i2];
        let movingOut = $gameParty.isInFront(a1) != $gameParty.isInFront(a2);
        let a1CanMove = a1.canReturn() && (a1.isAlive() || $gameParty.isInFront(a1));
        let a2CanMove = a2.canReturn() && (a2.isAlive() || $gameParty.isInFront(a2));
        return (!movingOut || (a1CanMove && a2CanMove));
    }
    //#endregion
    /// End of Plugin
})();
