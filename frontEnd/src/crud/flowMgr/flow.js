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
    delBtn: false,
    editBtn: false,
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
            label: '标题',
            prop: 'title',
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
            label: '站点',
            prop: 'domain',
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
            label: '数据包',
            prop: 'flaw_data_package',
            span: 12,
            type:'textarea',
            rules: [
                {
                    required: true,
                    message: '请填写',
                    trigger: 'blur'
                }
            ]
        },
        {
            label: '详细信息',
            prop: 'flaw_detail_data',
            span: 12,
            type:'textarea',
            rules: [
                {
                    required: true,
                    message: '请填写',
                    trigger: 'blur'
                }
            ]
        },
        {
            label:'状态',
            prop:'status',
            display:false,
            search:true,
            searchType:'select',
            dicData:[
                {label:'待提交',value:'0'},
                {label:'待审核',value:'1'},
                {label:'审核通过',value:'2'},
                {label:'审核不通过',value:'3'},
            ]
        },

    ]
}