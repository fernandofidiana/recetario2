import { Component, computed, inject, input, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule, JsonPipe } from '@angular/common';
@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [JsonPipe, CommonModule],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent {
  apiS = inject(ApiService);

  /*
   @Input()
   id: string | undefined;
  */
  id = input.required<string>();

  $state: WritableSignal<any> = signal({
    data: null,
    loading: true,
    error: null
  })

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.$state.update(state => {
      return { ...state, loading: true }
    });
    let request = this.apiS.getRecipeById(this.id());
    request?.subscribe({
      next: (data: any) => {
        this.$state.update(state => {
          return { ...state, loading: false, data: data }
        });
      },
      error: (error: any) => {
        console.error(error)
        this.$state.update(state => {
          return { ...state, loading: false, data: [], error: error }
        });
        
      }
    })
  }
}
