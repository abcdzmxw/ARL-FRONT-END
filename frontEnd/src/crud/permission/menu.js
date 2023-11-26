import iconList from "@/const/iconList";

export const tableOption = {
    dialogDrag: false,
    dialogWidth: '640',
    headerAlign: 'center',
    align: 'center',
    border: true,
    viewBtn: true,
    columnBtn: false,
    labelSuffix: ' ',
    column: [{
            label: '上级菜单',
            prop: 'parentId',
            type: 'tree',
            hide: true,
            props: {
                label: 'name',
                value: 'id'
            },
            rules: [{
                required: true,
                message: '请选择上级菜单',
                trigger: 'change'
            }]
        },
        {
            label: '菜单名称',
            prop: 'menuName',
            align: 'left',
            width: 200,
            rules: [{
                required: true,
                message: '名称不能为空',
                trigger: 'blur'
            }]
        },
        {
            label: '菜单类型',
            prop: 'menuType',
            type: 'select',
            slot: true,
            dicData: [{
                label: '目录',
                value: 1
            }, {
                label: '菜单',
                value: 2
            }, {
                label: '按钮',
                value: 3
            }],
            rules: [{
                required: true,
                message: '请选择类型',
                trigger: 'blur'
            }]
        },

        {
            label: '排序',
            prop: 'sort',
            type: 'number',
            rules: [{
                required: true,
                message: '排序不能为空',
                trigger: 'blur'
            }]
        },
        {
            label: '图标',
            prop: 'menuIron',
            type: 'icon',
            iconList: iconList,
            slot: true,
            display: false
        },
        { //路径
            label: '菜单路径',
            prop: 'applicationUrl',
            display: false
        },
        { //前端组件
            label: '前端组件',
            prop: 'component',
            span: 24,
            display: false
        },
        // {
        //     label: '菜单状态',
        //     prop: 'visible',
        //     type: 'radio',
        //     value: 1,
        //     rules: [{
        //         required: false,
        //         message: '排序不能为空',
        //         trigger: 'blur'
        //     }],
        //     dicData: [{
        //         label: '可见',
        //         value: 1
        //     }, {
        //         label: '隐藏',
        //         value: 2
        //     }],
        // },
    ]
}