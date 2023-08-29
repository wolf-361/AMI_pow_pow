import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Socket.io
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment as env } from '../environments/environment';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

// Forms
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FooterComponent } from './components/layout/footer/footer.component';

import { HomeComponent } from './components/pages/home/home.component';
import { HostComponent } from './components/pages/host/host.component';
import { PlayerComponent } from './components/pages/player/player.component';
import { JoinGameComponent } from './components/pages/join-game/join-game.component';
import { GameComponent } from './components/pages/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    HostComponent,
    PlayerComponent,
    JoinGameComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
