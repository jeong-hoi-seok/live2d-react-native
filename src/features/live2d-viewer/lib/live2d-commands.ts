export type Live2dMotionCommand = {
  type: "motion";
  group: string;
  index?: number;
};

export type Live2dExpressionCommand = {
  type: "expression";
  name: string;
};

export type Live2dGreetCommand = {
  type: "greet";
};

export type Live2dCommand = Live2dMotionCommand | Live2dExpressionCommand | Live2dGreetCommand;
