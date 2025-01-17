export default defineAppConfig({
    ui: {
        primary: 'violet',
        gray: 'slate',
        input: {
            default: {
                color: 'gray',
            }
        },
        select: {
            default: {
                color: 'gray',
            }
        },
        modal: {
            background: 'bg-slate-50 dark:bg-slate-700',
            overlay: {
                background: 'bg-slate-200/75 dark:bg-slate-800/75'
            }
        }
    }
});