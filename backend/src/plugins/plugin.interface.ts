export interface PluginInterface {
    execute(params: Record<string, any>): Promise<any>;
}
