export const discover = async () => {
  const response = await fetch("/api/freebox/discover", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === 200) return await response.json();
  throw await response.json();
};

export const connect = async (f) => {
  const response = await fetch("/api/freebox", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(f),
  });
  if (response.status === 201) return await response.json();
  throw await response.json();
};

export const loadConfiguration = async () => {
  return JSON.parse(localStorage.getItem("config") || "{}");
};

export const saveConfiguration = async (configs) => {
  localStorage.setItem("config", JSON.stringify(configs));
};
