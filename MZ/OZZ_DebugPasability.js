//=============================================================================
// RPG Maker MZ - OZZ Debug Passability
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Debug tool for displaying current passability on tiles.
 * @author Orochii Zouveleki
 * 
 * @help OZZ_DebugPassability.js
 * 
 * Use the toggle key to enable/disable visibility of debug layer.
 * Debug layer is comprised of the following information:
 * 
 * ┌───────┐
 * │   ^   │ Is traversable from the up direction.
 * │  4 3  │
 * │<  E  >│ Is traversable from the left/right direction.
 * │  2 1  │
 * │   v   │ Is traversable from the down direction.
 * └───────┘
 * 
 * 1 2 3 4 E : What layer is blocking passage. E stands for event tiles.
 * 
 * @param Toggle Key
 * @type select
 * @option F1
 * @value 112
 * @option F2
 * @value 113
 * @option F3
 * @value 114
 * @option F4
 * @value 115
 * @option F5
 * @value 116
 * @option F6
 * @value 117
 * @option F7
 * @value 118
 * @option F8
 * @value 119
 * @option F9
 * @value 120
 * @option F10
 * @value 121
 * @option F11
 * @value 122
 * @option F12
 * @value 123
 * @default 122
*/

(() => {
    const PLUGIN_NAME = "OZZ_DebugPasability";
    var OZZBM_Param = PluginManager.parameters(PLUGIN_NAME);
    var ozz_debugToggleKey = Number(OZZBM_Param['Toggle Key']);
    var ozz_arrowBmp = [new Bitmap(16,8),new Bitmap(16,8),new Bitmap(8,16),new Bitmap(8,16)];
    const ozz_ArrowColor = "rgba(255, 255, 255, 1)";
    for (var y = 0; y < 8; y++) {
        var x = y;
        var w = 16 - y - y;
        ozz_arrowBmp[0].fillRect(x, y, w, 1, ozz_ArrowColor);
        ozz_arrowBmp[1].fillRect(x, 7-y, w, 1, ozz_ArrowColor);
        ozz_arrowBmp[2].fillRect(y, x, 1, w, ozz_ArrowColor);
        ozz_arrowBmp[3].fillRect(7-y, x, 1, w, ozz_ArrowColor);
    }
    //
    OZZ_Input__onKeyUp = Input._onKeyUp;
    Input._onKeyUp = function(event) {
        console.log(event.keyCode);
        console.log(ozz_debugToggleKey);
        if (event.keyCode === ozz_debugToggleKey) {
            this._isDebugVisible = !(this.IsDebugVisible());
        }
        OZZ_Input__onKeyUp.call(this,event);
    };
    Input.IsDebugVisible = function() {
        return this._isDebugVisible === true;
    }
    //
    Game_Map.prototype.isPassableLayer = function(x, y) {
        return this.checkPassageLayer(x, y);
    };
    Game_Map.prototype.checkPassageLayer = function(x, y) {
        const flags = this.tilesetFlags();
        const tiles = this.allTiles(x, y);
        const passage = [];
        for (const tile of tiles) {
            const flag = flags[tile];
            if ((flag & 0x10) !== 0) {
                // [*] No effect on passage
                passage.push(true);
            }
            else if ((flag & 0x0f) !== 0) {
                // [x] Impassable
                passage.push(false);
            }
            else if ((flag & 0x0f) === 0) {
                // [o] Passable
                passage.push(true);
            }
            else passage.push(true);
        }
        return passage;
    };
    //
    function Sprite_Passability() {
        this.initialize(...arguments);
    }
    Sprite_Passability.prototype = Object.create(Sprite.prototype);
    Sprite_Passability.prototype.constructor = Sprite_Passability;
    Sprite_Passability.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this.visible = Input.IsDebugVisible();
        this._currOX = $gameMap._displayX;
        this._currOY = $gameMap._displayY;
        this.createBitmap();
        this.refresh();
    };
    Sprite_Passability.prototype.createBitmap = function() {
        this.bitmap = new Bitmap(Graphics.width + 96, Graphics.height + 96);
        this.x = -48;
        this.y = -48;
    };
    Sprite_Passability.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.visible = Input.IsDebugVisible();
        //
        this.x = -(($gameMap._displayX * 48) % 48) - 48;
        this.y = -(($gameMap._displayY * 48) % 48) - 48;
        //
        var floorDX = Math.floor($gameMap._displayX);
        var floorDY = Math.floor($gameMap._displayY);
        if (floorDX != this._currOX || floorDY != this._currOY) {
            this._currOX = floorDX;
            this._currOY = floorDY;
            this.refresh();
        }
    };
    Sprite_Passability.prototype.refresh = function() {
        //
        this.bitmap.clear();
        const maxX = (Graphics.width / 48) + 2;
        const maxY = (Graphics.height / 48) + 2;
        for (var x = 0; x < maxX; x++) {
            for (var y = 0; y < maxY; y++) {
                this.drawTile(x, y);
            }
        }
    }
    Sprite_Passability.prototype.drawTile = function(x,y) {
        const color0 = "rgba(255, 0, 0, 0.5)";
        const colorLB = "rgba(64, 64, 64, 1)";
        const colorL0 = "rgba(255, 128, 128, 1)";
        const colorL1 = "rgba(128, 255, 128, 1)";
        const colorL2 = "rgba(128, 128, 255, 1)";
        const colorL3 = "rgba(255, 255, 128, 1)";
        const colorLE = "rgba(255, 128, 255, 1)";
        const lx = x - 1 + this._currOX;
        const ly = y - 1 + this._currOY;
        const d = $gameMap.isPassable(lx,ly,2);
        const l = $gameMap.isPassable(lx,ly,4);
        const r = $gameMap.isPassable(lx,ly,6);
        const u = $gameMap.isPassable(lx,ly,8);
        const passTile = $gameMap.isPassableLayer(lx,ly);
        if (!d || !l || !r || !u) {
            var sx = (x) * 48;
            var sy = (y) * 48;
            this.bitmap.fillRect(sx, sy, 48, 48, color0);
            if (!l) this.bitmap.blt(ozz_arrowBmp[3],0,0,8,16, sx+4, sy+16);
            if (!r) this.bitmap.blt(ozz_arrowBmp[2],0,0,8,16, sx+36, sy+16);
            if (!u) this.bitmap.blt(ozz_arrowBmp[1],0,0,16,8, sx+16, sy+4);
            if (!d) this.bitmap.blt(ozz_arrowBmp[0],0,0,16,8, sx+16, sy+36);
            //
            this.bitmap.fillRect(sx + 16, sy + 16, 16, 16, colorLB);
            if (passTile[0]!==true) {
                this.bitmap.fillRect(sx + 16 + 0, sy + 16 + 0, 8, 8, colorL0);
            }
            if (passTile[1]!==true) {
                this.bitmap.fillRect(sx + 16 + 8, sy + 16 + 0, 8, 8, colorL1);
            }
            if (passTile[2]!==true) {
                this.bitmap.fillRect(sx + 16 + 0, sy + 16 + 8, 8, 8, colorL2);
            }
            if (passTile[3]!==true) {
                this.bitmap.fillRect(sx + 16 + 8, sy + 16 + 8, 8, 8, colorL3);
            }
            if (passTile[4]===false) {
                this.bitmap.fillRect(sx + 16 + 4, sy + 16 + 4, 8, 8, colorLE);
            }
        }
    }
    //
    OZZ_Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        OZZ_Scene_Map_createDisplayObjects.call(this);
        this.createDebugLayer();
    };

    Scene_Map.prototype.createDebugLayer = function() {
        this._passabilityDebug = new Sprite_Passability();
        this.addChild(this._passabilityDebug);
        this._passabilityDebug.update();
    };
})();