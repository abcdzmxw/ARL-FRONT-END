import { isMobile, isEmail } from "@/utils/validate";

const validatePhone = (rule, value, callback) => {
    if (!isMobile(value)) {
        callback(new Error("手机号码格式不正确"));
    } else {
        callback();
    }
};
const validateEmail = (rule, value, callback) => {
    if (!isEmail(value)) {
        callback(new Error("邮箱格式不正确"));
    } else {
        callback();
    }
};

export const option1 = {
    submitText: "提交",
    column: [{
            label: "姓名",
            prop: "username",
            span: 13,
            minlength: 3,
            maxlength: 30,
            prefixIcon: "el-icon-user",
            minlength: 3,
            rules: [{
                required: true,
                message: "请输入用户名",
                trigger: "blur",
            }, ],
            // click: ({ value, column }) => {
            //     console.log(value, column)
            // }
        },
        {
            label: "昵称",
            prop: "nickname",
            span: 13,
        },
        {
            label: "性别",
            prop: "sex",
            span: 12,
            type: "radio",
            rules: [{
                required: false,
                message: "请选择",
                trigger: "blur",
            }, ],
            dicData: [{
                    label: "女",
                    value: 0,
                },
                {
                    label: "男",
                    value: 1,
                },
            ],
        },
        {
            label: "手机号码",
            prop: "phone",
            span: 13,
            rules: [{
                    required: true,
                    message: "请输入手机号码",
                },
                {
                    min: 11,
                    max: 11,
                    message: "长度在 11 个字符",
                    trigger: "blur",
                },
                {
                    validator: validatePhone,
                    trigger: "blur",
                },
            ],
        },
        {
            label: "邮箱",
            prop: "email",
            span: 13,
            rules: [{
                    required: false,
                    message: "请填写",
                    trigger: "blur",
                },
                {
                    validator: validateEmail,
                    trigger: "blur",
                },
            ],
        },
        {
            label: "头像",
            prop: "avtar",
            span: 24,
            rules: [{
                required: false,
                message: "请填写",
                trigger: "blur",
            }, ],
        },
    ],
}

export const option2 = {
    column: [{
            label: "原密码",
            prop: "old_password",
            type: "password",
            span: 13,
            rules: [{
                    required: true,
                    message: "请填写",
                    trigger: "blur",
                },
                {
                    min: 6,
                    max: 20,
                    message: "长度在6~20个字符",
                    trigger: "blur",
                },
            ],
        },
        {
            label: "新密码",
            prop: "new_password",
            type: "password",
            span: 13,
            rules: [{
                    required: true,
                    message: "请填写",
                    trigger: "blur",
                },
                {
                    min: 6,
                    max: 20,
                    message: "长度在6~20个字符",
                    trigger: "blur",
                },
            ],
        },
        {
            label: "确认密码",
            prop: "check_password",
            type: "password",
            span: 13,
            rules: [{
                    required: true,
                    message: "请填写",
                    trigger: "blur",
                },
                {
                    min: 6,
                    max: 20,
                    message: "长度在6~20个字符",
                    trigger: "blur",
                },
            ],
            blur: ({ value, column }) => {
                console.log(value, column)
            }
        },
    ],
}