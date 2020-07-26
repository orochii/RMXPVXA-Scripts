=begin
------------------------------------------------------------------------------
OZ Extra Pictures                                             for RPG Maker XP
------------------------------------------------------------------------------
by Orochii Zouveleki
Version 1.01
------------------------------------------------------------------------------

This script lets you use more than the max of 50 pictures, both in map and 
battle. It shouldn't have any issues with any other script of any kind.

In order to use the script, change the control variable with a Variable 
operation command in an event. Depending on the value, the game will use 
a new set of 50 images (all images will remain on screen, this is only as a
workaround for RMXP's interface, since it's hardcoded to only accept numbers
from 1 to 50).

i.e.  to use images from 1 to 50, set the variable to 0.
      to use images from 51 to 100, set the variable to 1.
      ...
      to use images from 1951 to 2000, set the variable to 400.

At least for vanilla projects (i.e. games with no custom scripts) this script 
will not break your savegames, and should not have any compatibility issues.

MIT License
-----------
Copyright 2020 Orochii Zouveleki

Permission is hereby granted, free of charge, to any person obtaining a copy 
of this software and associated documentation files (the "Software"), to deal 
in the Software without restriction, including without limitation the rights to 
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of 
the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN 
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
=end

# ----------------------------------------------------------------------------
#                          CONFIGURATION
# ----------------------------------------------------------------------------

module OZ_ExtraPictures
  # Change control variable ID here
  VARIABLE_ID = 1
  
# Don't touch anything below this line, unless you know what you're doing.
# ----------------------------------------------------------------------------
#                      End of Configuration
# ----------------------------------------------------------------------------

  # Offset for intern image index based on a game variable.
  # Uses 100 since it's universal for both map and battle IDs.
  def self.offsetID
    return $game_variables[VARIABLE_ID] * 100
  end
end

class Game_Picture
  # Determines if a picture is for the battle scene based on its image number.
  def from_battle?
    return (@number % 100) > 50
  end
end
#==============================================================================
# ** Game_Screen
#------------------------------------------------------------------------------
#  This class handles screen maintenance data, such as change in color tone,
#  flashing, etc. Refer to "$game_screen" for the instance of this class.
#==============================================================================
class Game_Screen
  #============================================================================
  # -- Picture Manager class
  #----------------------------------------------------------------------------
  # Wrapper for picture data array, supports adding new members if 
  # return value is going to be nil.
  #============================================================================
  class PictureManager
    
    # Build instance based on old picture data.
    def initialize(oldPicData)
      @pictures = oldPicData
    end
    
    # Return picture data corresponding to the requested index.
    def [](n)
      if @pictures[n]==nil
        @pictures[n] = Game_Picture.new(n)
      end
      return @pictures[n]
    end
    
    # Set picture data on a specific index.
    def []=(n,v)
      @pictures[n] = v
    end
    
    # Helper method for iterating through picture data objects.
    def each_index
      @pictures.each_index {|i| yield i}
    end
  end
  # -- END OF CLASS --
  
  # Redefining accessor for pictures, so it uses the picture manager instead.
  def pictures
    if @picture_man==nil
      @picture_man = PictureManager.new(@pictures)
    end
    return @picture_man
  end
end

#==============================================================================
# ** Spriteset_Map
#------------------------------------------------------------------------------
#  This class brings together map screen sprites, tilemaps, etc.
#  It's used within the Scene_Map class.
#==============================================================================
class Spriteset_Map
  # Addendum to the update method
  # Check if a sprite needs to be created on screen for a new picture.
  alias ozextrapic_update update unless $@
  def update
    # Create redirect for pictures
    @_newP_idxs = [] if @_newP_idxs==nil
    # Check if a sprite exists for each picture data
    $game_screen.pictures.each_index {|i|
      pdata = $game_screen.pictures[i]
      next if pdata==nil || pdata.from_battle?
      if @_newP_idxs[i]==nil && i > 100
        p = Sprite_Picture.new(@viewport2, $game_screen.pictures[i])
        newP_idx = @picture_sprites.size
        @_newP_idxs[i] = newP_idx
        @picture_sprites.push p
      end
    }
    # Continue with old update method
    ozextrapic_update
  end
end

#==============================================================================
# ** Spriteset_Battle
#------------------------------------------------------------------------------
#  This class brings together battle screen sprites. It's used within
#  the Scene_Battle class.
#==============================================================================
class Spriteset_Battle
  # Addendum to the update method
  # Check if a sprite needs to be created on screen for a new picture.
  alias ozextrapic_update update unless $@
  def update
    # Create redirect for pictures
    @_newP_idxs = [] if @_newP_idxs==nil
    # Check if a sprite exists for each picture data
    $game_screen.pictures.each_index {|i|
      pdata = $game_screen.pictures[i]
      next if pdata==nil || !pdata.from_battle?
      if @_newP_idxs[i]==nil && i > 100
        p = Sprite_Picture.new(@viewport2, $game_screen.pictures[i])
        newP_idx = @picture_sprites.size
        @_newP_idxs[i] = newP_idx
        @picture_sprites.push p
      end
    }
    # Continue with old update method
    ozextrapic_update
  end
end

#==============================================================================
# ** Interpreter (part 1)
#------------------------------------------------------------------------------
#  This interpreter runs event commands. This class is used within the
#  Game_System class and the Game_Event class.
#==============================================================================
class Interpreter
  alias ozextrapic_command_231 command_231 unless $@
  alias ozextrapic_command_232 command_232 unless $@
  alias ozextrapic_command_233 command_233 unless $@
  alias ozextrapic_command_234 command_234 unless $@
  alias ozextrapic_command_235 command_235 unless $@
  # Adding support for the extra pictures offset
  # RMXP does something pretty similar
  
  #--------------------------------------------------------------------------
  # * Show Picture
  #--------------------------------------------------------------------------
  def command_231
    clone_parameters
    @parameters[0] += OZ_ExtraPictures.offsetID
    return ozextrapic_command_231
  end
  #--------------------------------------------------------------------------
  # * Move Picture
  #--------------------------------------------------------------------------
  def command_232
    clone_parameters
    @parameters[0] += OZ_ExtraPictures.offsetID
    return ozextrapic_command_232
  end
  #--------------------------------------------------------------------------
  # * Rotate Picture
  #--------------------------------------------------------------------------
  def command_233
    clone_parameters
    @parameters[0] += OZ_ExtraPictures.offsetID
    return ozextrapic_command_233
  end
  #--------------------------------------------------------------------------
  # * Change Picture Color Tone
  #--------------------------------------------------------------------------
  def command_234
    clone_parameters
    @parameters[0] += OZ_ExtraPictures.offsetID
    return ozextrapic_command_234
  end
  #--------------------------------------------------------------------------
  # * Erase Picture
  #--------------------------------------------------------------------------
  def command_235
    clone_parameters
    @parameters[0] += OZ_ExtraPictures.offsetID
    return ozextrapic_command_235
  end
  
  # This is made in order to keep integrity of the original data.
  def clone_parameters
    param = []
    @parameters.each_index {|i|
      param[i] = @parameters[i]
    }
    @parameters = param
  end
end

# -------------------------------- END OF FILE --------------------------------
