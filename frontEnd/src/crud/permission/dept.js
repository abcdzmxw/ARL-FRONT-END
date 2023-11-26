import iconList from "@/const/iconList";

export const tableOption = {
    dialogDrag: false,
    dialogWidth: '640',
    headerAlign: 'center',
    align: 'center',
    border: true,
    viewBtn: true,
    columnBtn: false,
    index: true,
    indexLabel: '序号',
    labelSuffix: ' ',
    searchShow: true,
    searchIndex: 3,
    searchIcon: true,
    searchMenuSpan: 6,
    column: [{
            label: '部门名称',
            prop: 'deptName',
            align: 'left',
            span: 24,
            search: true,
            rules: [{
                required: true,
                message: '部门名称不能为空',
                trigger: 'blur'
            }]
        },
        {
            label: '部门职责',
            prop: 'deptPower',
            type: 'textarea',
            align: 'left',
            span: 24,
            rules: [{
                required: false,
                message: '部门职责',
                trigger: 'blur'
            }]
        },
    ]
}