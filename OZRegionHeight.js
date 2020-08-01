//=============================================================================
// OZRegionHeight.js
//=============================================================================
/*:
 * @plugindesc Lets you change the height at which the character is drawn depending on regions.
 * @author Orochii Zouveleki
 * 
 * @help NUTHINNNNNNNNN!!N!N!N!N!N.
 * 
 * @param Regions
 * @desc List of all regions being used by the plugin. Any other will be ignored (height 0).
 * @type struct<RegionData>[]
 * @default []
*/

 /*~struct~RegionData:
 * @param Region ID
 * @type number
 * @default 0
 * @param Height
 * @type number
 * @default 0
 */

(function() {
    // Parameter parsing
    var OZRH_Param = PluginManager.parameters('OZRegionHeight');
    var OZRH_Regions= JSON.parse(OZRH_Param['Regions']);
	for (var i = 0; i < OZRH_Regions.length; i++) {
		OZRH_Regions[i] = JSON.parse(OZRH_Regions[i]);
    }

    OZRH_Regions.getRegionHeight = function(id) {
        for (var i = 0; i < OZRH_Regions.length; i++) {
            var obj = OZRH_Regions[i];
            if (Number(obj['Region ID']) == id) {
                return Number(obj['Height']);
            }
        }
        return 0;
    };

    OZRH_Regions.moveTowards = function(start,end,step) {
        var a = start;
        if (start > end) {
            a -= step;
            if (a < end) a = end;
        } else {
            a += step;
            if (a > end) a = end;
        }
        return a;
    }

    // Character new members
    Game_CharacterBase.prototype.regionHeightEnabled = function() {
        return true;
    }
    Game_CharacterBase.prototype.targetRegionHeight = function() {
        if ($gameMap == null || $dataMap == null) return 0;
        return OZRH_Regions.getRegionHeight(this.regionId());
    };

    // Character member changes
    var Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        Game_CharacterBase_initMembers.call(this);
        this._regionHeight = 0;
        this._targetRegionHeight = 0;
        this._regionHeightStep = 1;
    };

    var Game_CharacterBase_setPosition = Game_CharacterBase.prototype.setPosition;
    Game_CharacterBase.prototype.setPosition = function(x, y) {
        Game_CharacterBase_setPosition.call(this, x, y);
        this._regionHeight = this.targetRegionHeight();
        this._targetRegionHeight = this._regionHeight;
    }

    var Game_CharacterBase_screenY = Game_CharacterBase.prototype.screenY;
    Game_CharacterBase.prototype.screenY = function() {
        var origY = Game_CharacterBase_screenY.call(this);
        if (!this.regionHeightEnabled()) return origY;
        return origY - Math.ceil(this._regionHeight);
    };

    var Game_CharacterBase_updateMove = Game_CharacterBase.prototype.updateMove;
    Game_CharacterBase.prototype.updateMove = function() {
        Game_CharacterBase_updateMove.call(this);
        // Update character region height
        var tHeight = this.targetRegionHeight();
        if (this._targetRegionHeight !== tHeight) {
            this._targetRegionHeight = tHeight;
            var delta = Math.abs(this._regionHeight - tHeight);
            this._regionHeightStep = delta * this.distancePerFrame();
        }
        this._regionHeight = OZRH_Regions.moveTowards(this._regionHeight, tHeight, this._regionHeightStep);
    };

    // Event support for disabling region height
    Game_Event.prototype.regionHeightEnabled = function() {
        var name = this.event().note;
        return !(name.match(/\<noRH\>/i));
    }
})();