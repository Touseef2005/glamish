export default function CheckboxInput({ label, name, checked, onChange }) {
    return (
        <div className="flex items-center mt-6">
            <input
                id={name}
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                className="w-5 h-5 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={name} className="ml-2 text-sm font-medium">{label}</label>
        </div>
    );
}