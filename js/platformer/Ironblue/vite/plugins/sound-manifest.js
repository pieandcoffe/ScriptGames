import fs   from 'fs';
import path from 'path';

export function soundManifestPlugin(soundsObj) {
  const MANIFEST_ID = 'virtual:sound-manifest';

  function buildManifest(obj) {
    const result = {};
    for (const [entity, actions] of Object.entries(obj)) {
      result[entity] = {};
      for (const [action, dirPath] of Object.entries(actions)) {
        const candidateDirs = [
          path.resolve(dirPath),
          path.resolve('public', dirPath)
        ];

        const absDir = candidateDirs.find(d => fs.existsSync(d));

        if (!absDir) {
          console.warn(`[sound-manifest] directory not found: ${candidateDirs.join(' or ')}`);
          result[entity][action] = [];
          continue;
        }

        result[entity][action] = fs
          .readdirSync(absDir)
          .filter(f => /\.(ogg|mp3|wav)$/i.test(f))
          .sort()
          .map(f => `${dirPath}${f}`);
      }
    }
    return result;
  }

  return {
    name: 'sound-manifest',
    resolveId(id) {
      if (id === MANIFEST_ID) return MANIFEST_ID;
    },
    load(id) {
      if (id !== MANIFEST_ID) return;
      return `export default ${JSON.stringify(buildManifest(soundsObj), null, 2)};`;
    },
    configureServer(server) {
      server.watcher.on('add',    () => server.moduleGraph.invalidateAll());
      server.watcher.on('unlink', () => server.moduleGraph.invalidateAll());
    },
  };
}