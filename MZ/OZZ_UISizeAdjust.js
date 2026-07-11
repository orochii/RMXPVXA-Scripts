/*:
 * @target MZ
 * @plugindesc Allows for easy editing of UI constants.
 * @author Orochii Zouveleki
 * @url https://github.com/orochii/RMXPVXA-Scripts/tree/master/MZ
 * 
 * @param WINDOW_BASE
 * @text Window Basics
 * 
    * @param lineHeight
    * @parent WINDOW_BASE
    * @text Line Height
    * @desc Specify line height for most windows.
    * @default 36
    * @type number
    * 
    * @param itemPadding
    * @parent WINDOW_BASE
    * @text Item Padding
    * @desc Specify padding between items.
    * @default 8
    * @type number
    * 
    * @param windowPadding
    * @parent WINDOW_BASE
    * @text Window Padding
    * @desc Specify padding for windows content.
    * @default 12
    * @type number
    * 
    * @param fontIncrement
    * @parent WINDOW_BASE
    * @text Font Increment
    * @desc Added amount when font size is changed. Min=value*2, max=value*8.
    * @default 12
    * @type number
    * 
    * @param mainCommandWindowWidth
    * @parent WINDOW_BASE
    * @text Main Command Width
    * @desc Default width of command windows in scenes.
    * @default 240
    * @type number
    * 
    * @param touchButtonWidth
    * @parent WINDOW_BASE
    * @text Touch Button Width
    * @desc Width of all touch buttons.
    * @default 48
    * @type number
    * 
    * @param touchButtonHeight
    * @parent WINDOW_BASE
    * @text Touch Button Height
    * @desc Height of all touch buttons.
    * @default 48
    * @type number
    * 
    * @param touchButtonSpacing
    * @parent WINDOW_BASE
    * @text Touch Button Spacing
    * @desc Spacing between touch buttons.
    * @default 8
    * @type number
    * 
    * @param touchAreaPadding
    * @parent WINDOW_BASE
    * @text Touch Area Padding
    * @desc Padding around the touch buttons.
    * @default 6
    * @type number
    * 
    * @param faceSizeBase
    * @parent WINDOW_BASE
    * @text Face Base Size
    * @desc Space which the UI will draw the faces on.
    * @default 144
    * @type number
    * 
    * @param iconSizeBase
    * @parent WINDOW_BASE
    * @text Icon Base Size
    * @desc Space in which icons will be drawn and centered.
    * @default 32
    * @type number
    * 
    * @param fontSizeOverride
    * @parent WINDOW_BASE
    * @text Font Size Override
    * @desc If value > 0, it will override whatever value is in the game database. Break the limits aaaAAAAA!
    * @default 0
    * @type number
    * 
    * @param windowConfigs
    * @parent WINDOW_BASE
    * @text Windowskin Config
    * @desc Configurations for windowskins
    * @default '["{\"name\":\"Window\",\"frameMargin\":\"24\",\"cursorMargin\":\"4\",\"tiling\":\"false\",\"arrowOffsetX\":\"0\",\"arrowOffsetY\":\"0\",\"pauseOffsetX\":\"0\",\"pauseOffsetY\":\"0\"}"]'
    * @type struct<WindowConfig>[]
    * 
 * 
 * @param WINDOW_SELECTABLE
 * @text Window Selectable
 * 
    * @param colSpacing
    * @parent WINDOW_SELECTABLE
    * @text Column spacing
    * @desc Horizontal spacing between columns of selectable items.
    * @default 8
    * @type number
    * 
    * @param rowSpacing
    * @parent WINDOW_SELECTABLE
    * @text Row Spacing
    * @desc Vertical spacing between rows of selectable items.
    * @default 4
    * @type number
    * 
    * @param itemHeightAdjust
    * @parent WINDOW_SELECTABLE
    * @text Selectable Item Adjustment
    * @desc Adjustment to the item's height for selectable items only.
    * @default 8
    * @type number
 * 
 * @param WINDOW_STATUSBASE
 * @text Status Windows
 * 
    * @param gaugeWidth
    * @parent WINDOW_STATUSBASE
    * @text Gauge Width
    * @desc Set width for the gauges.
    * @default 128
    * @type number
    * 
    * @param gaugeLineHeight
    * @parent WINDOW_STATUSBASE
    * @text Gauge Line Height
    * @desc Set height for the gauges.
    * @default 24
    * @type number
    * 
    * @param actorNameWidth
    * @parent WINDOW_STATUSBASE
    * @text Default Actor Name Width
    * @desc Set default max width for name.
    * @default 168
    * @type number
    * 
    * @param actorClassWidth
    * @parent WINDOW_STATUSBASE
    * @text Default Actor Class Width
    * @desc Set default max width for class.
    * @default 168
    * @type number
    * 
    * @param actorNicknameWidth
    * @parent WINDOW_STATUSBASE
    * @text Default Actor Nickname Width
    * @desc Set default max width for nickname.
    * @default 270
    * @type number
    * 
    * @param actorLevelWidth
    * @parent WINDOW_STATUSBASE
    * @text Default Actor Level Width
    * @desc Set default width for level drawing.
    * @default 120
    * @type number
    * 
    * @param actorIconsWidth
    * @parent WINDOW_STATUSBASE
    * @text Default Actor Icons Width
    * @desc Set default max width when drawing actor's status icons.
    * @default 144
    * @type number
    * 
    * @param actorSecondColumnXOffset
    * @parent WINDOW_STATUSBASE
    * @text Status Column Width
    * @desc Horizontal adjustment to second column data in actor's status.
    * @default 180
    * @type number
    * 
    * @param menuStatusVisibleRows
    * @parent WINDOW_STATUSBASE
    * @text Party Menu Visible Rows
    * @desc Number of entries visible in party status window at once.
    * @default 4
    * @type number
    * 
    * @param statusBlock1X
    * @parent WINDOW_STATUSBASE
    * @text Status Block 1 X Offset
    * @desc Position offset for block 1 (?).
    * @default 0
    * @type number
    * 
    * @param statusBlock1Y
    * @parent WINDOW_STATUSBASE
    * @text Status Block 1 Y Offset
    * @desc Position offset for block 1 (?).
    * @default 0
    * @type number
    * 
    * @param statusBlock2X
    * @parent WINDOW_STATUSBASE
    * @text Status Block 2 X Offset
    * @desc Position offset for block 2 (?).
    * @default 0
    * @type number
    * 
    * @param statusBlock2Y
    * @parent WINDOW_STATUSBASE
    * @text Status Block 2 Y Offset
    * @desc Position offset for block 2 (?).
    * @default 0
    * @type number
    * 
    * @param statusColSpacing
    * @parent WINDOW_STATUSBASE
    * @text Status Screen Column Spacing
    * @desc Used to space out data in the status screen.
    * @default 24
    * @type number
    * 
    * @param simpleStatusConfig
    * @text Simple Status Config
    * @parent WINDOW_STATUSBASE
    * @desc Configurations for status drawing (party menu, skill status).
    * @type struct<SimpleStatus>
    * @default '{"actorName":"true","actorLevel":"true","actorIcons":"true","actorClass":"true","actorGauges":"true"}'
 * 
 * @param WINDOW_BATTLE
 * @text Battle Windows
 * 
    * @param commandWidth
    * @parent WINDOW_BATTLE
    * @text Battle Command Width
    * @desc Width for all battle command windows.
    * @default 192
    * @type number 
 * 
 * @param WINDOW_SAVE
 * @text Save File
    * @param saveNumVisibleRows
    * @parent WINDOW_SAVE
    * @text Number of Visible Saves
    * @desc Determines how many rows are visible in the save screen
    * @type number
    * @default 5
    * 
    * @param savefileInfoWidth
    * @parent WINDOW_SAVE
    * @text Savefile Info Width
    * @desc Width available for savefile name/info.
    * @type number
    * @default 220
    * 
 * 
 * @param WINDOW_EQUIP
 * @text Equip Screen
 * 
    * @param equipSlotNameWidth
    * @parent WINDOW_EQUIP
    * @text Equip Status Width
    * @desc Sets status window width in the editor screen.
    * @type number
    * @default 138
    * 
    * @param equipStatusWidth
    * @parent WINDOW_EQUIP
    * @text Equip Status Width
    * @desc Sets status window width in the editor screen.
    * @type number
    * @default 312
    * 
    * @param equipRightArrowWidth
    * @parent WINDOW_EQUIP
    * @text Equip Right Arrow Width
    * @desc Space for the equip change arrow character.
    * @type number
    * @default 32
    * 
    * @param equipParamWidth
    * @parent WINDOW_EQUIP
    * @text Equip Parameter Width
    * @desc Space available for parameter values in equip screen.
    * @type number
    * @default 48
    * 
 * 
 * @param WINDOW_NAME
 * @text Naming Screen
 * 
    * @param maxNameWindowWidth
    * @parent WINDOW_NAME
    * @text Max Name Window Width
    * @desc Width for the naming windows. Will adjust to be under the screen width if it overflows.
    * @type number
    * @default 600
    * 
    * @param namingGroupSpacing
    * @parent WINDOW_NAME
    * @text Naming Character Group Spacing
    * @desc Space between groups of letters in naming window.
    * @type number
    * @default 24
    * 
    * @param namingGroupSize
    * @parent WINDOW_NAME
    * @text Naming Character Group Size
    * @desc Grouping for characters in naming window.
    * @type number
    * @default 5
    * 
    * @param namingNameYPosition
    * @parent WINDOW_NAME
    * @text Name Text Y Position
    * @desc Position on naming window of the character's name.
    * @type number
    * @default 54
 * 
 * @param WINDOW_MISC
 * @text Miscellaneous Windows
 * 
    * @param titleFontSize
    * @parent WINDOW_MISC
    * @text Title Font Size
    * @desc Size of the titlescreen's game name font.
    * @type number
    * @default 72
    * 
    * @param titleFontName
    * @parent WINDOW_MISC
    * @text Title Font Name
    * @desc Name of the titlescreen's game name font.
    * @type string
    * @default rmmz-mainfont
    * 
    * @param mapNameWindowRect
    * @parent WINDOW_MISC
    * @text Map Name Window Position
    * @desc Position and size for map's name window
    * @type struct<Rect>
    * @default "{\"x\":\"0\",\"y\":\"0\",\"width\":\"360\",\"height\":\"1\",\"heightAsLines\":\"true\"}"
    * 
    * @param statusParamsWidth
    * @parent WINDOW_MISC
    * @text Status Param Window Width
    * @desc Specifies the width of the window where params are drawn on.
    * @type number
    * @default 300
    * 
    * @param shopStatusWidth
    * @parent WINDOW_MISC
    * @text Shop's Status Width
    * @desc Specifies width for the shop's status window.
    * @type number
    * @default 352
    * 
    * @param itemListColumns
    * @parent WINDOW_MISC
    * @text Item Lists' Columns
    * @desc How many columns to use on every item listing (except shop).
    * @type number
    * @default 2
    * 
    * @param skillListColumns
    * @parent WINDOW_MISC
    * @text Skill Lists' Columns
    * @desc How many columns to use on every skill listing.
    * @type number
    * @default 2
    * 
 * 
*/
/*~struct~SimpleStatus:
 * @param actorName
 * @text Draw Actor Name
 * @type boolean
 * @default false
 * 
 * @param actorLevel
 * @text Draw Actor Level
 * @type boolean
 * @default false
 * 
 * @param actorIcons
 * @text Draw Actor State Icons
 * @type boolean
 * @default false
 * 
 * @param actorClass
 * @text Draw Actor Class
 * @type boolean
 * @default false
 * 
 * @param actorGauges
 * @text Draw Actor Gauges
 * @type boolean
 * @default false
*/
/*~struct~Rect:
 * @param x
 * @type number
 * @default 0
 * 
 * @param y
 * @type number
 * @default 0
 * 
 * @param width
 * @type number
 * @default 0
 * 
 * @param height
 * @type number
 * @default 0
 * 
 * @param heightAsLines
 * @type boolean
 * @default true
*/
/*~struct~WindowConfig:
 * @param name
 * @type string
 * @default Window
 * 
 * @param frameMargin
 * @type number
 * @default 24
 * 
 * @param cursorMargin
 * @type number
 * @default 4
 * 
 * @param tiling
 * @type boolean
 * @default false
 * 
 * @param arrowOffsetX
 * @type number
 * @default 0
 * 
 * @param arrowOffsetY
 * @type number
 * @default 0
 * 
 * @param pauseOffsetX
 * @type number
 * @default 0
 * 
 * @param pauseOffsetY
 * @type number
 * @default 0
 * 
*/
(()=> {
    const PLUGIN_NAME = "OZZ_UISizeAdjust";
    class OZ_UISizeAdjust {
        constructor() {
            this.pluginParams = PluginManager.parameters(PLUGIN_NAME);
            this.lineHeight = Number(this.pluginParams.lineHeight);
            this.itemPadding = Number(this.pluginParams.itemPadding);
            this.windowPadding = Number(this.pluginParams.windowPadding);
            this.fontIncrement = Number(this.pluginParams.fontIncrement);
            this.mainCommandWindowWidth = Number(this.pluginParams.mainCommandWindowWidth);
            this.touchButtonWidth = Number(this.pluginParams.touchButtonWidth);
            this.touchButtonHeight = Number(this.pluginParams.touchButtonHeight);
            this.touchAreaPadding = Number(this.pluginParams.touchAreaPadding);
            this.touchButtonSpacing = Number(this.pluginParams.touchButtonSpacing);
            this.fontSizeOverride = Number(this.pluginParams.fontSizeOverride);
            //
            this.colSpacing = Number(this.pluginParams.colSpacing);
            this.rowSpacing = Number(this.pluginParams.rowSpacing);
            this.itemHeightAdjust = Number(this.pluginParams.itemHeightAdjust);
            this.gaugeWidth = Number(this.pluginParams.gaugeWidth);
            this.gaugeLineHeight = Number(this.pluginParams.gaugeLineHeight);
            this.actorNameWidth = Number(this.pluginParams.actorNameWidth);
            this.actorClassWidth = Number(this.pluginParams.actorClassWidth);
            this.actorNicknameWidth = Number(this.pluginParams.actorNicknameWidth);
            this.actorLevelWidth = Number(this.pluginParams.actorLevelWidth);
            this.actorIconsWidth = Number(this.pluginParams.actorIconsWidth);
            this.actorSecondColumnXOffset = Number(this.pluginParams.actorSecondColumnXOffset);
            this.menuStatusVisibleRows = Number(this.pluginParams.menuStatusVisibleRows);
            this.statusColSpacing = Number(this.pluginParams.statusColSpacing);
            this.statusBlock1X = Number(this.pluginParams.statusBlock1X);
            this.statusBlock1Y = Number(this.pluginParams.statusBlock1Y);
            this.statusBlock2X = Number(this.pluginParams.statusBlock2X);
            this.statusBlock2Y = Number(this.pluginParams.statusBlock2Y);
            this.simpleStatusConfig = JSON.parse(this.pluginParams.simpleStatusConfig);
            for (const g in this.simpleStatusConfig) {
                this.simpleStatusConfig[g] = JSON.parse(this.simpleStatusConfig[g]);
            }
            this.mapNameWindowRect = JSON.parse(this.pluginParams.mapNameWindowRect);
            for (const g in this.mapNameWindowRect) {
                this.mapNameWindowRect[g] = JSON.parse(this.mapNameWindowRect[g]);
            }
            //
            this.commandWidth = Number(this.pluginParams.commandWidth);
            this.saveNumVisibleRows = Number(this.pluginParams.saveNumVisibleRows);
            this.savefileInfoWidth = Number(this.pluginParams.savefileInfoWidth);
            this.titleFontName = this.pluginParams.titleFontName;
            this.titleFontSize = Number(this.pluginParams.titleFontSize);
            this.statusParamsWidth = Number(this.pluginParams.statusParamsWidth);
            this.equipStatusWidth = Number(this.pluginParams.equipStatusWidth);
            this.shopStatusWidth = Number(this.pluginParams.shopStatusWidth);
            this.itemListColumns = Number(this.pluginParams.itemListColumns);
            this.skillListColumns = Number(this.pluginParams.skillListColumns);
            this.maxNameWindowWidth = Number(this.pluginParams.maxNameWindowWidth);
            this.namingGroupSpacing = Number(this.pluginParams.namingGroupSpacing);
            this.namingGroupSize = Number(this.pluginParams.namingGroupSize);
            this.namingNameYPosition = Number(this.pluginParams.namingNameYPosition);
            this.equipSlotNameWidth = Number(this.pluginParams.equipSlotNameWidth);
            this.equipRightArrowWidth = Number(this.pluginParams.equipRightArrowWidth);
            this.equipParamWidth = Number(this.pluginParams.equipParamWidth);
            this.windowConfigs = JSON.parse(this.pluginParams.windowConfigs);
            for (var i = 0; i < this.windowConfigs.length; i++) {
                this.windowConfigs[i] = JSON.parse(this.windowConfigs[i]);
                var name = this.windowConfigs[i].name;
                for (const g in this.windowConfigs[i]) {
                    if (g === "name") continue;
                    this.windowConfigs[i][g] = JSON.parse(this.windowConfigs[i][g]);
                }
                //this.windowConfigs[i].name = name;
                this.windowConfigs[name] = this.windowConfigs[i];
            }
            //
            ImageManager.standardIconWidth = Number(this.pluginParams.iconSizeBase);
            ImageManager.standardIconHeight = Number(this.pluginParams.iconSizeBase);
            ImageManager.standardFaceWidth = Number(this.pluginParams.faceSizeBase);
            ImageManager.standardFaceHeight = Number(this.pluginParams.faceSizeBase);
        }
    }
    if (typeof OZ === 'undefined') OZ = {};
    OZ.uiAdjust = new OZ_UISizeAdjust();
    //#region Window
    Game_System.prototype.mainFontSize = function() {
        if (OZ.uiAdjust.fontSizeOverride > 0) {
            return OZ.uiAdjust.fontSizeOverride;
        }
        return $dataSystem.advanced.fontSize;
    };
    Window.prototype.getWindowskinName = function() {
        var url = this.windowskin.url;
        var base = url.substr(url.lastIndexOf("/") + 1);
        var name = base.substr(0,base.lastIndexOf('.'));
        return name;
    }
    Window.prototype.getWindowConfig = function() {
        // img/system/Window.png
        return OZ.uiAdjust.windowConfigs[this.getWindowskinName()];
    }
    Window.prototype._createFrameSprite = function() {
        this._frameSprite = new Sprite();
        for (let i = 0; i < 4; i++) {
            this._frameSprite.addChild(new Sprite());
        }
        for (let i = 0; i < 4; i++) {
            this._frameSprite.addChild(new TilingSprite());
        }
        this._container.addChild(this._frameSprite);
    };
    Window.prototype._createCursorSprite = function() {
        this._cursorSprite = new Sprite();
        for (let i = 0; i < 4; i++) {
            this._cursorSprite.addChild(new Sprite());
        }
        for (let i = 0; i < 5; i++) {
            this._cursorSprite.addChild(new TilingSprite());
        }
        this._clientArea.addChild(this._cursorSprite);
    };
    Window.prototype._refreshFrame = function() {
        const drect = { x: 0, y: 0, width: this._width, height: this._height };
        const srect = { x: 96, y: 0, width: 96, height: 96 };
        const m = this.getWindowConfig().frameMargin;
        for (const child of this._frameSprite.children) {
            child.bitmap = this._windowskin;
        }
        this._setRectPartsGeometry(this._frameSprite, srect, drect, m);
    };
    Window.prototype._refreshCursor = function() {
        const drect = this._cursorRect.clone();
        const srect = { x: 96, y: 96, width: 48, height: 48 };
        const m = this.getWindowConfig().cursorMargin;
        for (const child of this._cursorSprite.children) {
            child.bitmap = this._windowskin;
        }
        this._setRectPartsGeometry(this._cursorSprite, srect, drect, m);
    };
    Window.prototype._setRectPartsGeometry = function(sprite, srect, drect, m) {
        // TODO: border/inside repeat
        var windowConfig = this.getWindowConfig();
        const sx = srect.x;
        const sy = srect.y;
        const sw = srect.width;
        const sh = srect.height;
        const dx = drect.x;
        const dy = drect.y;
        const dw = drect.width;
        const dh = drect.height;
        const smw = sw - m * 2;
        const smh = sh - m * 2;
        const dmw = dw - m * 2;
        const dmh = dh - m * 2;
        const children = sprite.children;
        sprite.setFrame(0, 0, dw, dh);
        sprite.move(dx, dy);
        // corner
        children[0].setFrame(sx, sy, m, m);
        children[1].setFrame(sx + sw - m, sy, m, m);
        children[2].setFrame(sx, sy + sw - m, m, m);
        children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
        children[0].move(0, 0);
        children[1].move(dw - m, 0);
        children[2].move(0, dh - m);
        children[3].move(dw - m, dh - m);
        // edge
        children[4].setFrame(sx + m, sy, smw, m);
        children[5].setFrame(sx + m, sy + sw - m, smw, m);
        children[6].setFrame(sx, sy + m, m, smh);
        children[7].setFrame(sx + sw - m, sy + m, m, smh);
        if (windowConfig.tiling) {
            children[4].move(m, 0, dmw, m); //top
            children[5].move(m, dh - m, dmw, m); //bottom
            children[6].move(0, m, m, dmh); //left
            children[7].move(dw - m, m, m, dmh); //right
            children[4].scale.x = 1;
            children[5].scale.x = 1;
            children[6].scale.y = 1;
            children[7].scale.y = 1;
        } else {
            children[4].move(m, 0, smw, m); //top
            children[5].move(m, dh - m, smw, m); //bottom
            children[6].move(0, m, m, smh); //left
            children[7].move(dw - m, m, m, smh); //right
            children[4].scale.x = dmw / smw;
            children[5].scale.x = dmw / smw;
            children[6].scale.y = dmh / smh;
            children[7].scale.y = dmh / smh;
        }
        // center
        if (children[8]) {
            children[8].setFrame(sx + m, sy + m, smw, smh);
            if (windowConfig.tiling) {
                children[8].move(m, m, dmw, dmh);
                children[8].scale.x = 1;
                children[8].scale.y = 1;
            } else {
                children[8].move(m, m, smw, smh);
                children[8].scale.x = dmw / smw;
                children[8].scale.y = dmh / smh;
            }
        }
        for (const child of children) {
            child.visible = dw > 0 && dh > 0;
        }
    };
    Window.prototype._refreshArrows = function() {
        const w = this._width;
        const h = this._height;
        const p = 24;
        const q = p / 2;
        const sx = 96 + p;
        const sy = 0 + p;
        var windowConfig = this.getWindowConfig();
        var _ox = windowConfig.arrowOffsetX;
        var _oy = windowConfig.arrowOffsetY;
        this._downArrowSprite.bitmap = this._windowskin;
        this._downArrowSprite.anchor.x = 0.5;
        this._downArrowSprite.anchor.y = 0.5;
        this._downArrowSprite.setFrame(sx + q, sy + q + p, p, q);
        this._downArrowSprite.move(w / 2, h - q);
        this._upArrowSprite.bitmap = this._windowskin;
        this._upArrowSprite.anchor.x = 0.5;
        this._upArrowSprite.anchor.y = 0.5;
        this._upArrowSprite.setFrame(sx + q, sy, p, q);
        this._upArrowSprite.move(w / 2 + _ox, q + _oy);
    };
    Window.prototype._refreshPauseSign = function() {
        const sx = 144;
        const sy = 96;
        const p = 24;
        var windowConfig = this.getWindowConfig();
        var _ox = windowConfig.pauseOffsetX;
        var _oy = windowConfig.pauseOffsetY;
        this._pauseSignSprite.bitmap = this._windowskin;
        this._pauseSignSprite.anchor.x = 0.5;
        this._pauseSignSprite.anchor.y = 1;
        this._pauseSignSprite.move(this._width / 2 + _ox, this._height + _oy); // TODO: Offset
        this._pauseSignSprite.setFrame(sx, sy, p, p);
        this._pauseSignSprite.alpha = 0;
    };
    //#endregion
    //#region Window Base (and game system because it's just one thing that feels a bit lost???)
    Game_System.prototype.windowPadding = function() {
        return OZ.uiAdjust.windowPadding;
    };
    Window_Base.prototype.lineHeight = function() {
        return OZ.uiAdjust.lineHeight;
    };
    Window_Base.prototype.itemPadding = function() {
        return OZ.uiAdjust.itemPadding;
    };
    Window_Base.prototype.makeFontBigger = function() {
        if (this.contents.fontSize <= OZ.uiAdjust.fontIncrement*8) {
            this.contents.fontSize += OZ.uiAdjust.fontIncrement;
        }
    };
    Window_Base.prototype.makeFontSmaller = function() {
        if (this.contents.fontSize >= OZ.uiAdjust.fontIncrement*2) {
            this.contents.fontSize -= OZ.uiAdjust.fontIncrement;
        }
    };
    //#endregion
    //#region Window Selectable
    Window_Selectable.prototype.colSpacing = function() {
        return OZ.uiAdjust.colSpacing;
    };
    Window_Selectable.prototype.rowSpacing = function() {
        return OZ.uiAdjust.rowSpacing;
    };
    Window_Selectable.prototype.itemHeight = function() {
        return Window_Scrollable.prototype.itemHeight.call(this) + OZ.uiAdjust.itemHeightAdjust;
    };
    //#endregion
    //#region Window status "base"
    Window_StatusBase.prototype.gaugeLineHeight = function() {
        return OZ.uiAdjust.gaugeLineHeight;
    };
    var OZ_UISizeAdjust_drawActorName = Window_StatusBase.prototype.drawActorName;
    Window_StatusBase.prototype.drawActorName = function(actor, x, y, width) {
        width = width || OZ.uiAdjust.actorNameWidth;
        OZ_UISizeAdjust_drawActorName.call(this, actor, x, y, width);
    };
    var OZ_UISizeAdjust_drawActorClass = Window_StatusBase.prototype.drawActorClass;
    Window_StatusBase.prototype.drawActorClass = function(actor, x, y, width) {
        width = width || OZ.uiAdjust.actorClassWidth;
        OZ_UISizeAdjust_drawActorClass.call(this, actor, x, y, width);
    };
    var OZ_UISizeAdjust_drawActorNickname = Window_StatusBase.prototype.drawActorNickname;
    Window_StatusBase.prototype.drawActorNickname = function(actor, x, y, width) {
        width = width || OZ.uiAdjust.actorNicknameWidth;
        OZ_UISizeAdjust_drawActorNickname.call(this, actor, x, y, width);
    };
    Window_StatusBase.prototype.drawActorLevel = function(actor, x, y) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.levelA, x, y, OZ.uiAdjust.actorLevelWidth);
        this.resetTextColor();
        this.drawText(actor.level, x, y, OZ.uiAdjust.actorLevelWidth, "right");
    };
    var OZ_UISizeAdjust_drawActorIcons = Window_StatusBase.prototype.drawActorIcons;
    Window_StatusBase.prototype.drawActorIcons = function(actor, x, y, width) {
        width = width || OZ.uiAdjust.actorIconsWidth;
        OZ_UISizeAdjust_drawActorIcons.call(this, actor, x, y, width);
    };
    Window_StatusBase.prototype.drawActorSimpleStatus = function(actor, x, y) {
        const lineHeight = this.lineHeight();
        const x2 = x + OZ.uiAdjust.actorSecondColumnXOffset;
        var yy = y;
        if (OZ.uiAdjust.simpleStatusConfig.actorName) {
            this.drawActorName(actor, x, yy);
            yy += lineHeight;
        }
        if (OZ.uiAdjust.simpleStatusConfig.actorLevel) {
            this.drawActorLevel(actor, x, yy);
            yy += lineHeight;
        }
        if (OZ.uiAdjust.simpleStatusConfig.actorIcons) {
            this.drawActorIcons(actor, x, yy);
        }
        yy = y;
        if (OZ.uiAdjust.simpleStatusConfig.actorClass) {
            this.drawActorClass(actor, x2, yy);
            yy += lineHeight;
        }
        if (OZ.uiAdjust.simpleStatusConfig.actorGauges) {
            this.placeBasicGauges(actor, x2, yy);
            yy += lineHeight;
        }
    };
    Window_Status.prototype.drawBlock1 = function() {
        const y = this.block1Y();
        var x = OZ.uiAdjust.statusBlock1X;
        var _spacing = OZ.uiAdjust.statusColSpacing;
        this.drawActorName(this._actor, x+(_spacing/4), y);
        x += OZ.uiAdjust.actorNameWidth + _spacing;
        this.drawActorClass(this._actor, x, y);
        x += OZ.uiAdjust.actorClassWidth + _spacing*3;
        this.drawActorNickname(this._actor, x, y);
    };
    Window_Status.prototype.block1Y = function() {
        return OZ.uiAdjust.statusBlock1Y;
    };
    Window_Status.prototype.drawBlock2 = function() {
        var x = OZ.uiAdjust.statusBlock2X;
        var _spacing = OZ.uiAdjust.statusColSpacing;
        const y = this.block2Y();
        this.drawActorFace(this._actor, x+_spacing/2, y);
        x += ImageManager.standardFaceWidth + (_spacing*5/2);
        this.drawBasicInfo(x, y);
        x += OZ.uiAdjust.actorNameWidth + (_spacing*7/2);
        this.drawExpInfo(x, y);
    };
    Window_Status.prototype.block2Y = function() {
        const lineHeight = this.lineHeight();
        const min = lineHeight;
        const max = this.innerHeight - lineHeight * 4;
        return Math.floor((lineHeight * 1.4).clamp(min, max)) + OZ.uiAdjust.statusBlock2Y;
    };
    Window_Status.prototype.drawExpInfo = function(x, y) {
        const lineHeight = this.lineHeight();
        const expTotal = TextManager.expTotal.format(TextManager.exp);
        const expNext = TextManager.expNext.format(TextManager.level);
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(expTotal, x, y + lineHeight * 0, OZ.uiAdjust.actorNicknameWidth);
        this.drawText(expNext, x, y + lineHeight * 2, OZ.uiAdjust.actorNicknameWidth);
        this.resetTextColor();
        this.drawText(this.expTotalValue(), x, y + lineHeight * 1, OZ.uiAdjust.actorNicknameWidth, "right");
        this.drawText(this.expNextValue(), x, y + lineHeight * 3, OZ.uiAdjust.actorNicknameWidth, "right");
    };
    Window_StatusParams.prototype.maxItems = function() {
        return 6;
    };
    Window_StatusParams.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        const paramId = index + 2;
        const name = TextManager.param(paramId);
        const value = this._actor.param(paramId);
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(name, rect.x, rect.y, OZ.uiAdjust.actorNameWidth);
        this.resetTextColor();
        this.drawText(value, rect.x, rect.y, OZ.uiAdjust.actorNameWidth, "right");
    };
    Window_StatusEquip.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        const equips = this._actor.equips();
        const item = equips[index];
        const slotName = this.actorSlotName(this._actor, index);
        const sw = OZ.uiAdjust.equipSlotNameWidth;
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(slotName, rect.x, rect.y, sw, rect.height);
        this.drawItemName(item, rect.x + sw, rect.y, rect.width - sw);
    };
    //#endregion
    //#region Window Menu status
    Window_MenuStatus.prototype.numVisibleRows = function() {
        return OZ.uiAdjust.menuStatusVisibleRows;
    };
    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        const actor = this.actor(index);
        const rect = this.itemRect(index);
        const x = rect.x + OZ.uiAdjust.actorSecondColumnXOffset;
        const y = rect.y + Math.floor(rect.height / 2 - this.lineHeight() * 1.5);
        this.drawActorSimpleStatus(actor, x, y);
    };
    Scene_Base.prototype.mainCommandWidth = function() {
        return OZ.uiAdjust.mainCommandWindowWidth;
    };
    Scene_Base.prototype.buttonAreaHeight = function() {
        return OZ.uiAdjust.touchButtonHeight + OZ.uiAdjust.touchAreaPadding;
    };
    Scene_Base.prototype.buttonY = function() {
        const offsetY = Math.floor((this.buttonAreaHeight() - OZ.uiAdjust.touchButtonHeight) / 2);
        return this.buttonAreaTop() + offsetY;
    };
    Scene_Title.prototype.drawGameTitle = function() {
        const x = 20; // TODO
        const y = Graphics.height / 4;
        const maxWidth = Graphics.width - x * 2;
        const text = $dataSystem.gameTitle;
        const bitmap = this._gameTitleSprite.bitmap;
        bitmap.fontFace = $gameSystem.mainFontFace();
        bitmap.outlineColor = "black";
        bitmap.outlineWidth = 8;
        bitmap.fontFace = OZ.uiAdjust.titleFontName;
        bitmap.fontSize = OZ.uiAdjust.titleFontSize;
        bitmap.drawText(text, x, y, maxWidth, 48, "center");
    };
    Scene_Title.prototype.commandWindowRect = function() {
        const offsetX = $dataSystem.titleCommandWindow.offsetX;
        const offsetY = $dataSystem.titleCommandWindow.offsetY;
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(3, true);
        const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
        const wy = Graphics.boxHeight - wh - 96 + offsetY; // TODO
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Message.prototype.eventItemWindowRect = function() {
        const wx = 0;
        const wy = 0;
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(4, true); // TODO
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Map.prototype.mapNameWindowRect = function() {
        const wx = OZ.uiAdjust.mapNameWindowRect.x;
        const wy = OZ.uiAdjust.mapNameWindowRect.y;
        const ww = OZ.uiAdjust.mapNameWindowRect.width;
        var _wh = OZ.uiAdjust.mapNameWindowRect.height;
        if (OZ.uiAdjust.mapNameWindowRect.heightAsLines) {
            _wh = this.calcWindowHeight(_wh, false);
        }
        const wh = _wh;
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_MenuBase.prototype.helpAreaHeight = function() {
        return this.calcWindowHeight(2, false); // TODO
    };
    Scene_ItemBase.prototype.isCursorLeft = function() {
        var numCols = this._itemWindow.maxCols();
        if (numCols < 2) {
            var sw = Graphics.width / 2;
            var ix = this._itemWindow.x + this._itemWindow.width/2;
            return ix < sw;
        } else {
            var row = this._itemWindow.index() % numCols;
            var half = numCols / 2;
            return row < half;
        }
    };
    Scene_Skill.prototype.skillTypeWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(3, true); // TODO
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Equip.prototype.statusWidth = function() {
        return OZ.uiAdjust.equipStatusWidth //312
    };
    Scene_Status.prototype.statusParamsWidth = function() {
        return OZ.uiAdjust.statusParamsWidth //300
    };
    Scene_Status.prototype.statusParamsHeight = function() {
        return this.calcWindowHeight(6, false);
    };
    Scene_Status.prototype.profileHeight = function() {
        return this.calcWindowHeight(2, false);
    };
    Scene_Options.prototype.optionsWindowRect = function() {
        var _top = this.mainAreaTop();
        var totalHeight = Graphics.boxHeight - _top;
        const n = Math.min(this.maxCommands(), this.maxVisibleCommands());
        const ww = Math.min(400, Graphics.boxWidth);
        const wh = Math.min(totalHeight, this.calcWindowHeight(n, true));
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = _top + (totalHeight - wh) / 2;
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Shop.prototype.statusWidth = function() {
        return OZ.uiAdjust.shopStatusWidth //352
    };
    Scene_Name.prototype.editWindowRect = function() {
        const inputWindowHeight = this.calcWindowHeight(9, true);
        const padding = $gameSystem.windowPadding();
        const ww = Math.min(OZ.uiAdjust.maxNameWindowWidth, Graphics.boxWidth);
        const wh = ImageManager.standardFaceHeight + padding * 2;
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = (Graphics.boxHeight - (wh + inputWindowHeight + 8)) / 2;
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Name.prototype.inputWindowRect = function() {
        const wx = this._editWindow.x;
        const wy = this._editWindow.y + this._editWindow.height + 8;
        const ww = this._editWindow.width;
        const wh = this.calcWindowHeight(9, true);
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Debug.prototype.rangeWindowRect = function() {
        const wx = 0;
        const wy = 0;
        const ww = 246;
        const wh = Graphics.boxHeight;
        return new Rectangle(wx, wy, ww, wh);
    };
    //#endregion
    //#region Name Input
    Window_NameEdit.prototype.faceWidth = function() {
        return ImageManager.standardFaceWidth;
    };
    Window_NameEdit.prototype.itemRect = function(index) {
        const x = this.left() + index * this.charWidth();
        const y = OZ.uiAdjust.namingNameYPosition;
        const width = this.charWidth();
        const height = this.lineHeight();
        return new Rectangle(x, y, width, height);
    };
    Window_NameInput.prototype.maxCols = function() {
        return 10; // TODO
    };
    Window_NameInput.prototype.maxItems = function() {
        return 90; // TODO
    };
    Window_NameInput.prototype.groupSpacing = function() {
        return OZ.uiAdjust.namingGroupSpacing;
    };
    Window_NameInput.prototype.groupSize = function() {
        return OZ.uiAdjust.namingGroupSize;
    };
    Window_NameInput.prototype.pageChangeIdx = function() {
        return this.maxItems()-2;
    }
    Window_NameInput.prototype.okIdx = function() {
        return this.maxItems()-1;
    }
    Window_NameInput.prototype.itemWidth = function() {
        var tgs = (this.maxCols()-1) / this.groupSize();
        return Math.floor((this.innerWidth - (tgs * this.groupSpacing())) / this.maxCols());
    };
    Window_NameInput.prototype.character = function() {
        return this._index < this.pageChangeIdx() ? this.table()[this._page][this._index] : "";
    };
    Window_NameInput.prototype.isPageChange = function() {
        return this._index === this.pageChangeIdx();
    };
    Window_NameInput.prototype.isOk = function() {
        return this._index === this.okIdx();
    };
    Window_NameInput.prototype.itemRect = function(index) {
        const itemWidth = this.itemWidth();
        const itemHeight = this.itemHeight();
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const groupSpacing = this.groupSpacing();
        const col = index % this.maxCols();
        const group = Math.floor(col / this.groupSize());
        const x = col * itemWidth + (group * groupSpacing) + colSpacing / 2;
        const y = Math.floor(index / this.maxCols()) * itemHeight + rowSpacing / 2;
        const width = itemWidth - colSpacing;
        const height = itemHeight - rowSpacing;
        return new Rectangle(x, y, width, height);
    };
    Window_NameInput.prototype.cursorDown = function(wrap) {
        if (this._index < this.maxItems()-this.maxCols() || wrap) {
            this._index = (this._index + this.maxCols()) % this.maxItems();
        }
    };
    Window_NameInput.prototype.cursorUp = function(wrap) {
        if (this._index >= this.maxCols() || wrap) {
            this._index = (this._index + this.maxItems()-this.maxCols()) % this.maxItems();
        }
    };
    Window_NameInput.prototype.cursorRight = function(wrap) {
        if (this._index % this.maxCols() < this.maxCols()-1) {
            this._index++;
        } else if (wrap) {
            this._index -= this.maxCols()-1;
        }
    };
    Window_NameInput.prototype.cursorLeft = function(wrap) {
        if (this._index % this.maxCols() > 0) {
            this._index--;
        } else if (wrap) {
            this._index += this.maxCols()-1;
        }
    };
    Window_NameInput.prototype.processJump = function() {
        if (this._index !== this.okIdx()) {
            this._index = this.okIdx();
            this.playCursorSound();
        }
    };
    //#endregion
    //#region Misc
    Window_ItemCategory.prototype.maxCols = function() {
        return 4;
    };
    Window_ItemList.prototype.maxCols = function() {
        return OZ.uiAdjust.itemListColumns;
    };
    Window_ItemList.prototype.colSpacing = function() {
        return 16;
    };
    Window_SkillStatus.prototype.refresh = function() {
        Window_StatusBase.prototype.refresh.call(this);
        if (this._actor) {
            const x = this.colSpacing() / 2;
            const h = this.innerHeight;
            const y = h / 2 - this.lineHeight() * 1.5;
            this.drawActorFace(this._actor, x + 1, 0, ImageManager.standardFaceWidth, h);
            this.drawActorSimpleStatus(this._actor, x + OZ.uiAdjust.actorSecondColumnXOffset, y);
        }
    };
    Window_SkillList.prototype.maxCols = function() {
        return OZ.uiAdjust.skillListColumns;
    };
    Window_SkillList.prototype.colSpacing = function() {
        return 16;
    };
    Window_EquipStatus.prototype.rightArrowWidth = function() {
        return OZ.uiAdjust.equipRightArrowWidth; //32
    };
    Window_EquipStatus.prototype.paramWidth = function() {
        return OZ.uiAdjust.equipParamWidth; //48
    };
    Window_EquipCommand.prototype.maxCols = function() {
        return 3;
    };
    Window_EquipSlot.prototype.slotNameWidth = function() {
        return OZ.uiAdjust.equipSlotNameWidth; //138;
    };
    Window_EquipItem.prototype.maxCols = function() {
        return 1;
    };
    Window_EquipItem.prototype.colSpacing = function() {
        return 8;
    };
    Window_Options.prototype.statusWidth = function() {
        return 120;
    };
    Window_SavefileList.prototype.numVisibleRows = function() {
        return OZ.uiAdjust.saveNumVisibleRows;
    };
    Window_SavefileList.prototype.drawTitle = function(savefileId, x, y) {
        var titleWidth = 180; // TODO
        if (savefileId === 0) {
            this.drawText(TextManager.autosave, x, y, titleWidth);
        } else {
            this.drawText(TextManager.file + " " + savefileId, x, y, titleWidth);
        }
    };
    Window_SavefileList.prototype.drawContents = function(info, rect) {
        const bottom = rect.y + rect.height;
        var tWidth = Game_Map.prototype.tileWidth();
        var minSizeInfo = OZ.uiAdjust.savefileInfoWidth; // 220
        var minSizeChars = tWidth*4 + 8;
        if (rect.width >= (minSizeInfo+minSizeChars)) {
            this.drawPartyCharacters(info, rect.x + minSizeInfo, bottom - 8);
        }
        const lineHeight = this.lineHeight();
        const y2 = bottom - lineHeight - 4;
        if (y2 >= lineHeight) {
            this.drawPlaytime(info, rect.x, y2, rect.width);
        }
    };
    Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
        if (info.characters) {
            var tWidth = Game_Map.prototype.tileWidth();
            let characterX = x;
            for (const data of info.characters) {
                this.drawCharacter(data[0], data[1], characterX, y);
                characterX += tWidth;
            }
        }
    };
    Window_ShopCommand.prototype.maxCols = function() {
        return 3;
    };
    Window_ShopBuy.prototype.priceWidth = function() {
        return 96;
    };
    Window_ShopNumber.prototype.buttonSpacing = function() {
        return OZ.uiAdjust.touchButtonSpacing;
    };
    Window_ShopStatus.prototype.pageSize = function() {
        return 4;
    };
    Window_NumberInput.prototype.updatePlacement = function() {
        const messageY = this._messageWindow.y;
        const spacing = OZ.uiAdjust.touchButtonSpacing;
        this.width = this.windowWidth();
        this.height = this.windowHeight();
        this.x = (Graphics.boxWidth - this.width) / 2;
        if (messageY >= Graphics.boxHeight / 2) {
            this.y = messageY - this.height - spacing;
        } else {
            this.y = messageY + this._messageWindow.height + spacing;
        }
    };
    Window_NumberInput.prototype.windowHeight = function() {
        if (ConfigManager.touchUI) {
            return this.fittingHeight(1) + this.buttonSpacing() + OZ.uiAdjust.touchButtonHeight;
        } else {
            return this.fittingHeight(1);
        }
    };
    Window_NumberInput.prototype.itemWidth = function() {
        return OZ.uiAdjust.touchButtonWidth;
    };
    Window_NumberInput.prototype.buttonSpacing = function() {
        return OZ.uiAdjust.touchButtonSpacing;
    };
    Window_EventItem.prototype.placeCancelButton = function() {
        if (this._cancelButton) {
            const spacing = OZ.uiAdjust.touchButtonSpacing;
            const button = this._cancelButton;
            if (this.y === 0) {
                button.y = this.height + spacing;
            } else if (this._messageWindow.y >= Graphics.boxHeight / 4) {
                const distance = this.y - this._messageWindow.y;
                button.y = -button.height - spacing - distance;
            } else {
                button.y = -button.height - spacing;
            }
            button.x = this.width - button.width - spacing;
        }
    };
    Window_Message.prototype.newLineX = function(textState) {
        const faceExists = $gameMessage.faceName() !== "";
        const faceWidth = ImageManager.standardFaceWidth;
        const spacing = 20; // TODO
        const margin = faceExists ? faceWidth + spacing : 4;
        return textState.rtl ? this.innerWidth - margin : margin;
    };
    Window_Message.prototype.drawMessageFace = function() {
        const faceName = $gameMessage.faceName();
        const faceIndex = $gameMessage.faceIndex();
        const rtl = $gameMessage.isRTL();
        const width = ImageManager.standardFaceWidth;
        const height = this.innerHeight;
        const x = rtl ? this.innerWidth - width - 4 : 4;
        this.drawFace(faceName, faceIndex, x, 0, width, height);
    };
    Window_ScrollText.prototype.scrollSpeed = function() {
        let speed = $gameMessage.scrollSpeed() / 2;
        if (this.isFastForward()) {
            speed *= this.fastForwardRate();
        }
        return speed;
    };
    Window_BattleLog.prototype.maxLines = function() {
        return 10;
    };
    Scene_Battle.prototype.logWindowRect = function() {
        const wx = 0;
        const wy = 0;
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(10, false);
        return new Rectangle(wx, wy, ww, wh);
    };
    Window_BattleStatus.prototype.extraHeight = function() {
        return 10;
    };
    Window_BattleStatus.prototype.maxCols = function() {
        return 4;
    };
    Window_BattleStatus.prototype.rowSpacing = function() {
        return 0;
    };
    Window_BattleStatus.prototype.updatePadding = function() {
        this.padding = OZ.uiAdjust.itemPadding;
    };
    Window_BattleEnemy.prototype.maxCols = function() {
        return 2;
    };
    Scene_Battle.prototype.statusWindowRect = function() {
        const extra = 10;
        const ww = Graphics.boxWidth - OZ.uiAdjust.commandWidth;
        const wh = this.windowAreaHeight() + extra;
        const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
        const wy = Graphics.boxHeight - wh + extra - 4;
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Battle.prototype.partyCommandWindowRect = function() {
        const ww = OZ.uiAdjust.commandWidth;
        const wh = this.windowAreaHeight();
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = Graphics.boxHeight - wh;
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Battle.prototype.actorCommandWindowRect = function() {
        const ww = OZ.uiAdjust.commandWidth;
        const wh = this.windowAreaHeight();
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = Graphics.boxHeight - wh;
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Battle.prototype.helpAreaHeight = function() {
        return this.calcWindowHeight(2, false);
    };
    Scene_Battle.prototype.windowAreaHeight = function() {
        return this.calcWindowHeight(4, true);
    };
    //#endregion
    //#region Sprites
    Sprite_Button.prototype.blockWidth = function() {
        return OZ.uiAdjust.touchButtonWidth;
    };
    Sprite_Button.prototype.blockHeight = function() {
        return OZ.uiAdjust.touchButtonHeight;
    };
    Sprite_Actor.prototype.moveToStartPosition = function() {
        this.startMove(300, 0, 0);
    };
    Sprite_Actor.prototype.setActorHome = function(index) {
        this.setHome(600 + index * 32, 280 + index * 48);
    };
    Sprite_Actor.prototype.retreat = function() {
        this.startMove(300, 0, 30);
    };
    Sprite_Gauge.prototype.bitmapWidth = function() {
        return OZ.uiAdjust.gaugeWidth;
    };
    Sprite_Gauge.prototype.bitmapHeight = function() {
        return OZ.uiAdjust.gaugeLineHeight+8;
    };
    Sprite_Gauge.prototype.textHeight = function() {
        return OZ.uiAdjust.gaugeLineHeight;
    };
    Sprite_Gauge.prototype.gaugeHeight = function() {
        return OZ.uiAdjust.gaugeLineHeight/2;
    };
    Sprite_Gauge.prototype.labelY = function() {
        return 3;
    };
    Sprite_Name.prototype.bitmapWidth = function() {
        return 128;
    };
    Sprite_Name.prototype.bitmapHeight = function() {
        return 24;
    };
    Sprite_Timer.prototype.createBitmap = function() {
        this.bitmap = new Bitmap(96, 48);
        this.bitmap.fontFace = this.fontFace();
        this.bitmap.fontSize = this.fontSize();
        this.bitmap.outlineColor = ColorManager.outlineColor();
    };
    //#endregion
})();