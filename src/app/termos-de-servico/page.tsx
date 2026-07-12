import type { Metadata } from 'next';
import LegalPage from '../components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Termos de Servico | MazyLabs',
  description: 'Condicoes gerais de uso dos canais digitais, atendimento e servicos prestados pela MazyLabs.',
  alternates: { canonical: 'https://www.mazylabs.com/termos-de-servico' },
};

const sections = [
  {
    title: '1. Aceitacao',
    body: [
      'Estes Termos de Servico regulam o uso do site, canais digitais, atendimento via WhatsApp e servicos prestados pela MazyLabs. Ao acessar nossos canais ou contratar nossos servicos, voce concorda com estes termos e com a nossa Politica de Privacidade.',
    ],
  },
  {
    title: '2. Nossos servicos',
    body: [
      'A MazyLabs presta servicos de automacao, integracao de sistemas, solucoes de dados, desenvolvimento sob medida, atendimento assistido e consultoria tecnica. Escopo, prazos, entregaveis, valores e responsabilidades especificas sao definidos em proposta, contrato, ordem de servico ou comunicacao comercial aceita pelas partes.',
      'Informacoes apresentadas no site e em conversas iniciais nao constituem garantia de resultado especifico sem um acordo formal de escopo.',
    ],
  },
  {
    title: '3. Atendimento automatizado e WhatsApp',
    body: [
      'Podemos usar automacoes e agentes digitais para responder mensagens, coletar informacoes iniciais, encaminhar solicitacoes e apoiar o atendimento. Esses recursos nao substituem analise tecnica, comercial, juridica, contabil ou estrategica quando ela for necessaria.',
      'Ao interagir com a MazyLabs pelo WhatsApp, voce declara que tem autorizacao para compartilhar as informacoes enviadas e entende que o canal pode registrar historico de mensagens para continuidade do atendimento.',
    ],
  },
  {
    title: '4. Responsabilidades do usuario',
    body: [
      'Voce deve fornecer informacoes verdadeiras, nao enviar conteudo ilegal, ofensivo, confidencial de terceiros sem autorizacao, codigos maliciosos, spam ou materiais que violem direitos de propriedade intelectual, privacidade ou seguranca.',
      'Voce e responsavel por manter seus proprios acessos, ambientes, sistemas e credenciais seguros, salvo quando houver obrigacao especifica da MazyLabs definida em contrato.',
    ],
  },
  {
    title: '5. Propriedade intelectual',
    body: [
      'Marcas, textos, layouts, codigos, metodos, materiais, documentos e conteudos da MazyLabs pertencem a MazyLabs ou a seus licenciantes, salvo disposicao contratual em contrario.',
      'Direitos sobre entregaveis desenvolvidos para clientes serao tratados no respectivo contrato ou proposta aceita.',
    ],
  },
  {
    title: '6. Limitacoes',
    body: [
      'A MazyLabs busca manter seus canais disponiveis e seguros, mas nao garante funcionamento ininterrupto, livre de erros ou compativel com todos os ambientes. Podemos atualizar, suspender ou alterar canais digitais quando necessario.',
      'Na maxima extensao permitida pela lei, a responsabilidade da MazyLabs sera limitada aos termos do contrato aplicavel ou, na ausencia dele, aos danos diretos comprovados relacionados ao servico prestado.',
    ],
  },
  {
    title: '7. Contato',
    body: [
      'Para duvidas sobre estes termos, solicitacoes comerciais ou suporte, entre em contato pelo email vinicius.anjos@mazylabs.com.',
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalPage
      label="Termos"
      title="Termos de Servico"
      description="Regras gerais para uso dos canais digitais da MazyLabs e contratacao dos nossos servicos."
      updatedAt="02 de junho de 2026"
      sections={sections}
    />
  );
}
