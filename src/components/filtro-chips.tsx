import { Button } from '@/components/ui'

export type OpcaoFiltro = {
  id: string
  rotulo: string
  contagem?: number
}

type FiltroChipsProps = {
  rotulo: string
  rotuloTodas: string
  opcoes: OpcaoFiltro[]
  ativa?: string
  onChange: (id?: string) => void
}

type ChipProps = {
  ativo: boolean
  rotulo: string
  contagem?: number
  onClick: () => void
}

const Chip = ({ ativo, rotulo, contagem, onClick }: ChipProps) => (
  <Button
    size="sm"
    variant={ativo ? 'default' : 'outline'}
    aria-pressed={ativo}
    onClick={onClick}
    className="shrink-0 rounded-full"
  >
    {rotulo}
    {contagem !== undefined && <span className="font-normal opacity-70">{contagem}</span>}
  </Button>
)

export const FiltroChips = ({ rotulo, rotuloTodas, opcoes, ativa, onChange }: FiltroChipsProps) => (
  <div
    role="group"
    aria-label={rotulo}
    className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 md:-mx-6 md:px-6"
  >
    <Chip ativo={!ativa} rotulo={rotuloTodas} onClick={() => onChange(undefined)} />
    {opcoes.map(({ id, rotulo: nome, contagem }) => (
      <Chip
        key={id}
        ativo={id === ativa}
        rotulo={nome}
        contagem={contagem}
        onClick={() => onChange(id === ativa ? undefined : id)}
      />
    ))}
  </div>
)
