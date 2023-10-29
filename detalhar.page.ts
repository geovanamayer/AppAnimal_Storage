import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from 'src/app/model/entities/Contato';
import { FirebaseService } from 'src/app/model/services/firebase.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  nome: string = '';
  regiao: string = 'undefined';
  comentario: string = '';
  genero: number = 0;
  imagem: any = null;
  contato!: Contato;
  edicao: boolean = true;

  constructor(
    private firebase: FirebaseService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.contato = history.state.contato;
    this.nome = this.contato.nome;
    this.regiao = this.contato.regiao;
    this.comentario = this.contato.comentario;
    this.genero = this.contato.genero;
  }

  habilitar() {
    this.edicao = !this.edicao;
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  editar() {
    if (this.nome && this.regiao) {
      let novo: Contato = new Contato(this.nome, this.regiao);
      novo.genero = this.genero;

      novo.id = this.contato.id;
      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, novo)?.then(() => {
          this.router.navigate(['/home']);
        });
      } else {
        novo.downloadURL = this.contato.downloadURL;
        this.firebase
          .editar(novo, this.contato.id)
          .then(() => {
            this.router.navigate(['/home']);
          })
          .catch((error) => {
            console.log(error);
            this.presentAlert('Erro', 'Erro ao Atualizar Contato!');
          });
      }
    } else {
      this.presentAlert('Erro', 'Nome e E-mail são campos obrigatórios!');
    }
  }

  excluir() {
    this.presentConfirmAlert('ATENÇÃO', 'Deseja realmente excluir o contato?');
  }

  excluirContato() {
    this.firebase
      .excluir(this.contato.id)
      .then(() => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log(error);
        this.presentAlert('Erro', 'Erro ao Excluir Contato!');
      });
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async presentConfirmAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: [
        { text: 'Cancelar', role: 'cancel', handler: () => console.log('cancelou') },
        { text: 'Confirmar', role: 'confirm', handler: (acao) => this.excluirContato() },
      ],
    });
    await alert.present();
  }
}
