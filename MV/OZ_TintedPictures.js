/*:
 * @target MZ
 * @plugindesc Allows pictures under an ID# to be tinted along with the map.
 * @author Orochii Zouveleki
 * 
 * @param maxTintId
 * @text Max Tinted ID
 * @desc Any picture under this ID will be affected by map tint.
 * @type number
 * @min 1
 * @max 100
 * @default 50
*/

(()=>{
    var __filename = document.currentScript.src;
    var path = require('path');
    var PLUGIN_NAME = path.basename(__filename, path.extname(__filename));
    class OZZTP {
        constructor() {
            this.mvMode = false;
            var params = PluginManager.parameters(PLUGIN_NAME);
            this.maxTintId = JSON.parse(params['maxTintId']);
        }
    }
    if (typeof OZ === 'undefined') OZ = {};
    OZ.tp = new OZZTP();

    if (Spriteset_Base.prototype.pictureContainerRect === undefined) {
        OZ.tp.mvMode = true;
        Spriteset_Base.prototype.pictureContainerRect = function() {
            var width = Graphics.boxWidth;
            var height = Graphics.boxHeight;
            var x = (Graphics.width - width) / 2;
            var y = (Graphics.height - height) / 2;
            return new Rectangle(x,y,width,height);
        }
    }
    Spriteset_Base.prototype.createPictures = function() {
        const rect = this.pictureContainerRect();
        this._pictureContainerLower = new Sprite();
        this._pictureContainerLower.filters = [];
        if (!OZ.tp.mvMode) this._pictureContainerLower.filters.push(this._baseColorFilter);
        else {
            this._pictureContainerLower.filters.push(this._toneFilter);
            console.log(this._toneFilter);
        }
        this._pictureContainerLower.setFrame(rect.x, rect.y, rect.width, rect.height);
        this._pictureContainer = new Sprite();
        this._pictureContainer.setFrame(rect.x, rect.y, rect.width, rect.height);
        for (let i = 1; i <= $gameScreen.maxPictures(); i++) {
            if (i <= OZ.tp.maxTintId) {
                this._pictureContainerLower.addChild(new Sprite_Picture(i));
            } else {
                this._pictureContainer.addChild(new Sprite_Picture(i));
            }
        }
        this.addChild(this._pictureContainerLower);
        this.addChild(this._pictureContainer);
    };
})();