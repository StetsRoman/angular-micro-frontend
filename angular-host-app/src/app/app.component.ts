import {
  ViewContainerRef,
  Component,
  OnInit,
  AfterViewInit,
  Injector,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { RemoteModulesService } from './services/remote-module/remote-modules.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('header', { read: ViewContainerRef, static: true })
  headerContainer!: ViewContainerRef;

  @ViewChild('footer', { read: ViewContainerRef, static: true })
  footerContainer!: ViewContainerRef;

  @ViewChild('dashboard', { read: ViewContainerRef, static: true })
  dashboardContainer!: ViewContainerRef;

  constructor(private remoteModulesService: RemoteModulesService) {}

  async ngOnInit() {
    await this.loadComponent('Header', this.headerContainer);
    await this.loadComponent('Footer', this.footerContainer);
    // await this.loadComponent('Dashboard', this.dashboardContainer);
  }

  async loadComponent(
    moduleName: string,
    container: ViewContainerRef
  ): Promise<void> {
    const componentOptions =
      this.remoteModulesService.getModuleOptions(moduleName);

    const Component = await loadRemoteModule(componentOptions).then(
      (m) => m[componentOptions.componentName ?? '']
    );
    container.createComponent(Component);
  }
}
