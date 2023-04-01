const rules = {
    top: [
        { required: true, message: '请输入边界条件', trigger: 'blur' },
        { type: 'number', message: '只能输入数字', trigger: 'blur' },
        { pattern: /^\d{1,6}$/, message: '长度不能超过六位数', trigger: 'blur' }
    ],
    bottom: [
        { required: true, message: '请输入边界条件' },
        { type: 'number', message: '只能输入数字' },
        { pattern: /^\d{1,6}$/, message: '长度不能超过六位数', trigger: 'blur' }
    ],
    left: [
        { required: true, message: '请输入边界条件', trigger: 'blur' },
        { type: 'number', message: '只能输入数字' },
        { pattern: /^\d{1,6}$/, message: '长度不能超过六位数', trigger: 'blur' }
    ],
    right: [
        { required: true, message: '请输入边界条件', trigger: 'blur' },
        { type: 'number', message: '只能输入数字' },
        { pattern: /^\d{1,6}$/, message: '长度不能超过六位数', trigger: 'blur' }
    ],
    maxiter: [
        { required: true, message: '请输入边界条件', trigger: 'blur' },
        { type: 'number', message: '只能输入数字' },
        { pattern: /^\d{1,6}$/, message: '长度不能超过六位数', trigger: 'blur' }
    ],

}

export default rules