import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CloudManagerComponent } from './cloud-manager.component';
import { NicComponent } from './nic/nic.component';
import { VnetComponent } from './vnet/vnet.component';
import { SubnetComponent } from './subnet/subnet.component';

const routes: Routes = [
  { path: '', component: CloudManagerComponent, // default route when /dashboard is hit // default route when /dashboard is hit
   children: [
      { path: 'nic', component: NicComponent },
      { path: 'vnet', component: VnetComponent },
      { path: 'subnet', component: SubnetComponent },    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloudManagerRoutingModule { }
