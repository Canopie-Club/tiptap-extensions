import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { CommandsChain } from '@tiptap/core'
import NodeViewYoutube from './components/NodeViewYoutube.vue'

export interface YoutubeOptions {
  HTMLAttributes: Record<string, any>,
  width: number,
  height: number,
  responsive: boolean,
  controls: boolean
}

export interface YoutubeAttributes {
  videoId: string,
  src: string,
  width: number,
  height: number,
  responsive: boolean,
  controls: boolean
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    youtube: {
      /**
       * Insert a YouTube video
       */
      setYoutube: (options: { videoId: string, width?: number, height?: number, responsive?: boolean, controls?: boolean }) => ReturnType
    }
  }
}

export const Youtube = Node.create<YoutubeOptions>({
  name: 'youtube',
  
  group: 'block',
  
  atom: true,
  
  addOptions() {
    return {
      HTMLAttributes: {},
      width: 640,
      height: 360,
      responsive: true,
      controls: true
    }
  },
  
  addAttributes() {
    return {
      videoId: {
        default: null,
        parseHTML: element => element.getAttribute('data-video-id'),
        renderHTML: attributes => {
          if (!attributes.videoId) {
            return {}
          }
          
          return {
            'data-video-id': attributes.videoId
          }
        }
      },
      src: {
        default: null,
        parseHTML: element => element.getAttribute('src'),
        renderHTML: attributes => {
          if (!attributes.videoId) {
            return {}
          }
          
          const controlsParam = attributes.controls ? '1' : '0'
          return {
            src: `https://www.youtube.com/embed/${attributes.videoId}?enablejsapi=1&controls=${controlsParam}`
          }
        }
      },
      width: {
        default: this.options.width,
        parseHTML: element => element.getAttribute('width'),
        renderHTML: attributes => {
          if (attributes.responsive) {
            return {}
          }
          
          return {
            width: attributes.width
          }
        }
      },
      height: {
        default: this.options.height,
        parseHTML: element => element.getAttribute('height'),
        renderHTML: attributes => {
          if (attributes.responsive) {
            return {}
          }
          
          return {
            height: attributes.height
          }
        }
      },
      responsive: {
        default: this.options.responsive,
        parseHTML: element => element.getAttribute('data-responsive') === 'true',
        renderHTML: attributes => {
          if (!attributes.responsive) {
            return {}
          }
          
          return {
            'data-responsive': 'true'
          }
        }
      },
      controls: {
        default: this.options.controls,
        parseHTML: element => element.getAttribute('data-controls') !== 'false',
        renderHTML: attributes => {
          return {
            'data-controls': attributes.controls.toString()
          }
        }
      }
    }
  },
  
  parseHTML() {
    return [
      {
        tag: 'div[data-youtube-video]',
      },
    ]
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(
      { 'data-youtube-video': '' },
      this.options.HTMLAttributes,
      HTMLAttributes
    ), [
      'iframe', mergeAttributes(
        {
          frameborder: '0',
          allowfullscreen: 'true',
          allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
        },
        {
          src: HTMLAttributes.src,
          width: HTMLAttributes.width,
          height: HTMLAttributes.height,
        }
      )
    ]]
  },
  
  addNodeView() {
    return VueNodeViewRenderer(NodeViewYoutube)
  },
  
  addCommands() {
    return {
      setYoutube: (options) => ({ tr, dispatch, chain }) => {
        const { videoId, width = this.options.width, height = this.options.height, responsive = this.options.responsive, controls = this.options.controls } = options
        
        if (!videoId) {
          return false
        }
        
        const attributes = {
          videoId, 
          src: `https://www.youtube.com/embed/${videoId}?enablejsapi=1&controls=${controls ? '1' : '0'}`,
          width,
          height,
          responsive,
          controls
        }
        
        return chain()
          .insertContent({
            type: this.name,
            attrs: attributes
          })
          .run()
      }
    }
  }
})