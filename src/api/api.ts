import { Music } from '../types/Music';

const API_URL = 'http://10.138.226.211:8000';

export async function buscarMusicas() {
  const resposta = await fetch(
    `${API_URL}/musicas`
  );

  if (!resposta.ok) {
    throw new Error(
      'Erro ao buscar músicas'
    );
  }

  return await resposta.json();
}

export async function adicionarMusica(
  musica: Omit<Music, 'id'>
) {
  const resposta = await fetch(
    `${API_URL}/musicas`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(musica),
    }
  );

  if (!resposta.ok) {
    throw new Error(
      'Erro ao adicionar música'
    );
  }

  return await resposta.json();
}

export async function editarMusica(
  id: string,
  musica: Partial<Music>
) {
  const resposta = await fetch(
    `${API_URL}/musicas/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(musica),
    }
  );

  if (!resposta.ok) {
    throw new Error(
      'Erro ao editar música'
    );
  }

  return await resposta.json();
}

export async function apagarMusica(
  id: string
) {
  const resposta = await fetch(
    `${API_URL}/musicas/${id}`,
    {
      method: 'DELETE',
    }
  );

  if (!resposta.ok) {
    throw new Error(
      'Erro ao apagar música'
    );
  }

  return await resposta.json();
}