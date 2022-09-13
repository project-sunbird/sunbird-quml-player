import { Rule, SchematicsException, Tree, SchematicContext } from '@angular-devkit/schematics';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { Change } from '@schematics/angular/utility/change';
import { addImportToModule, addSymbolToNgModuleMetadata, addProviderToModule, insertImport } from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { Schema } from '../schema';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import * as messages from '../messages';
import { getProjectTargetOptions } from '../../utils/project';


const MODULE_NAME = 'QumlLibraryModule';
const PACKAGE_NAME = '@project-sunbird/sunbird-quml-player-v9';


const modules = [
  { moduleName: 'QumlLibraryModule', packageName: '@project-sunbird/sunbird-quml-player-v9' },
  { moduleName: 'HttpClientModule', packageName: '@angular/common/http' }
];

export function addLibraryModuleToAppModule(options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(host);
    const projectName = options.project || (workspace.extensions.defaultProject as string);

    context.logger.info("Adding Library Module, Providers and required modules in app.module");
    // 1. getting project by name
    const project: any = workspace.projects.get(projectName);
    if (!project) {
      throw new SchematicsException(messages.noProject(projectName));
    }

    // 2. getting main file for project
    const projectBuildOptions = getProjectTargetOptions(project, 'build');
    const mainFilePath = projectBuildOptions.main as string;
    if (!mainFilePath || !host.read(mainFilePath)) {
      throw new SchematicsException(messages.noMainFile(projectName));
    }

    // // 3. getting main app module file
    // const appModuleFilePath = getAppModulePath(host, mainFilePath);
    // const appModuleFileText = host.read(appModuleFilePath);
    // if (appModuleFileText === null) {
    //   throw new SchematicsException(messages.noModuleFile(appModuleFilePath));
    // }

    // 4. adding `modules` to the app module
    // const appModuleSource =
    //   ts.createSourceFile(appModuleFilePath, appModuleFileText.toString('utf-8'), ts.ScriptTarget.Latest, true);


    // const changes =
    //   addImportToModule(appModuleSource, appModuleFilePath, MODULE_NAME, PACKAGE_NAME);

    // const recorder = host.beginUpdate(appModuleFilePath);
    // for (const change of changes) {
    //   if (change instanceof InsertChange) {
    //     recorder.insertLeft(change.pos, change.toAdd);
    //   }
    // }
    // host.commitUpdate(recorder);


    let changes: Change[], appModuleSource!: ts.SourceFile, appModuleFilePath: string;

    for (let item of modules) {
      appModuleFilePath = getAppModulePath(host, mainFilePath);
      const appModuleFileText = host.read(appModuleFilePath);
      if (appModuleFileText === null) {
        throw new SchematicsException(messages.noModuleFile(appModuleFilePath));
      }

      const fileContent = appModuleFileText.toString('utf-8');
      // Check if the module is not imported before
      if (!fileContent.includes(item.packageName)) {
        appModuleSource = ts.createSourceFile(appModuleFilePath, fileContent, ts.ScriptTarget.Latest, true);
        changes = addImportToModule(appModuleSource, appModuleFilePath, item.moduleName, item.packageName);
        update(host, appModuleFilePath, changes);
      }
    }

    if (appModuleSource) {
      // const { appModuleFilePath, appModuleSource } = getModulesSource(host, mainFilePath);
      // changes = addSymbolToNgModuleMetadata(appModuleSource, appModuleFilePath, 'imports', 'CarouselModule.forRoot()', 'ngx-bootstrap/carousel');
      // update(host, appModuleFilePath, changes);

      addSymbolToMetadata(host, mainFilePath, 'imports', 'CarouselModule.forRoot()', 'ngx-bootstrap/carousel');
      addSymbolToMetadata(host, mainFilePath, 'providers', `QuestionCursorImplementationService`, './question-cursor-implementation.service');
      addSymbolToMetadata(host, mainFilePath, 'providers',
        `{
          provide: QuestionCursor,
          useClass: QuestionCursorImplementationService
         }`);

      insertImportToModule(host, mainFilePath, 'QuestionCursor', '@project-sunbird/sunbird-quml-player-v9');
      insertImportToModule(host, mainFilePath, 'QuestionCursorImplementationService', './question-cursor-implementation.service');
      // changes = [insertImport(appModuleSource, appModuleFilePath, 'QuestionCursor', '@project-sunbird/sunbird-quml-player-v9')];
      // changes = [insertImport(appModuleSource, appModuleFilePath, 'QuestionCursorImplementationService', './question-cursor-implementation.service')];
      // changes = addSymbolToNgModuleMetadata(appModuleSource, appModuleFilePath, 'providers', `QuestionCursorImplementationService`, './question-cursor-implementation.service');
    }
  };
}

function addSymbolToMetadata(host: Tree, mainFilePath: string, metadataField: string, symbolName: string, importPath?: string) {
  const { appModuleFilePath, appModuleSource } = getModulesSource(host, mainFilePath);
  const changes = addSymbolToNgModuleMetadata(appModuleSource, appModuleFilePath, metadataField, symbolName, importPath);
  update(host, appModuleFilePath, changes);
}

function insertImportToModule(host: Tree, mainFilePath: string, symbolName: string, fileName: string) {
  const { appModuleFilePath, appModuleSource } = getModulesSource(host, mainFilePath);
  const changes = [insertImport(appModuleSource, appModuleFilePath, symbolName, fileName)];
  update(host, appModuleFilePath, changes);
}

function getModulesSource(host: Tree, mainFilePath: string) {
  let appModuleFilePath: string = getAppModulePath(host, mainFilePath);
  const appModuleFileText = host.read(appModuleFilePath);
  if (appModuleFileText === null) {
    throw new SchematicsException(messages.noModuleFile(appModuleFilePath));
  }
  const appModuleSource: ts.SourceFile = ts.createSourceFile(appModuleFilePath, appModuleFileText.toString('utf-8'), ts.ScriptTarget.Latest, true);

  return { appModuleFilePath, appModuleSource }
}

function update(host: Tree, appModuleFilePath: string, changes: Change[]) {
  const recorder = host.beginUpdate(appModuleFilePath);
  if (changes) {
    for (const change of changes) {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(recorder);
  }
}