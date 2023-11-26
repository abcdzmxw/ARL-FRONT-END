export const tableOption = {
    dialogDrag: false,
    dialogWidth: 420,
    labelWidth: 76,
    border: true,
    index: true,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menuWidth: 0,
    menu: false,
    align: 'left',
    viewBtn: false,
    excelBtn: false,
    addBtn: false,
    delBtn: false,
    editBtn: false,
    columnBtn: false,
    printBtn: false,
    menuType: 'text',
    searchMenuSpan: 6,
    searchShow: true,
    searchIndex: 3,
    searchIcon: true,
    selection: true,
    size:'mini',
    column: [
        {
            label: 'HOST',
            prop: 'ip',
            search: true,
            searchLabel:'IP字段',
            width:200,
            span: 24,
            slot:true,
            rules: [{
                required: true,
                message: '请填写名称',
                trigger: 'blur'
            }]
        },
        {
            label: 'CERT',
            prop: 'cert',
            span: 12,
            slot:true,
        },
        {
            label: '签发者名称',
            prop: 'cert.issuer.common_name',
            search:true,
            searchLabelWidth:140,
            hide:true,
            span: 12,
        },
        {
            label: '主题名称',
            prop: 'cert.subject_dn',
            search:true,
            hide:true,
            span: 12,
        },
        {
            label: 'SHA-1',
            prop: 'cert.fingerprint.sha1',
            search:true,
            hide:true,
            span: 12,
        },
        {
            label: '使用者备用名称',
            prop: 'cert.extensions.subjectAltName',
            searchLabelWidth:140,
            search:true,
            hide:true,
            span: 12,
        },
    ]
}