import {HueTemperature} from "./HueTemperature";
import {HueOwner} from "./HueOwner";

export interface HueTemperatureSensor {
    id: string
    enabled: boolean
    owner: HueOwner
    temperature: HueTemperature
    type: string
}