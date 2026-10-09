
from pathlib import Path
import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


app = FastAPI(title="MusicCr API")

# Permite pedidos do site e da aplicação
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Caminhos absolutos das pastas e do ficheiro JSON
BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data.json"
AUDIOS_DIR = BASE_DIR / "audios"
CAPAS_DIR = BASE_DIR / "capas"

# Ficheiros públicos de áudio e imagens
app.mount(
    "/audios",
    StaticFiles(directory=str(AUDIOS_DIR)),
    name="audios",
)

app.mount(
    "/capas",
    StaticFiles(directory=str(CAPAS_DIR)),
    name="capas",
)


def carregar_musicas():
    with open(DATA_FILE, "r", encoding="utf-8") as arquivo:
        dados = json.load(arquivo)

    return dados["musicas"]


def guardar_musicas(musicas):
    with open(DATA_FILE, "w", encoding="utf-8") as arquivo:
        json.dump(
            {"musicas": musicas},
            arquivo,
            ensure_ascii=False,
            indent=2,
        )


@app.get("/")
def inicio():
    return {"mensagem": "API do MusicCr funcionando!"}


@app.get("/musicas")
def listar_musicas():
    return carregar_musicas()


@app.get("/musicas/{musica_id}")
def buscar_musica(musica_id: str):
    for musica in carregar_musicas():
        if str(musica["id"]) == str(musica_id):
            return musica

    raise HTTPException(
        status_code=404,
        detail="Música não encontrada",
    )


@app.post("/musicas")
def adicionar_musica(musica: dict):
    musicas = carregar_musicas()

    ids = [int(item["id"]) for item in musicas]
    novo_id = max(ids, default=0) + 1

    nova_musica = {
        "id": str(novo_id),
        "title": musica.get("title", ""),
        "artist": musica.get("artist", ""),
        "album": musica.get("album", ""),
        "cover": musica.get("cover", ""),
        "audio": musica.get("audio", ""),
    }

    musicas.append(nova_musica)
    guardar_musicas(musicas)

    return {
        "mensagem": "Música adicionada com sucesso!",
        "musica": nova_musica,
    }


@app.put("/musicas/{musica_id}")
def editar_musica(musica_id: str, dados_novos: dict):
    musicas = carregar_musicas()

    for musica in musicas:
        if str(musica["id"]) == str(musica_id):
            for campo in (
                "title",
                "artist",
                "album",
                "cover",
                "audio",
            ):
                if campo in dados_novos:
                    musica[campo] = dados_novos[campo]

            guardar_musicas(musicas)

            return {
                "mensagem": "Música editada com sucesso!",
                "musica": musica,
            }

    raise HTTPException(
        status_code=404,
        detail="Música não encontrada",
    )


@app.delete("/musicas/{musica_id}")
def apagar_musica(musica_id: str):
    musicas = carregar_musicas()

    for musica in musicas:
        if str(musica["id"]) == str(musica_id):
            musicas.remove(musica)
            guardar_musicas(musicas)

            return {
                "mensagem": "Música apagada com sucesso!",
            }

    raise HTTPException(
        status_code=404,
        detail="Música não encontrada",
    )
