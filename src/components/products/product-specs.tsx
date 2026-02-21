import type { Product } from '@/types/product';

interface ProductSpecsProps {
  specifications: Product['specifications'];
}

export function ProductSpecs({ specifications }: ProductSpecsProps) {
  return (
    <div className="rounded-card border border-neutral-200 overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {Object.entries(specifications).map(([key, value], index) => (
            <tr key={key} className={index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
              <td className="px-4 py-3 font-medium text-brand-secondary capitalize whitespace-nowrap w-1/3">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </td>
              <td className="px-4 py-3 text-neutral-600">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
