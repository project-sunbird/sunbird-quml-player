import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { JsonArray, workspaces } from '@angular-devkit/core';
import { getWorkspace, updateWorkspace } from '@schematics/angular/utility/workspace';
import { getProjectTargetOptions } from '../../utils/project';
import * as messages from '../messages';
import { Schema } from '../schema';

const STYLE_FILEPATH = [
  'node_modules/@project-sunbird/sunbird-quml-player-v9/lib/assets/quml-carousel.css',
  'node_modules/@project-sunbird/sb-styles/assets/_styles.scss',
  'node_modules/katex/dist/katex.min.css',
];

const SCRIPT_FILEPATH = [
  "node_modules/katex/dist/katex.min.js",
  "node_modules/jquery/dist/jquery.min.js"
];
const LIBRARY_ASSETS = {
  glob: '**/*.*',
  input: './node_modules/@project-sunbird/sunbird-quml-player-v9/lib/assets/',
  output: '/assets/'
};
/**
 * we're simply adding '_styles.scss' to the 'angular.json'
 */
export function addLibraryStyles(options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const workspace: any = await getWorkspace(host);

    const projectName = options.project || (workspace.extensions.defaultProject as string);
    const project = workspace.projects.get(projectName);
    if (!project) {
      throw new SchematicsException(messages.noProject(projectName));
    }
    // just patching 'angular.json'
    return addStyleToAngularJson(workspace, project, host, context);
  };
}

/**
 * Patches 'angular.json' to add '_styles.scss' styles
 */
function addStyleToAngularJson(
  workspace: any, project: workspaces.ProjectDefinition, host: Tree, context: SchematicContext): Rule {
  const targetOptions = getProjectTargetOptions(project, 'build');
  const styles = (targetOptions.styles as JsonArray | undefined);

  context.logger.info("Adding styles to angular.json");
  for (const PATH of STYLE_FILEPATH) {
    if (!styles) {
      targetOptions.styles = [PATH];
    } else {
      const existingStyles: any = styles.map((s: any) => typeof s === 'string' ? s : s.input);
      for (const [, stylePath] of existingStyles.entries()) {
        // If the given asset is already specified in the styles, we don't need to do anything.
        if (stylePath === PATH) {
          return () => host;
        }
      }
      styles.unshift(PATH);
    }
  }

  const scripts = (targetOptions.scripts as JsonArray | undefined);

  context.logger.info("Adding scripts to angular.json");
  for (const PATH of SCRIPT_FILEPATH) {
    if (!scripts) {
      targetOptions.scripts = [PATH];
    } else {
      const existingSripts: any = scripts.map((s: any) => typeof s === 'string' ? s : s.input);
      for (const [, scriptPath] of existingSripts.entries()) {
        // If the given asset is already specified in the scripts, we don't need to do anything.
        if (scriptPath === PATH) {
          return () => host;
        }
      }
      scripts.unshift(PATH);
    }
  }

  const assets = (targetOptions.assets as JsonArray | undefined);
  context.logger.info("Adding assets to angular.json");
  if (!assets) {
    targetOptions.assets = [LIBRARY_ASSETS];
  } else {
    const existingAssets: any = assets.map((a: any) => typeof a === 'string' ? a : a.input);
    for (const [, assestPath] of existingAssets.entries()) {
      // If the given asset is already specified in the assets, we don't need to do anything.
      if (assestPath === LIBRARY_ASSETS.input) {
        return () => host;
      }
    }
    assets.unshift(LIBRARY_ASSETS);
  }

  return updateWorkspace(workspace);
}