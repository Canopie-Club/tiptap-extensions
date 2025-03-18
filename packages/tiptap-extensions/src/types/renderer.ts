import { JSONContent } from "@tiptap/core";
import { Component } from "vue";

export interface JSONRenderer {
  type: string;
  component: Component;
}

export interface RendererOptions {
  renderers: JSONRenderer[];
}