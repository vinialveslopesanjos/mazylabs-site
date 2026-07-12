import type { Metadata } from 'next';
import LegalPage from '../components/legal/LegalPage';

export const metadata: Metadata = {
  title: 'Exclusao de Dados | MazyLabs',
  description: 'Instrucoes para solicitar exclusao de dados pessoais tratados pela MazyLabs, incluindo dados recebidos por WhatsApp.',
  alternates: { canonical: 'https://www.mazylabs.com/exclusao-de-dados' },
};

const sections = [
  {
    title: '1. Como solicitar exclusao',
    body: [
      'Para solicitar a exclusao de dados pessoais tratados pela MazyLabs, envie um email para vinicius.anjos@mazylabs.com com o assunto "Exclusao de dados".',
      'No pedido, informe seu nome, o canal usado para falar conosco e, se o contato foi feito pelo WhatsApp, o numero de telefone utilizado na conversa. Essas informacoes ajudam a localizar os registros corretos.',
    ],
  },
  {
    title: '2. O que podemos excluir',
    body: [
      'Podemos excluir ou anonimizar dados de contato, registros de atendimento, mensagens, arquivos enviados, preferencias e outros dados pessoais associados ao seu relacionamento com a MazyLabs, conforme a legislacao aplicavel.',
      'Quando os dados estiverem em plataformas de terceiros, como WhatsApp Business da Meta, provedores de hospedagem, email ou CRM, a exclusao tambem dependera dos controles e prazos desses servicos.',
    ],
  },
  {
    title: '3. Prazo de atendimento',
    body: [
      'Responderemos as solicitacoes em prazo razoavel e, quando aplicavel, em ate 30 dias. Se precisarmos de informacoes adicionais para confirmar identidade ou localizar dados, entraremos em contato pelo email informado.',
    ],
  },
  {
    title: '4. Limitacoes legais',
    body: [
      'Alguns dados podem ser mantidos quando houver obrigacao legal, necessidade de preservacao de direitos, prevencao a fraudes, seguranca, cumprimento de contrato ou outra base legal permitida. Nesses casos, limitaremos o uso dos dados a finalidade que justificar a retencao.',
    ],
  },
  {
    title: '5. Remocao de acesso em plataformas Meta',
    body: [
      'Se voce conectou, autorizou ou interagiu com algum recurso da MazyLabs em plataformas da Meta, tambem pode gerenciar permissoes diretamente nas configuracoes da sua conta Meta, Facebook, Instagram ou WhatsApp, conforme as opcoes disponibilizadas por essas plataformas.',
      'A solicitacao enviada a MazyLabs cobre os dados sob nosso controle. Dados mantidos pela Meta seguem as politicas e ferramentas proprias da Meta.',
    ],
  },
];

export default function DataDeletionPage() {
  return (
    <LegalPage
      label="Dados"
      title="Exclusao de Dados"
      description="Instrucoes publicas para pedir remocao ou anonimizacao de dados tratados pela MazyLabs."
      updatedAt="02 de junho de 2026"
      sections={sections}
    />
  );
}
