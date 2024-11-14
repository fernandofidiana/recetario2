import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, FormsModule,ReactiveFormsModule, Validators } from '@angular/forms';
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<any>();

  fb = inject(FormBuilder);  //injecta la librería que permite crear formularios
  recipeForm!:FormGroup;  //donde almacenemos el puntero al formulario
  fire = inject(FireService);

  constructor(){
    this.recipeForm=this.fb.group({
      strMeal: new FormControl('',[Validators.required,Validators.minLength(3)]),
      strInstructions: new FormControl(''),
    });
  }

  closeModal() {
    history.back();
  }
  // Escucha cambios en el historial del navegador
  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    this.onClose.emit("Me cierro");
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  async createRecipe(){
    if(this.recipeForm.invalid)
      return;

    try{
      let recipe = await this.fire.createRecipe(this.recipeForm.value);
      this.recipeForm.reset();
      this.closeModal();
    }catch(err){
      alert("Error al crear la receta: "+err);
    }
  }

}
