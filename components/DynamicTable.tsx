
import React from 'react';

// FIX: Export the Column interface to be used in other components.
export interface Column {
  header: string;
  accessor: string;
  type?: 'text' | 'select' | 'date';
  options?: string[];
  width?: string;
}

interface DynamicTableProps {
  title: string;
  data: any[];
  columns: Column[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: string, value: any) => void;
}

export const DynamicTable: React.FC<DynamicTableProps> = ({ title, data, columns, onAdd, onRemove, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-medium text-gray-800">{title}</h3>
        <button type="button" onClick={onAdd} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md transition-colors text-base">
          Add Row
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 striped-table">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(col => (
                <th key={col.accessor} style={{ width: col.width }} className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">{col.header}</th>
              ))}
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={row.id} className="hover:bg-gray-100 transition-colors">
                {columns.map(col => (
                  <td key={col.accessor} className="px-2 py-2 whitespace-nowrap">
                    {col.type === 'select' ? ( // Increased padding and text size
                       <select value={row[col.accessor]} onChange={(e) => onChange(rowIndex, col.accessor, e.target.value)} className="block w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md text-base text-gray-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white">
                         <option value="">Select...</option> 
                         {col.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)} 
                       </select> 
                    ) : (
                      <input  // Increased padding and text size
                        type={col.type || 'text'} 
                        value={row[col.accessor]} 
                        onChange={(e) => onChange(rowIndex, col.accessor, e.target.value)}
                        className="block w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md text-base text-gray-900 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      />
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap">
                  <button type="button" onClick={() => onRemove(rowIndex)} className="text-red-600 hover:text-red-900 font-medium">Remove</button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-6 text-base text-gray-500">No data added.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
