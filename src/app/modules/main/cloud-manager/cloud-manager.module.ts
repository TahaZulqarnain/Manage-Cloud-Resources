import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CloudManagerRoutingModule } from './cloud-manager-routing.module';
import { CloudManagerComponent } from './cloud-manager.component';
import { NicComponent } from './nic/nic.component';
import { SubnetComponent } from './subnet/subnet.component';
import { VnetComponent } from './vnet/vnet.component';
import { TagInputComponent } from '../../../shared/components/tag-input/tag-input.component';

@NgModule({
  declarations: [
    CloudManagerComponent,
    NicComponent,
    SubnetComponent,
    VnetComponent,
  ],
  imports: [
    CommonModule,
    CloudManagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputComponent,
  ],
  exports:[
    CloudManagerComponent,  
  ]
})
export class CloudManagerModule { }