# Boh PJ Discord Bot
 
## 概要 / Overview
Boh PJ Discordサーバーで使用するBotのソースコード。

The source code for the bot used in the Boh PJ Discord server.

## コミットアイコン / Commit Icons
|Emoji|Code|Type|
|:-:|:-|:-|
|:sparkles:|`:sparkles:`|新機能 (New Feature)|
|:bookmark:|`:bookmark:`|リリースアップデート (Release)|
|:fire:|`:fire:`|削除 (Remove)|
|:bug:|`:bug:`|バグ修正 (Bugfix)|
|:construction:|`:construction:`|WIP (Work In Progress)|
|:lipstick:|`:lipstick:`|デザイン UI / UX (Update the UI and style)|
|:memo:|`:memo:`|ドキュメントの更新(Add or update Document)|
|:rotating_light:|`:rotating_light:`|テスト (Testing)|
|:heavy_plus_sign:|`:heavy_plus_sign:`|依存関係の追加 (Add dependency)|
|:heavy_minus_sign:|`:heavy_minus_sign:`|依存関係の削除 (Remove dependency)|
|:bulb:|`:bulb:`|コメントの更新 (Update comments)|

基本的には[gitmoji](https://gitmoji.dev/)を踏襲しています  
This is primarily based on [gitmoji](https://gitmoji.dev/).

## ブランチ戦略
このリポジトリではGithub Flowを用いてブランチを管理しています。
We use GitHub Flow to manage branches in this repository.

|Branch Name|Description|
|:-:|:-|
|`main`|本番環境用のブランチ (Production branch)|
|`feature/*`|新しい機能や修正を開発するためのブランチ (Branch for developing new features or fixes)|

- `main`ブランチは常にデプロイ可能な状態に保つ。
- `main`ブランチへ直接コミットするのではなく、新しい機能や修正を`feature`ブランチで行い、Pull Requestを作成して`main`へマージする。