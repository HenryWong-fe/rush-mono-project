## 组件设计规范

优秀的组件设计可以减轻项目后期维护的成本，对后续业务的扩展也有助力

### 测试用例的编写规范

对于待测试的组件而言，须确定输入属性，输出结果

- 无论待测试组件的内部如何变动，输入属性与输出结果须保持不变
- 测试用例需要覆盖的就是确定的输入属性会得到确认的输出结果

### 公用组件的编写规范

我们在设计组件时应考虑更加通用的场景，而不仅仅只是为了满足最开始某个特定场景的需求

- 低耦合 （公用组件的核心思想是可复用性）
- 辅助函数代码分离 (辅助工具函数大多是通用性的，将其抽离也是对整个前端项目的一种减负)
- 属性扁平化 （频繁的属性变更与属性监听在使用嵌套数据时会对性能造成影响）
- 更纯粹的属性变化 （属性之间的相互关联会导致更加困难的理解与维护）

#### 高内聚
意味着组件高度依赖其父组件和子组件，不能独立运行，不适合复用，一般用于特定的业务


#### 低耦合

意味着组件可以独立运行，不依赖与其他组件和模块

设计组件时，其耦合的主要部分来源于
- 其父级及传递的 props
- 其内部使用的子组件
- 引入的第三方模块，辅助函数等

### 业务组件的编写规范

- 高内聚 （组件内部代码具有高度相关性，其内部组件高度服务与该组件，符合单一责任原则）
- 属性名称定义语义化
- 注释明确