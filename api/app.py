from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="MusicCr API")


# Permite que o React Native faça pedidos à API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def inicio():
    return {
        "mensagem": "API do MusicCr funcionando!"
    }


@app.get("/api/teste")
def teste():
    return {
        "status": "ok",
        "mensagem": "A API está funcionando corretamente.",
    }
