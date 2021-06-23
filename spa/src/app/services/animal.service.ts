import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Animal } from './../interfaces/animal'

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private api = 'http://localhost:3000/api'
  constructor(
    private http: HttpClient
  ) { }

  getAnimales(){
    const path = `${this.api}/all`;
    return this.http.get<Animal[]>(path);
  }

  getAnimal(id: string){
    const path = `${this.api}/all/${id}`;
    return this.http.get<Animal>(path);
  }

  createAnimal(animal: Animal){
    var nuevo = {
      nombre: animal.nombre,
      descripcion: animal.descripcion
    }
    const path = `${this.api}/add`;
    return this.http.post<Animal>(path, animal);
  }

  updateAnimal(animal: Animal){
    const path = `${this.api}/update/${animal.id}`;
    return this.http.put<Animal>(path, animal);
  }

  deleteAnimal(id: number){
    const path = `${this.api}/delete/${id}`;
    return this.http.delete(path);
  }
}
