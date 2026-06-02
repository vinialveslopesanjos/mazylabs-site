import type { Metadata } from 'next';
import LegalPage from '../components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Politica de Privacidade | MazyLabs',
  description: 'Como a MazyLabs coleta, usa, armazena e protege dados pessoais em seus canais digitais e atendimento via WhatsApp.',
  alternates: { canonical: 'https://mazylabs.com/politica-de-privacidade' },
};

const sections = [
  {
    title: '1. Quem somos',
    body: [
      'A MazyLabs desenvolve automacoes, integracoes, solucoes de dados e sistemas sob medida para empresas. Esta Politica de Privacidade explica como tratamos dados pessoais quando uma pessoa acessa nosso site, entra em contato conosco ou conversa com nossos canais digitais, incluindo WhatsApp.',
      'Para duvidas sobre privacidade, fale com a MazyLabs pelo email vinicius.anjos@mazylabs.com.',
    ],
  },
  {
    title: '2. Dados que podemos tratar',
    body: [
      'Podemos tratar dados fornecidos diretamente por voce, como nome, email, telefone, empresa, cargo, mensagens enviadas, arquivos anexados, preferencias de contato e informacoes necessarias para entender uma solicitacao comercial ou de suporte.',
      'Quando o contato acontece pelo WhatsApp, tambem podemos receber numero de telefone, nome de perfil, conteudo das mensagens, midias enviadas, status de entrega/leitura e metadados tecnicos disponibilizados pela plataforma WhatsApp Business da Meta.',
    ],
  },
  {
    title: '3. Como usamos os dados',
    body: [
      'Usamos dados pessoais para responder contatos, prestar atendimento, entender necessidades de negocio, preparar propostas, executar projetos contratados, operar automacoes, melhorar nossos servicos e cumprir obrigacoes legais, contratuais e de seguranca.',
      'Tambem podemos usar dados de conversas para manter historico de atendimento, evitar retrabalho, encaminhar demandas internamente e monitorar a qualidade dos fluxos automatizados.',
    ],
  },
  {
    title: '4. Compartilhamento',
    body: [
      'Podemos compartilhar dados com provedores necessarios para operar nossos servicos, como plataformas de hospedagem, email, CRM, automacao, analise, armazenamento e a plataforma WhatsApp Business da Meta. Esses provedores devem tratar os dados de acordo com suas proprias politicas e com obrigacoes aplicaveis de seguranca e privacidade.',
      'Nao vendemos dados pessoais. Podemos compartilhar informacoes quando exigido por lei, ordem de autoridade competente ou para proteger direitos da MazyLabs, de clientes e de terceiros.',
    ],
  },
  {
    title: '5. Retencao e seguranca',
    body: [
      'Mantemos dados pessoais pelo tempo necessario para cumprir as finalidades descritas nesta politica, prestar servicos, preservar registros comerciais, resolver disputas e cumprir obrigacoes legais. Quando os dados deixam de ser necessarios, eles sao excluidos ou anonimizados de forma razoavel.',
      'Adotamos medidas tecnicas e administrativas para proteger dados pessoais contra acesso nao autorizado, perda, alteracao, divulgacao indevida ou destruicao. Nenhum sistema, porem, e totalmente imune a riscos.',
    ],
  },
  {
    title: '6. Direitos do titular',
    body: [
      'Voce pode solicitar acesso, correcao, atualizacao, portabilidade, anonimizacao, oposicao ao tratamento ou exclusao de seus dados pessoais, conforme a legislacao aplicavel. Para exercer seus direitos, envie uma solicitacao para vinicius.anjos@mazylabs.com.',
      'Para pedidos relacionados a conversas pelo WhatsApp, inclua o numero de telefone usado no contato para que possamos localizar os registros relevantes.',
    ],
  },
  {
    title: '7. Atualizacoes desta politica',
    body: [
      'Podemos atualizar esta Politica de Privacidade para refletir mudancas legais, tecnicas ou operacionais. A versao mais recente ficara disponivel nesta pagina, com a data de atualizacao indicada no topo.',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      label="Privacidade"
      title="Politica de Privacidade"
      description="Tratamos dados com foco em atendimento, automacao e execucao de projetos, sem venda de informacoes pessoais."
      updatedAt="02 de junho de 2026"
      sections={sections}
    />
  );
}
