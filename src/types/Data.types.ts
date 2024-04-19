export type DataEntryTag = {
  name: string;
  value: string;
};

export type DataEntry = {
  id: number;
  formId: number;
  date: string;
  tags: { [key: string]: string };
  value: number;
  note?: string;
};

export type DataState = {
  dataEntries: DataEntry[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
};

export type DataProps = {
  dataEntries: DataEntry[] | null;
};
