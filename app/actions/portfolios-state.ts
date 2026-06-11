export type PortfolioActionState =
  | {
      status: "idle";
      message: "";
    }
  | {
      status: "success" | "error";
      message: string;
      fieldErrors?: {
        name?: string[];
        criteria?: string[];
      };
    };

export const initialPortfolioActionState: PortfolioActionState = {
  status: "idle",
  message: "",
};

