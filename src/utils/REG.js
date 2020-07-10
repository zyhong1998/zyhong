/*
正则表达式
create：giao
*/

export const REG_ACC = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/ //账号（字母开头，4到15位，允许字母数字下划线）
export const REG_PWD = /^[a-zA-Z]\w{5,17}$/ //密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)