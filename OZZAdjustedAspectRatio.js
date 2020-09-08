//=============================================================================
// RPG Maker MZ - Adjusted Aspect Ratio
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Alternate battle layout with wide-screen support and other things.
 * @author Orochii Zouveleki
 *
 * @help OZZAdjustedAspectRatio.js
 *
 * This plugin attempts to fix the window aspect ratio to fit the current screen 
 * resolution configuration.
 * It will appear as an option in the options menu.
 * 
 * @param Setting text
 * @desc Text displayed in the options window for the setting name.
 * @type text
 * @default Adjust aspect ratio
 */
(() => {
    // Reading parameters.
    var OZZAAR_Param = PluginManager.parameters('OZZAdjustedAspectRatio');
    const OZ_SettingText = OZZAAR_Param['Setting text'];

    function refreshScreenSize() {
        console.log("OLD: " + Graphics.width + " " + Graphics.height + "NEW: " + $dataSystem.advanced.screenWidth + " " + $dataSystem.advanced.screenHeight);
        Graphics.resize($dataSystem.advanced.screenWidth, $dataSystem.advanced.screenHeight);
    }
    
    // Changes to config manager to add a new setting.
    ConfigManager.adjustAspectRatio = false;

    var OZZ_ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = OZZ_ConfigManager_makeData.call(this);
        config.adjustAspectRatio = this.adjustAspectRatio;
        return config;
    };
    
    var OZZ_ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        OZZ_ConfigManager_applyData.call(this, config);
        this.adjustAspectRatio = this.readFlag(config, "adjustAspectRatio", false);
        // Apply aspect ratio change
        refreshScreenSize();
    };
    
    // Rewrite the resize function in order to support adjusting window size to the system's aspect ratio.
    Graphics.resize = function(width, height) {
        //
        aar = ConfigManager["adjustAspectRatio"];
        aspectRatio = (window.screen.width / window.screen.height);
        console.log(window.screen.width + " / " + window.screen.height + " = " + aspectRatio);
        newWidth = aar ? height * aspectRatio : width;
        if (this._width != newWidth || this._height != height) {
            this._width = newWidth;
            this._height = height;
            this._updateAllElements();
            Scene_Boot.prototype.adjustBoxSize();
            Scene_Boot.prototype.adjustWindow();
        }
    };

    var OZZ_Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        OZZ_Window_Options_makeCommandList.call(this);
        this.addVideoOptions();
    };
    Window_Options.prototype.addVideoOptions = function() {
        this.addCommand(OZ_SettingText, "adjustAspectRatio");
    }

    OZZ_Window_Options_setConfigValue = Window_Options.prototype.setConfigValue;
    Window_Options.prototype.setConfigValue = function(symbol, volume) {
        OZZ_Window_Options_setConfigValue.call(this, symbol, volume);
        if (symbol === "adjustAspectRatio") refreshScreenSize();
    };
})();