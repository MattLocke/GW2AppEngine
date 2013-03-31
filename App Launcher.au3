Run("GW2AppEngine.exe");
WinWait("GW2 App Engine");
While ProcessExists("GW2AppEngine.exe")<>0
WinSetOnTop("GW2 App Engine", "", 1);
WEnd