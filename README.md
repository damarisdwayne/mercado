# Mercado

PWA da lista de mercado da casa. Cada item pode avisar sozinho quando é hora de comprar de novo (ex.: legumes, 5 dias depois da última compra).

```bash
yarn
yarn dev   # http://localhost:3002
```

Copie `.env.example` para `.env.local` e preencha as chaves do Firebase (o mesmo projeto do `minhas-coisas`).

## Sem login

Não há login. A lista fica em `/mercados/{codigo}/itens` no Firestore e o código vai no link (`/?lista=...`). Quem tem o link vê e edita a lista; o botão de pessoas no topo mostra o link e deixa entrar em outra lista.

As regras do Firestore precisam liberar esse caminho:

```
match /mercados/{codigo}/itens/{item} {
  allow read, write: if true;
}
```
