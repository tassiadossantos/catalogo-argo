import { ServiceCard } from './ServiceCard';
import { EmptyState } from '../ui/EmptyState';

export function ServiceGrid({ services }) {
  if (services.length === 0) {
    return (
      <EmptyState
        title="Nenhum serviço encontrado"
        description="Selecione uma categoria diferente."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
