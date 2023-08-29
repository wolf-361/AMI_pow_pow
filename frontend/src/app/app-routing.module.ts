import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HostComponent } from './components/pages/host/host.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PlayerComponent } from './components/pages/player/player.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'host', component: HostComponent },
  { path: 'player', component: PlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
