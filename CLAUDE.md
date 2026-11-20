# CLAUDE.md

**mercado** é um PWA da lista de mercado da casa, sem login. A base (design system, tema, Firebase) veio do projeto `minhas-coisas` e usa o mesmo projeto Firebase (`VITE_FIREBASE_*` em `.env.local`).

## Comandos

Sempre `yarn` (yarn@1.22.22), Node da `.nvmrc`.

| Tarefa | Comando |
| --- | --- |
| Dev server (porta 3002) | `yarn dev` |
| Build | `yarn build` |
| Typecheck | `yarn typecheck` |
| Lint | `yarn lint` / `yarn lint:fix` |

Não há testes. Valide com `yarn typecheck` e `yarn lint`.

## Estrutura

```
src/
  pages/mercado/   # página, components/, serviço Firestore, tipos e regras
  components/      # ui/ (design system) e peças genéricas
  hooks/ lib/ store/
```

## Dados

Firestore em `/mercados/{codigo}/itens`. O código da lista é gerado no primeiro acesso, fica no `localStorage` e na URL (`?lista=`); é ele que compartilha a lista entre aparelhos (`codigo-lista.ts`). As regras do Firestore liberam esse caminho sem autenticação, então não guarde nada sensível nele.

Um item precisa ser comprado quando está `naLista` ou quando passaram `avisarAposDias` desde `ultimaCompra` (`situacao.ts`).

## Convenções

- Arrow functions sempre; sem comentários no código.
- Use os componentes de `src/components/ui` em vez de HTML cru; componentes pequenos, um por arquivo, arquivos até ~200 linhas.
- Nomes de domínio em português.
