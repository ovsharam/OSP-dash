
interface SidebarFiltersProps {
    onFilterChange: (filters: any) => void;
    vendors: string[];
}

export default function SidebarFilters({ onFilterChange, vendors }: SidebarFiltersProps) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Vendors</h3>
                <div className="space-y-3">
                    {vendors.map((vendor) => (
                        <div key={vendor} className="flex items-center">
                            <input
                                id={`vendor-${vendor}`}
                                name="vendor[]"
                                defaultValue={vendor}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                onChange={() => onFilterChange({ vendor: vendor })}
                            />
                            <label
                                htmlFor={`vendor-${vendor}`}
                                className="ml-3 text-sm text-gray-600"
                            >
                                {vendor}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
