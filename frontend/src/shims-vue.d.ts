declare module '*.vue' {
    import { defineComponent } from 'vue';

    const component: ReturnType<typeof defineComponent>;
    export default component;
}

declare module '@ckeditor/ckeditor5-vue'