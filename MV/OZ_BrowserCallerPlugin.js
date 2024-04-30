/*:
 * @plugindesc Adds buttons to open browser windows.
 * @author Orochii Zouveleki
 * 
 * @param Add to Title
 * @desc Show an option in title command to open a browser.
 * @type boolean
 * @default false
 * @param Title Text
 * @parent Add to Title
 * @desc Text to display on menu.
 * @default Open website
 * @param Title URL
 * @parent Add to Title
 * @desc URL to open when open browser option is selected.
 * @default https://ragnarokrproject.com
 * @param Title URL uses default browser
 * @parent Add to Title
 * @desc If TRUE, opens default browser. If FALSE, creates a child window with NWJS.
 * @type boolean
 * @default false
 * 
 * @param Add to Party Menu
 * @desc Show an option in party menu to open a browser.
 * @type boolean
 * @default false
 * @param Party Menu Text
 * @parent Add to Party Menu
 * @desc Text to display on menu.
 * @default Open website
 * @param Party Menu URL
 * @parent Add to Party Menu
 * @desc URL to open when open browser option is selected.
 * @default https://ragnarokrproject.com
 * @param Party Menu URL uses default browser
 * @parent Add to Party Menu
 * @desc If TRUE, opens default browser. If FALSE, creates a child window with NWJS.
 * @type boolean
 * @default false
 * 
 * @command browsercall
 * @text Call Browser
 * @desc Opens a browser tab with a website.
 * @arg Url
 * @default https://ragnarokrproject.com
 * @desc URL of site to open.
 * @arg Default
 * @desc Use default browser (ON) or open a new NWJS window (OFF).
 * @type boolean
 * @default false
 * 
 * @help ON MZ:
 * Plugin commands in MZ were improved, use the cool UI.
 * ON MV:
 * To open a browser window using a plugin command, use the following command.
 * 
 * browsercall URL
 * browsercall http://google.com
 * 
 * By default, when navigating to the selected address, it will open a new NWJS window (the game will create a new window). 
 * To use the system's default browser instead, add the following argument.
 * 
 * browsercall URL default
 * browsercall http://google.com default
 */

(()=>{
    var __filename;
    (function(){ 
        var scripts = document.getElementsByTagName('script'); 
        __filename = scripts[ scripts.length-1 ].src; 
    }());
    var path = require('path');
    const PLUGIN_NAME = path.basename(__filename, path.extname(__filename));

    class OZ_Browser {
        constructor(){
            var params = PluginManager.parameters(PLUGIN_NAME);
            this.title = {}
            this.title.enabled = params["Add to Title"] === "true"
            this.title.text = params["Title Text"]
            this.title.url = params["Title URL"]
            this.title.default = params["Title URL uses default browser"] === "true"
            this.partyMenu = {}
            this.partyMenu.enabled = params["Add to Party Menu"] === "true"
            this.partyMenu.text = params["Party Menu Text"]
            this.partyMenu.url = params["Party Menu URL"]
            this.partyMenu.default = params["Party Menu URL uses default browser"] === "true"
        }
        OpenURL(url,defaultBrowser){
            if (url.length > 0) {
                if (defaultBrowser===true) {
                    require('nw.gui').Shell.openExternal(url);
                } else {
                    window.open(url, '_blank');
                }
            }
        }
    }
    if (typeof OZ === 'undefined') OZ = {};
    OZ.browser = new OZ_Browser();
    //
    var OZZ_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        OZZ_Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'browsercall') {
            var _url = ""
            var _default = false
            if (args.length > 0) _url = args[0];
            if (args.length > 1) _default = args[1]==="default";
            //
            OZ.browser.OpenURL(_url,_default);
        }
    };
    PluginManager.registerCommand(PLUGIN_NAME, "browsercall", args => {
        const _url = args.Url;
        const _default = args.Default === "true";
        OZ.browser.OpenURL(_url,_default);
    });
    //
    OZZ_Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        OZZ_Window_MenuCommand_addOriginalCommands.call(this);
        //
        if (OZ.browser.partyMenu.enabled) this.addCommand(OZ.browser.partyMenu.text, 'browsercall', true);
    };
    OZZ_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        OZZ_Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler('browsercall', this.commandBrowserCall.bind(this));
    };
    Scene_Menu.prototype.commandBrowserCall = function() {
        OZ.browser.OpenURL(OZ.browser.partyMenu.url,OZ.browser.partyMenu.default);
        this._commandWindow.active = true
    }

    //
    OZZ_Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        OZZ_Window_TitleCommand_makeCommandList.call(this);
        if (OZ.browser.title.enabled) this.addCommand(OZ.browser.title.text, 'browsercall', true);
    };
    OZZ_Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        OZZ_Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('browsercall', this.commandBrowserCall.bind(this));
    };
    Scene_Title.prototype.commandBrowserCall = function() {
        OZ.browser.OpenURL(OZ.browser.title.url,OZ.browser.title.default);
        this._commandWindow.active = true
    }
})();