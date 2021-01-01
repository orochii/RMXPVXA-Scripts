//=============================================================================
// RPG Maker MZ - Adjusted Aspect Ratio
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Miracle cure for those pesky black bars on fullscreen.
 * @author Orochii Zouveleki
 *
 * @help OZZAdjustedAspectRatio.js
 *
 * This plugin attempts to fix the window aspect ratio to fit the current screen 
 * resolution configuration.
 * It will appear as an option in the options menu.
 * 
 * @param Add setting to options menu
 * @desc Will the 'adjust aspect ratio' setting be added to the options menu? (EXPERIMENTAL)
 * @type boolean
 * @on Count me in!
 * @off No, thanks.
 * @default false
 * 
 * @param Setting text
 * @desc Text displayed in the options window for the setting name.
 * @type text
 * @default Adjust aspect ratio
 * 
 * @param Default value
 * @desc Only active if setting is added to the menu (disable this plugin if you're not gonna use it at all).
 * @type boolean
 * @on Gimme the whacky effects!
 * @off Turn off that dang thing!
 * @default false
 */
(() => {
    // Reading parameters.
    var OZZAAR_Param = PluginManager.parameters('OZZAdjustedAspectRatio');
    const OZ_SettingText = OZZAAR_Param['Setting text'];
    const OZ_AddSetting = OZZAAR_Param['Add setting to options menu'] == "true";
    const OZ_SettingDefault = OZZAAR_Param['Default value'] == "true";

    function refreshScreenSize() {
        console.log("OLD: " + Graphics.width + " " + Graphics.height + "NEW: " + $dataSystem.advanced.screenWidth + " " + $dataSystem.advanced.screenHeight);
        Graphics.resize($dataSystem.advanced.screenWidth, $dataSystem.advanced.screenHeight);
    }

    function getAdjustAspectRatio() {
        if (!OZ_AddSetting) return true;
        else return ConfigManager["adjustAspectRatio"];
    }
    
    // Rewrite the resize function in order to support adjusting window size to the system's aspect ratio.
    Graphics.resize = function(width, height) {
        //
        aar = getAdjustAspectRatio();
        aspectRatio = (window.screen.width / window.screen.height);
        newWidth = aar ? (height * aspectRatio) : width;
        console.log(newWidth);
        if (this._width != newWidth || this._height != height) {
            this._width = newWidth;
            this._height = height;
            this._updateAllElements();
            if (OZ_AddSetting) {
                Scene_Boot.prototype.adjustBoxSize();
                Scene_Boot.prototype.adjustWindow();
            }
        }
    };

    if (OZ_AddSetting) {
        // Changes to config manager to add a new setting.
        ConfigManager.adjustAspectRatio = OZ_SettingDefault;

        var OZZ_ConfigManager_makeData = ConfigManager.makeData;
        ConfigManager.makeData = function() {
            const config = OZZ_ConfigManager_makeData.call(this);
            config.adjustAspectRatio = this.adjustAspectRatio;
            return config;
        };
        
        var OZZ_ConfigManager_applyData = ConfigManager.applyData;
        ConfigManager.applyData = function(config) {
            OZZ_ConfigManager_applyData.call(this, config);
            this.adjustAspectRatio = this.readFlag(config, "adjustAspectRatio", OZ_SettingDefault);
            // Apply aspect ratio change
            refreshScreenSize();
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
    }
})();
