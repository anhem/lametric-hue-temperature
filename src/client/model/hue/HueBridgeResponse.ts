import { HueTemperatureSensor } from "./HueTemperatureSensor";
import { HueDevice } from "./HueDevice";

export interface HueBridgeResponse {
  errors: object;
  data: HueTemperatureSensor[] | HueDevice[];
}
