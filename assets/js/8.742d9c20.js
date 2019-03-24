(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{175:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"hibernate-笔记"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#hibernate-笔记","aria-hidden":"true"}},[t._v("#")]),t._v(" hibernate 笔记")]),t._v(" "),s("h2",{attrs:{id:"自动生成时间"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#自动生成时间","aria-hidden":"true"}},[t._v("#")]),t._v(" 自动生成时间")]),t._v(" "),s("p",[t._v("增加基类，把id和创建修改时间放到基类里面，并把类修改为 "),s("code",[t._v("abstract")]),t._v(" 。")]),t._v(" "),s("p",[t._v("需要使用 "),s("code",[t._v("@MappedSuperclass")]),t._v(" 注解。")]),t._v(" "),s("p",[t._v("使用 "),s("code",[t._v("@CreationTimestamp")]),t._v("  和 "),s("code",[t._v("@UpdateTimestamp")]),t._v(" 自动生成对应的时间。")]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("package")]),t._v(" cn"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("xiaowenjie"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("beans"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" java"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("io"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Serializable"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" java"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("util"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Date"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" javax"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("persistence"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("GeneratedValue"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" javax"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("persistence"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" javax"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("persistence"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("MappedSuperclass"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" org"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hibernate"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("annotations"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("CreationTimestamp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" org"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("hibernate"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("annotations"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("UpdateTimestamp"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" lombok"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/**\n * 基类\n * \n * @author 晓风轻 https://github.com/xwjie/\n */")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Data")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@MappedSuperclass")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("abstract")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("BaseEntity")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("implements")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Serializable")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Id")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@GeneratedValue")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("long")]),t._v(" id"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@CreationTimestamp")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" Date createTime"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n\t"),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@UpdateTimestamp")]),t._v("\n\t"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("private")]),t._v(" Date updateTime"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),s("h2",{attrs:{id:"增加唯一主键"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#增加唯一主键","aria-hidden":"true"}},[t._v("#")]),t._v(" 增加唯一主键")]),t._v(" "),s("p",[t._v("User表：")]),t._v(" "),s("div",{staticClass:"language-java extra-class"},[s("pre",{pre:!0,attrs:{class:"language-java"}},[s("code",[s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Table")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("indexes "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Index")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"user_name_unique"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" columnList "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"name"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" unique "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])])}],!1,null,null,null);a.default=e.exports}}]);