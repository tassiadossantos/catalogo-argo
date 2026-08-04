import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SectionTitle } from '../components/ui/SectionTitle';
import { EmptyState } from '../components/ui/EmptyState';

describe('Button', () => {
  it('renderiza com texto', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument();
  });

  it('aplica variante primary por padrão', () => {
    render(<Button>Teste</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-primary');
  });

  it('aplica variante secondary', () => {
    render(<Button variant="secondary">Teste</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-white/5');
  });

  it('aplica variante whatsapp', () => {
    render(<Button variant="whatsapp">Teste</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-primary');
  });

  it('desabilita quando disabled', () => {
    render(<Button disabled>Teste</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

describe('Badge', () => {
  it('renderiza com texto', () => {
    render(<Badge>Nova</Badge>);
    expect(screen.getByText('Nova')).toBeInTheDocument();
  });

  it('aplica variante primary por padrão', () => {
    render(<Badge>Teste</Badge>);
    const badge = screen.getByText('Teste');
    expect(badge.className).toContain('bg-primary/10');
  });
});

describe('SectionTitle', () => {
  it('renderiza titulo', () => {
    render(<SectionTitle title="Meu Título" />);
    expect(screen.getByRole('heading', { name: /meu título/i })).toBeInTheDocument();
  });

  it('renderiza subtitle quando fornecido', () => {
    render(<SectionTitle title="Título" subtitle="Descrição" />);
    expect(screen.getByText('Descrição')).toBeInTheDocument();
  });

  it('renderiza highlight quando fornecido', () => {
    render(<SectionTitle title="Título" highlight="Destaque" />);
    expect(screen.getByText('Destaque')).toBeInTheDocument();
  });
});

describe('EmptyState', () => {
  it('renderiza titulo e descrição', () => {
    render(<EmptyState title="Nada encontrado" description="Tente outra busca" />);
    expect(screen.getByText('Nada encontrado')).toBeInTheDocument();
    expect(screen.getByText('Tente outra busca')).toBeInTheDocument();
  });
});
