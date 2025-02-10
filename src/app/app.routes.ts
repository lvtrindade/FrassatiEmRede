import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import path from 'path';
import { HistoriaComponent } from './historia/historia.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { EscotismoComponent } from './escotismo/escotismo.component';
import { ComoChegarComponent } from './como-chegar/como-chegar.component';
import { FaleConoscoComponent } from './fale-conosco/fale-conosco.component';
import { BlogComponent } from './blog/blog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
    },

    {
        path: 'inicio',
        component: InicioComponent
    },

    {
        path: 'grupo',
        children: [
            {
                path: 'historia',
                component: HistoriaComponent
            },

            {
                path: 'escotismo',
                component: EscotismoComponent
            },

            {
                path: 'documentos',
                component: DocumentosComponent
            }
        ]
    },

    {
        path: 'calendario',
        component: CalendarioComponent
    },

    {
        path: 'como-chegar',
        component: ComoChegarComponent
    },

    {
        path: 'fale-conosco',
        component: FaleConoscoComponent
    },

    {
        path: 'blog',
        component: BlogComponent
    },

    {
        path: 'admin',
        children: [
            {
                path: 'login',
                component: LoginComponent
            },

            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    },

    {
        path: 'admin',
        redirectTo: 'admin/login',
        pathMatch: 'full',
    },

    {
        path: '**',
        component: NotFoundComponent
    }
];
