/*:
 * @target MZ
 * @plugindesc Use of bitmap fonts instead of vector.
 * @author Orochii Zouveleki
 * @url https://github.com/orochii/RMXPVXA-Scripts/tree/master/MZ
 * 
 * @help This is gonna be a pain to explain.
 * 
 * How to set up fonts?
 * ====================
 * There's two main steps for setting up a font.
 * 
 * Creating a new font config:
 * - "name" is the identifier by which the font can be changed.
 * - "filename" is the name of the texture, this texture must be in the img/system folder.
 * - "characters" is the full list of characters supported by the font. This must coincide with the texture. I.e. if you have ABCDEF the texture must have those same letters in the same order.
 * A default configuration includes all basic ASCII characters, but you can add others like accent letters and such. Just remember to create a font texture that corresponds with that same order.
 * - "spacing" is an extra spacing (in px) with which you can adjust how close the letters will be drawn.
 * 
 * Creating the texture: 
 * - The texture must contain all characters the font will support.
 * - Remember to include all characters included in the "characters" section of your font config, in the same order!
 * - The height of the texture will be the height of the character, plus two pixels.
 * - In the bottom-most row, draw a line that must correspond to the character's width. This will let the game know where a character starts and where it ends. The color with which this line is drawn doesn't matter as long as it's not 100% transparent.
 * - Leave gaps of exactly ONE pixel between letters. This is a limitation due to how I did this process.
 * - The font (afaik) can have any sort of decoration. But for better results, make it grayscale, so any text coloring is properly applied.
 * - Leave a gap of at least one pixel horizontally between the letter (so it can know where the letter starts and where it ends)
 * - Leave 1px margin from the width lines vertically. This is to ensure that the line doesn't bleed into the letter due to drawing quirks.
 * 
 * @param fontConfigs
 * @text Font Configs
 * @desc Set up new font configurations.
 * @default ["{\"name\":\"MainFont\",\"filename\":\"font_0\",\"characters\":\"\\\" !\\\\\\\"#$%&'()*+,-./0123456789:;<=>?\\\\u0040ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\\\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~→×\\\"\",\"spacing\":\"1\"}"]
 * @type struct<BitmapFont>[]
 * 
 * @param mainFont
 * @text Main Font
 * @desc Font name to be used on most text (must exist in font configs).
 * @default MainFont
 * @type string
 * 
 * @param numberFont
 * @text Number Font
 * @desc Font name to be used for numbers (must exist in font configs).
 * @default MainFont
 * @type string
 * 
 */
/*~struct~BitmapFont:
 * @param name
 * @type string
 * @default MainFont
 * 
 * @param filename
 * @type string
 * @default font_0
 * 
 * @param characters
 * @type note
 * @default " !\"#$%&'()*+,-./0123456789:;<=>?\u0040ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~→×"
 * 
 * @param spacing
 * @type number
 * @default 1
 * 
*/
(()=>{
//
const PLUGIN_NAME = "OZZ_BitmapFont";
class OZ_BitmapFont {
    constructor() {
        this.pluginParams = PluginManager.parameters(PLUGIN_NAME);
        //
        this.mainFont = this.pluginParams.mainFont;
        this.numberFont = this.pluginParams.numberFont;
        this.fontConfigs = JSON.parse(this.pluginParams.fontConfigs);
        for (var i = 0; i < this.fontConfigs.length; i++) {
            this.fontConfigs[i] = JSON.parse(this.fontConfigs[i]);
            var name = this.fontConfigs[i].name;
            this.fontConfigs[name] = this.fontConfigs[i];
            this.fontConfigs[name].characters = eval(this.fontConfigs[name].characters);
            this.fontConfigs[name].spacing = Number(this.fontConfigs[name].spacing);
            //
            this.fontConfigs[name].bmp = ImageManager.loadSystem(this.fontConfigs[name].filename);
            this.fontConfigs[name].bmp.__fontName = name;
            this.fontConfigs[name]._cache = {}
            this.fontConfigs[name].bmp.addLoadListener((b)=>{
                var fontName = b.__fontName;
                this.OnBmpLoaded(this.fontConfigs[fontName]);
            });
        }
    }
    OnBmpLoaded(config) {
        //
        console.log(config);
        //
        var chars = config.characters.replace(/(\r\n|\n|\r)/gm, "");
        var b = config.bmp;
        var w = b.width;
        var h = b.height;
        config.height = h - 1;
        var data = b.context.getImageData(0,0,w,h);
        var sx = 0;
        var idx = 0;
        var letters = {};
        var testIdx = (0*4) + (8*w*4) + 3;
        var _looking = false;
        for (var x = 0; x < w; x++) {
            // Check column
            var found = false;
            var y = h-1;
            var dIdx = (x*4) + (y*w*4);
            if (data.data[dIdx+3] > 0) {
                found = true;
                _looking = true;
            }
            // Should it push?
            if (!found) {
                if (_looking) {
                    var entry = { x:sx, y:0, w:x-sx, h:h-2 }
                    var c = chars.charAt(idx);
                    letters[c] = entry;
                    // Set next
                    idx++;
                    _looking = false;
                }
                sx = x+1;
                if (idx >= chars.length) break;
            }
        }
        config.letterData = letters;
    }
    GetColoredFont(config,color,hardcolor) {
        var key = color + ";" + hardcolor;
        var fontBmp = config._cache[key];
        if (!fontBmp) {
            fontBmp = new Bitmap(config.bmp.width, config.bmp.height);
            fontBmp.qBlt(config.bmp, 0, 0, fontBmp.width, fontBmp.height, 0, 0);
            if (hardcolor) {
                fontBmp.compositeFillRect(0, 0, fontBmp.width, fontBmp.height, color, "source-in");
            } else {
                fontBmp.compositeFillRect(0, 0, fontBmp.width, fontBmp.height, color, "multiply");
                fontBmp.qBlt(config.bmp, 0, 0, fontBmp.width, fontBmp.height, 0, 0, fontBmp.width, fontBmp.height, "destination-in");
            }
            config._cache[key] = fontBmp;
        }
        return fontBmp;
    }
}
if (typeof OZ === 'undefined') OZ = {};
OZ.bitmapFont = new OZ_BitmapFont();

Scene_Boot.prototype.loadGameFonts = function() {
    // Not needed to load these fonts anymore.
    /*const advanced = $dataSystem.advanced;
    FontManager.load("rmmz-mainfont", advanced.mainFontFilename);
    FontManager.load("rmmz-numberfont", advanced.numberFontFilename);*/
};
Game_System.prototype.mainFontFace = function() {
    return OZ.bitmapFont.mainFont;
};
Game_System.prototype.numberFontFace = function() {
    return OZ.bitmapFont.numberFont;
};
Bitmap.prototype.getBitmapFontConfig = function() {
    var cfg = OZ.bitmapFont.fontConfigs[this.fontFace];
    return cfg || OZ.bitmapFont.fontConfigs[OZ.bitmapFont.mainFont];
}

Bitmap.prototype.qBlt = function(source, sx, sy, sw, sh, dx, dy, dw, dh, oper) {
    dw = dw || sw;
    dh = dh || sh;
    oper = oper || "source-over";
    try {
        const image = source._canvas || source._image;
        this.context.globalCompositeOperation = oper;
        this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    } catch (e) {
        //
    }
};
Bitmap.prototype.compositeFillRect = function(x, y, width, height, color, oper) {
    const context = this.context;
    context.globalCompositeOperation = oper;
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
    this._baseTexture.update();
};
Bitmap.prototype._internalDrawText = function(text, x, y, maxWidth, lineHeight, align, config, color, totalWidth, hardcolor) {
    // TODO: Cache this thing.
    hardcolor = hardcolor || false;
    var fontBmp = OZ.bitmapFont.GetColoredFont(config,color,hardcolor);
    //
    var remainderW = maxWidth-totalWidth;
    var tx = x;
    var ty = y + Math.floor((lineHeight - fontBmp.height) / 2);
    var scale = Math.floor(this.fontSize / config.height);
    if (scale < 1) scale = 1;
    if (align === "center") tx += Math.floor(remainderW / 2);
    if (align === "right") tx += remainderW;
    for (var i = 0; i < text.length; i++) {
        var letter = config.letterData[text.charAt(i)];
        if (letter) {
            var sx = letter.x;
            var sy = letter.y;
            var sw = letter.w;
            var sh = letter.h;
            var tw = sw * scale;
            var th = sh * scale;
            this.context.strokeStyle = "blue";
            this.qBlt(fontBmp, sx, sy, sw, sh, tx, ty, tw, th);
            this.context.strokeStyle = "black";
            tx += tw + config.spacing*scale;
        } else {
            console.log(text.charAt(i));
        }
    }
}
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    x = Math.floor(x);
    y = Math.floor(y);
    text = ""+text;
    this._smooth = false;
    var config = this.getBitmapFontConfig();
    var totalWidth = this.measureTextWidth(text);
    this.context.save();
    this.context.imageSmoothingEnabled = false;
    this._internalDrawText(text,x+1,y+1,maxWidth,lineHeight,align,config,ColorManager.outlineColor(),totalWidth,true);
    this._internalDrawText(text,x,y,maxWidth,lineHeight,align,config,this.textColor,totalWidth);
    this.context.restore();
    this._baseTexture.update();
};
Bitmap.prototype.measureTextWidth = function(text) {
    var config = this.getBitmapFontConfig();
    var width = 0;
    var scale = Math.floor(this.fontSize / config.height);
    if (scale < 1) scale = 1;
    for (var i = 0; i < text.length; i++) {
        var letter = config.letterData[text.charAt(i)];
        if (letter) {
            var sh = letter.h;
            var sw = (letter.w + config.spacing);
            width += sw*scale;
        } else {
            console.log(text.charAt(i));
        }
    }
    return width;
};

//
})();