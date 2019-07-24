import Mock from "@/mock/development/mock-data/mockjs"
const Random = Mock.Random


export default {
    //=====================================标准数据====================================//
    standard() {
        return {
            legalRep: "彭一峰", //----------------企业法人
            idCardNo: "510136199785541101", //---------------法人身份证号
            password: "111111a", //--------------------登录密码
            password2: "111111a", //------------------重复密码
            username: "tester", //-----------------登录名称
            companyName: "加班乡村基", //----------------企业名称
            licenseNumber: "91310117738117918N", //---------------统一信用代码
            address: "新希望国际B座1118", //--------------企业地址
            userType: "1", //-----------------许可证类型
            qsNo: "QS211201027680", //---------------生产许可证号
            businessNo: "QS211201027680", //----------------经营许可证号
            contacts: "小朱哥", //--------------------联系人
            phone: "15228388811", //-----------------------电话
            code: "", //-------------------------验证码
            idCardFace: "", //---------------------身份证人脸面照片
            idCardNational: "", //-----------------身份证国徽面
            businessLicenseUrl: "" //-------------营业执照照片
        }
    },
    //=====================================随机数据====================================//
    random() {
        return Mock.mock({
            legalRep: Random.cname(), //----------------企业法人
            idCardNo: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, //---------------法人身份证号
            password: "111111a", //--------------------登录密码
            password2: "111111a", //------------------重复密码
            username: Random.word(), //-----------------登录名称
            companyName: Random.ccompany(), //----------------企业名称
            licenseNumber: /[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}/, //---------------统一信用代码
            address: Random.address(), //--------------企业地址
            userType: 1, //-----------------许可证类型
            qsNo: /^[a-zA-Z]{2}[ ]?(\d{4}[ ]?\d{4}[ ]?\d{4})$/, //---------------生产许可证号
            businessNo: /^[a-zA-Z]{2}[ ]?(\d{4}[ ]?\d{4}[ ]?\d{4})$/, //----------------经营许可证号
            contacts: Random.cname(), //--------------------联系人
            phone: /^1(3|4|5|7|8)\d{9}$/, //-----------------------电话
            code: "", //-------------------------验证码
            idCardFace: Random.image(), //---------------------身份证人脸面照片
            idCardNational: Random.image(), //-----------------身份证国徽面
            businessLicenseUrl: Random.image(), //-------------营业执照照片
        })
    }


}