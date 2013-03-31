Welcome to GW2 App Engine!

GW2 App Engine is a system that allows you to show web apps that you build
to show up on top of Guild Wars 2.  You can do custom event timers, bounty
tracking, Facebook, the sky is the limit!

To get started here's all you need to do:

1. Build a web page using javascript/html/css/etc.
2. Host it on the web.
3. Open up config.ini and change the url to your web page's url
4. Open "App Launcher.exe" and enjoy!

When developing an app, there's a couple things to keep in mind:

200px is the default width, but it can "grow" to 400px if need be.

300px is the default height, but it can "grow" to 1000px if need be.

You should add css to make sure div#window-drag has height.  This will be
the div that allows people to drag your application to where they want it
on the screen, very important!  You can style it however you want, but a
height+background is required to enable dragging.

div#appBody is where all your content is populated.  You can style
accordingly.

a#closeApp is the button at the bottom that closes the program.  Also can
be styled to fit your needs.