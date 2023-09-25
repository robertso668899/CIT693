const menu = {
    list() {
        return [{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-send","buttons":["新增","查看","修改","删除"],"menu":"用户","menuJump":"列表","tableName":"yonghu"}],"menu":"用户管理"},{"child":[{"appFrontIcon":"cuIcon-phone","buttons":["查看","修改","删除","爬取数据","导入","新增"],"menu":"房产信息","menuJump":"列表","tableName":"xinfangxinxi"}],"menu":"房产信息管理"},{"child":[{"appFrontIcon":"cuIcon-similar","buttons":["查看","修改"],"menu":"系统简介","tableName":"systemintro"}],"menu":"系统管理"}],"frontMenu":[],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-phone","buttons":["查看"],"menu":"房产信息","menuJump":"列表","tableName":"xinfangxinxi"}],"menu":"房产信息管理"}],"frontMenu":[],"hasBackLogin":"是","hasBackRegister":"是","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"用户","tableName":"yonghu"}]
    }
}
export default menu;
