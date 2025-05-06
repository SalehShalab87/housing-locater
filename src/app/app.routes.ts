import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {path:'Home',component:HomeComponent},
    {path:'',redirectTo:'Home',pathMatch:'full'},
    {path:'details/:id',component:DetailsComponent},
    {path:'not-found',component:NotFoundComponent},
    {path:'**',redirectTo:'not-found',pathMatch:'full'}
];
