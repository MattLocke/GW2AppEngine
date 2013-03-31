$(function(){
    /*
     * Reading in our global variables from the config file.  May have to
     * update this bit later, we'll see. 2013.03.30
     */
    var p = Ti.Filesystem.getApplicationDirectory();
    var f = Ti.Filesystem.getFile(p, "config.ini");
    var fs = Ti.Filesystem.getFileStream(f);
    fs.open(Ti.Filesystem.MODE_READ);
    
    var configFile = String(fs.read(f.size()));
    
    var configData = parseINIString(configFile);
    
    function parseINIString(data){
        var regex = {
            section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
            param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
            comment: /^\s*;.*$/
        };
        var value = {};
        var lines = data.split(/\r\n|\r|\n/);
        var section = null;
        
        for(x=0;x<lines.length;x++)
        {
        
            if(regex.comment.test(lines[x])){
                return;
            }else if(regex.param.test(lines[x])){
                var match = lines[x].match(regex.param);
                if(section){
                    value[section][match[1]] = match[2];
                }else{
                    value[match[1]] = match[2];
                }
            }else if(regex.section.test(lines[x])){
                var match = lines[x].match(regex.section);
                value[match[1]] = {};
                section = match[1];
            }else if(line.length == 0 && section){
                section = null;
            };
        
        }
        
        return value;
    }
    
    /*
     * Telling our software where the box starts and how bit it is.
     */
    Ti.UI.getMainWindow().x = configData.start_x;
    Ti.UI.getMainWindow().y = configData.start_y;
    var sizeWidth = parseInt(configData.app_width);
    var sizeHeight = parseInt(configData.app_height);
    Ti.UI.getMainWindow().setSize(sizeWidth,sizeHeight);
    
    /*
     * This is what handles the dragging around.  Because of resolution crap
     * I added this feature so the user can determine where they want the
     * window to be.
     */
    $("#window-drag").mousedown ( function ( event )
    {        
        var diffX = event.pageX;
        var diffY = event.pageY;
        var dragActive = true;

        $(document).mousemove ( function ( event )
        {
            if (dragActive) {
                event.preventDefault();
                if (event.screenY - diffY < screen.height-100)
                var tmpX = event.screenX - diffX;
                var tmpY = event.screenY - diffY;
                Ti.UI.getMainWindow().x = tmpX;
                Ti.UI.getMainWindow().y = tmpY;
                $("#window-drag").mouseup(function(event) {
                    dragActive = false; 
                });
            }
        });
    });
    
    /*
     * This is where it calls to the server and get the data
     * to display in the box.  The interval is determined by
     * the config file, and it calls it the first time to
     * get the ball rolling.
     */
    callServer();
    if (configData.INTERVAL > 0) {
        var rate = parseInt(configData.INTERVAL) * 1000;
        $(document).everyTime(rate, callServer);
    }
    
    function callServer() {
        $.ajax({
            type: "POST",
            url: configData.SERVER_URL,
            async: false,
            data: "from_engine=1",
            success: function(appBody) {
                $("#appBody").html(appBody);
            }
        });
    }
        
    /*
     * This is called to close the window.  I am requiring it
     * because let's face it, it's a bad user experience to
     * require them to alt+f4 your app.
     */
    $("#closeApp").on("click", function() {
       Ti.App.exit(); 
    });
});