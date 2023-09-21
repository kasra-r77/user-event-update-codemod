import { defineCodemod } from "@codemod/cli";

export default defineCodemod(({ types: t }) => {
  return {
    name: "user-event-v14",
    visitor: {
      CallExpression(callExpressionPath) {
        const calleeName = callExpressionPath.node.callee.name;
        if (calleeName !== "it") {
          return;
        }

        const argsPath = callExpressionPath.get("arguments");
        const secondArg = argsPath[1];
        if (!t.isArrowFunctionExpression(secondArg)) {
          return;
        }

        const arrowFunction = secondArg;
        arrowFunction.traverse({
          CallExpression(innerCallExpressionPath) {
            const { callee, arguments: args } = innerCallExpressionPath.node;
            const isUserEventCall =
              t.isMemberExpression(callee) &&
              t.isIdentifier(callee.object, { name: "userEvent" });

            const isNotAwaited = !t.isAwaitExpression(
              innerCallExpressionPath.parent
            );
            if (isUserEventCall && isNotAwaited) {
              innerCallExpressionPath.replaceWith(
                t.awaitExpression(t.callExpression(callee, args))
              );
              arrowFunction.node.async = true;
            }
          },
        });
      },
    },
  };
});
