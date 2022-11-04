import { LoadRemoteModuleOptions } from '@angular-architects/module-federation';

export type RemoteModuleOptions = LoadRemoteModuleOptions & {
    componentName?: string;
    ngModuleName?: string; 
};
