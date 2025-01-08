# 招行货币中间价chrome插件


## 功能

- 在chrome浏览器中，点击插件图标，可以查看当前时间点的人民币对美元的汇率`中间价`

## 背景

- 招行汇率界面中以往会展示汇率中间价，但最近几年，招行汇率界面中不再展示`中间价`，而是只展示汇率的`买入价`和`卖出价`
- 通过招行汇率界面中展示的`买入价`和`卖出价`，用算术平均值代替汇率`中间价`并非完全准确，但可以作为参考

## 原理
- 最准确的方式是用F12大法，通过查看网页的结果返回，获取汇率中间价
- 但这种方式需要手动操作，且需要每次都手动操作，不是很方便
- 因此，可以开发一个chrome插件，通过点击插件图标，访问招行汇率界面并解析结果，获取汇率中间价

## credit

- 本项目在cursor帮助下完成
- 图标来源：[Currency icons created by Pixel perfect - Flaticon](https://www.flaticon.com/free-icons/currency)
