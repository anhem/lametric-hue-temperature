## LaMetric Hue Temperature

Display temperatures from Philips Hue Motions Sensors on LaMetric Time. 

Example: https://www.youtube.com/watch?v=sHBgSr0JU6g

### Requirements
A server running on your local network, Node and npm.

The application is written to be executed at regular intervals, for example as a scheduled **cron-job**.
I.e. it will shutdown once it has completed its task, and needs to be started again for the temperature data to be updated.

### Setup

1. `HUE_BRIDGE_IP`- Visit https://discovery.meethue.com/ to get the IP address (internalipaddress) of your Philips Hue Bridge.

1. `HUE_API_KEY`- Go to http://<HUE_BRIDGE_IP>/debug/clip.html and fill in `/api` in the URL and 
`{"devicetype":"lametric-hue-temp#server"}` in the message body. **Before proceeding**, go and press the physical button 
on your Philips Hue Bridge. After that you can click on the **post** button. It should look like 
[this](https://developers.meethue.com/wp-content/uploads/2018/02/SuccessResponse-1.png) if successful. The `username` is your `HUE_API_KEY`.

1. `LAMETRIC_ACCESS_TOKEN` & `LAMETRIC_PUSH_URL` - Go to https://developer.lametric.com/applications/create and create a 
    LaMetric **Indicator App** with **Push** communication and publish it as a **private app**. Now you should have your 
    `LAMETRIC_ACCESS_TOKEN` and `LAMETRIC_PUSH_URL`

1. Clone this repository and run **npm install** and **npm run build** from your terminal. A new folder called `dist`  
should have been created with some .js files in it.

1. Make a copy of **lametric-hue-temperature.cron.sh** and place it in your home directory. Edit the **copied** file  
and replace all \<placeholders\> with the information gathered from previous steps.
    
    Example:
    ```
    #!/usr/bin/env bash
    HUE_API_KEY=xxxxxx \
    HUE_BRIDGE_IP=192.168.1.2 \
    LAMETRIC_ACCESS_TOKEN=xxxxxx \
    LAMETRIC_PUSH_URL=https://developer.lametric.com/api/v1/dev/widget/update/com.lametric.xxxxxx \
    node /home/user/lametric-hue-temperature/dist/app.js 2>&1
    ```
    To test that it works you can execute `./lametric-hue-temperature.cron.sh`. If everything is setup correctly you should get something similar to this:
    ```
    Message: {"frames":[{"text":"Ha 20.8","icon":"2056","index":0,"duration":4000},{"text":"Ki 21.5","icon":"2056","index":1,"duration":4000},{"text":"Be 21.5","icon":"2056","index":2,"duration":4000}]}
    ```
    
1. (**cron required**) Schedule script to run as a cron job by executing `crontab -e` and add the following at the end 
of the file ```*/5 * * * * /home/<username>/lametric-hue-temperature.cron.sh```. This will make the script execute every 5 minutes

### Development

use `npm start` to start in development mode
