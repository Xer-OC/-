import { PluginContext, PluginEvent, PluginPermission } from './PluginContext';

export interface PlatformPlugin {
  id: string;
  name: string;
  description: string;
  version: string;
  permissions: PluginPermission[];
  initialize(context: PluginContext): Promise<void>;
  renderUI(): string;
  handleEvent(event: PluginEvent): Promise<void>;
}

const pluginRegistry = new Map<string, PlatformPlugin>();

export function registerPlugin(plugin: PlatformPlugin) {
  pluginRegistry.set(plugin.id, plugin);
}

export function getPlugins() {
  return Array.from(pluginRegistry.values());
}
