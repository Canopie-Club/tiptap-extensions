import { type JSONContent } from '@tiptap/core';
import { defineComponent, h, defineAsyncComponent } from 'vue';

const renderComponents: Record<string, any> = {
  fancyBorder: defineAsyncComponent(
    () => import('./components/RenderFancyBorder.vue'),
  ),
};

export function renderComponent(content: JSONContent) {
  const component = renderComponents[content.type || ''];
  if (component) {
    return h(component, { content });
  } else {
    return h('div', {
      innerHTML: content.text,
    });
  }
}