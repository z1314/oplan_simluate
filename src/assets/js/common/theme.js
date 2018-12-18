function changeTheme(theme) {
  let styles = document.body.style;
  // 系统主题色
  styles.setProperty("--headColor", "rgba(234,85,6,1)"); //顶部菜单栏
  styles.setProperty("--btnColor", "rgba(228,228,228,1)"); //控件 or按钮边框颜色
  styles.setProperty("--activeColor", "rgba(255,119,62,1)"); //选中控件or重点控件 ,表头底部的线框颜色,icon颜色

  //系统字号
  styles.setProperty("--FtSize_icon", "20px"); //字体图标
  styles.setProperty("--FtSize_second", "14px"); //二级标题
  styles.setProperty("--FtSize_three", "12px"); //内容

  switch (theme) {
    case "dark":
      styles.setProperty("--BgColor", "rgba(255,255,255,0.1)"); //页面中块的背景颜色
      styles.setProperty("--PbgColor", "rgba(244,244,244,0)"); //页面主要的背景色
      styles.setProperty("--titleColor", "rgba(255,255,255,1)"); //小标题字体颜色，以及控件内的字体
      styles.setProperty("--FtColor", "rgba(255,255,255,1)"); //内容字体颜色.图表x,y轴
      styles.setProperty("--hoverColor", "#191928"); //鼠标hover效果
      break;
    case "light":
      styles.setProperty("--BgColor", "rgba(255,255,255,1)");
      styles.setProperty("--PbgColor", "rgba(244,244,244,1)");
      styles.setProperty("--titleColor", "rgba(85,72,67,1)");
      styles.setProperty("--FtColor", "rgba(125,110,104,1)");
      styles.setProperty("--hoverColor", "#f6f6f6");
      styles.setProperty("--checkedColor", "rgba(255,139,97,0.1)");
      break;
  }
}

function changeHeight(val) {
  let styles = document.body.style;
  // styles.setProperty("--WrapH", val - 129 + "px");
  // styles.setProperty("--DomH", val - 169 + "px");
  styles.setProperty("--WrapH", val - 50 + "px");
  styles.setProperty("--DomH", val + "px");
}

let chartTheme = {
  chartColor: [
    "#FF9945",
    "#55ACEE",
    "#4CDFC0",
    "#FFE437",
    "#788CF0",
    "#2DCA93",
    "#FFC57F",
    "#5F73F3"
  ], //图表颜色
  axisColor: ["#7D6E68", "#ffffff"] //X轴和Y轴的颜色，第一个为light主题，第二个为dark主题
};
export { changeTheme, changeHeight, chartTheme };
