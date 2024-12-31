import { useEffect, useState, useMemo } from "react";
import { mergeClassNames } from "@/utils/classname";

const cache = new Map();

const downloadAndPrepareIcon = (url) => {
  if (cache.has(url)) {
    const cached = cache.get(url);
    if (cached instanceof Promise) {
      return cached;
    }
    return Promise.resolve(cached);
  }
  const downloader = fetch(url)
    .then((res) => res.text())
    .then((svgContent) => {
      const svg = new DOMParser().parseFromString(
        svgContent,
        "text/xml"
      ).documentElement;
      svg.setAttribute("fill", "currentColor");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      cache.set(url, svg.outerHTML);
      if (svg.querySelector("parsererror")) {
        // svg content is not correct
        return Promise.reject();
      }
      return svg.outerHTML;
    })
    .catch(() => {
      cache.delete(url);
      return Promise.resolve(
        '<span style="display:inline-block;width:100%;height:100%;border-radius:50%;border:dashed 1px currentColor;"></div>'
      );
    });
  cache.set(url, downloader);
  return downloader;
};

export default function Icon({ name, className, onClick, ...props }) {
  const [iconContent, setIconContent] = useState("");
  const fileUrl = useMemo(() => `/assets/icons/${name}.svg`, [name]);
  useEffect(() => {
    downloadAndPrepareIcon(fileUrl).then(setIconContent);
  }, [fileUrl]);

  return (
    <span
      className={mergeClassNames("inline-block", className)}
      dangerouslySetInnerHTML={{ __html: iconContent }}
      onClick={onClick}
      {...props}
    />
  );
}
