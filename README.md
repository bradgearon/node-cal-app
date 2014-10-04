* docs here: https://github.com/atom/atom-shell/tree/master/docs
* runs on a pi: 
    - http://www.amazon.com/Tontec-Raspberry-Display-AT070TN90-Touchscreen/dp/B00HNLXZHO
    - http://www.raspberrypi.org/help/quick-start-guide/
    - http://www.openhomeautomation.net/monitor-your-home-raspberry-pi-b/
* sits in front of a room
* displays meeting info
* other silly features (arkanoid or something while you wait)

## ideas
* button on screen to play a game (while you wait)
* modular

## "server" side
* starts at app.js
* launches the window
* fetch the data
  * potentially using https://github.com/wanasit/google-calendar
* renders the thing (template, binding #angular)
* sets up an observer that publishes data updates

## "browser" side
* receives updated... data...
* ... angular? since automagical

arch: https://bitbucket.org/bradgearon/nerd-cal/downloads/Nerd%20Carl%20Arch.pdf