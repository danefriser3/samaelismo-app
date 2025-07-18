import { gql } from "@apollo/client";

export const GET_VERSO = gql`
  query getVerso($codice: String!) {
    versiCommentati(codice: $codice) {
      id
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

export const GET_COMUNICATI_CON_STATO = gql`
  query getComunicatiConStato($user: String!, $tipo: String!) {
    comunicatiConStato(user: $user, tipo: $tipo) {
      testo
      data
      tipo
      letto
    }
  }
`;

// 📄 Tipi TypeScript
export interface Comunicati {
  tipo: string;
  data: string;
  testo: string;
}

export interface ComunicatiResponse {
  comunicati: Comunicati[];
}

export interface ComunicatoConStato extends Comunicati {
  letto: boolean;
}

export interface ComunicatiConStatoResponse {
  comunicatiConStato: ComunicatoConStato[];
}

export interface VoceDiario {
  id: string;
  testo: string;
  created_at: string;
  visibile_a: string[];
  created_by: string;
}

export interface VociDiarioResponse {
  vociDiarioPerUtente: VoceDiario[];
}

export const ADD_COMUNICATO = gql`
  mutation addComunicato($data: String!, $testo: String!, $tipo: String!) {
    creaComunicato(testo: $testo, data: $data, tipo: $tipo) {
      testo
      data
      tipo
    }
  }
`;

export const MARK_COMUNICATO_AS_READ = gql`
  mutation segnaComunicatoLetto($data: String!, $testo: String!, $user: String!) {
    segnaComunicatoLetto(data: $data, testo: $testo, user: $user)
  }
`;


export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      role
      password
      token
      username
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

export const EDIT_USER_MUTATION = gql`
  mutation editUser($token: String!, $currentPassword: String!, $newEmail: String, $newUsername: String, $newPassword: String) {
    updateUser(token: $token, currentPassword: $currentPassword, newEmail: $newEmail, newUsername: $newUsername, newPassword: $newPassword) {
      username
      email
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: String!) {
    cancellaCommento(id: $id)
  }
`;

export const GET_DIARIO_PER_UTENTE = gql`
  query vociDiarioPerUtente($user: String!) {
    vociDiarioPerUtente(user: $user) {
      id
      testo
      created_at
      visibile_a
      created_by
    }
  }
`;

export const CREA_VOCE_DIARIO = gql`
  mutation creaVoceDiario($testo: String!, $visibileA: [String!], $created_by: String!) {
    creaVoceDiario(testo: $testo, visibileA: $visibileA, created_by: $created_by) {
      id
      testo
      created_at
      visibile_a
    }
  }
`;

export const CANCELLA_VOCE_DIARIO = gql`
  mutation cancellaVoceDiario($id: String!) {
    cancellaVoceDiario(id: $id)
  }
`;