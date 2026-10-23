export const siteConfig = {
  language: "zh-CN",
  locale: "zh_CN",
  siteUrl: undefined as string | undefined,
  siteMode: "local" as "local" | "production",
  contentStatus: "draft" as "demo" | "draft" | "ready",
  navigation: [
    { label: "首页", href: "/" },
    { label: "产品中心", href: "/products/" },
    { label: "关于我们", href: "/about/" },
    { label: "联系我们", href: "/contact/" },
  ],
};
