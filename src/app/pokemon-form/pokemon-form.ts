import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-form',
  imports: [ReactiveFormsModule],
  styleUrl: './pokemon-form.css',
  templateUrl: './pokemon-form.html',
})
export class PokemonForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  protected pokemonService = inject(Pokemon);

  protected pokemonForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    level: [1, [Validators.required, Validators.min(1)]],
    nature: ['', Validators.required],
  });

  ngOnInit() {
    this.pokemonService.fetchPokemon();
  }

  protected onSubmit() {
    if (this.pokemonForm.invalid) {
      this.pokemonForm.markAllAsTouched(); // shows validation errors
      return;
    }

    this.pokemonService.savePokemon(this.pokemonForm.getRawValue()).subscribe({
      next: () => {
        this.pokemonService.fetchPokemon();
        this.pokemonForm.reset(); // nonNullable: resets to initial values, level back to 1
      },
    });
  }
}