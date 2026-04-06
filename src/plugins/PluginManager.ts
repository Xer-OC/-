import { generateId } from '../utils/id';
import { PluginContext, PluginEvent } from './PluginContext';
import { getPlugins, PlatformPlugin } from './PluginRegistry';

type InstalledPlugin = {
  id: string;
  user_id: string;
  plugin_id: string;
  enabled: boolean;
  installed_at: number;
};

const installedPlugins: InstalledPlugin[] = [];

export async function initializePlugins(context: PluginContext) {
  await Promise.all(getPlugins().map((plugin) => plugin.initialize(context)));
}

export async function emitPluginEvent(event: PluginEvent) {
  await Promise.all(getPlugins().map((plugin) => plugin.handleEvent(event)));
}

export function installPlugin(userId: string, plugin: PlatformPlugin): InstalledPlugin {
  const existing = installedPlugins.find((item) => item.user_id === userId && item.plugin_id === plugin.id);
  if (existing) return existing;

  const installed: InstalledPlugin = {
    id: generateId('installed-plugin'),
    user_id: userId,
    plugin_id: plugin.id,
    enabled: true,
    installed_at: Date.now()
  };
  installedPlugins.push(installed);
  return installed;
}

export function listInstalledPlugins(userId: string) {
  return installedPlugins.filter((item) => item.user_id === userId);
}
