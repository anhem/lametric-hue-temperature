'use strict';
import * as laMetricClient from "../../src/client/laMetricClient";
import {sendErrorMessage, sendTemperature} from "../../src/service/laMetricService";

describe('laMetricService', () => {

    test('sendTemperature', async () => {
        const temperatures = [
            {name: 'High', shortName: 'HI', temperature: 20.7},
            {name: 'Low', shortName: 'LO', temperature: 19.5},
        ]
        const sendFrames = jest.spyOn(laMetricClient, 'sendFrames').mockResolvedValue()

        await sendTemperature(temperatures)

        expect(sendFrames).toBeCalledWith({
            frames: [
                {
                    duration: 4000,
                    icon: "2056",
                    index: 0,
                    text: "HI 20.7",
                },
                {
                    duration: 4000,
                    icon: "2056",
                    index: 1,
                    text: "LO 19.5",
                },
            ],
        })
    });

    test('sendErrorMessage', async () => {
        const sendFrames = jest.spyOn(laMetricClient, 'sendFrames').mockResolvedValue()

        const errorMessage = "error message";
        await sendErrorMessage(errorMessage)

        expect(sendFrames).toBeCalledWith({
            frames: [
                {
                    duration: 15000,
                    icon: "2056",
                    index: 0,
                    text: errorMessage,
                }
            ],
        })
    });
});