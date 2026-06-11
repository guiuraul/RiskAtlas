export type ImportActionState =
  | {
      status: "idle";
      message: "";
    }
  | {
      status: "success" | "error";
      message: string;
    };

export const initialImportActionState: ImportActionState = {
  status: "idle",
  message: "",
};

