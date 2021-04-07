=begin
INI Reader Module
-----------------
This is just a wrapper for kernel32's library 
INI reading function. This could potentially evolve into 
read/write, which is useful for simple human-readable 
configuration files, but not for now.

If using with mkxp, this still works, however haven't 
tried it on Linux or MacOS. Also Kernel32 is a default DLL
part of Windows.

To use it, simply call

IniReader.read(filename, section, id)

All parameters must be strings. I.e.

IniReader.read("config.ini", "screen", "size")

The returning value is also a string. 
=end

module IniReader
  # Increase buffer size if dealing with
  # super long strings or something. 
  BUFFER_SIZE = 1024

  # You shouldn't need to change anything 
  # beyond this point, but you do you. 
  @@ini = Win32API.new('kernel32', 'GetPrivateProfileString', 'PPPPLP', 'L')

  def self.read(filename,section,id,check=false)
    # Defines a piece of memory where the DLL will do its work.
    text = "\0" * BUFFER_SIZE 
    # DLL function call.
    @ini.call(section, id, '', text, BUFFER_SIZE, filename)
    # Trim any excedents.
    text.delete!("\0")
    # If nothing was found.
    if check && text == ''
      # Return problematic id for debugging
      return "%% %s %%" % [id]
    end
    return text.force_encoding('UTF-8')
  end
end
