//=============================================================================
// RPG Maker MZ - OZZ SimpleMenu
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Removes left side, gold, moves the command menu around and gives option to add an image as background.
 * 
 * @help OZZ_SimpleMenu.js
 * 
 * All options are basically  to reposition the command window and 
 * alter its appearance a bit.
 * Background image must be placed in the img/system/ folder.
 * 
 * ABOUT VARIABLE BACKGROUND
 * -------------------------
 * You can control what background is displayed by selecting a variable
 * index in this option.
 * If there is a set variable here, the variable will determine the 
 * background that will be used as background, as long as the value
 * is higher than zero.
 * 
 * I.e.
 * Variable 1 set to 0, the game will use a default filename: menuback
 * When variable 1 is set to 2, the game will use instead: menuback_02
 * When variable 1 is set to 99, it will use: menuback_99
 * 
 * If the value goes over 99, it will be formatted differently.
 * For example, a value of 101 will result in the following: menuback_101
 * 
 * @param Command window
 * @param Background
 * 
 * @param Visible commands
 * @parent Command window
 * @desc Number of commands visible, used for the window size.
 * @type number
 * @default 3
 * @min 0
 * 
 * @param Horizontal align
 * @parent Command window
 * @desc Horizontal alignment for command window. Either left, center or right.
 * @default left
 * @type select
 * @option left
 * @option center
 * @option right
 * 
 * @param Vertical align
 * @parent Command window
 * @desc Vertical alignment for command window. Use top, center or bottom.
 * @default center
 * @type select
 * @option top
 * @option center
 * @option bottom
 * 
 * @param Window opacity
 * @parent Command window
 * @desc Sets the command window opacity.
 * @type number
 * @default 255
 * @max 255
 * @min 0
 * 
 * @param Commands background opacity
 * @parent Command window
 * @desc Sets the opacity for the black boxes under each command.
 * @type number
 * @default 255
 * @max 255
 * @min 0
 * 
 * @param Background image
 * @parent Background
 * @desc Sets an image to go under the command window, taking the whole screen.
 * @type file
 * @dir img/system/
 * @default 
 * 
 * @param Background horizontal align
 * @parent Background
 * @desc Horizontal alignment for background. Either left, center or right.
 * @default left
 * @type select
 * @option left
 * @option center
 * @option right
 * 
 * @param Background vertical align
 * @parent Background
 * @desc Vertical alignment for background. Use top, center or bottom.
 * @default center
 * @type select
 * @option top
 * @option center
 * @option bottom
 * 
 * @param Variable background
 * @parent Background
 * @desc Allows to change background by setting a variable value. Set to "None" to disable.
 * @type variable
 */
(() => {
    const PLUGIN_NAME = "OZZ_SimpleMenu";
    var OZZMM2k_Param = PluginManager.parameters(PLUGIN_NAME);
    var ozz_VisibleCommands = Number(OZZMM2k_Param['Visible commands']);
    var ozz_horzAlign = OZZMM2k_Param['Horizontal align'];
    var ozz_vertAlign = OZZMM2k_Param['Vertical align'];
    var ozz_WindowOpacity = Number(OZZMM2k_Param['Window opacity']);
    var ozz_CommandBackOpacity = Number(OZZMM2k_Param['Commands background opacity']);
    var ozz_BackgroundImage = OZZMM2k_Param['Background image'];
    var ozz_BackHorzAlign = OZZMM2k_Param['Background horizontal align'];
    var ozz_BackVertAlign = OZZMM2k_Param['Background vertical align'];
    var ozz_VariableBackground = Number(OZZMM2k_Param['Variable background'])
    //
    Scene_MenuBase.prototype.commandWindowHeight = function() {
        return this.calcWindowHeight(ozz_VisibleCommands, true);
    };
    //
    Scene_Menu.prototype.commandWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.commandWindowHeight();
        const hAlign = (ozz_horzAlign=="right") ? 2 : ((ozz_horzAlign=="center") ? 1 : 0)
        const vAlign = (ozz_vertAlign=="bottom") ? 2 : ((ozz_horzAlign=="center") ? 1 : 0)
        const wx = (Graphics.boxWidth - ww) * hAlign / 2;
        const wy = this.mainAreaTop() + ( (this.mainAreaHeight() - wh) * vAlign / 2 );
        var r = new Rectangle(wx, wy, ww, wh);
        return r;
    };
    //
    Scene_Menu.prototype.createGoldWindow = function() {
        // OVERWRITE
    };
    Scene_Menu.prototype.createStatusWindow = function() {
        //
    };
    Scene_Menu.prototype.createBackground = function() {
        Scene_MenuBase.prototype.createBackground.call(this);
        this.createMenuBackground();
    }
    Scene_Menu.prototype.createMenuBackground = function() {
        const hAlign = (ozz_BackHorzAlign=="right") ? 2 : ((ozz_BackHorzAlign=="center") ? 1 : 0)
        const vAlign = (ozz_BackVertAlign=="bottom") ? 2 : ((ozz_BackVertAlign=="center") ? 1 : 0)
        this._menuBackgroundSprite = new Sprite();
        var _backName_ = ozz_BackgroundImage;
        if (ozz_VariableBackground > 0) {
            var val = $gameVariables.value(ozz_VariableBackground);
            if (val > 0) _backName_ = ozz_BackgroundImage + "_%1".format(val.padZero(2));
        }
        if (_backName_ !== undefined && _backName_ !== "") {
            this._menuBackgroundSprite.bitmap = ImageManager.loadSystem(_backName_);
            iw = this._menuBackgroundSprite.bitmap.width;
            ih = this._menuBackgroundSprite.bitmap.height;
            this._menuBackgroundSprite.x = (Graphics.width) * hAlign / 2;
            this._menuBackgroundSprite.y = (Graphics.height) * vAlign / 2;
            this._menuBackgroundSprite.anchor.x = hAlign * 0.5;
            this._menuBackgroundSprite.anchor.y = vAlign * 0.5;
        }
        this.addChild(this._menuBackgroundSprite);
    }
    OZZ_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        OZZ_Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.opacity = ozz_WindowOpacity;
        this._commandWindow._contentsBackSprite.opacity = ozz_CommandBackOpacity;
    };
    Scene_Menu.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
    };
})();