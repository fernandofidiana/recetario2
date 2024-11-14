import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { Auth } from '@angular/fire/auth';
import { authenticatedGuard } from './guards/authenticated.guard';

export const routes: Routes = [
    { path:'landing', component:LandingComponent},
    { path:'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
    {   path: 'home/:type', 
        canMatch:[authenticatedGuard],
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) 
    },
    { path: 'home', redirectTo: '/home/category', pathMatch: 'full' },
    { path: 'recipes/:type/:subtype', loadComponent: () => import('./pages/list-recipes/list-recipes.component').then(m => m.ListRecipesComponent) },
    { path: 'recipes/favorites', 
         loadComponent: () => import('./pages/list-recipes/list-recipes.component')
         .then(m => m.ListRecipesComponent) },
    { path: 'recipe/:id', loadComponent: () => import('./pages/view-recipe/view-recipe.component').then(m => m.ViewRecipeComponent) },
    { path: '', redirectTo: '/landing', pathMatch: 'full' },
    { path: '**', component: ErrorPageComponent }
];
