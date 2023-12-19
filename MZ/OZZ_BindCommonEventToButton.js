/*:
 * @plugindesc Bind common events to buttons/keys
 * @author Orochii Zouveleki
 * @target MZ
 * 
 * @param Map Button Bindings
 * @desc Bindings active while on map
 * @type struct<ButtonBindData>[]
 * 
 * @help This plugin allows binding common events to buttons, in a way that 
 * respects RMMV/RMMZ's inner workings. This shouldn't break rebindings and 
 * whatnot unless your preferred rebinding script is badly coded.
 * 
 * List of default bindings
 * ------------------------
 * left     (Left arrow, Numpad 4)
 * up       (Up arrow, Numpad 8)
 * right    (Right arrow, Numpad 6)
 * down     (Down arrow, Numpad 2)
 * tab      (Tab)
 * ok       (Z, Enter, Space)
 * shift    (Shift)
 * control  (Control, Alt)
 * escape   (Escape, Insert, X, Numpad 0)
 * pageup   (Page Up, Q)
 * pagedown (Page Down, W)
 * debug    (F9)
 * 
 * Stinki self-promotion: You can create new bindings using OZZ_Metal, see my 
 * repo for more (?). 
 * https://github.com/orochii/RMXPVXA-Scripts/tree/master/MZ
 * 
 * LICENSE:
 * MIT
*/

/*~struct~ButtonBindData:
 * @param Bind Name
 * @desc Name for the key to be binded to.
 * @type text
 * @default ok
 * 
 * @param Common event
 * @desc The common event to run when key is pressed.
 * @type common_event
 * @default 0
 */

(()=>{
    var __filename = document.currentScript.src;
    var path = require('path');
    const PLUGIN_NAME = path.basename(__filename, path.extname(__filename));

    class OZZCEBB {
        constructor() {
            var params = PluginManager.parameters(PLUGIN_NAME);
            // Map button binds
            if (params['Map Button Bindings'].length != 0) this.mapBindings = JSON.parse(params['Map Button Bindings']);
            else this.mapBindings = [];
            for (var i = 0; i < this.mapBindings.length; i++) {
                this.mapBindings[i] = JSON.parse(this.mapBindings[i]);
                this.mapBindings[i].name = this.mapBindings[i]['Bind Name'];
                this.mapBindings[i].commonEventId = Number(this.mapBindings[i]['Common event']);
            }
        }

        CheckInput(array) {
            for (var i = 0; i < array.length; i++) {
                if (Input.isTriggered(array[i].name)) {
                    $gameTemp.reserveCommonEvent(array[i].commonEventId);
                }
            }
        }

    }
    if (typeof OZ === 'undefined') OZ = {};
    OZ.cebb = new OZZCEBB();
/*
    if (Input.isTriggered("ok")) {
        $gameTemp.reserveCommonEvent(this.picture().mzkp_commonEventId);
    }
  */  
    var OZCEBB_Scene_Map_updateMain = Scene_Map.prototype.updateMain;
    Scene_Map.prototype.updateMain = function() {
        OZCEBB_Scene_Map_updateMain.call(this);
        
        if (this.isMapTouchOk() && !this.isBusy()) {
            OZ.cebb.CheckInput(OZ.cebb.mapBindings);
        }
    };
})();