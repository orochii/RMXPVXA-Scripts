module IniReader
  @@ini = Win32API.new('kernel32', 'GetPrivateProfileString', 'PPPPLP', 'L')

  def self.read(filename,section,id,check=false)
    # Defines a piece of memory where the DLL will do its work.
    text = "\0" * 1024 
    # DLL function call.
    @ini.call(@culture, id, '', text, 1024, @filename)
    # Trim any excedents.
    text.delete!("\0")
    # If nothing was found.
    if text == '' 
      return text if !check
      # Return problematic id for debugging
      return "%% %s %%"%[id]
    end
    return text.force_encoding('UTF-8')
  end
end
