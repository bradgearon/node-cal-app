# minimum viable
+ wire the hardware / google api / setup server app / render anything
+  local monitor (or 7in display if you have one)
+ https://developers.google.com/google-apps/calendar/v3/reference/

# questions
**do we show the entire calendar interface when the app starts?**
current meeting if there is one 

**do we only show the current calendar event? ( check server time and the event time )**
on push event the angular (data bound) scope.schedule will be updated (automagically)
the module will setup a proxy, create the client and give it to it (the proxy)
the client will bind data (displayed in the view + auto binds)
push events for sync

**calendar notification?**
maybe refresh some hipchat module on the page (another module not this node-cal projject specifically)

# modules as packages
+ apm == npm, modified to fix issues with node version and native modules (binaries)
+ apm is Junk (with a capital j <a mac could type the character i want here )
+ npm is good… git hub urls for now?

# atom-shell
+ atom-shell source code: https://github.com/atom/atom-shell/blob/master/docs/development/source-code-directory-structure.md
+ chromium’s multi-process architecture: http://dev.chromium.org/developers/design-documents/multi-process-architecture 

# ui
display google calendar event info: name, date, time; description - only if its public
what else?

# for unit tests
http://visionmedia.github.io/mocha/

# for debugging
https://github.com/atom/atom-shell/blob/master/docs/tutorial/debugging-browser-process.md

# backend (schedule module)
+ push (https://developers.google.com/google-apps/calendar/v3/push)
https://github.com/google/google-api-nodejs-client/

## authentication: 
+ https://developers.google.com/accounts/docs/OAuth2WebServer
+ http://javascriptplayground.com/blog/2013/06/node-and-google-oauth/

### process
+ Generate a URL where User could go to authenticate
+ Make sure we can handle what Google sends us back (page exists, code is extracted)
+ Exchange code for token
+ Use token to get data, and see under the hood
+ passport ?  (http://passportjs.org/)

## setup
+ Pi configuration
+ http://archlinuxarm.org/platforms/armv6/raspberry-pi  arch or ubuntu installed on pi
+ Wifi / LAN setup on pi
+ Test pi’s internet connection within firewall
+ Test pi’s connection to display
+ atom-shell linux binaries downloaded to the device
	+ https://github.com/atom/atom-shell/blob/master/docs/tutorial/using-native-node-modules.md ( can use **apm from atom-shell, don’t need to install node**)
+ Register google API console account
+ git installed on device
+ git fork the app on the device’s filesystem (forked) 
+ run “./run.sh” to auto install atom-shell and setup the project

## other considerations (tbd)
+ should be the default gui for the running os

## development environment
+ local downloaded binaries of atom-shell
+ same as device (os agnostic)

## code base
https://github.com/bradgearon/node-cal-app
https://github.com/dougnukem/hello-atom
build --- Update grunt-download-atom-shell
nerd-cal (https://bitbucket.org/bradgearon/nerd-cal)
.gitignore
README.md
run.sh -- run this script to auto start app, super cool

## flow
reference: https://github.com/atom/atom-shell/blob/master/docs/tutorial/application-distribution.md
https://github.com/atom/atom-shell/blob/master/docs/api/app.md
https://github.com/atom/atom-shell/blob/master/docs/tutorial/quick-start.md
+ all events mentioned are atom-shell events
+ main.js listens for ready event: ready event from atom-shell process
+ scans for modules (.js files in a folder)
+ requires each module
+ calls imodule.start
+ sets up listener for window-all-closed and or will-quit
+ disconnect the session
+ destroy proxy connection
+ unbind events
+ calls imodule.stop for necessary module cleanup

## schedule module (imodule implementation)
+ (require module) 
+ start: starts things
+ … (I don’t know what: mainWindow.loadUrl('file://' + __dirname + '/index.html');)  
+ on push event the angular (data bound) scope.schedule will be updated (automagically)
+ will setup a proxy, create the client and give it to it (the proxy)
+ client will bind data (displayed in the view + auto binds)

## google calendar connection (process)
+ sync the data
+ check server time
+ pull the current happening / about to happen event
+ display: date, time, description, notes, invitees
+ stop: stops things

## Error handling
+ internet connection error
+ google account connection error
+ data error

## TODO
+ move this todo list to issues
+ wire angular to the app (@shan)
+ register google API console account (@brad)
+ build hardware and instructions (@brad in progress)
+ setup passport
+ add a login (adapter, module, something - integrates with the nerd-cal module)
