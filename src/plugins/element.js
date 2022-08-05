import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRow,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElMenu,
  ElSubmenu,
  ElMenuItem,
  ElMessage,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElCard,
  ElUpload,
  ElTable,
  ElTableColumn,
  ElPagination,
  ElCol
} from 'element-plus'

export default (app) => {
  app.use(ElButton)
  app.use(ElForm)
  app.use(ElFormItem)
  app.use(ElInput)
  app.use(ElRow)
  app.use(ElContainer)
  app.use(ElHeader)
  app.use(ElAside)
  app.use(ElMain)
  app.use(ElMenu)
  app.use(ElSubmenu)
  app.use(ElMenuItem)
  app.use(ElMessage)
  app.use(ElBreadcrumb)
  app.use(ElBreadcrumbItem)
  app.use(ElCard)
  app.use(ElUpload)
  app.use(ElTable)
  app.use(ElTableColumn)
  app.use(ElPagination)
  app.use(ElCol)
}
