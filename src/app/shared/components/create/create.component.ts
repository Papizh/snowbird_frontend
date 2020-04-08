import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @Input() actionName: string;
  @Output() createNew = new EventEmitter();

  constructor(private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.setIcons();
  }

  public setIcons(): void {
    this.iconRegistry.addSvgIcon('plus', this.sanitizer.bypassSecurityTrustResourceUrl('assets/img/plus.svg'));
  }
  public onCreate(e): void {
    this.createNew.emit(e);
  }

}
