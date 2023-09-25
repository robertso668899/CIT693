const base = {
    get() {
        return {
            url : "http://localhost:8080/django5i380/",
            name: "django5i380",
            // 退出到首页链接
            indexUrl: ''
        };
    },
    getProjectName(){
        return {
            projectName: "房地产信息管理系统"
        } 
    }
}
export default base
