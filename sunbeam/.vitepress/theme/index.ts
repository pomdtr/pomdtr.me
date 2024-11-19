import DefaultTheme from 'vitepress/theme.js'
import { Theme } from 'vitepress/types/index.js'
// @ts-ignore
import Layout from './Layout.vue'


export default {
    extends: DefaultTheme,
    Layout,
} as Theme
