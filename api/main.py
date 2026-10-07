from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import json


app = FastAPI()


# Pasta onde estão os arquivos de áudio
app.mount(
    "/audios",
    StaticFiles(directory="audios"),
    name="audios"
)


# Pasta onde estão as capas das músicas
app.mount(
    "/capas",
    StaticFiles(directory="capas"),
    name="capas"
)


def carregar_musicas():

    with open(
        "data.json",
        "r",
        encoding="utf-8"
    ) as arquivo:

        dados = json.load(arquivo)

    return dados["musicas"]


def guardar_musicas(musicas):

    with open(
        "data.json",
        "w",
        encoding="utf-8"
    ) as arquivo:

        json.dump(
            {"musicas": musicas},
            arquivo,
            ensure_ascii=False,
            indent=2
        )


@app.get("/")
def inicio():

    return {
        "mensagem": "API do MusicCr funcionando!"
    }


@app.get("/musicas")
def listar_musicas():

    return carregar_musicas()


@app.get("/musicas/{musica_id}")
def buscar_musica(
    musica_id: str
):

    musicas = carregar_musicas()

    for musica in musicas:

        if str(musica["id"]) == str(musica_id):

            return musica

    return {
        "erro": "Música não encontrada"
    }


@app.post("/musicas")
def adicionar_musica(
    musica: dict
):

    musicas = carregar_musicas()

    novo_id = 1

    if musicas:

        ids = [
            int(musica["id"])
            for musica in musicas
        ]

        novo_id = max(ids) + 1

    nova_musica = {

        "id": str(novo_id),

        "title": musica.get(
            "title",
            ""
        ),

        "artist": musica.get(
            "artist",
            ""
        ),

        "album": musica.get(
            "album",
            ""
        ),

        "cover": musica.get(
            "cover",
            ""
        ),

        "audio": musica.get(
            "audio",
            ""
        )
    }

    musicas.append(nova_musica)

    guardar_musicas(musicas)

    return {

        "mensagem":
            "Música adicionada com sucesso!",

        "musica":
            nova_musica
    }


@app.put("/musicas/{musica_id}")
def editar_musica(
    musica_id: str,
    dados_novos: dict
):

    musicas = carregar_musicas()

    for musica in musicas:

        if str(musica["id"]) == str(musica_id):

            musica["title"] = dados_novos.get(
                "title",
                musica["title"]
            )

            musica["artist"] = dados_novos.get(
                "artist",
                musica["artist"]
            )

            musica["album"] = dados_novos.get(
                "album",
                musica["album"]
            )

            musica["cover"] = dados_novos.get(
                "cover",
                musica["cover"]
            )

            musica["audio"] = dados_novos.get(
                "audio",
                musica["audio"]
            )

            guardar_musicas(musicas)

            return {

                "mensagem":
                    "Música editada com sucesso!",

                "musica":
                    musica
            }

    return {
        "erro": "Música não encontrada"
    }


@app.delete("/musicas/{musica_id}")
def apagar_musica(
    musica_id: str
):

    musicas = carregar_musicas()

    for musica in musicas:

        if str(musica["id"]) == str(musica_id):

            musicas.remove(musica)

            guardar_musicas(musicas)

            return {

                "mensagem":
                    "Música apagada com sucesso!"
            }

    return {
        "erro": "Música não encontrada"
    }