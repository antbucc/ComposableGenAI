import { PluginInterface } from '../plugins/plugin.interface';
import { MusicPlugin } from '../plugins/music/music.plugin';

interface PluginRegistry {
    [key: string]: PluginInterface;
}

const plugins: PluginRegistry = {
    'music': new MusicPlugin(),
    // Add other plugins here as they are created
};

export class PluginService {
    static async executePlugin(pluginName: string, params: any): Promise<{ filename: string, content: Buffer }[]> {
        const plugin = plugins[pluginName];
        if (!plugin) {
            throw new Error(`Plugin ${pluginName} not found`);
        }
        return plugin.execute(params);
    }
}
