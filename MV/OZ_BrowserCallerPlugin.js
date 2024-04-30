/*:
 * @plugindesc Adds buttons to open browser windows.
 * @author Orochii Zouveleki
 * 
 * @param Add Options to Title
 * @desc Shows options in title command to open a browser.
 * @type @type struct<BrowserCall>[]
 * @default []
 * 
 * @param Add Options to Party Menu
 * @desc Shows options in party menu to open a browser.
 * @type @type struct<BrowserCall>[]
 * @default []
 * 
 * @param End
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

/*~struct~BrowserCall:
 * @param Text
 * @desc Text to be displayed.
 * @default Open website
 * 
 * @param Url
 * @desc URL to open in browser.
 * @default https://google.com
 * 
 * @param Use Default
 * @desc Use default browser instead of a new NWJS window.
 * @type boolean
 * @default false
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
            this.title = JSON.parse(params["Add Options to Title"])
            for (var i = 0; i < this.title.length; i++) {
                this.title[i] = JSON.parse(this.title[i]);
                this.title[i].useDefault = this.title[i]["Use Default"]==="true"
            }
            this.partyMenu = JSON.parse(params["Add Options to Party Menu"])
            for (var i = 0; i < this.partyMenu.length; i++) {
                this.partyMenu[i] = JSON.parse(this.partyMenu[i]);
                this.partyMenu[i].useDefault = this.partyMenu[i]["Use Default"]==="true"
            }
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
    if(PluginManager.registerCommand !== undefined) {
        PluginManager.registerCommand(PLUGIN_NAME, "browsercall", args => {
            const _url = args.Url;
            const _default = args.Default === "true";
            OZ.browser.OpenURL(_url,_default);
        });
    }
    //
    // -----------------------------------------------------------------------------------------------------------
    //
    OZZ_Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        OZZ_Window_MenuCommand_addOriginalCommands.call(this);
        //
        this._browserIdxs = [];
        for (var a in OZ.browser.partyMenu) {
            var option = OZ.browser.partyMenu[a];
            this.addCommand(option.Text, 'browsercall', true);
            this._browserIdxs.push(this._list.length-1);
        }
    };
    OZZ_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        OZZ_Scene_Menu_createCommandWindow.call(this);
        this._commandWindow.setHandler('browsercall', this.commandBrowserCall.bind(this));
    };
    Scene_Menu.prototype.commandBrowserCall = function() {
        var curr = this._commandWindow._browserIdxs.indexOf(this._commandWindow.index());
        if (curr != -1) {
            var currBrowser = OZ.browser.partyMenu[curr];
            OZ.browser.OpenURL(currBrowser.Url,currBrowser.useDefault);
        }
        this._commandWindow.active = true;
    }

    //
    // -----------------------------------------------------------------------------------------------------------
    //
    OZZ_Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        OZZ_Window_TitleCommand_makeCommandList.call(this);
        //
        this._browserIdxs = [];
        for (var a in OZ.browser.title) {
            var option = OZ.browser.title[a];
            this.addCommand(option.Text, 'browsercall', true);
            this._browserIdxs.push(this._list.length-1);
        }
    };
    OZZ_Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        OZZ_Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('browsercall', this.commandBrowserCall.bind(this));
    };
    Scene_Title.prototype.commandBrowserCall = function() {
        var curr = this._commandWindow._browserIdxs.indexOf(this._commandWindow.index());
        if (curr != -1) {
            var currBrowser = OZ.browser.title[curr];
            OZ.browser.OpenURL(currBrowser.Url,currBrowser.useDefault);
        }
        this._commandWindow.active = true;
    }
})();