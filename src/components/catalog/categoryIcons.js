import * as LucideIcons from 'lucide-react';

const serviceIcons = {
  'Cardápio digital': LucideIcons.BookOpen,
  'Catálogo digital': LucideIcons.Library,
  'Identidade visual': LucideIcons.Palette,
  'Criação de logotipos': LucideIcons.Diamond,
  'Cartões de visita': LucideIcons.CreditCard,
  'Panfletos': LucideIcons.FileSpreadsheet,
  'Materiais promocionais': LucideIcons.Megaphone,
  'Conteúdo para redes sociais': LucideIcons.MessageSquare,
  'Posts para redes sociais': LucideIcons.Image,
  'Stories para redes sociais': LucideIcons.Play,
  'Criação de legendas': LucideIcons.Quote,
  'Artes personalizadas': LucideIcons.Paintbrush,

  'Etiquetas': LucideIcons.Tag,
  'Tags': LucideIcons.Tag,
  'Cartões de agradecimento': LucideIcons.Heart,
  'Adesivos para embalagens': LucideIcons.Package,
  'Tabelas de preços': LucideIcons.Table,
  'Cardápios impressos': LucideIcons.BookOpen,
  'QR Codes': LucideIcons.QrCode,
  'Catálogos impressos': LucideIcons.Book,
  'Artes para divulgação': LucideIcons.Megaphone,
  'Kits para pequenos negócios': LucideIcons.Package,
  'Reposição mensal de materiais': LucideIcons.RefreshCw,

  'Google Meu Negócio': LucideIcons.MapPin,
  'WhatsApp Business': LucideIcons.MessageCircle,
  'Instagram Comercial': LucideIcons.Camera,
  'Link de Bio': LucideIcons.Link,
  'QR Code personalizado': LucideIcons.QrCode,

  'Convites digitais': LucideIcons.Mail,
  'Convites impressos': LucideIcons.MailOpen,
  'Tags para lembrancinhas': LucideIcons.Gift,
  'Rótulos personalizados': LucideIcons.Tag,
  'Plaquinhas decorativas': LucideIcons.PanelTop,
  'Mini kits de festa': LucideIcons.Gift,
  'Itens para mesa': LucideIcons.Coffee,
  'Kits impressos para festas': LucideIcons.Package,
  'Bottons personalizados': LucideIcons.Award,

  'Calculadora de orçamento': LucideIcons.Calculator,
  'Geração de PDF de orçamento': LucideIcons.FileText,
  'Geração de etiquetas e tags': LucideIcons.Tag,
  'Controle de estoque': LucideIcons.Box,
  'Organização de arquivos': LucideIcons.FolderOpen,
  'Validação de QR Codes': LucideIcons.ScanLine,
  'Gestão de pedidos': LucideIcons.ClipboardList,
  'Catálogos com QR Code': LucideIcons.QrCode,
  'Páginas digitais': LucideIcons.Monitor,

  'Landing pages': LucideIcons.Layout,
  'Sites institucionais': LucideIcons.Globe,
  'Formulários online': LucideIcons.FileInput,
  'Soluções web personalizadas': LucideIcons.Code,

  'TCC': LucideIcons.GraduationCap,
  'Artigo científico': LucideIcons.Award,
  'Projeto de pesquisa': LucideIcons.Search,
  'Relatórios': LucideIcons.BarChart3,
  'Pesquisa acadêmica': LucideIcons.Microscope,
  'Redação acadêmica': LucideIcons.PenTool,
  'Formatação ABNT': LucideIcons.AlignLeft,
  'Revisão ortográfica': LucideIcons.Type,
  'Referências bibliográficas': LucideIcons.BookMarked,

  'Impressão P&B': LucideIcons.Printer,
  'Impressão colorida': LucideIcons.Printer,
  'Xerox': LucideIcons.Copy,
  'Digitalização (scanner)': LucideIcons.ScanLine,
  'PDF para Word': LucideIcons.FileDown,
  'Word para PDF': LucideIcons.FileUp,
  'Encadernação': LucideIcons.BookOpen,
  'Plastificação': LucideIcons.Shield,

  'Currículo profissional': LucideIcons.FileText,
  'Carta de apresentação': LucideIcons.Send,
  'Perfil para LinkedIn': LucideIcons.UserCheck,
  'Cadastro em vagas': LucideIcons.Briefcase,

  'Gov.br': LucideIcons.ShieldCheck,
  'Emissão de DAS MEI': LucideIcons.Receipt,
  'Certidões': LucideIcons.FileCheck,
  'Segunda via de contas': LucideIcons.FileWarning,
  'Inscrição em concursos': LucideIcons.ClipboardCheck,
  'Inscrição em vestibulares': LucideIcons.GraduationCap,

  'Formatação de PCs': LucideIcons.Monitor,
  'Instalação de programas': LucideIcons.Download,
  'Backup de arquivos': LucideIcons.HardDrive,
  'Configuração de impressoras': LucideIcons.Printer,
  'Organização digital': LucideIcons.FolderOpen,
  'Suporte presencial': LucideIcons.Headphones,
  'Suporte remoto': LucideIcons.Wifi
};

const fallbackIcons = {
  'comerciantes-autonomos': LucideIcons.Store,
  'personalizacao-impressa': LucideIcons.Tag,
  'presenca-digital': LucideIcons.Smartphone,
  'festas-personalizados': LucideIcons.Gift,
  'automacao-solucoes-digitais': LucideIcons.Bot,
  'desenvolvimento-web': LucideIcons.Globe,
  'trabalhos-academicos': LucideIcons.BookOpen,
  'impressao-digitalizacao': LucideIcons.Printer,
  'curriculos-carreira': LucideIcons.FileText,
  'servicos-online-burocraticos': LucideIcons.FileCheck,
  'informatica-suporte': LucideIcons.Wrench
};

export function getServiceIcon(serviceName) {
  return serviceIcons[serviceName] || LucideIcons.HelpCircle;
}

export function getCategoryIcon(categoryId) {
  return fallbackIcons[categoryId] || LucideIcons.HelpCircle;
}
