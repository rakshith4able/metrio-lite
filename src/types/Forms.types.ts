export type Tag = {
  name: string;
  choices: string[];
};

export type FormData = {
  id: number;
  name: string;
  dataCount: number;
  tags: Tag[];
};

export type FormsState = {
  forms: FormData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
};

export type CreateFormInput = Omit<FormData, "dataCount">;

export type FormId = number;
