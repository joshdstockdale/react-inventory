export type TInventory = {
  id: string;
  company: string;
  date: string;
  amount: string;
  status: string;
};

export const EmptyInventory = {
  id: null,
  company: "",
  date: "",
  amount: "",
  status: "",
};

export async function fetchInventory() {
  const apiRes = await fetch(`http://localhost:3000/inventory`);

  if (!apiRes.ok) {
    throw new Error(`inventory fetch not ok`);
  }
  return apiRes.json();
}

export async function fetchInventoryDetail(id: string | undefined) {
  if (!id || id == "new") {
    return null;
  }

  const apiRes = await fetch(`http://localhost:3000/inventory/${id}`);

  if (!apiRes.ok) {
    throw new Error(`inventory/${id} fetch not ok`);
  }
  return apiRes.json();
}

export type TInventoryUpdate = {
  data: Omit<TInventory, "id">;
  id: string | undefined;
};

export async function saveInventoryDetail({ data, id }: TInventoryUpdate) {
  const apiRes =
    !id || id == "new"
      ? await newInventoryDetail(data)
      : await updateInventoryDetail({ data, id });

  if (!apiRes.ok) {
    throw new Error(`inventory update not ok`);
  }
  return apiRes.json();
}

function updateInventoryDetail({ data, id }: TInventoryUpdate) {
  return fetch(`http://localhost:3000/inventory/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

function newInventoryDetail(data: Omit<TInventory, "id">) {
  return fetch(`http://localhost:3000/inventory`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}
