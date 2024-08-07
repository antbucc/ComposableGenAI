// src/plugins/guitar-tabs-converter/guitar-tabs-converter.plugin.ts

import * as fs from 'fs';
import { exec } from 'child_process';
import { PluginInterface } from '../plugin.interface';
import { getMIDIInstrumentNumber } from '../../types/MIDIInstruments';

interface GuitarTabsConverterPluginParams {
    input: string;
    tempo: number;
    repetitions: number;
    instrument: string; // Use instrument name
}

export class GuitarTabsConverterPlugin implements PluginInterface {
    execute(params: GuitarTabsConverterPluginParams): Promise<{ filename: string, content: string }[]> {
        return new Promise((resolve, reject) => {
            const { input, tempo, repetitions, instrument } = params;

            // Convert instrument name to number
            const instrumentNumber = getMIDIInstrumentNumber(instrument);
            if (instrumentNumber === undefined) {
                return reject(new Error('Invalid instrument name'));
            }

            const inputFilePath = 'src/plugins/guitar-tabs-converter/input_tabs.txt';
            const outputDir = 'src/plugins/guitar-tabs-converter/output/'; // Fixed output directory

            // Write the input to a file
            fs.writeFileSync(inputFilePath, input);

            // Ensure the output directory exists
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            // Construct the command
            const command = `python3 src/plugins/guitar-tabs-converter/main.py ${inputFilePath} ${tempo} ${repetitions} ${outputDir} ${instrumentNumber}`;

            // Execute the script
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Execution error: ${error}`);
                    return reject(new Error(`Execution error: ${error.message}`));
                }

                if (stderr) {
                    console.error(`Script error: ${stderr}`);
                    return reject(new Error(`Script error: ${stderr}`));
                }

                console.log(`Script output: ${stdout}`);

                // Read the generated files from the output directory
                const outputFiles = fs.readdirSync(outputDir).map(file => ({
                    filename: file,
                    content: fs.readFileSync(`${outputDir}${file}`).toString('base64') // Convert content to base64 string
                }));

                resolve(outputFiles);
            });
        });
    }
}
