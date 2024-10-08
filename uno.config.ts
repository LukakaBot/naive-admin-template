import { defineConfig } from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  // ...UnoCSS options
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  shortcuts: {
    'base-container': 'flex flex-col mx-10px mb-10px px-3 py-2 h-[calc(100%-20px)] bg-#fff border-rd-1',
    // 'title-tag': 'flex items-center before:content-[""] before:inline-block before:mr-5px before:my-10px before:pr-5px before:h-1rem before:bg-blue-500 before:border-rd-4px text-16px font-400',
    'tag-before-title':
      'before:content-[""] before:inline-block before:mr-10px before-w-5px before:h-1rem before:bg-blue-500 before:rounded flex items-center my-10px text-20px font-600',
  },
})