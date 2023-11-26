import { isMobile } from '@/utils/validate'
const validatePhone = (rule, value, callback) => {
    if (!isMobile(value)) {
        callback(new Error('手机号码格式不对'))
    } else {
        callback()
    }
}

export const tableOption = {
    dialogDrag: false,
    dialogHeight: 560,
    labelWidth: '130',
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menuWidth: 360,
    align: 'center',
    viewBtn: false,
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
    size:'mini',
    column: [
        {
            label: '姓名',
            prop: 'name',
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
            label: '账户',
            prop: 'username',
            span: 12,
            search: true,
            editDisabled:true,
            rules: [
                {
                    required: true,
                    message: '请填写',
                    trigger: 'blur'
                }
            ]
        },
        {
            label: '密码',
            prop: 'password',
            span: 12,
            hide: true,
            editDisplay:false,
            rules: [
                {
                    required: true,
                    message: '请填写',
                    trigger: 'blur'
                }
            ]
        },
        {
            label: '电话',
            prop: 'phone',
            span: 12,
            search: true,
            maxlength: 11,
            rules: [
                {
                    required: false,
                    message: '请输入手机号'
                },
                // {
                //     validator: validatePhone,
                //     trigger: 'blur'
                // }
            ]
        },
        {
            label: '邮箱',
            prop: 'email',
            span: 12,
            search: true,
            rules: [
                {
                    required: false,
                    message: '请填写',
                    trigger: 'blur'
                }
            ]
        },
    ]
}