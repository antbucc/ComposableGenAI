import { PluginInterface } from '../plugins/plugin.interface';
import { PluginManager } from '../plugins/plugin.manager';

export class PluginService {
    static async executePlugin(pluginName: string, params: any): Promise<{ filename: string, content: Buffer }[]> {
        const plugin = PluginManager.getPlugin(pluginName);
        if (!plugin) {
            throw new Error(`Plugin ${pluginName} not found`);
        }
        return plugin.execute(params);
    }
}
