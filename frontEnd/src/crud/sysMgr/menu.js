import iconList from "@/const/iconList";

export const tableOption = {
    dialogDrag: false,
    dialogHeight: 560,
    labelWidth: '130',
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    align: 'center',
    viewBtn: true,
    excelBtn: false,
    addBtn: true,
    delBtn: true,
    editBtn: true,
    columnBtn: false,
    printBtn: false,
    menuType: 'text',
    searchMenuSpan: 6,
    searchShow: true,
    searchIndex: 3,
    searchIcon: true,
    // labelSuffix: ' ',
    size: 'mini',
    column: [{
        label: '菜单名称',
        prop: 'menu_name',
        span: 12,
        search: true,
        rules: [
            {
                required: true,
                message: '请填写',
                trigger: 'blur'
            }
        ]
    },
    {
        label: '菜单编码',
        prop: 'menu_code',
        span: 12,
        search: true,
        rules: [
            {
                required: true,
                message: '请填写',
                trigger: 'blur'
            }
        ]
    },
    {
        label: '排序',
        prop: 'sort',
        span: 12,
        width: '150',
        rules: [
            {
                required: true,
                message: '请填写',
                trigger: 'blur'
            }
        ]
    },
    {
        label: '父菜单',
        prop: 'parent_id',
        span: 24,
        search: false,
        width: '90',
        type: 'select',
        viewDisplay: false,
        dicData: [],
        props: {
            label: 'menu_name',
            value: 'id'
        },
        order: 1
    },
    {
        label: '路径',
        prop: 'click_uri',
        span: 12,
        rules: [
            {
                required: true,
                message: '请填写',
                trigger: 'blur'
            }
        ]
    },
    {
        label: '前端路由:',
        prop: 'route',
        span: 12,
        rules: [
            {
                required: true,
                message: '请填写',
                trigger: 'blur'
            }
        ]
    },
    {
        label: '图标',
        prop: 'icon',
        type: 'input-icon',
        iconList,
        slot: true,
        hide: true,
    },
    {
        label: '跳转',
        prop: 'jump_url',
        hide: true,
    },
    ]
}