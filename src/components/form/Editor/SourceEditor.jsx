import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import { Essentials } from "@ckeditor/ckeditor5-essentials";
import { Autoformat } from "@ckeditor/ckeditor5-autoformat";
import { HtmlEmbed } from "@ckeditor/ckeditor5-html-embed";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
} from "@ckeditor/ckeditor5-basic-styles";
import { Heading } from "@ckeditor/ckeditor5-heading";
import { Link } from "@ckeditor/ckeditor5-link";
import { List } from "@ckeditor/ckeditor5-list";
// import { Paragraph } from "@ckeditor/ckeditor5-paragraph";
import { PasteFromOffice } from "@ckeditor/ckeditor5-paste-from-office";
import { Mention } from "@ckeditor/ckeditor5-mention";
import { Font } from "@ckeditor/ckeditor5-font";
import { Image } from "@ckeditor/ckeditor5-image";
import {
  ImageInsert,
  ImageResize,
  ImageToolbar,
  ImageStyle,
  ImageBlock,
} from "@ckeditor/ckeditor5-image";
import { BlockQuote } from "@ckeditor/ckeditor5-block-quote";
import AutoRTL from "./AutoRTL";

export default class SourceEditor extends ClassicEditorBase {
  static builtinPlugins = [
    HtmlEmbed,
    BlockQuote,
    Essentials,
    Heading,
    Font,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Link,
    List,
    // Paragraph,
    Autoformat,
    PasteFromOffice,
    Mention,
    Image,
    ImageBlock,
    ImageStyle,
    ImageResize,
    ImageInsert,
    ImageToolbar,
    AutoRTL,
  ];

  static defaultConfig = {
    fontColor: {
      documentColors: 0,
    },
    fontBackgroundColor: {
      documentColors: 0,
    },
    image: {
      toolbar: [
        {
          name: "imageStyle:align",
          items: ["imageStyle:alignLeft", "imageStyle:alignRight"],
          defaultItem: "imageStyle:alignLeft",
        },
        {
          name: "imageStyle:alignBlock",
          items: [
            "imageStyle:alignBlockLeft",
            "imageStyle:alignCenter",
            "imageStyle:alignBlockRight",
          ],
          defaultItem: "imageStyle:alignBlockLeft",
        },
      ],
    },
    allowedContent: true,
    blockElements: {
      div: true,
      p: true,
      span: true,
    },
    htmlEmbed: {
      showPreviews: true,
    },
    data: {
      processor: {
        toView: (data) => {
          return data;
        },
        toModel: (viewFragment) => {
          return viewFragment;
        },
      },
    },
    toolbar: {
      items: [
        "htmlEmbed",
        "heading",
        "blockQuote",
        "|",
        "fontFamily",
        "fontSize",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "bulletedList",
        "numberedList",
        "|",
        "link",
        "insertImage",
      ],
    },
  };
}
