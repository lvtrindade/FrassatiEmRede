import { Routes } from '@angular/router';
import { InicioComponent } from './features/common/components/inicio/inicio.component';
import { HistoriaComponent } from './features/common/components/historia/historia.component';
import { CalendarioComponent } from './features/common/components/calendario/calendario.component';
import { DocumentosComponent } from './features/common/components/documentos/documentos.component';
import { EscotismoComponent } from './features/common/components/escotismo/escotismo.component';
import { ComoChegarComponent } from './features/common/components/como-chegar/como-chegar.component';
import { FaleConoscoComponent } from './features/common/components/fale-conosco/fale-conosco.component';
import { BlogComponent } from './features/common/components/blog/blog.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { LoginComponent } from './features/admin/components/login/login.component';
import { DashboardComponent } from './features/admin/components/dashboard/dashboard.component';
import { BackgroundComponent } from './features/admin/components/background/background.component';
import { AdmCalComponent } from './features/admin/components/adm-cal/adm-cal.component';
import { AdmAtvComponent } from './features/admin/components/adm-atv/adm-atv.component';
import { AuthGuard } from './core/guard/auth.guard';
import { NovaAtividadeComponent } from './features/admin/components/nova-atividade/nova-atividade.component';

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
