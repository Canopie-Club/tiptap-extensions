import type { JSONContent } from "@tiptap/core";
import type { Component, RendererElement, RendererNode } from "vue";

export type RenderFunction = (content: JSONContent) => VueNode | string;

export type VueNode = globalThis.VNode<
  RendererNode,
  RendererElement,
  {
    [key: string]: any;
  }
>;

export type RenderMap = Record<string, Component>;
