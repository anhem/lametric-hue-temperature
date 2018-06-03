## LaMetric Hue Temperature

Display temperatures from Philips Hue Motions Sensors on LaMetric Time. 

Example: https://www.youtube.com/watch?v=sHBgSr0JU6g

### Requirements
Node and npm. **Cron** is used for scheduled execution (steps 4-5). 

### Setup

1. Checkout https://www.developers.meethue.com/documentation/getting-started for intstructions on how to get the `HUE_BRIDGE_IP` and an `HUE_API_KEY` from your Philips Hue Bridge.

2. Go to https://developer.lametric.com/applications/create and create a LaMetric **Indicator App** with **Push** communication and publish it as a **private app**. Now you should have your `LAMETRIC_ACCESS_TOKEN` and `LAMETRIC_PUSH_URL`

3. Clone this repository and run **npm install** and **npm run build**.

4. (**cron required**) make a copy of **lametric-hue-temperature.cron.sh** and place it in your home directory. Edit the **copied** file and replace all placeholders with the information gathered from previous steps.

5. (**cron required**) Schedule script to run as a cron job by executing `crontab -e` and add the following at the end of the file:
  ```*/5 * * * * /home/<username>/lametric-hue-temperature.cron.sh```
  This will make the script execute every 5 minutes

### Development

Set Philips Hue Bridge IP address by environment variable `HUE_BRIDGE_IP`

Set Hue API key by environment variable `HUE_API_KEY`

Set LaMetric access token by environment variable `LAMETRIC_ACCESS_TOKEN`

Set LaMetric push url by environment variable `LAMETRIC_PUSH_URL`

use `npm start` to start in development mode
