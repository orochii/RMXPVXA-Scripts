/*:
 * @plugindesc Varied basic functions for adding/inproving MZ's basic features.
 * @author Orochii Zouveleki
 * @target MZ
 * 
 * @param Keyboard bindings
 * @desc Bindings active while on map
 * @type struct<KeyBinding>[]
 * @default ["{\"Bind Name\":\"tab\",\"Key code\":\"9\"}","{\"Bind Name\":\"ok\",\"Key code\":\"13\"}","{\"Bind Name\":\"shift\",\"Key code\":\"16\"}","{\"Bind Name\":\"control\",\"Key code\":\"17\"}","{\"Bind Name\":\"control\",\"Key code\":\"18\"}","{\"Bind Name\":\"escape\",\"Key code\":\"27\"}","{\"Bind Name\":\"ok\",\"Key code\":\"32\"}","{\"Bind Name\":\"pageup\",\"Key code\":\"33\"}","{\"Bind Name\":\"pagedown\",\"Key code\":\"34\"}","{\"Bind Name\":\"left\",\"Key code\":\"37\"}","{\"Bind Name\":\"up\",\"Key code\":\"38\"}","{\"Bind Name\":\"right\",\"Key code\":\"39\"}","{\"Bind Name\":\"down\",\"Key code\":\"40\"}","{\"Bind Name\":\"escape\",\"Key code\":\"45\"}","{\"Bind Name\":\"pageup\",\"Key code\":\"81\"}","{\"Bind Name\":\"pagedown\",\"Key code\":\"87\"}","{\"Bind Name\":\"escape\",\"Key code\":\"88\"}","{\"Bind Name\":\"ok\",\"Key code\":\"90\"}","{\"Bind Name\":\"escape\",\"Key code\":\"96\"}","{\"Bind Name\":\"down\",\"Key code\":\"98\"}","{\"Bind Name\":\"left\",\"Key code\":\"100\"}","{\"Bind Name\":\"right\",\"Key code\":\"102\"}","{\"Bind Name\":\"up\",\"Key code\":\"104\"}","{\"Bind Name\":\"debug\",\"Key code\":\"120\"}"]
 * 
 * @param Gamepad bindings
 * @desc Bindings active while on map
 * @type struct<ButtonBinding>[]
 * @default ["{\"Bind Name\":\"ok\",\"Button code\":\"0\"}","{\"Bind Name\":\"cancel\",\"Button code\":\"1\"}","{\"Bind Name\":\"shift\",\"Button code\":\"2\"}","{\"Bind Name\":\"menu\",\"Button code\":\"3\"}","{\"Bind Name\":\"pageup\",\"Button code\":\"4\"}","{\"Bind Name\":\"pagedown\",\"Button code\":\"5\"}","{\"Bind Name\":\"up\",\"Button code\":\"12\"}","{\"Bind Name\":\"down\",\"Button code\":\"13\"}","{\"Bind Name\":\"left\",\"Button code\":\"14\"}","{\"Bind Name\":\"right\",\"Button code\":\"15\"}"]
 * 
 * @help The purpose of this plugin is to feature different extensions to the base 
 * engine that I have no idea where to fit.
 * 
 * Currently its only purpose is to customize the default input bindings, while 
 * also allowing creating new bindings for use with other things.
 * 
 * NOTE:
 * Currently there's some limitations with inputs (keys, buttons) not being able 
 * to be duplicated through different bindings, but this implementation was done 
 * while keeping things as close to the original. Fixing this would require a 
 * heavier rewrite of the input module, which could break compatibility, so this
 * is not only the lazy way out but also a bit of a compromise. It still does 
 * what it should.
 */
/*~struct~KeyBinding:
 * @param Bind Name
 * @desc Name for the binding.
 * @type text
 * @default ok
 * 
 * @param Key code
 * @desc Key assigned to this bind.
 * @type select
 * @option Backspace
 * @value 8
 * @option Tab
 * @value 9
 * @option Enter
 * @value 13
 * @option Shift
 * @value 16
 * @option Control
 * @value 17
 * @option Alt
 * @value 18
 * @option Pause/Break
 * @value 19
 * @option CapsLock
 * @value 20
 * @option Escape
 * @value 27
 * @option Space
 * @value 32
 * @option PageUp
 * @value 33
 * @option PageDown
 * @value 34
 * @option End
 * @value 35
 * @option Home
 * @value 36
 * @option Left Arrow
 * @value 37
 * @option Up Arrow
 * @value 38
 * @option Right Arrow
 * @value 39
 * @option Down Arrow
 * @value 40
 * @option PrintScreen
 * @value 44
 * @option Insert
 * @value 45
 * @option Delete
 * @value 46
 * @option 0
 * @value 48
 * @option 1
 * @value 49
 * @option 2
 * @value 50
 * @option 3
 * @value 51
 * @option 4
 * @value 52
 * @option 5
 * @value 53
 * @option 6
 * @value 54
 * @option 7
 * @value 55
 * @option 8
 * @value 56
 * @option 9
 * @value 57
 * @option A
 * @value 65
 * @option B
 * @value 66
 * @option C
 * @value 67
 * @option D
 * @value 68
 * @option E
 * @value 69
 * @option F
 * @value 70
 * @option G
 * @value 71
 * @option H
 * @value 72
 * @option I
 * @value 73
 * @option J
 * @value 74
 * @option K
 * @value 75
 * @option L
 * @value 76
 * @option M
 * @value 77
 * @option N
 * @value 78
 * @option O
 * @value 79
 * @option P
 * @value 80
 * @option Q
 * @value 81
 * @option R
 * @value 82
 * @option S
 * @value 83
 * @option T
 * @value 84
 * @option U
 * @value 85
 * @option V
 * @value 86
 * @option W
 * @value 87
 * @option X
 * @value 88
 * @option Y
 * @value 89
 * @option Z
 * @value 90
 * @option Numpad0
 * @value 96
 * @option Numpad1
 * @value 97
 * @option Numpad2
 * @value 98
 * @option Numpad3
 * @value 99
 * @option Numpad4
 * @value 100
 * @option Numpad5
 * @value 101
 * @option Numpad6
 * @value 102
 * @option Numpad7
 * @value 103
 * @option Numpad8
 * @value 104
 * @option Numpad9
 * @value 105
 * @option Multiply *
 * @value 106
 * @option Add +
 * @value 107
 * @option Minus -
 * @value 109
 * @option Decimal .
 * @value 110
 * @option Divide /
 * @value 111
 * @option F1
 * @value 112
 * @option F2
 * @value 113
 * @option F3
 * @value 114
 * @option F4
 * @value 115
 * @option F5
 * @value 116
 * @option F6
 * @value 117
 * @option F7
 * @value 118
 * @option F8
 * @value 119
 * @option F9
 * @value 120
 * @option F10
 * @value 121
 * @option F11
 * @value 122
 * @option F12
 * @value 123
 * @option NumLock
 * @value 144
 * @option ScrollLock
 * @value 145
 * @option Semicolon ;
 * @value 186
 * @option Equal =
 * @value 187
 * @option Comma ,
 * @value 188
 * @option Dash -
 * @value 189
 * @option Period .
 * @value 190
 * @option Forward Slash /
 * @value 191
 * @option Backquote `
 * @value 192
 * @option Open Bracket [
 * @value 219
 * @option Backslash \
 * @value 220
 * @option Close Bracket ]
 * @value 221
 * @option Single Quote '
 * @value 222
 * 
 * @default 90
 */

/*~struct~ButtonBinding:
 * @param Bind Name
 * @desc Name for the binding.
 * @type text
 * @default ok
 * 
 * @param Button code
 * @desc Key assigned to this bind.
 * @type select
 * @option A Button
 * @value 0
 * @option B Button
 * @value 1
 * @option X Button
 * @value 2
 * @option Y Button
 * @value 3
 * @option Left Shoulder
 * @value 4
 * @option Right Shoulder
 * @value 5
 * @option Left Trigger
 * @value 6
 * @option Right Trigger
 * @value 7
 * @option Select
 * @value 8
 * @option Start
 * @value 9
 * @option L-Stick Click
 * @value 10
 * @option R-Stick Click
 * @value 11
 * @option D-Pad Up
 * @value 12
 * @option D-Pad Down
 * @value 13
 * @option D-Pad Left
 * @value 14
 * @option D-Pad Right
 * @value 15
 * @default 0
 */

(()=>{
    var __filename = document.currentScript.src;
    var path = require('path');
    const PLUGIN_NAME = path.basename(__filename, path.extname(__filename));

    class OZZMetal {
        constructor() {
            var params = PluginManager.parameters(PLUGIN_NAME);
            // Process keyboard bindings
            if (params['Keyboard bindings'].length != 0) this.keyboardBindings = JSON.parse(params['Keyboard bindings']);
            else this.keyboardBindings = [];
            for (var i = 0; i < this.keyboardBindings.length; i++) {
                this.keyboardBindings[i] = JSON.parse(this.keyboardBindings[i]);
                this.keyboardBindings[i].name = this.keyboardBindings[i]['Bind Name'];
                this.keyboardBindings[i].code = Number(this.keyboardBindings[i]['Key code']);
            }
            this.RebuildKeyboard();
            // Process Gamepad bindings
            if (params['Gamepad bindings'].length != 0) this.gamepadBindings = JSON.parse(params['Gamepad bindings']);
            else this.gamepadBindings = [];
            for (var i = 0; i < this.gamepadBindings.length; i++) {
                this.gamepadBindings[i] = JSON.parse(this.gamepadBindings[i]);
                this.gamepadBindings[i].name = this.gamepadBindings[i]['Bind Name'];
                this.gamepadBindings[i].code = Number(this.gamepadBindings[i]['Button code']);
            }
            this.RebuildGamepad();
        }
        RebuildKeyboard() {
            var _newMapping = {}
            for (var i = 0; i < this.keyboardBindings.length; i++) {
                var _bind = this.keyboardBindings[i];
                _newMapping[_bind.code] = _bind.name;
            }
            Input.keyMapper = _newMapping;
        }
        RebuildGamepad() {
            var _newMapping = {}
            for (var i = 0; i < this.gamepadBindings.length; i++) {
                var _bind = this.gamepadBindings[i];
                _newMapping[_bind.code] = _bind.name;
            }
            Input.gamepadMapper = _newMapping;
        }
    }
    if (typeof OZ === 'undefined') OZ = {};
    OZ.metal = new OZZMetal();
})();
