import React from "react";

const InfoTable = ({ data, fields }) => {
  const filteredFields = fields.filter((field) => !field.ignore);

  return (
    <div dir="rtl">
      <h2>
        <span className="inline-flex w-full items-center px-3 py-4 rounded font-medium bg-green-100 justify-center border-[1px] border-green-700 text-xl text-center text-green-700">
          {data.title}
        </span>
      </h2>

      <div className="flex flex-col gap-3 max-w-[450px] mt-3">
        <p className="flex flex-row flex-wrap text-wrap items-center gap-3">
          <span className="inline-flex w-full break-words items-center px-3 py-3 rounded border-[1px] border-fuchsia-800 text-base font-medium bg-fuchsia-100 text-fuchsia-800">
            {data.description}
          </span>
        </p>
      </div>

      <table className="table-auto w-full text-sm mt-4">
        <tbody>
          {filteredFields.map((field, index) => (
            <tr key={index}>
              <td className="py-2 px-3 font-medium">{field.label}</td>
              <td className="py-2 px-3">
                {Array.isArray(data[field.key]) ? (
                  <span className="inline-flex items-center flex-wrap gap-1">
                    {data[field.key].map((item, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded text-xs font-medium bg-${field.color}-100 text-${field.color}-800 border border-${field.color}-800`}
                      >
                        {item.value || item}
                      </span>
                    ))}
                  </span>
                ) : (
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-${field.color}-100 text-${field.color}-800 border border-${field.color}-800`}
                  >
                    {data[field.key]}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoTable;
