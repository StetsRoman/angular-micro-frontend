import { Injectable } from '@angular/core';
import {
  GridsterConfig,
  GridsterItem,
  GridType,
  DisplayGrid,
  CompactType,
} from 'angular-gridster2';
import { UUID } from 'angular2-uuid';

export interface IComponent {
  id: string;
  componentRef: string;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public options: GridsterConfig = {
    gridType: GridType.Fit,
    fixedColWidth: 150,
    fixedRowHeight: 150,
    compactType: CompactType.CompactUp,
    displayGrid: DisplayGrid.Always,
    minCols: 15,
    maxCols: 15,
    minRows: 8,
    maxRows: 8,
    draggable: {
      delayStart: 0,
      enabled: true,
      ignoreContentClass: 'gridster-item-content',
      ignoreContent: false,
      dragHandleClass: 'drag-handler',
      dropOverItems: false,
    },
    pushItems: true,
    resizable: {
      enabled: true,
    },
  };

  newItem: any = {
    minCol: 1,
    maxCol: 4,
    minRow: 1,
    maxRow: 4,
  };

  public layout: GridsterItem[] = [
    this.createDefaultItem(),
    this.createDefaultItem(),
    this.createDefaultItem(),
    this.createDefaultItem(),
    this.createDefaultItem(),
    this.createDefaultItem(),
    this.createDefaultItem(),
    this.createDefaultItem(),
  ];

  public components: IComponent[] = [];
  dropId: string;

  constructor() {}

  setupOptions(options: GridsterConfig): void {
    this.options = options;
    this.applyOptions();
  }

  applyOptions(): void {
    this.options.api?.optionsChanged();
  }

  changeGridMinCols(minCols: number) {
    this.options = Object.assign([], this.options, {
      minCols: minCols,
      maxCols: minCols,
    });
    this.applyOptions();
  }
  changeGridMinRows(minRows: number) {
    this.options = Object.assign([], this.options, {
      minRows: minRows,
      maxRows: minRows,
    });
    this.applyOptions();
  }

  createDefaultItem(): GridsterItem {
    return {
      cols: 3,
      id: UUID.UUID(),
      rows: 3,
      x: 0,
      y: 0,
    };
  }

  addItem(): void {
    this.layout.push({
      cols: 3,
      id: UUID.UUID(),
      rows: 3,
      x: 0,
      y: 0,
      maxItemRows: this.newItem.maxRow,
      minItemRows: this.newItem.minRow,
      maxItemCols: this.newItem.maxCol,
      minItemCols: this.newItem.minCol,
    });
  }

  deleteItem(id: string): void {
    const item = this.layout.find((d) => d.id === id);
    this.layout.splice(this.layout.indexOf(item), 1);
    const comp = this.components.find((c) => c.id === id);
    this.components.splice(this.components.indexOf(comp), 1);
  }

  setDropId(dropId: string): void {
    this.dropId = dropId;
  }

  dropItem(dragId: string): void {
    const { components } = this;
    const comp: IComponent = components.find((c) => c.id === this.dropId);

    const updateIdx: number = comp
      ? components.indexOf(comp)
      : components.length;
    const componentItem: IComponent = {
      id: this.dropId,
      componentRef: dragId,
    };
    this.components = Object.assign([], components, {
      [updateIdx]: componentItem,
    });
  }

  getComponentRef(id: string): string {
    const comp = this.components.find((c) => c.id === id);
    return comp ? comp.componentRef : null;
  }
}
