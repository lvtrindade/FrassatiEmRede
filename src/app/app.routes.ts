import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
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
import { BackgroundComponent } from './background/background.component';
import { AdmCalComponent } from './adm-cal/adm-cal.component';
import { AdmAtvComponent } from './adm-atv/adm-atv.component';
import { AuthGuard } from './auth.guard';
import { NovaAtividadeComponent } from './nova-atividade/nova-atividade.component';

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
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },

            {
                path: 'login',
                component: LoginComponent
            },

            {
                path: 'dashboard',
                canActivate: [AuthGuard],
                component: DashboardComponent,
                children: [
                    {
                        path: 'background',
                        component: BackgroundComponent
                    },

                    {
                        path: 'calendario',
                        component: AdmCalComponent
                    },

                    {
                        path: 'atividades',
                        component: AdmAtvComponent,
                    },

                    {
                        path: 'nova-atividade',
                        component: NovaAtividadeComponent
                    },

                    {
                        path: '',
                        redirectTo: 'background',
                        pathMatch: 'full'
                    },
                ]
            }
        ]
    },

    {
        path: '**',
        component: NotFoundComponent
    }
];
