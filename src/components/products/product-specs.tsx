import type { Product } from '@/types/product';

interface ProductSpecsProps {
  specifications: Product['specifications'];
}

export function ProductSpecs({ specifications }: ProductSpecsProps) {
  return (
    <div className="rounded-card border border-neutral-200 overflow-hidden overflow-x-auto">
      <table className="w-full text-sm min-w-0">
        <tbody>
          {Object.entries(specifications).map(([key, value], index) => (
            <tr key={key} className={index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
              <td className="px-3 sm:px-4 py-3 font-medium text-brand-secondary capitalize w-1/3 text-xs sm:text-sm">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </td>
              <td className="px-3 sm:px-4 py-3 text-neutral-600 text-xs sm:text-sm break-words">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
