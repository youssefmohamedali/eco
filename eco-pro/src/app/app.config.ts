import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { headersInterceptor } from './core/interceptors/header/header.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes , withHashLocation()), provideClientHydration(withEventReplay())
    , provideHttpClient(withFetch() , withInterceptors([headersInterceptor , loadingInterceptor]) )
    ,provideAnimations(),provideToastr() , importProvidersFrom(NgxSpinnerModule)

  ]

};
