export class Contato{
 private _id!: string;
 private _nome!: string;
 private _regiao!: string;
 private _comentario!: string;
 private _genero!: number;
 private _downloadURL : any;

 constructor(nome : string, regiao: string){
  this._nome = nome;
  this._regiao = regiao;
 }

 public get id(): string {
  return this._id;
}
public set id(value: string) {
  this._id = value;
}


 public get nome() : string{
  return this._nome;
 }

 public set nome(nome: string){
  this._nome = nome;
 }

 public get regiao() : string{
  return this._regiao;
 }

 public set regiao(_value: string){
  this._regiao = this.regiao;
 }

 public get comentario() : string{
  return this._comentario;
 }

 public set comentario(comentario: string){
  this._nome = comentario;
 }

public get genero(): number {
  return this._genero;
}
public set genero(value: number) {
  this._genero = value;
}

public get downloadURL() : any{
  return this._downloadURL;
}

public set downloadURL(value: any){
  this._downloadURL = value;
}


}
