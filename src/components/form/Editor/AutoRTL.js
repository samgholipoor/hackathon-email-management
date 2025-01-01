import getTextDirection from "@/utils/getTextDirection";

function getTextFromNode(node) {
  if (node.isEmpty) return "";
  if (node.is("$text")) return node.data;
  return Array.from(node.getChildren())
    .map((child) => getTextFromNode(child))
    .reduce((result, current) => result + current, "");
}

function AutoRTL(editor) {
  let lastDirection = "right";
  editor.conversion.for("downcast").add(function (dispatcher) {
    dispatcher.on("insert:$text", function (event, data, conversionApi) {
      const fullText = getTextFromNode(data.item.parent);

      const viewElement = conversionApi.mapper.toViewElement(data.item.parent);
      if (!viewElement.parent) return;

      const direction = getTextDirection(fullText) || lastDirection;

      lastDirection = direction;

      conversionApi.writer.setStyle(
        {
          "text-align": direction === "right" ? "right" : "left",
          width: "100%",
        },
        viewElement
      );
      conversionApi.writer.setAttribute("dir", "auto", viewElement);
    });
  });
}

export default AutoRTL;
