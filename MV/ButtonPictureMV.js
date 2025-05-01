/*:
 * @plugindesc Button pictures for MV.
 * @author Orochii Zouveleki
 * 
 * @help This is basically a port of the Button Pictures from MZ to MV, however it is rewritten from scratch.
 * Regardless, thanks to Yoji Ojima.
 * 
 * HOW TO USE:
 * ===========
 * Use the following plugin command to add the behavior to any existing picture:
 *      ButtonPicture PictureID CommonEventID
 * Example:
 *      ButtonPicture 11 1
 *          this would run common event 1 when the picture 11 is pressed.
 * 
 * QUICK REMARKS:
 * ==============
 * The button press supports image scaling. It will also prioritize higher ID pictures over lower ones.
 * When a picture press is registered, it will interrupt touch map navigation (and probably also any other sort of touch/mouse input).
 * 
 * LICENSE:
 * ========
 * License is MIT
 * 
 * Copyright (c) 2025 Orochii Zouveleki
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
*/

(()=>{
    var OZBPMV_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        OZBPMV_Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'ButtonPicture') {
            // ButtonPicture PictureID CommonEventID
            var pictureId = Number(args[0]);
            var eventId = Number(args[1]);
            var picture = $gameScreen.picture(pictureId);
            if (picture !== undefined && picture != null) {
                picture.onClickCommonEventId = eventId;
            }
        }
    }
    Sprite_Picture.prototype.clickCommonEventId = function() {
        var picture = this.picture();
        if (picture) {
            var evId = picture.onClickCommonEventId;
            if (evId && evId > 0) {
                return evId;
            }
        }
        return 0;
    }
    Sprite_Picture.prototype.checkIfInside = function(x,y) {
        var _w = this.width * this.scale.x;
        var _h = this.height * this.scale.y;
        var _x = this.x - (_w * this.anchor.x);
        var _y = this.y - (_h * this.anchor.y);
        if (x >= _x && y >= _y) {
            var _x2 = _x + _w;
            var _y2 = _y + _h;
            if (x < _x2 && y < _y2) return true;
        }
        return false;
    }
    Sprite_Picture.prototype.checkIfClicked = function(x,y) {
        var evId = this.clickCommonEventId();
        if (evId > 0) {
            if (this.checkIfInside(x,y)) {
                return evId;
            }
        }
        return 0;
    }

    Spriteset_Base.prototype.checkOnPictureClicked = function(x,y) {
        for (var i = this._pictureContainer.children.length-1; i >= 0; i--) {
            var sprite = this._pictureContainer.children[i];
            var evId = sprite.checkIfClicked(x,y);
            if (evId != 0) return evId;
        }
        if (this._pictureContainerLower) {
            for (var i = this._pictureContainerLower.children.length-1; i >= 0; i--) {
                var sprite = this._pictureContainerLower.children[i];
                var evId = sprite.checkIfClicked(x,y);
                if (evId != 0) return evId;
            }
        }
        return 0;
    };

    Scene_Map.prototype.updateButtonPictures = function() {
        if (this.isMapTouchOk() && !this.isBusy()) {
            if (TouchInput.isTriggered()) {
                var evId = this._spriteset.checkOnPictureClicked(TouchInput.x, TouchInput.y);
                if (evId != 0) {
                    $gameTemp.reserveCommonEvent(evId);
                    TouchInput.update();
                }
            }
        }
    }

    var OZBPMV_Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        this.updateButtonPictures();
        OZBPMV_Scene_Map_update.call(this);
    }
})();