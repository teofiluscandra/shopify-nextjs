export default function ProductOption({
  name,
  values,
  selectedOptions,
  setOptions,
}) {
  return (
    <fieldset className="mt-2">
      <legend className="text-lg font-semibold">{name}</legend>
      <div className="inline-flex flex-wrap items-center">
        {values.map((item) => {
          const id = `option-${name}-${item}`;
          const checked = selectedOptions[name] === item;

          return (
            <label key={id} htmlFor={id}>
              <input
                className="sr-only"
                type="radio"
                id={id}
                name={`option-${name}`}
                value={item}
                checked={checked}
                onChange={() => {
                  setOptions(name, item);
                }}
              />
              <div
                className={`p-2 mt-2 text-lg rounded-full block cursor-pointer mr-3 ${
                  checked
                    ? "text-white bg-gray-900"
                    : "text-gray-900 bg-gray-200"
                }`}
              >
                <span className="px-2">{item}</span>
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
