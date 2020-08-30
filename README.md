## 開発方法
### セットアップ
```bash
$ bundle install --path vendor/bundle
```

### 開発サイクル
これを叩くとサーバが立ち上がる。

```bash
$ bundle exec jekyll s
$ open 'http://127.0.0.1:4000'
```

サイト内のファイルを編集するたびにブラウザも自動リロードされる。

### ファイルの置き場
- CSS: `assets/css/main.scss`
  - 読み込むだけの`.scss`は `_sass` 内に入れて、`main.scss`でimportする
- 画像: `assets/img/`