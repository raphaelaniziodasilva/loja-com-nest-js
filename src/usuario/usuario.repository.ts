/* eslint-disable prettier/prettier */
// No momento não vamos nos preocupar com banco de dados BD
// vamos salvar os dados, usuarios que forem cadastrado em uma lista de usaurios 

import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.Entity";

// Um provider no nestjs e basicamente qualquer classe que esteja decorada com o decorator @Injectable() 
// vamos transformar a classe UsuarioRepository em um provider para o nestjs
@Injectable()

export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = []; // lista
  
  // guardando usuarios na lista
  async salvar(usuario: UsuarioEntity) {
    // salvando usuario
    this.usuarios.push(usuario);
    // visualizando os usuario no cadastrado no terminal
    // console.log(this.usuarios)

    // no controler de usuario precisamos criar o repositiorio de usuario e usar o metodo salvar
  }

  // listando usuarios
  async listar() {
    return this.usuarios;
    // no usuario controler use o metodo listar
  }

  // metodo que busca o usuario por email e verificando se o email ja foi criado
  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      usuario => usuario.email == email
    );
    return possivelUsuario !== undefined;

    // o metodo find ele vai executar e vai comparar o email que estamos informando com o email de todos os usuarios dentro do array de usuarios, se ele não encontrar ele vai devolver o valor undefined 

    // agora volte para o arquivo email-eh-unico.validator.ts e use o metodo existeComEmail
  }

  // aqui vamos receber um objeto Partial compativel com a nossa entidade 
  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
    // procurando o usuario que agente quer atualizar pelo id
    const possivelUsuario = this.usuarios.find(
      usuarioSalvo => usuarioSalvo.id === id
    );

    // verificando se o usuario existe
    if(!possivelUsuario) {
      throw new Error("Usuário não existe");
    }

    // como estamos recebendo dados Partial não podemos fazer uma atribuição direta
    Object.entries(dadosDeAtualizacao).forEach(([chave, valor]) => {
      if(chave === "id") {
        return;
      }
      possivelUsuario[chave] = valor;
    });

    return possivelUsuario;

    // no usuario controller use o metodo atualizar 
  }
}
