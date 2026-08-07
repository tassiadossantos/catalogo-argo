import { describe, it, expect } from 'vitest';
import { categorias, pacotes } from '../data/services';

describe('services.js', () => {
  describe('categorias', () => {
    it('possui exatamente 13 categorias', () => {
      expect(categorias).toHaveLength(13);
    });

    it('todas têm id único', () => {
      const ids = categorias.map((c) => c.id);
      expect(new Set(ids).size).toBe(13);
    });

    it('todas têm titulo', () => {
      categorias.forEach((cat) => {
        expect(cat.titulo).toBeTruthy();
        expect(typeof cat.titulo).toBe('string');
      });
    });

    it('todas têm prioridade de 1 a 13', () => {
      const prioridades = categorias.map((c) => c.prioridade).sort((a, b) => a - b);
      expect(prioridades).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    });

    it('todas têm pelo menos 1 item', () => {
      categorias.forEach((cat) => {
        expect(cat.itens.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('todas têm gancho, subtexto e cta', () => {
      categorias.forEach((cat) => {
        expect(cat.gancho).toBeTruthy();
        expect(cat.subtexto).toBeTruthy();
        expect(cat.cta).toBeTruthy();
      });
    });

    it('trabalhos-academicos tem 13 itens', () => {
      const cat = categorias.find((c) => c.id === 'trabalhos-academicos');
      expect(cat.itens).toHaveLength(13);
    });

    it('curriculos-carreira tem 7 itens', () => {
      const cat = categorias.find((c) => c.id === 'curriculos-carreira');
      expect(cat.itens).toHaveLength(7);
    });

    it('servicos-online-burocraticos tem 16 itens', () => {
      const cat = categorias.find((c) => c.id === 'servicos-online-burocraticos');
      expect(cat.itens).toHaveLength(16);
    });

    it('redacao-digitação-contratos tem 4 itens', () => {
      const cat = categorias.find((c) => c.id === 'redacao-digitação-contratos');
      expect(cat.itens).toHaveLength(4);
    });

    it('impressao-digitalizacao tem 11 itens', () => {
      const cat = categorias.find((c) => c.id === 'impressao-digitalizacao');
      expect(cat.itens).toHaveLength(11);
    });

    it('presenca-digital tem 10 itens', () => {
      const cat = categorias.find((c) => c.id === 'presenca-digital');
      expect(cat.itens).toHaveLength(10);
    });

    it('comerciantes-autonomos tem 22 itens', () => {
      const cat = categorias.find((c) => c.id === 'comerciantes-autonomos');
      expect(cat.itens).toHaveLength(22);
    });

    it('desenvolvimento-web tem 10 itens', () => {
      const cat = categorias.find((c) => c.id === 'desenvolvimento-web');
      expect(cat.itens).toHaveLength(10);
    });

    it('informatica-suporte tem 15 itens', () => {
      const cat = categorias.find((c) => c.id === 'informatica-suporte');
      expect(cat.itens).toHaveLength(15);
    });

    it('personalizacao-impressa tem 22 itens', () => {
      const cat = categorias.find((c) => c.id === 'personalizacao-impressa');
      expect(cat.itens).toHaveLength(22);
    });

    it('festas-personalizados tem 7 itens', () => {
      const cat = categorias.find((c) => c.id === 'festas-personalizados');
      expect(cat.itens).toHaveLength(7);
    });

    it('automacao-solucoes-digitais tem 7 itens', () => {
      const cat = categorias.find((c) => c.id === 'automacao-solucoes-digitais');
      expect(cat.itens).toHaveLength(7);
    });

    it('bottons-personalizados tem 8 itens', () => {
      const cat = categorias.find((c) => c.id === 'bottons-personalizados');
      expect(cat.itens).toHaveLength(8);
    });
  });

  describe('pacotes', () => {
    it('possui exatamente 4 pacotes', () => {
      expect(pacotes).toHaveLength(4);
    });

    it('todos têm id único', () => {
      const ids = pacotes.map((p) => p.id);
      expect(new Set(ids).size).toBe(4);
    });

    it('todos têm titulo, descricao e itens', () => {
      pacotes.forEach((p) => {
        expect(p.titulo).toBeTruthy();
        expect(p.descricao).toBeTruthy();
        expect(Array.isArray(p.itens)).toBe(true);
        expect(p.itens.length).toBeGreaterThan(0);
      });
    });

    it('kit-negocio-completo é destaque', () => {
      const kit = pacotes.find((p) => p.id === 'kit-negocio-completo');
      expect(kit.destaque).toBe(true);
    });

    it('kit-presenca-digital tem 3 itens', () => {
      const kit = pacotes.find((p) => p.id === 'kit-presenca-digital');
      expect(kit.itens).toHaveLength(3);
    });

    it('kit-comercio-local tem 3 itens', () => {
      const kit = pacotes.find((p) => p.id === 'kit-comercio-local');
      expect(kit.itens).toHaveLength(3);
    });

    it('kit-site-express tem 3 itens', () => {
      const kit = pacotes.find((p) => p.id === 'kit-site-express');
      expect(kit.itens).toHaveLength(3);
    });

    it('kit-negocio-completo tem 5 itens', () => {
      const kit = pacotes.find((p) => p.id === 'kit-negocio-completo');
      expect(kit.itens).toHaveLength(5);
    });
  });
});
