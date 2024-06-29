// src/plugins/music/music.plugin.ts

import * as fs from 'fs';
import { exec } from 'child_process';
import { PluginInterface } from '../plugin.interface';

interface MusicPluginParams {
    input: string;
    tempo: number;
    repetitions: number;
    instrument: number; // Use MIDI instrument numbers
}

export class MusicPlugin implements PluginInterface {
    execute(params: MusicPluginParams): Promise<{ filename: string, content: Buffer }[]> {
        return new Promise((resolve, reject) => {
            const { input, tempo, repetitions, instrument } = params;
            const inputFilePath = 'src/plugins/music/input_tabs.txt';
            const outputDir = 'src/plugins/music/output/'; // Fixed output directory

            // Write the input to a file
            fs.writeFileSync(inputFilePath, input);

            // Ensure the output directory exists
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            // Construct the command
            const command = `python3 src/plugins/music/script.py ${inputFilePath} ${tempo} ${repetitions} ${outputDir} ${instrument}`;

            // Execute the script
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Execution error: ${error}`);
                    return reject(`Execution error: ${error.message}`);
                }

                if (stderr) {
                    console.error(`Script error: ${stderr}`);
                    return reject(`Script error: ${stderr}`);
                }

                console.log(`Script output: ${stdout}`);

                // Read the generated files from the output directory
                const outputFiles = fs.readdirSync(outputDir).map(file => ({
                    filename: file,
                    content: fs.readFileSync(`${outputDir}${file}`)
                }));

                resolve(outputFiles);
            });
        });
    }
}
