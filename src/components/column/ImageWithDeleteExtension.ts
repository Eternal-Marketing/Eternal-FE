import TiptapImage from '@tiptap/extension-image';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ImageWithDelete from './ImageWithDelete';

export const ImageWithDeleteExtension = TiptapImage.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ImageWithDelete);
  },
}).configure({ inline: false, allowBase64: false });
