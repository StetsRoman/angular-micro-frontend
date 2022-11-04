import { Injectable } from '@angular/core';
import { RemoteModuleOptions } from './remote-module-options'

@Injectable({
  providedIn: 'root'
})
export class RemoteModulesService {

  moduleOptions: RemoteModuleOptions[] = [
    {
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: 'Header',
      componentName: 'HeaderComponent',
    },
    {
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: 'Footer',
      componentName: 'FooterComponent',
    },
    {
      type: 'module',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      exposedModule: 'Dashboard',
      ngModuleName: 'DashboardModule'
    }
  ]
  
  getModuleOptions(moduleName: string): RemoteModuleOptions{
    const options = this.moduleOptions.find(x=>x.exposedModule === moduleName);
    return options as RemoteModuleOptions; 
  } 
}
