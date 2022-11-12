import {post} from "./restClient";
import {LaMetricFrames} from "./model/lametric/LaMetricFrames";


const LAMETRIC_PUSH_URL = process.env.LAMETRIC_PUSH_URL;
const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'X-Access-Token': process.env.LAMETRIC_ACCESS_TOKEN,
    'Cache-Control': 'no-cache'
};

export function sendFrames(laMetricFrames: LaMetricFrames) {
    post(LAMETRIC_PUSH_URL, HEADERS, laMetricFrames).then(() => {
        console.debug("Sent frames to laMetric")
    }, error => {
        console.log("Error while sending frames to laMetric: " + JSON.stringify(error))
    })
}