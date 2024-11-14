import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Recipe } from '../../model/recipe';
import { FireService } from '../../services/fire.service';
import { FormModalComponent } from '../../modal/form-modal/form-modal.component';

@Component({
  selector: 'app-list-recipes',
  standalone: true,
  imports: [NgClass,FormModalComponent],
  templateUrl: './list-recipes.component.html',
  styleUrl: './list-recipes.component.css'
})
export class ListRecipesComponent {
  api = inject(ApiService);
  router = inject(Router);
  fire = inject(FireService);

  @Input()
  type:string='';

  @Input()
  subtype:string='';

  isModalOpen:boolean=false;

  $state:WritableSignal<any> = signal({
    loading:false,
    error:false,
    data:[]
  });

  ngOnInit(){
    //Al inicio del componente
    this.fetchData();
  }

  fetchData(){
    //llamar al servicio
    this.$state.update(state => (
      { ...state, loading: true }
    ));

    let request;
    console.log("Fetching data");
    //cuando accedo a /recipes/favorites this.type = undefined
    switch(this.type){
      case 'category':
        request = this.api.getRecipesByCategory(this.subtype);
        break;
      case 'nationality':
        request = this.api.getRecipesByNationality(this.subtype);
        break;
      case undefined:
        request = this.fire.getRecipes();
        break;
      default:   
        request = null;
    }

    if(request){
      //subscribo al observable
      (request as any).subscribe({
        next: (data:any) => {
          console.log(data);
          this.$state.update(state => (
            { ...state, loading: false, error: false, data: data }
          ));
        },
        error: (err:any) => {
          this.$state.update(state => (
            { ...state, loading: false, error: err, data: [] }
          ));
        }
      })
    }else{
      //error
      this.$state.update(state => (
        { ...state, loading: false, error: 'Categoría incorrecta' }
      ));
    }

  }

  goToRecipe(idMeal:string){
    //navega recipe/:id
    this.router.navigate(['recipe', idMeal]);
    //this.router.navigateByUrl(`recipe/${idMeal}`);
  }

  openModal(){
    this.isModalOpen=true;
    history.pushState({},document.title);
  }
  closeModal($event?:any){
    if($event){
      //podemos hacer algo...
      console.log("Desde el componente que abre el modal"+$event);
    }
    this.isModalOpen=false;
  }

}
