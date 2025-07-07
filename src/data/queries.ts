import { gql } from "@apollo/client";

export const GET_VERSO = gql`
  query getVerso($codice: String!) {
    versiCommentati(codice: $codice) {
      codice
      commento
      data
      data_commento
      user
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($data: String!, $data_commento: String!, $codice: String!, $commento: String!, $user: String!) {
    commentaVerso(data: $data, data_commento: $data_commento, codice: $codice, commento: $commento, user: $user) {
      codice
      commento
      data
      data_commento
      user
    }
  }
`;


export const GET_COMUNICATI = gql`
  query getComunicati($tipo: String!) {
    comunicati(tipo: $tipo) {
      testo
      data
      tipo
    }
  }
`;


export const ADD_COMUNICATO = gql`
  mutation addComunicato($data: String!, $testo: String!, $tipo: String!) {
    creaComunicato(testo: $testo, data: $data, tipo: $tipo) {
      testo
      data
      tipo
    }
  }
`;


export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      role
      password
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      email
      password
    }
  }
`;