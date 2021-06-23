import { Component } from '@angular/core';
import { AnimalService } from './services/animal.service'
import { Animal } from './models/animal'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit(): void{
    this.getAnimales();
    this.getanimal();
  }

  title = 'spa';

  animales: Animal[];

  animalselecionado: Animal = new Animal;

  constructor(
    private animalService: AnimalService
  ){}

  getAnimales(){
    this.animalService.getAnimales().subscribe(animales => {
      this.animales = animales;
    });
  }

  getanimal(){
    this.animalService.getAnimal('2').subscribe(animal => {
      console.log(animal);
    });
  }

  createanimal(animal: Animal){
    this.animalService.createAnimal(animal).subscribe(nuevoanimal => {
      return nuevoanimal;
    });
  }

  updateAnimal(animal: Animal){
    this.animalService.updateAnimal(animal).subscribe(animales => {
      console.log(animales);
    });
  }

  deleteAnimal(id: number){
    this.animalService.deleteAnimal(id).subscribe( data => {
      console.log(data);
    });
  }

  addOrEdit(){
    if (this.animalselecionado.id === 0) {
      const animal: Animal = {
        id: this.animalselecionado.id,
        nombre: this.animalselecionado.nombre,
        descripcion: this.animalselecionado.descripcion
      }
      this.createanimal(animal);
      this.animales.push(this.animalselecionado);
    }
    const animal: Animal = {
      id: this.animalselecionado.id,
      nombre: this.animalselecionado.nombre,
      descripcion: this.animalselecionado.descripcion
    }
    this.updateAnimal(animal);
    this.animalselecionado = new Animal();
  }

  open(animal: Animal){
    this.animalselecionado = animal;
  }

  eliminar(){
    if (confirm("Estas seguro de eliminar al animal??")) {
      this.animales = this.animales.filter(x => x != this.animalselecionado);
      this.deleteAnimal(this.animalselecionado.id);
      this.animalselecionado = new Animal();
    }
  }

}
