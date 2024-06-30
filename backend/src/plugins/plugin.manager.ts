// src/plugins/plugin.manager.ts

import { PluginInterface } from './plugin.interface';
import { MusicPlugin } from './music/music.plugin';

interface PluginRegistry {
    [key: string]: PluginInterface;
}

const plugins: PluginRegistry = {
    'music': new MusicPlugin(),
    // Add other plugins here as they are created
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
