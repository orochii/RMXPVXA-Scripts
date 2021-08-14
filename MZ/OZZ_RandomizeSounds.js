// RMMZ - OZZ Randomize Sounds

/*:
 * @target MZ
 * @plugindesc Vary your sounds so it sounds less boring or something.
 * @author Orochii Zouveleki
 * 
 * @help OZZ_RandomizeSounds.js
 * 
 * This plugin lets you randomize how sounds are played on runtime. 
 * It doesn't need any special configurations, besides defining which 
 * samples to turn into a pool of samples (i.e. hit1 turns into hit1_1,
 * hit1_2, hit1_3, etc and the game will pick one of them at random, 
 * including the original hit1 of course).
 * 
 * BASIC CONFIGURATION
 * Define the default variation ranges for basic parameters. 
 * These changes will apply on all sounds:
 * - Pan Variation
 * - Pitch Variation
 * - Volume Variation
 * 
 * ADVANCED
 * Variation Pattern: Used to determine the required sound file.
 * Some examples of useful patterns are the following.
 * 
 * %1_%2 : 
 *  hit1 hit1_1 hit1_2 hit1_3 ...
 * variations/%1_%2 : This will look for SEs inside a folder.
 *  variations/
 *      hit_1
 *      hit_2
 *      hit_3
 *       ...
 * %1_vary/%1_%2 : And this would place it into a folder each.
 *  hit_vary/
 *      hit_1
 *      hit_2
 *      hit_3
 * 
 * Registering a sound so it starts using soundfile variations
 * only requires to pick the original sound file, and set the 
 * number of variations for it.
 * 
 * NOTE: Make sure to have all sounds, otherwise the system 
 * will randomly pick non-existing files and crash the game
 * every once in a while.
 * 
 * @param Default values
 * 
 * @param Pan Variation
 * @parent Default values
 * @type number
 * @min 0
 * @max 50
 * @default 5
 * 
 * @param Pitch Variation
 * @parent Default values
 * @type number
 * @min 0
 * @max 50
 * @default 5
 * 
 * @param Volume Variation
 * @parent Default values
 * @type number
 * @min 0
 * @max 50
 * @default 5
 * 
 * @param Advanced
 * 
 * @param Variation Pattern
 * @parent Advanced
 * @type text
 * @default %1_%2
 * 
 * @param Entries
 * @parent Advanced
 * @type struct<SoundEntry>[]
*/

/*~struct~SoundEntry:
 * @param Name
 * @type file
 * @dir audio/se/
 * 
 * @param Variations
 * @type number
 * @default 2
*/

(() => {
    const PLUGIN_NAME = "OZZ_RandomizeSounds";
    class OZZRandomSounds {
        constructor() {
            var pluginParams = PluginManager.parameters(PLUGIN_NAME);
            this.default = {};
            this.default.panVary = Number(pluginParams['Pan Variation']);
            this.default.pitchVary = Number(pluginParams['Pitch Variation']);
            this.default.volumeVary = Number(pluginParams['Volume Variation']);
            this.advanced = {};
            this.advanced.variationPattern = pluginParams['Variation Pattern'];
            if (pluginParams['Entries'].length != 0) this.advanced.entriesRaw = JSON.parse(pluginParams['Entries']);
            else this.advanced.entriesRaw = [];
            this.advanced.entries = [];
            for (var i = 0; i < this.advanced.entriesRaw.length; i++) {
                var entry = JSON.parse(this.advanced.entriesRaw[i]);
                entry.Variations = Number(entry.Variations);
                this.advanced.entries[entry.Name] = entry;
            }
        }
        RandVary(v) {
            return Math.randomInt(v) - (v / 2);
        }
        ApplySimpleVariation(se) {
            var newSe = {};
            newSe.name = se.name;
            newSe.pan = se.pan + this.RandVary(this.default.panVary);
            newSe.pitch = se.pitch + this.RandVary(this.default.pitchVary);
            newSe.volume = se.volume + this.RandVary(this.default.volumeVary);
            return se;
        }
        GetFormatted(name, i) {
            return this.advanced.variationPattern.format(name, i);
        }
        GetVariation(name) {
            var entry = this.advanced.entries[name];
            if (entry === undefined) return name;
            var i = Math.randomInt(entry.Variations);
            if (i < 1) return name;
            return this.GetFormatted(name, i);
        }
    }
    if (typeof OZ === 'undefined') OZ = {};
    OZ.rs = new OZZRandomSounds();
    // Preloaders
    AudioManager.loadStaticSe = function(se) {
        if (se.name && !this.isStaticSe(se)) {
            // Preload original
            const buffer = this.createBuffer("se/", se.name);
            this._staticBuffers.push(buffer);
            // Preload variations
            var entry = OZ.rs.advanced.entries[se.name];
            if (entry !== undefined) {
                for (var i = 1; i < entry.Variations; i++) {
                    var variationName = OZ.rs.GetFormatted(se.name, i);
                    const buffer = this.createBuffer("se/", variationName);
                    this._staticBuffers.push(buffer);
                }
            }
        }
    }
    // Play methods
    AudioManager.playSe = function(se) {
        if (se.name) {
            se = OZ.rs.ApplySimpleVariation(se);
            // [Note] Do not play the same sound in the same frame.
            const latestBuffers = this._seBuffers.filter(
                buffer => buffer.frameCount === Graphics.frameCount
            );
            if (latestBuffers.find(buffer => buffer.name === se.name)) {
                return;
            }
            var se_name = OZ.rs.GetVariation(se.name);
            const buffer = this.createBuffer("se/", se_name);
            this.updateSeParameters(buffer, se);
            buffer.play(false);
            this._seBuffers.push(buffer);
            this.cleanupSe();
        }
    }
    AudioManager.playStaticSe = function(se) {
        if (se.name) {
            se = OZ.rs.ApplySimpleVariation(se);
            this.loadStaticSe(se);
            var se_name = OZ.rs.GetVariation(se.name);
            for (const buffer of this._staticBuffers) {
                if (buffer.name === se_name) {
                    buffer.stop();
                    this.updateSeParameters(buffer, se);
                    buffer.play(false);
                    break;
                }
            }
        }
    }
})();