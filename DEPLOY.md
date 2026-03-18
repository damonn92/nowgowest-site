# NowGoWest 上线说明

## 1) 本地预览
在 `nowgowest-site` 目录执行：

```bash
python3 -m http.server 8080
```

打开 `http://localhost:8080`。

## 2) 部署到 Vercel
1. 把 `nowgowest-site` 推送到一个 GitHub 仓库。
2. 登录 Vercel，`Add New Project`，导入该仓库。
3. Framework Preset 选 `Other`（静态站），无需 build command。
4. Output Directory 留空（根目录）。
5. 部署完成后获得 `xxx.vercel.app` 域名。

## 3) GoDaddy 绑定域名（nowgowest.com）
到 GoDaddy DNS 管理界面添加记录：

- `A` 记录
  - Host: `@`
  - Points to: `76.76.21.21`
  - TTL: 默认
- `CNAME` 记录
  - Host: `www`
  - Points to: `cname.vercel-dns.com`
  - TTL: 默认

然后在 Vercel 项目 `Settings > Domains` 添加：
- `nowgowest.com`
- `www.nowgowest.com`

Vercel 验证通过后会自动签发 HTTPS 证书。

## 4) 上线后检查
- 访问 `https://nowgowest.com`
- 检查 `https://nowgowest.com/sitemap.xml`
- 检查 `https://nowgowest.com/robots.txt`
- 在 Google Search Console 提交站点地图。

## 5) 下一步建议
- 接入 GA4 和 Search Console。
- 加邮件订阅服务（Brevo/Mailchimp）。
- 每周发布至少 3 篇内容（1 深度 + 2 实操）。
