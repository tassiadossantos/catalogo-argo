import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CategoryFilter } from '../components/catalog/CategoryFilter';

describe('CategoryFilter', () => {
  it('renderiza botão "Todos"', () => {
    render(<CategoryFilter activeCategory="todos" onCategoryChange={() => {}} />);
    expect(screen.getByRole('button', { name: /todos/i })).toBeInTheDocument();
  });

  it('renderiza 12 botões no total (1 todos + 11 categorias)', () => {
    render(<CategoryFilter activeCategory="todos" onCategoryChange={() => {}} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(12);
  });

  it('chama onCategoryChange ao clicar na primeira categoria', () => {
    const onChange = vi.fn();
    render(<CategoryFilter activeCategory="todos" onCategoryChange={onChange} />);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);
    expect(onChange).toHaveBeenCalledWith('comerciantes-autonomos');
  });

  it('chama onCategoryChange com "todos" ao clicar em Todos', () => {
    const onChange = vi.fn();
    render(<CategoryFilter activeCategory="comerciantes-autonomos" onCategoryChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /todos/i }));
    expect(onChange).toHaveBeenCalledWith('todos');
  });

  it('destaca categoria ativa com bg-primary', () => {
    render(<CategoryFilter activeCategory="comerciantes-autonomos" onCategoryChange={() => {}} />);
    const buttons = screen.getAllByRole('button');
    const activeBtn = buttons[1];
    expect(activeBtn.className).toContain('bg-primary');
  });
});
