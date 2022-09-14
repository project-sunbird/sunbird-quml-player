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

export function addLibraryStyles(options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const workspace: any = await getWorkspace(host);

    const projectName = options.project || (workspace.extensions.defaultProject as string);
    const project = workspace.projects.get(projectName);
    if (!project) {
      throw new SchematicsException(messages.noProject(projectName));
    }
    // just patching 'angular.json'
    return addStyleToAngularJson(project, context, projectName);
  };
}

/**
 * Patches 'angular.json' to add '_styles.scss' styles
 */
function addStyleToAngularJson(project: workspaces.ProjectDefinition, context: SchematicContext, projectName: string): Rule {
  const targetOptions = getProjectTargetOptions(project, 'build');
  const styles = (targetOptions.styles as JsonArray | undefined);

  context.logger.info("Adding styles to angular.json");
  for (const PATH of STYLE_FILEPATH) {
    if (!styles) {
      targetOptions.styles = [PATH];
    } else {
      const existingStyles: any = styles.map((s: any) => typeof s === 'string' ? s : s.input);

      if (!existingStyles.includes(PATH)) {
        styles.unshift(PATH);
      }
    }
  }

  const scripts = (targetOptions.scripts as JsonArray | undefined);

  context.logger.info("Adding scripts to angular.json");
  for (const PATH of SCRIPT_FILEPATH) {
    if (!scripts) {
      targetOptions.scripts = [PATH];
    } else {
      const existingScripts: any = scripts.map((s: any) => typeof s === 'string' ? s : s.input);
      if (!existingScripts.includes(PATH)) {
        scripts.unshift(PATH);
      }
    }
  }

  const assets = (targetOptions.assets as JsonArray | undefined);
  context.logger.info("Adding assets to angular.json");
  if (!assets) {
    targetOptions.assets = [LIBRARY_ASSETS];
  } else {
    const existingAssets: any = assets.map((a: any) => typeof a === 'string' ? a : a.input);

    if (!existingAssets.includes(LIBRARY_ASSETS.input)) {
      assets.unshift(LIBRARY_ASSETS);
    }
  }

  context.logger.info("updating angular.json...");
  return updateWorkspace((defaultWorkspace: workspaces.WorkspaceDefinition) => {
    let defaultProject: any = defaultWorkspace.projects.get(projectName);
    const buildTarget = defaultProject.targets.get('build');
    buildTarget.options.styles = styles;
    buildTarget.options.scripts = scripts;
    buildTarget.options.assets = assets;
  });
}