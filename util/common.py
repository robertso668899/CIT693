# coding:utf-8
# author:WTS
import hashlib

class Common(object):
    def md5(self, pwd):
        md5 = hashlib.md5()
        md5.update(pwd.encode())
        return md5.hexdigest()
