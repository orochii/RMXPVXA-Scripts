/*:
 * @plugindesc Pathfinding as plugin command
 * @author Orochii Zouveleki
 * 
 * @command pathfind
 * @text Pathfind
 * @desc Event attempts to find a path to a target destination.
 * @arg EventId
 * @type number 
 * @default 0
 * @desc ID of event to move.
 * @arg X
 * @desc Map's X coordinate to move to.
 * @type number
 * @default 0
 * @arg Y
 * @desc Map's Y coordinate to move to.
 * @type number
 * @default 0
 * 
 * @command pathfindVar
 * @text Pathfind Variable
 * @desc Event attempts to find path to target. Coordinates are read from game variables. This will read variable values dynamically!
 * @arg EventId
 * @type number
 * @default 0
 * @desc ID of event to move.
 * @arg X
 * @desc Variable to hold X coordinate.
 * @type variable
 * @default 0
 * @arg Y
 * @desc Variable to hold Y coordinate.
 * @type variable
 * @default 0
 * 
 * @command waitForPathfind
 * @text Wait For Pathfind
 * @desc Waits for specific event to finish the pathfind operation.
 * @arg EventId
 * @type number
 * @default 0
 * @desc ID of event to wait for.
 * 
 * @help ON MZ:
 * Plugin commands in MZ were improved, use the cool UI.
 * 
 * ON MV:
 * To make an event move to a destination position, use the following command.
 * 
 * pathfind ID X Y
 * pathfind 0 8 8
 * 
 * Using pathfindVar will use variable IDs as target coordinates. Keep in mind, these values are read dynamically, 
 * which means if the variable changes, the event will go towards that destination instead.
 * 
 * pathfindVar ID varX varY
 * pathfindVar 0 3 4
 * 
 * Lastly, to wait for an event to finish with their pathfind, use the waitForPathfind command
 * 
 * waitForPathfind ID
 * waitForPathfind -1
 * 
 * TIP: Event IDs under 0 mean the player, ID 0 is for the event calling the command. Any number over 0 corresponds to the map's event ID.
 */

(() => {
    var __filename;
    (function () {
        var scripts = document.getElementsByTagName('script');
        __filename = scripts[scripts.length - 1].src;
    }());
    var path = require('path');
    const PLUGIN_NAME = path.basename(__filename, path.extname(__filename));

    class OZ_Pathfind {
        constructor() {}
        Pathfind(srcEv, eventId, type, x, y) {
            //
            var ev = this.GetCharacter(srcEv._eventId, eventId, srcEv.isOnCurrentMap());
            //
            if (ev != null) {
                ev.setDestination(type,x,y);
            }
        };
        WaitForPathfind(srcEv, eventId) {
            //
            var ev = this.GetCharacter(srcEv._eventId, eventId, srcEv.isOnCurrentMap());
            //
            if (ev != null) {
                if (ev.isDestinationValid()) {
                    // Go back so the check is done next time
                    srcEv._index -= 1;
                    // Could lower this to 1 but who cares about precision? -me-
                    srcEv._waitCount = 4;
                }
            }
        }
        GetCharacter(selfId,param,currentMap) {
            if ($gameParty.inBattle()) return null;
            if (param < 0) return $gamePlayer;
            if (currentMap) {
                return $gameMap.event(param > 0 ? param : selfId);
            }
            return null;
        };
    }
    if (typeof OZ === 'undefined') OZ = {};
    OZ.pathfind = new OZ_Pathfind();
    //
    var OZZ_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        OZZ_Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'pathfind') {
            var _eventId = 0
            var _x = 0
            var _y = 0
            if (args.length > 0) _eventId = Number(args[0]);
            if (args.length > 1) _x = Number(args[1]);
            if (args.length > 2) _y = Number(args[2]);
            //
            OZ.pathfind.Pathfind(this, _eventId ,"value",_x,_y);
        }
        if (command === 'pathfindVar') {
            var _eventId = 0
            var _x = 0
            var _y = 0
            if (args.length > 0) _eventId = Number(args[0]);
            if (args.length > 1) _x = Number(args[1]);
            if (args.length > 2) _y = Number(args[2]);
            //
            OZ.pathfind.Pathfind(this, _eventId, "variable",_x,_y);
        }
        if (command === 'waitForPathfind') {
            var _eventId = 0
            if (args.length > 0) _eventId = Number(args[0]);
            //
            OZ.pathfind.WaitForPathfind(this, _eventId);
        }
    };
    Game_Interpreter.prototype.processPathfind = function (args) {
        const _eventId = Number(args.EventId);
        const _x = Number(args.X);
        const _y = Number(args.Y);
        OZ.pathfind.Pathfind(this,_eventId,"value",_x,_y);
    }
    Game_Interpreter.prototype.processPathfindVariable = function (args) {
        const _eventId = Number(args.EventId);
        const _x = Number(args.X);
        const _y = Number(args.Y);
        OZ.pathfind.Pathfind(this,_eventId,"variable",_x,_y);
    }
    Game_Interpreter.prototype.waitForPathfind = function (args) {
        const _eventId = Number(args.EventId);
        OZ.pathfind.WaitForPathfind(this,_eventId);
    }
    if(PluginManager.registerCommand !== undefined) {
        PluginManager.registerCommand(PLUGIN_NAME, "pathfind", Game_Interpreter.prototype.processPathfind);
        PluginManager.registerCommand(PLUGIN_NAME, "pathfindVar", Game_Interpreter.prototype.processPathfindVariable);
        PluginManager.registerCommand(PLUGIN_NAME, "waitForPathfind", Game_Interpreter.prototype.waitForPathfind);
    }
    //
    //
    //
    Game_Character.prototype.setDestination = function (type, x, y) {
        this._destinationType = type;
        this._destinationX = x;
        this._destinationY = y;
    };
    Game_Character.prototype.clearDestination = function () {
        this._destinationType = null;
        this._destinationX = null;
        this._destinationY = null;
    };
    Game_Character.prototype.isDestinationValid = function () {
        if (typeof this._destinationType === "undefined") return false;
        return this._destinationType !== null;
    };
    Game_Character.prototype.destinationX = function () {
        if (this._destinationType === "variable") {
            return $gameVariables.value(this._destinationX);
        }
        return this._destinationX;
    };
    Game_Character.prototype.destinationY = function () {
        if (this._destinationType === "variable") {
            return $gameVariables.value(this._destinationY);
        }
        return this._destinationY;
    };
    OZ_AStarPathfind_Game_Character_update = Game_Character.prototype.update;
    Game_Character.prototype.update = function () {
        // Call original function
        OZ_AStarPathfind_Game_Character_update.call(this);
        // Execute pathfind only when not moving.
        if (!this.isMoving()) {
            // Check if there's a pathfind destination.
            var direction = 0;
            if (this.isDestinationValid()) {
                // Execute pathfind
                var x = this.destinationX();
                var y = this.destinationY();
                direction = this.findDirectionTo(x, y);
                if (direction <= 0) this.clearDestination();
            }
            // Execute move if found a valid path.
            if (direction > 0) {
                this.moveStraight(direction);
            }
        }
    }
})();