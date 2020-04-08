import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-edit-delete-buttons',
  templateUrl: './edit-delete-buttons.component.html',
  styleUrls: ['./edit-delete-buttons.component.scss']
})
export class EditDeleteButtonsComponent implements OnInit {

  @Input() data;
  @Input() edit: boolean;
  @Input() delete: boolean;

  @Output() editEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();


  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getIcons();
  }

  public getIcons(): void {
    this.iconRegistry.addSvgIcon('delete', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/delete.svg'));
    this.iconRegistry.addSvgIcon('edit', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/edit.svg'));
  }
  public editItem(e): void {
    this.editEmitter.emit(e);
  }
  public deleteItem(e): void {
    this.deleteEmitter.emit(e);
  }
}
