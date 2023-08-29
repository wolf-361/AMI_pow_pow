import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HostComponent } from './components/pages/host/host.component';
import { HomeComponent } from './components/pages/home/home.component';
import { JoinGameComponent } from './components/pages/join-game/join-game.component';
import { GameComponent } from './components/pages/game/game.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'host', component: HostComponent },
  { path: 'join-game', component: JoinGameComponent},
  { path: 'game/:gameCode', component: GameComponent },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
