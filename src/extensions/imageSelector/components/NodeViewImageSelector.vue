<template>
    <node-view-wrapper class="image-selector-node-view">
        <div
            class="image-selector-container"
            :class="{ 'has-image': !!node.attrs.src }"
        >
            <div
                v-if="!node.attrs.src"
                class="image-placeholder"
                @click="selectImage"
            >
                <div class="placeholder-icon">
                    <Icon icon="radix-icons:image" width="30" height="30" />
                </div>
                <div class="placeholder-text">Click to select an image</div>
            </div>
            <div v-else class="image-container">
                <img :src="node.attrs.src" :alt="node.attrs.alt || ''" />
                <div class="image-controls">
                    <button
                        class="control-button edit"
                        @click="selectImage"
                        title="Change image"
                    >
                        <Icon
                            icon="radix-icons:pencil-1"
                            width="16"
                            height="16"
                        />
                    </button>
                    <button
                        class="control-button remove"
                        @click="removeImage"
                        title="Remove image"
                    >
                        <Icon icon="radix-icons:trash" width="16" height="16" />
                    </button>
                </div>
            </div>
        </div>
    </node-view-wrapper>
</template>

<script setup lang="ts">
import { NodeViewWrapper } from "@tiptap/vue-3";
import { Editor } from "@tiptap/core";
import { Icon } from "@iconify/vue";
import type { ImageSelectorOptions } from "../extension";

const props = defineProps({
    editor: {
        type: Object as () => Editor,
        required: true,
    },
    node: {
        type: Object,
        required: true,
    },
    updateAttributes: {
        type: Function,
        required: true,
    },
    extension: {
        type: Object,
        required: true,
    },
});

const selectImage = async () => {
    const onSelectImage = props.extension.options.onSelectImage;

    if (typeof onSelectImage === "function") {
        try {
            const imageSrc = await onSelectImage(
                props.editor,
                props.node.attrs,
            );

            if (imageSrc) {
                props.updateAttributes({
                    src: imageSrc,
                });
            }
        } catch (error) {
            console.error("Failed to select image:", error);
        }
    } else {
        console.warn(
            "No image selection function provided to ImageSelector extension",
        );
    }
};

const removeImage = () => {
    props.updateAttributes({
        src: null,
        alt: null,
        title: null,
    });
};
</script>

<style lang="scss" scoped>
.image-selector-node-view {
    @apply relative my-4;

    .image-selector-container {
        @apply relative w-full min-h-[120px] rounded-lg overflow-hidden;

        .image-placeholder {
            @apply bg-gray-100 flex flex-col items-center justify-center w-full h-full min-h-[200px] cursor-pointer transition-colors duration-200;

            &:hover {
                @apply bg-gray-200;
            }

            .placeholder-icon {
                @apply text-gray-500 mb-4;
            }

            .placeholder-text {
                @apply text-gray-500 text-sm;
            }
        }

        .image-container {
            @apply relative w-full;

            img {
                @apply block w-full h-auto object-contain;
            }

            .image-controls {
                @apply absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity duration-200;

                .control-button {
                    @apply flex items-center justify-center w-8 h-8 bg-white/90 border-none rounded text-gray-500 cursor-pointer transition-colors duration-200;

                    &:hover {
                        @apply bg-white;
                    }

                    &.edit:hover {
                        @apply text-blue-500;
                    }

                    &.remove:hover {
                        @apply text-red-500;
                    }
                }
            }

            &:hover {
                .image-controls {
                    @apply opacity-100;
                }
            }
        }
    }
}
</style>
