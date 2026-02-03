import TextResult from "./text-result";

export default function ConsoleResults({ item }: { item: { type: string; value: any } }) {
  const eachConsoleLineToRender = (item: any): any => {
    if (!item || typeof item !== 'object' || !item.type) return String(item);

    switch (item.type) {
      case "string":
        return <TextResult value={item.value} colorClass="text-neutral-500" />;

      case "number":
        return <TextResult value={item.value} colorClass="text-purple-300" />;

      case "boolean":
        return <TextResult value={String(item.value)} colorClass="text-purple-300" />;

      case "bigint":
        return <TextResult value={item.value} colorClass="text-teal-300" />;

      case "symbol":
        return <TextResult value={item.value} colorClass="text-yellow-300" />;

      case "undefined":
        return <TextResult value="undefined" colorClass="text-gray-500" />;

      case "null":
        return <TextResult value="null" colorClass="text-gray-500" />;

      case "nan":
        return <TextResult value="NaN" colorClass="text-blue-300" />;

      case "infinity":
        return <TextResult value={item.value} colorClass="text-blue-300" />;

      case "function":
        return <TextResult value="[Function]" colorClass="text-green-300" />;

      case "date":
        return <TextResult value={item.value} colorClass="text-pink-300" />;

      case "regexp":
        return <TextResult value={item.value} colorClass="text-orange-300" />;

      case "promise":
        return <TextResult value={item.value} colorClass="text-indigo-300" />;

      case "class-instance":
        return <TextResult value={item.value} colorClass="text-cyan-300" />;

      case "error":
        return <TextResult value={`Error: ${item.value}`} colorClass="text-red-400" />;

      case "array":
        return (
          <TextResult colorClass="text-white">
            {"["}
            {item.value.map((v: any, i: number) => (
              <span key={i}>
                {i > 0 && ", "}
                {eachConsoleLineToRender(v)}
              </span>
            ))}
            {"]"}
          </TextResult>
        );

      case "typedarray":
        return (
          <TextResult colorClass="text-lime-300">
            {"["}
            {item.value.map((v: any, i: number) => (
              <span key={i}>
                {i > 0 && ", "}
                {eachConsoleLineToRender(v)}
              </span>
            ))}
            {"]"}
          </TextResult>
        );

      case "set":
        return (
          <TextResult colorClass="text-sky-300">
            {"Set { "}
            {item.value.map((v: any, i: number) => (
              <span key={i}>
                {i > 0 && ", "}
                {eachConsoleLineToRender(v)}
              </span>
            ))}
            {" }"}
          </TextResult>
        );

      case "map":
        return (
          <TextResult colorClass="text-emerald-300">
            {"Map { "}
            {item.value.map(([k, v]: any, i: number) => (
              <span key={i}>
                {i > 0 && ", "}
                {eachConsoleLineToRender(k)} {"=>"} {eachConsoleLineToRender(v)}
              </span>
            ))}
            {" }"}
          </TextResult>
        );

      case "object":
        const entries = Object.entries(item.value);
        if (entries.length === 0) return <TextResult colorClass="text-white">{"{}"}</TextResult>;

        return (
          <TextResult colorClass="text-white">
            {"{ "}
            {entries.map(([key, val], i) => (
              <span key={i}>
                {i > 0 && ", "}
                <span style={{ wordBreak: 'break-all' }} className="text-purple-200">{key}</span>
                {": "}
                {eachConsoleLineToRender(val)}
              </span>
            ))}
            {" }"}
          </TextResult>
        );

      default:
        return <span>{String(item.value)}</span>;
    }
  };

  return <>{eachConsoleLineToRender(item)}</>;
}