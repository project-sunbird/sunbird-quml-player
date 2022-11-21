import { chain, Rule } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { addLibraryModuleToAppModule } from './steps/add-library-module'; // spp --> sunbird VIDEO player
import { addLibraryStyles } from './steps/add-library-styles';
import { createService } from './steps/create-service';
/**
 * Sets up a project with all required to run sunbird video player.
 * This is run after 'package.json' was patched and all dependencies installed
 */
export default function ngAddSetupProject(options: Schema): Rule {
  return chain([
    addLibraryModuleToAppModule(options),
    addLibraryStyles(options),
    createService(options)
  ]);
}
