import marked from "marked";

const renderer = new marked.Renderer();

let index = 0;
renderer.heading = function(text: string, level: 1 | 2 | 3 | 4 | 5 | 6) {
  return `<h${level} class="my-blog-head" id="my-blog-head${index++}">${text}</h${level}>`;
};

marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: false,
  breaks: true,
  smartLists: true,
  smartypants: true
});

export function markdown(str: string) {
  return marked(str, { renderer: renderer });
}
