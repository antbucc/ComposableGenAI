import { PluginInterface } from './plugin.interface';
import { GuitarTabsConverterPlugin } from './guitar-tabs-converter/guitar-tabs-converter.plugin';
import { ABCConverterPlugin } from './abc-converter/abc-converter.plugin';
import { PDFConverterPlugin } from './pdf-converter/pdf-converter.plugins';
import { XMLConverterPlugin } from './xml-converter/xml-converter.plugins';

interface PluginRegistry {
    [key: string]: PluginInterface;
}

const plugins: PluginRegistry = {
    'guitar-tabs-converter': new GuitarTabsConverterPlugin(),
    'abc-converter': new ABCConverterPlugin(),
    'pdf-converter': new PDFConverterPlugin(),
    'xml-converter': new XMLConverterPlugin(),
};

export class PluginManager {
    static getPlugin(pluginName: string): PluginInterface | undefined {
        return plugins[pluginName];
    }

    static registerPlugin(pluginName: string, plugin: PluginInterface): void {
        plugins[pluginName] = plugin;
    }

    static listPlugins(): string[] {
        return Object.keys(plugins);
    }
}
